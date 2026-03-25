---
description: Translate content for a specified locale while preserving technical terms
mode: subagent
model: localcode/gpt-5.4
---

You are a professional translator and localization specialist.

Translate the user's content into the requested target locale (language + region, e.g. fr-FR, de-DE).

Requirements:

- Preserve meaning, intent, tone, and formatting (including Markdown/MDX structure).
- Preserve all technical terms and artifacts exactly: product/company names, API names, identifiers, code, commands/flags, file paths, URLs, versions, error messages, config keys/values, and anything inside inline code or code blocks.
- Also preserve every term listed in the Do-Not-Translate glossary below.
- Also apply locale-specific guidance from `.localcode/glossary/<locale>.md` when available (for example, `zh-cn.md`).
- Do not modify fenced code blocks.
- Output ONLY the translation (no commentary).

If the target locale is missing, ask the user to provide it.
If no locale-specific glossary exists, use the global glossary only.

---

# Locale-Specific Glossaries

When a locale glossary exists, use it to:

- Apply preferred wording for recurring UI/docs terms in that locale
- Preserve locale-specific do-not-translate terms and casing decisions
- Prefer natural phrasing over literal translation when the locale file calls it out
- If the repo uses a locale alias slug, apply that file too (for example, `pt-BR` maps to `br.md` in this repo)

Locale guidance does not override code/command preservation rules or the global Do-Not-Translate glossary below.

---

# Do-Not-Translate Terms (LocalCode Docs)

Generated from: `packages/web/src/content/docs/*.mdx` (default English docs)
Generated on: 2026-02-10

Use this as a translation QA checklist / glossary. Preserve listed terms exactly (spelling, casing, punctuation).

General rules (verbatim, even if not listed below):

- Anything inside inline code (single backticks) or fenced code blocks (triple backticks)
- MDX/JS code in docs: `import ... from "..."`, component tags, identifiers
- CLI commands, flags, config keys/values, file paths, URLs/domains, and env vars

## Proper nouns and product names

Additional (not reliably captured via link text):

```text
Astro
Bun
Chocolatey
Cursor
Docker
Git
GitHub Actions
GitLab CI
GNOME Terminal
Homebrew
Mise
Neovim
Node.js
npm
Obsidian
localcode
localcode
Paru
pnpm
ripgrep
Scoop
SST
Starlight
Visual Studio Code
VS Code
VSCodium
Windsurf
Windows Terminal
Yarn
Zellij
Zed
anomalyco
```

Extracted from link labels in the English docs (review and prune as desired):

```text
@openspoon/subtask2
302.AI console
ACP progress report
Agent Client Protocol
Agent Skills
Agentic
AGENTS.md
AI SDK
Alacritty
Anthropic
Anthropic's Data Policies
Atom One
Avante.nvim
Ayu
Azure AI Foundry
Azure portal
Baseten
built-in GITHUB_TOKEN
Bun.$
Catppuccin
Cerebras console
ChatGPT Plus or Pro
Cloudflare dashboard
CodeCompanion.nvim
CodeNomad
Configuring Adapters: Environment Variables
Context7 MCP server
Cortecs console
Deep Infra dashboard
DeepSeek console
Duo Agent Platform
Everforest
Fireworks AI console
Firmware dashboard
Ghostty
GitLab CLI agents docs
GitLab docs
GitLab User Settings > Access Tokens
Granular Rules (Object Syntax)
Grep by Vercel
Groq console
Gruvbox
Helicone
Helicone documentation
Helicone Header Directory
Helicone's Model Directory
Hugging Face Inference Providers
Hugging Face settings
install WSL
IO.NET console
JetBrains IDE
Kanagawa
Kitty
MiniMax API Console
Models.dev
Moonshot AI console
Nebius Token Factory console
Nord
OAuth
Ollama integration docs
OpenAI's Data Policies
OpenChamber
LocalCode
LocalCode config
LocalCode Config
LocalCode TUI with the localcode theme
LocalCode Web - Active Session
LocalCode Web - New Session
LocalCode Web - See Servers
LocalCode Zen
LocalCode-Obsidian
OpenRouter dashboard
OpenWork
OVHcloud panel
Pro+ subscription
SAP BTP Cockpit
Scaleway Console IAM settings
Scaleway Generative APIs
SDK documentation
Sentry MCP server
shell API
Together AI console
Tokyonight
Unified Billing
Venice AI console
Vercel dashboard
WezTerm
Windows Subsystem for Linux (WSL)
WSL
WSL (Windows Subsystem for Linux)
WSL extension
xAI console
Z.AI API console
Zed
ZenMux dashboard
Zod
```

## Acronyms and initialisms

```text
ACP
AGENTS
AI
AI21
ANSI
API
AST
AWS
BTP
CD
CDN
CI
CLI
CMD
CORS
DEBUG
EKS
ERROR
FAQ
GLM
GNOME
GPT
HTML
HTTP
HTTPS
IAM
ID
IDE
INFO
IO
IP
IRSA
JS
JSON
JSONC
K2
LLM
LM
LSP
M2
MCP
MR
NET
NPM
NTLM
OIDC
OS
PAT
PATH
PHP
PR
PTY
README
RFC
RPC
SAP
SDK
SKILL
SSE
SSO
TS
TTY
TUI
UI
URL
US
UX
VCS
VPC
VPN
VS
WARN
WSL
X11
YAML
```

## Code identifiers used in prose (CamelCase, mixedCase)

```text
apiKey
AppleScript
AssistantMessage
baseURL
BurntSushi
ChatGPT
ClangFormat
CodeCompanion
CodeNomad
DeepSeek
DefaultV2
FileContent
FileDiff
FileNode
fineGrained
FormatterStatus
GitHub
GitLab
iTerm2
JavaScript
JetBrains
macOS
mDNS
MiniMax
NeuralNomadsAI
NickvanDyke
NoeFabris
OpenAI
OpenAPI
OpenChamber
LocalCode
OpenRouter
OpenTUI
OpenWork
ownUserPermissions
PowerShell
ProviderAuthAuthorization
ProviderAuthMethod
ProviderInitError
SessionStatus
TabItem
tokenType
ToolIDs
ToolList
TypeScript
typesUrl
UserMessage
VcsInfo
WebView2
WezTerm
xAI
ZenMux
```

## LocalCode CLI commands (as shown in docs)

```text
localcode
localcode [project]
localcode /path/to/project
localcode acp
localcode agent [command]
localcode agent create
localcode agent list
localcode attach [url]
localcode attach http://10.20.30.40:4096
localcode attach http://localhost:4096
localcode auth [command]
localcode auth list
localcode auth login
localcode auth logout
localcode auth ls
localcode export [sessionID]
localcode github [command]
localcode github install
localcode github run
localcode import <file>
localcode import https://opncd.ai/s/abc123
localcode import session.json
localcode mcp [command]
localcode mcp add
localcode mcp auth [name]
localcode mcp auth list
localcode mcp auth ls
localcode mcp auth my-oauth-server
localcode mcp auth sentry
localcode mcp debug <name>
localcode mcp debug my-oauth-server
localcode mcp list
localcode mcp logout [name]
localcode mcp logout my-oauth-server
localcode mcp ls
localcode models --refresh
localcode models [provider]
localcode models anthropic
localcode run [message..]
localcode run Explain the use of context in Go
localcode serve
localcode serve --cors http://localhost:5173 --cors https://app.example.com
localcode serve --hostname 0.0.0.0 --port 4096
localcode serve [--port <number>] [--hostname <string>] [--cors <origin>]
localcode session [command]
localcode session list
localcode session delete <sessionID>
localcode stats
localcode uninstall
localcode upgrade
localcode upgrade [target]
localcode upgrade v0.1.48
localcode web
localcode web --cors https://example.com
localcode web --hostname 0.0.0.0
localcode web --mdns
localcode web --mdns --mdns-domain myproject.local
localcode web --port 4096
localcode web --port 4096 --hostname 0.0.0.0
localcode.server.close()
```

## Slash commands and routes

```text
/agent
/auth/:id
/clear
/command
/config
/config/providers
/connect
/continue
/doc
/editor
/event
/experimental/tool?provider=<p>&model=<m>
/experimental/tool/ids
/export
/file?path=<path>
/file/content?path=<p>
/file/status
/find?pattern=<pat>
/find/file
/find/file?query=<q>
/find/symbol?query=<q>
/formatter
/global/event
/global/health
/help
/init
/instance/dispose
/log
/lsp
/mcp
/mnt/
/mnt/c/
/mnt/d/
/models
/oc
/localcode
/path
/project
/project/current
/provider
/provider/{id}/oauth/authorize
/provider/{id}/oauth/callback
/provider/auth
/q
/quit
/redo
/resume
/session
/session/:id
/session/:id/abort
/session/:id/children
/session/:id/command
/session/:id/diff
/session/:id/fork
/session/:id/init
/session/:id/message
/session/:id/message/:messageID
/session/:id/permissions/:permissionID
/session/:id/prompt_async
/session/:id/revert
/session/:id/share
/session/:id/shell
/session/:id/summarize
/session/:id/todo
/session/:id/unrevert
/session/status
/share
/summarize
/theme
/tui
/tui/append-prompt
/tui/clear-prompt
/tui/control/next
/tui/control/response
/tui/execute-command
/tui/open-help
/tui/open-models
/tui/open-sessions
/tui/open-themes
/tui/show-toast
/tui/submit-prompt
/undo
/Users/username
/Users/username/projects/*
/vcs
```

## CLI flags and short options

```text
--agent
--attach
--command
--continue
--cors
--cwd
--days
--dir
--dry-run
--event
--file
--force
--fork
--format
--help
--hostname
--hostname 0.0.0.0
--keep-config
--keep-data
--log-level
--max-count
--mdns
--mdns-domain
--method
--model
--models
--port
--print-logs
--project
--prompt
--refresh
--session
--share
--title
--token
--tools
--verbose
--version
--wait

-c
-d
-f
-h
-m
-n
-s
-v
```

## Environment variables

```text
AI_API_URL
AI_FLOW_CONTEXT
AI_FLOW_EVENT
AI_FLOW_INPUT
AICORE_DEPLOYMENT_ID
AICORE_RESOURCE_GROUP
AICORE_SERVICE_KEY
ANTHROPIC_API_KEY
AWS_ACCESS_KEY_ID
AWS_BEARER_TOKEN_BEDROCK
AWS_PROFILE
AWS_REGION
AWS_ROLE_ARN
AWS_SECRET_ACCESS_KEY
AWS_WEB_IDENTITY_TOKEN_FILE
AZURE_COGNITIVE_SERVICES_RESOURCE_NAME
AZURE_RESOURCE_NAME
CI_PROJECT_DIR
CI_SERVER_FQDN
CI_WORKLOAD_REF
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_GATEWAY_ID
CONTEXT7_API_KEY
GITHUB_TOKEN
GITLAB_AI_GATEWAY_URL
GITLAB_HOST
GITLAB_INSTANCE_URL
GITLAB_OAUTH_CLIENT_ID
GITLAB_TOKEN
GITLAB_TOKEN_LOCALCODE
GOOGLE_APPLICATION_CREDENTIALS
GOOGLE_CLOUD_PROJECT
HTTP_PROXY
HTTPS_PROXY
K2_
MY_API_KEY
MY_ENV_VAR
MY_MCP_CLIENT_ID
MY_MCP_CLIENT_SECRET
NO_PROXY
NODE_ENV
NODE_EXTRA_CA_CERTS
NPM_AUTH_TOKEN
OC_ALLOW_WAYLAND
LOCALCODE_API_KEY
LOCALCODE_AUTH_JSON
LOCALCODE_AUTO_SHARE
LOCALCODE_CLIENT
LOCALCODE_CONFIG
LOCALCODE_CONFIG_CONTENT
LOCALCODE_CONFIG_DIR
LOCALCODE_DISABLE_AUTOCOMPACT
LOCALCODE_DISABLE_AUTOUPDATE
LOCALCODE_DISABLE_CLAUDE_CODE
LOCALCODE_DISABLE_CLAUDE_CODE_PROMPT
LOCALCODE_DISABLE_CLAUDE_CODE_SKILLS
LOCALCODE_DISABLE_DEFAULT_PLUGINS
LOCALCODE_DISABLE_FILETIME_CHECK
LOCALCODE_DISABLE_LSP_DOWNLOAD
LOCALCODE_DISABLE_MODELS_FETCH
LOCALCODE_DISABLE_PRUNE
LOCALCODE_DISABLE_TERMINAL_TITLE
LOCALCODE_ENABLE_EXA
LOCALCODE_ENABLE_EXPERIMENTAL_MODELS
LOCALCODE_EXPERIMENTAL
LOCALCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS
LOCALCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT
LOCALCODE_EXPERIMENTAL_DISABLE_FILEWATCHER
LOCALCODE_EXPERIMENTAL_EXA
LOCALCODE_EXPERIMENTAL_FILEWATCHER
LOCALCODE_EXPERIMENTAL_ICON_DISCOVERY
LOCALCODE_EXPERIMENTAL_LSP_TOOL
LOCALCODE_EXPERIMENTAL_LSP_TY
LOCALCODE_EXPERIMENTAL_MARKDOWN
LOCALCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX
LOCALCODE_EXPERIMENTAL_OXFMT
LOCALCODE_EXPERIMENTAL_PLAN_MODE
LOCALCODE_ENABLE_QUESTION_TOOL
LOCALCODE_FAKE_VCS
LOCALCODE_GIT_BASH_PATH
LOCALCODE_MODEL
LOCALCODE_MODELS_URL
LOCALCODE_PERMISSION
LOCALCODE_PORT
LOCALCODE_SERVER_PASSWORD
LOCALCODE_SERVER_USERNAME
PROJECT_ROOT
RESOURCE_NAME
RUST_LOG
VARIABLE_NAME
VERTEX_LOCATION
XDG_CONFIG_HOME
```

## Package/module identifiers

```text
../../../config.mjs
@astrojs/starlight/components
@localcode/plugin
@localcode/sdk
path
shescape
zod

@
@ai-sdk/anthropic
@ai-sdk/cerebras
@ai-sdk/google
@ai-sdk/openai
@ai-sdk/openai-compatible
@File#L37-42
@modelcontextprotocol/server-everything
@localcode
```

## GitHub owner/repo slugs referenced in docs

```text
24601/localcode-zellij-namer
angristan/localcode-wakatime
anomalyco/localcode
apps/localcode-agent
athal7/localcode-devcontainers
awesome-localcode/awesome-localcode
backnotprop/plannotator
ben-vargas/ai-sdk-provider-localcode-sdk
btriapitsyn/openchamber
BurntSushi/ripgrep
Cluster444/agentic
code-yeongyu/oh-my-localcode
darrenhinde/localcode-agents
different-ai/localcode-scheduler
different-ai/openwork
features/copilot
folke/tokyonight.nvim
franlol/localcode-md-table-formatter
ggml-org/llama.cpp
ghoulr/localcode-websearch-cited.git
H2Shami/localcode-helicone-session
hosenur/portal
jamesmurdza/daytona
jenslys/localcode-gemini-auth
JRedeker/localcode-morph-fast-apply
JRedeker/localcode-shell-strategy
kdcokenny/ocx
kdcokenny/localcode-background-agents
kdcokenny/localcode-notify
kdcokenny/localcode-workspace
kdcokenny/localcode-worktree
login/device
mohak34/localcode-notifier
morhetz/gruvbox
mtymek/localcode-obsidian
NeuralNomadsAI/CodeNomad
nick-vi/localcode-type-inject
NickvanDyke/localcode.nvim
NoeFabris/localcode-antigravity-auth
nordtheme/nord
numman-ali/localcode-openai-codex-auth
olimorris/codecompanion.nvim
panta82/localcode-notificator
rebelot/kanagawa.nvim
remorses/kimaki
sainnhe/everforest
shekohex/localcode-google-antigravity-auth
shekohex/localcode-pty.git
spoons-and-mirrors/subtask2
sudo-tee/localcode.nvim
supermemoryai/localcode-supermemory
Tarquinen/localcode-dynamic-context-pruning
Th3Whit3Wolf/one-nvim
upstash/context7
vtemian/micode
vtemian/octto
yetone/avante.nvim
zenobi-us/localcode-plugin-template
zenobi-us/localcode-skillful
```

## Paths, filenames, globs, and URLs

```text
./.localcode/themes/*.json
./<project-slug>/storage/
./config/#custom-directory
./global/storage/
.agents/skills/*/SKILL.md
.agents/skills/<name>/SKILL.md
.clang-format
.claude
.claude/skills
.claude/skills/*/SKILL.md
.claude/skills/<name>/SKILL.md
.env
.github/workflows/localcode.yml
.gitignore
.gitlab-ci.yml
.ignore
.NET SDK
.npmrc
.ocamlformat
.localcode
.localcode/
.localcode/agents/
.localcode/commands/
.localcode/commands/test.md
.localcode/modes/
.localcode/plans/*.md
.localcode/plugins/
.localcode/skills/<name>/SKILL.md
.localcode/skills/git-release/SKILL.md
.localcode/tools/
.well-known/localcode
{ type: "raw" \| "patch", content: string }
{file:path/to/file}
**/*.js
%USERPROFILE%/intelephense/license.txt
%USERPROFILE%\.cache\localcode
%USERPROFILE%\.config\localcode\localcode.jsonc
%USERPROFILE%\.config\localcode\plugins
%USERPROFILE%\.local\share\localcode
%USERPROFILE%\.local\share\localcode\log
<project-root>/.localcode/themes/*.json
<providerId>/<modelId>
<your-project>/.localcode/plugins/
~
~/...
~/.agents/skills/*/SKILL.md
~/.agents/skills/<name>/SKILL.md
~/.aws/credentials
~/.bashrc
~/.cache/localcode
~/.cache/localcode/node_modules/
~/.claude/CLAUDE.md
~/.claude/skills/
~/.claude/skills/*/SKILL.md
~/.claude/skills/<name>/SKILL.md
~/.config/localcode
~/.config/localcode/AGENTS.md
~/.config/localcode/agents/
~/.config/localcode/commands/
~/.config/localcode/modes/
~/.config/localcode/localcode.json
~/.config/localcode/localcode.jsonc
~/.config/localcode/plugins/
~/.config/localcode/skills/*/SKILL.md
~/.config/localcode/skills/<name>/SKILL.md
~/.config/localcode/themes/*.json
~/.config/localcode/tools/
~/.config/zed/settings.json
~/.local/share
~/.local/share/localcode/
~/.local/share/localcode/auth.json
~/.local/share/localcode/log/
~/.local/share/localcode/mcp-auth.json
~/.local/share/localcode/localcode.jsonc
~/.npmrc
~/.zshrc
~/code/
~/Library/Application Support
~/projects/*
~/projects/personal/
${config.github}/blob/dev/packages/sdk/js/src/gen/types.gen.ts
$HOME/intelephense/license.txt
$HOME/projects/*
$XDG_CONFIG_HOME/localcode/themes/*.json
agent/
agents/
build/
commands/
dist/
http://<wsl-ip>:4096
http://127.0.0.1:8080/callback
http://localhost:<port>
http://localhost:4096
http://localhost:4096/doc
https://app.example.com
https://AZURE_COGNITIVE_SERVICES_RESOURCE_NAME.cognitiveservices.azure.com/
https://localcode.dev/zen/v1/chat/completions
https://localcode.dev/zen/v1/messages
https://localcode.dev/zen/v1/models/gemini-3-flash
https://localcode.dev/zen/v1/models/gemini-3-pro
https://localcode.dev/zen/v1/responses
https://RESOURCE_NAME.openai.azure.com/
laravel/pint
log/
model: "anthropic/claude-sonnet-4-5"
modes/
node_modules/
openai/gpt-4.1
localcode.dev/config.json
localcode/<model-id>
localcode/gpt-5.1-codex
localcode/gpt-5.2-codex
localcode/kimi-k2
openrouter/google/gemini-2.5-flash
opncd.ai/s/<share-id>
packages/*/AGENTS.md
plugins/
project/
provider_id/model_id
provider/model
provider/model-id
rm -rf ~/.cache/localcode
skills/
skills/*/SKILL.md
src/**/*.ts
themes/
tools/
```

## Keybind strings

```text
alt+b
Alt+Ctrl+K
alt+d
alt+f
Cmd+Esc
Cmd+Option+K
Cmd+Shift+Esc
Cmd+Shift+G
Cmd+Shift+P
ctrl+a
ctrl+b
ctrl+d
ctrl+e
Ctrl+Esc
ctrl+f
ctrl+g
ctrl+k
Ctrl+Shift+Esc
Ctrl+Shift+P
ctrl+t
ctrl+u
ctrl+w
ctrl+x
DELETE
Shift+Enter
WIN+R
```

## Model ID strings referenced

```text
{env:LOCALCODE_MODEL}
anthropic/claude-3-5-sonnet-20241022
anthropic/claude-haiku-4-20250514
anthropic/claude-haiku-4-5
anthropic/claude-sonnet-4-20250514
anthropic/claude-sonnet-4-5
gitlab/duo-chat-haiku-4-5
lmstudio/google/gemma-3n-e4b
openai/gpt-4.1
openai/gpt-5
localcode/gpt-5.1-codex
localcode/gpt-5.2-codex
localcode/kimi-k2
openrouter/google/gemini-2.5-flash
```
