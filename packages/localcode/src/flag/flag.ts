import { Config } from "effect"

function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

function falsy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "false" || value === "0"
}

export namespace Flag {
  export const LOCALCODE_AUTO_SHARE = truthy("LOCALCODE_AUTO_SHARE")
  export const LOCALCODE_GIT_BASH_PATH = process.env["LOCALCODE_GIT_BASH_PATH"]
  export const LOCALCODE_CONFIG = process.env["LOCALCODE_CONFIG"]
  export declare const LOCALCODE_TUI_CONFIG: string | undefined
  export declare const LOCALCODE_CONFIG_DIR: string | undefined
  export const LOCALCODE_CONFIG_CONTENT = process.env["LOCALCODE_CONFIG_CONTENT"]
  export const LOCALCODE_DISABLE_AUTOUPDATE = truthy("LOCALCODE_DISABLE_AUTOUPDATE")
  export const LOCALCODE_ALWAYS_NOTIFY_UPDATE = truthy("LOCALCODE_ALWAYS_NOTIFY_UPDATE")
  export const LOCALCODE_DISABLE_PRUNE = truthy("LOCALCODE_DISABLE_PRUNE")
  export const LOCALCODE_DISABLE_TERMINAL_TITLE = truthy("LOCALCODE_DISABLE_TERMINAL_TITLE")
  export const LOCALCODE_PERMISSION = process.env["LOCALCODE_PERMISSION"]
  export const LOCALCODE_DISABLE_DEFAULT_PLUGINS = truthy("LOCALCODE_DISABLE_DEFAULT_PLUGINS")
  export const LOCALCODE_DISABLE_LSP_DOWNLOAD = truthy("LOCALCODE_DISABLE_LSP_DOWNLOAD")
  export const LOCALCODE_ENABLE_EXPERIMENTAL_MODELS = truthy("LOCALCODE_ENABLE_EXPERIMENTAL_MODELS")
  export const LOCALCODE_DISABLE_AUTOCOMPACT = truthy("LOCALCODE_DISABLE_AUTOCOMPACT")
  export const LOCALCODE_DISABLE_MODELS_FETCH = truthy("LOCALCODE_DISABLE_MODELS_FETCH")
  export const LOCALCODE_DISABLE_CLAUDE_CODE = truthy("LOCALCODE_DISABLE_CLAUDE_CODE")
  export const LOCALCODE_DISABLE_CLAUDE_CODE_PROMPT =
    LOCALCODE_DISABLE_CLAUDE_CODE || truthy("LOCALCODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const LOCALCODE_DISABLE_CLAUDE_CODE_SKILLS =
    LOCALCODE_DISABLE_CLAUDE_CODE || truthy("LOCALCODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const LOCALCODE_DISABLE_EXTERNAL_SKILLS =
    LOCALCODE_DISABLE_CLAUDE_CODE_SKILLS || truthy("LOCALCODE_DISABLE_EXTERNAL_SKILLS")
  export declare const LOCALCODE_DISABLE_PROJECT_CONFIG: boolean
  export const LOCALCODE_FAKE_VCS = process.env["LOCALCODE_FAKE_VCS"]
  export declare const LOCALCODE_CLIENT: string
  export const LOCALCODE_SERVER_PASSWORD = process.env["LOCALCODE_SERVER_PASSWORD"]
  export const LOCALCODE_SERVER_USERNAME = process.env["LOCALCODE_SERVER_USERNAME"]
  export const LOCALCODE_ENABLE_QUESTION_TOOL = truthy("LOCALCODE_ENABLE_QUESTION_TOOL")

  // Experimental
  export const LOCALCODE_EXPERIMENTAL = truthy("LOCALCODE_EXPERIMENTAL")
  export const LOCALCODE_EXPERIMENTAL_FILEWATCHER = Config.boolean("LOCALCODE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  )
  export const LOCALCODE_EXPERIMENTAL_DISABLE_FILEWATCHER = Config.boolean(
    "LOCALCODE_EXPERIMENTAL_DISABLE_FILEWATCHER",
  ).pipe(Config.withDefault(false))
  export const LOCALCODE_EXPERIMENTAL_ICON_DISCOVERY =
    LOCALCODE_EXPERIMENTAL || truthy("LOCALCODE_EXPERIMENTAL_ICON_DISCOVERY")

  const copy = process.env["LOCALCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
  export const LOCALCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    copy === undefined ? process.platform === "win32" : truthy("LOCALCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const LOCALCODE_ENABLE_EXA =
    truthy("LOCALCODE_ENABLE_EXA") || LOCALCODE_EXPERIMENTAL || truthy("LOCALCODE_EXPERIMENTAL_EXA")
  export const LOCALCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = number("LOCALCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const LOCALCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = number("LOCALCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const LOCALCODE_EXPERIMENTAL_OXFMT = LOCALCODE_EXPERIMENTAL || truthy("LOCALCODE_EXPERIMENTAL_OXFMT")
  export const LOCALCODE_EXPERIMENTAL_LSP_TY = truthy("LOCALCODE_EXPERIMENTAL_LSP_TY")
  export const LOCALCODE_EXPERIMENTAL_LSP_TOOL = LOCALCODE_EXPERIMENTAL || truthy("LOCALCODE_EXPERIMENTAL_LSP_TOOL")
  export const LOCALCODE_DISABLE_FILETIME_CHECK = Config.boolean("LOCALCODE_DISABLE_FILETIME_CHECK").pipe(
    Config.withDefault(false),
  )
  export const LOCALCODE_EXPERIMENTAL_PLAN_MODE = LOCALCODE_EXPERIMENTAL || truthy("LOCALCODE_EXPERIMENTAL_PLAN_MODE")
  export const LOCALCODE_EXPERIMENTAL_WORKSPACES = LOCALCODE_EXPERIMENTAL || truthy("LOCALCODE_EXPERIMENTAL_WORKSPACES")
  export const LOCALCODE_EXPERIMENTAL_MARKDOWN = !falsy("LOCALCODE_EXPERIMENTAL_MARKDOWN")
  export const LOCALCODE_MODELS_URL = process.env["LOCALCODE_MODELS_URL"]
  export const LOCALCODE_MODELS_PATH = process.env["LOCALCODE_MODELS_PATH"]
  export const LOCALCODE_DB = process.env["LOCALCODE_DB"]
  export const LOCALCODE_DISABLE_CHANNEL_DB = truthy("LOCALCODE_DISABLE_CHANNEL_DB")
  export const LOCALCODE_SKIP_MIGRATIONS = truthy("LOCALCODE_SKIP_MIGRATIONS")
  export const LOCALCODE_STRICT_CONFIG_DEPS = truthy("LOCALCODE_STRICT_CONFIG_DEPS")

  function number(key: string) {
    const value = process.env[key]
    if (!value) return undefined
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }
}

// Dynamic getter for LOCALCODE_DISABLE_PROJECT_CONFIG
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "LOCALCODE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthy("LOCALCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for LOCALCODE_TUI_CONFIG
// This must be evaluated at access time, not module load time,
// because tests and external tooling may set this env var at runtime
Object.defineProperty(Flag, "LOCALCODE_TUI_CONFIG", {
  get() {
    return process.env["LOCALCODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for LOCALCODE_CONFIG_DIR
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "LOCALCODE_CONFIG_DIR", {
  get() {
    return process.env["LOCALCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for LOCALCODE_CLIENT
// This must be evaluated at access time, not module load time,
// because some commands override the client at runtime
Object.defineProperty(Flag, "LOCALCODE_CLIENT", {
  get() {
    return process.env["LOCALCODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
