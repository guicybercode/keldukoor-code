import { Log } from "../util/log"
import { ModelID, ProviderID } from "./schema"
import type { Provider } from "./provider"

const log = Log.create({ service: "provider.ollama" })

const OLLAMA_DEFAULT_URL = "http://localhost:11434"

interface OllamaTagsResponse {
  models: Array<{
    name: string
    model: string
    size: number
    details?: {
      family?: string
      parameter_size?: string
      quantization_level?: string
    }
  }>
}

function modelFromOllama(entry: OllamaTagsResponse["models"][number], baseURL: string): Provider.Model {
  return {
    id: ModelID.make(entry.model),
    providerID: ProviderID.make("ollama"),
    name: entry.name,
    family: entry.details?.family ?? "",
    api: {
      id: entry.model,
      url: `${baseURL}/v1`,
      npm: "@ai-sdk/openai-compatible",
    },
    status: "active",
    headers: {},
    options: {},
    cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
    limit: { context: 8192, output: 4096 },
    capabilities: {
      temperature: true,
      reasoning: false,
      attachment: false,
      toolcall: true,
      input: { text: true, audio: false, image: false, video: false, pdf: false },
      output: { text: true, audio: false, image: false, video: false, pdf: false },
      interleaved: false,
    },
    release_date: "",
    variants: {},
  }
}

export async function discoverOllamaModels(baseURL: string = OLLAMA_DEFAULT_URL): Promise<Record<string, Provider.Model>> {
  try {
    const res = await fetch(`${baseURL}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) {
      log.warn("ollama /api/tags returned non-ok status", { status: res.status })
      return {}
    }
    const data = (await res.json()) as OllamaTagsResponse
    const models: Record<string, Provider.Model> = {}
    for (const entry of data.models ?? []) {
      models[entry.model] = modelFromOllama(entry, baseURL)
    }
    log.info("ollama models discovered", { count: Object.keys(models).length })
    return models
  } catch (e) {
    log.warn("ollama not reachable, skipping model discovery", { error: String(e) })
    return {}
  }
}

export { OLLAMA_DEFAULT_URL }
