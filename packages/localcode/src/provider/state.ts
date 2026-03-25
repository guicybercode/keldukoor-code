import { Config } from "../config/config"
import { mergeDeep, mapValues } from "remeda"
import { type Provider as SDK } from "ai"
import type { LanguageModelV2 } from "@ai-sdk/provider"
import { Log } from "../util/log"
import { Hash } from "../util/hash"
import { Instance } from "../project/instance"
import { Flag } from "../flag/flag"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible"
import { ProviderTransform } from "./transform"
import { ProviderID } from "./schema"
import { discoverOllamaModels, OLLAMA_DEFAULT_URL } from "./ollama"
import { ProviderInitError } from "./types"
import type { ProviderModel, ProviderInfo } from "./types"

const log = Log.create({ service: "provider" })

export type ProviderState = {
  providers: Record<ProviderID, ProviderInfo>
  sdkCache: Map<string, SDK>
  languageCache: Map<string, LanguageModelV2>
}

export const providerState = Instance.state(async (): Promise<ProviderState> => {
  using _ = log.time("state")
  const config = await Config.get()
  const baseURL: string =
    (config.provider?.["ollama"]?.options?.["baseURL"] as string | undefined) ??
    process.env["OLLAMA_BASE_URL"] ??
    OLLAMA_DEFAULT_URL

  const discovered = await discoverOllamaModels(baseURL)
  const models: Record<string, ProviderModel> = { ...discovered }

  for (const [id, override] of Object.entries(config.provider?.["ollama"]?.models ?? {})) {
    if (models[id]) models[id] = mergeDeep(models[id], override) as ProviderModel
  }

  for (const model of Object.values(models)) {
    model.variants = mapValues(ProviderTransform.variants(model), (v) => v)
    if (model.status === "alpha" && !Flag.LOCALCODE_ENABLE_EXPERIMENTAL_MODELS) delete models[model.id]
    if (model.status === "deprecated") delete models[model.id]
  }

  const ollamaProvider: ProviderInfo = {
    id: ProviderID.make("ollama"),
    name: "Ollama",
    source: "config",
    env: [],
    options: { baseURL: `${baseURL}/v1`, includeUsage: true },
    models,
  }

  const providers: Record<ProviderID, ProviderInfo> = {} as Record<ProviderID, ProviderInfo>
  if (Object.keys(models).length > 0) providers[ProviderID.make("ollama")] = ollamaProvider
  log.info("state ready", { modelCount: Object.keys(models).length })
  return { providers, sdkCache: new Map(), languageCache: new Map() }
})

function buildFetch(options: Record<string, any>): (input: any, init?: any) => Promise<Response> {
  const chunkTimeout = options["chunkTimeout"] as number | undefined
  delete options["chunkTimeout"]
  return async (input: any, init?: any) => {
    const signals: AbortSignal[] = []
    if (init?.signal) signals.push(init.signal)
    if (options["timeout"] != null && options["timeout"] !== false) signals.push(AbortSignal.timeout(options["timeout"] as number))
    const chunkCtl = typeof chunkTimeout === "number" && chunkTimeout > 0 ? new AbortController() : undefined
    if (chunkCtl) signals.push(chunkCtl.signal)
    const combined = signals.length === 0 ? null : signals.length === 1 ? signals[0] : AbortSignal.any(signals)
    const res = await fetch(input, { ...(init ?? {}), ...(combined ? { signal: combined } : {}), timeout: false } as any)
    if (!chunkCtl) return res
    return wrapSSEChunks(res, chunkTimeout!, chunkCtl)
  }
}

function wrapSSEChunks(res: Response, ms: number, ctl: AbortController): Response {
  if (!res.body || !res.headers.get("content-type")?.includes("text/event-stream")) return res
  const reader = res.body.getReader()
  const body = new ReadableStream<Uint8Array>({
    async pull(ctrl) {
      const part = await new Promise<Awaited<ReturnType<typeof reader.read>>>((resolve, reject) => {
        const id = setTimeout(() => { const e = new Error("SSE read timed out"); ctl.abort(e); void reader.cancel(e); reject(e) }, ms)
        reader.read().then((p) => { clearTimeout(id); resolve(p) }, (e) => { clearTimeout(id); reject(e) })
      })
      if (part.done) { ctrl.close(); return }
      ctrl.enqueue(part.value)
    },
    async cancel(reason) { ctl.abort(reason); await reader.cancel(reason) },
  })
  return new Response(body, { headers: new Headers(res.headers), status: res.status, statusText: res.statusText })
}

export async function buildSDK(model: ProviderModel): Promise<SDK> {
  try {
    using _ = log.time("getSDK", { providerID: model.providerID })
    const s = await providerState()
    const options = { ...s.providers[model.providerID].options }
    options["fetch"] = buildFetch(options)
    const key = Hash.fast(JSON.stringify({ providerID: model.providerID, options }))
    const cached = s.sdkCache.get(key)
    if (cached) return cached
    const sdk = createOpenAICompatible({ name: model.providerID, baseURL: options["baseURL"] as string, ...options }) as unknown as SDK
    s.sdkCache.set(key, sdk)
    return sdk
  } catch (e) {
    throw new ProviderInitError({ providerID: model.providerID }, { cause: e })
  }
}
