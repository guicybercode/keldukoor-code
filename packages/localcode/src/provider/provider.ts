import path from "path"
import fuzzysort from "fuzzysort"
import { Config } from "../config/config"
import { sortBy } from "remeda"
import { NoSuchModelError } from "ai"
import type { LanguageModelV2 } from "@ai-sdk/provider"
import { Global } from "../global"
import { Filesystem } from "../util/filesystem"
import { ModelID, ProviderID } from "./schema"
import { providerState, buildSDK } from "./state"
import {
  ProviderModelSchema,
  ProviderInfoSchema,
  ModelNotFoundError as _ModelNotFoundError,
  ProviderInitError,
  type ProviderModel,
  type ProviderInfo,
} from "./types"

export namespace Provider {
  export const Model = ProviderModelSchema
  export type Model = ProviderModel

  export const Info = ProviderInfoSchema
  export type Info = ProviderInfo

  export const ModelNotFoundError = _ModelNotFoundError
  export const InitError = ProviderInitError

  export function fromModelsDevProvider(_provider: unknown): Info {
    return { id: ProviderID.make("ollama"), name: "Ollama", source: "custom", env: [], options: {}, models: {} }
  }

  export async function list() {
    return providerState().then((s) => s.providers)
  }

  export async function getProvider(providerID: ProviderID) {
    return providerState().then((s) => s.providers[providerID])
  }

  export async function getModel(providerID: ProviderID, modelID: ModelID) {
    const s = await providerState()
    const provider = s.providers[providerID]
    if (!provider) {
      const suggestions = fuzzysort.go(providerID, Object.keys(s.providers), { limit: 3, threshold: -10000 }).map((m) => m.target)
      throw new ModelNotFoundError({ providerID, modelID, suggestions })
    }
    const info = provider.models[modelID]
    if (!info) {
      const suggestions = fuzzysort.go(modelID, Object.keys(provider.models), { limit: 3, threshold: -10000 }).map((m) => m.target)
      throw new ModelNotFoundError({ providerID, modelID, suggestions })
    }
    return info
  }

  export async function getLanguage(model: Model): Promise<LanguageModelV2> {
    const s = await providerState()
    const key = `${model.providerID}/${model.id}`
    if (s.languageCache.has(key)) return s.languageCache.get(key)!
    const sdk = await buildSDK(model)
    try {
      const language = sdk.languageModel(model.api.id) as LanguageModelV2
      s.languageCache.set(key, language)
      return language
    } catch (e) {
      if (e instanceof NoSuchModelError) throw new ModelNotFoundError({ modelID: model.id, providerID: model.providerID }, { cause: e })
      throw e
    }
  }

  export async function closest(providerID: ProviderID, query: string[]) {
    const s = await providerState()
    const provider = s.providers[providerID]
    if (!provider) return undefined
    for (const item of query) {
      for (const modelID of Object.keys(provider.models)) {
        if (modelID.includes(item)) return { providerID, modelID }
      }
    }
  }

  export async function getSmallModel(providerID: ProviderID) {
    const cfg = await Config.get()
    if (cfg.small_model) { const p = parseModel(cfg.small_model); return getModel(p.providerID, p.modelID) }
    const s = await providerState()
    const provider = s.providers[providerID]
    if (!provider) return undefined
    const models = Object.values(provider.models)
    if (models.length === 0) return undefined
    const parseParams = (m: Model) => { const match = /(\d+(?:\.\d+)?)b/i.exec(m.id); return match ? parseFloat(match[1]) : Infinity }
    return models.reduce((a, b) => (parseParams(a) <= parseParams(b) ? a : b))
  }

  export async function defaultModel() {
    const cfg = await Config.get()
    if (cfg.model) return parseModel(cfg.model)
    const providers = await list()
    const recent = (await Filesystem.readJson<{ recent?: { providerID: ProviderID; modelID: ModelID }[] }>(
      path.join(Global.Path.state, "model.json"),
    ).then((x) => (Array.isArray(x.recent) ? x.recent : [])).catch(() => [])) as { providerID: ProviderID; modelID: ModelID }[]
    for (const entry of recent) {
      if (providers[entry.providerID]?.models[entry.modelID]) return { providerID: entry.providerID, modelID: entry.modelID }
    }
    const provider = Object.values(providers)[0]
    if (!provider) throw new Error("no providers found — is Ollama running?")
    const [model] = sort(Object.values(provider.models))
    if (!model) throw new Error("no models found — run `ollama pull <model>` first")
    return { providerID: provider.id, modelID: model.id }
  }

  export function sort<T extends { id: string }>(models: T[]) {
    return sortBy(models, [(m) => m.id, "asc"])
  }

  export function parseModel(model: string) {
    const [providerID, ...rest] = model.split("/")
    return { providerID: ProviderID.make(providerID), modelID: ModelID.make(rest.join("/")) }
  }
}
