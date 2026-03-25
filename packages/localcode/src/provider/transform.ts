import type { ModelMessage } from "ai"
import type { JSONSchema7 } from "@ai-sdk/provider"
import type { JSONSchema } from "zod/v4/core"
import type { Provider } from "./provider"
import type { ModelsDev } from "./models"
import { Flag } from "@/flag/flag"

type Modality = NonNullable<ModelsDev.Model["modalities"]>["input"][number]

function mimeToModality(mime: string): Modality | undefined {
  if (mime.startsWith("image/")) return "image"
  if (mime.startsWith("audio/")) return "audio"
  if (mime.startsWith("video/")) return "video"
  if (mime === "application/pdf") return "pdf"
  return undefined
}

export namespace ProviderTransform {
  export const OUTPUT_TOKEN_MAX = Flag.LOCALCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX || 32_000

  const WIDELY_SUPPORTED_EFFORTS = ["low", "medium", "high"]

  function normalizeMessages(msgs: ModelMessage[], model: Provider.Model): ModelMessage[] {
    if (typeof model.capabilities.interleaved === "object" && model.capabilities.interleaved.field) {
      const field = model.capabilities.interleaved.field
      return msgs.map((msg) => {
        if (msg.role !== "assistant" || !Array.isArray(msg.content)) return msg

        const reasoningText = msg.content
          .filter((part: any) => part.type === "reasoning")
          .map((part: any) => part.text)
          .join("")

        const filteredContent = msg.content.filter((part: any) => part.type !== "reasoning")

        if (!reasoningText) return { ...msg, content: filteredContent }

        return {
          ...msg,
          content: filteredContent,
          providerOptions: {
            ...msg.providerOptions,
            openaiCompatible: {
              ...(msg.providerOptions as any)?.openaiCompatible,
              [field]: reasoningText,
            },
          },
        }
      })
    }

    return msgs
  }

  function unsupportedParts(msgs: ModelMessage[], model: Provider.Model): ModelMessage[] {
    return msgs.map((msg) => {
      if (msg.role !== "user" || !Array.isArray(msg.content)) return msg

      const filtered = msg.content.map((part) => {
        if (part.type !== "file" && part.type !== "image") return part

        if (part.type === "image") {
          const imageStr = part.image.toString()
          if (imageStr.startsWith("data:")) {
            const match = imageStr.match(/^data:([^;]+);base64,(.*)$/)
            if (match && (!match[2] || match[2].length === 0)) {
              return {
                type: "text" as const,
                text: "ERROR: Image file is empty or corrupted. Please provide a valid image.",
              }
            }
          }
        }

        const mime =
          part.type === "image" ? part.image.toString().split(";")[0].replace("data:", "") : part.mediaType
        const filename = part.type === "file" ? part.filename : undefined
        const modality = mimeToModality(mime)

        if (!modality) return part
        if (model.capabilities.input[modality]) return part

        const name = filename ? `"${filename}"` : modality
        return {
          type: "text" as const,
          text: `ERROR: Cannot read ${name} (this model does not support ${modality} input). Inform the user.`,
        }
      })

      return { ...msg, content: filtered }
    })
  }

  export function message(msgs: ModelMessage[], model: Provider.Model, _options: Record<string, unknown>) {
    msgs = unsupportedParts(msgs, model)
    msgs = normalizeMessages(msgs, model)
    return msgs
  }

  export function temperature(_model: Provider.Model): number | undefined {
    return undefined
  }

  export function topP(_model: Provider.Model): number | undefined {
    return undefined
  }

  export function topK(_model: Provider.Model): number | undefined {
    return undefined
  }

  export function variants(model: Provider.Model): Record<string, Record<string, any>> {
    if (!model.capabilities.reasoning) return {}
    return Object.fromEntries(WIDELY_SUPPORTED_EFFORTS.map((effort) => [effort, { reasoningEffort: effort }]))
  }

  export function options(_input: {
    model: Provider.Model
    sessionID: string
    providerOptions?: Record<string, any>
  }): Record<string, any> {
    return {}
  }

  export function smallOptions(_model: Provider.Model): Record<string, any> {
    return {}
  }

  export function providerOptions(model: Provider.Model, opts: Record<string, any>): Record<string, any> {
    return { [model.providerID]: opts }
  }

  export function maxOutputTokens(model: Provider.Model): number {
    return Math.min(model.limit.output, OUTPUT_TOKEN_MAX) || OUTPUT_TOKEN_MAX
  }

  export function schema(_model: Provider.Model, s: JSONSchema.BaseSchema | JSONSchema7): JSONSchema7 {
    return s as JSONSchema7
  }
}
