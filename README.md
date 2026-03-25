# localcode

AI coding agent that runs local LLM models via [Ollama](https://ollama.com).

## Prerequisites

- [Bun](https://bun.sh) 1.3+
- [Ollama](https://ollama.com) installed and running

## Setup

1. Install dependencies:

```bash
bun install
```

2. Pull a model:

```bash
ollama pull qwen2.5-coder:7b
```

3. Run:

```bash
cd packages/localcode
bun dev
```

## Configuration

Create a `localcode.json` in your project root:

```json
{
  "$schema": "https://localcode.dev/config.json",
  "model": "ollama/qwen2.5-coder:7b",
  "ollama": {
    "baseURL": "http://localhost:11434"
  }
}
```

### Environment Variables

- `OLLAMA_BASE_URL` - Ollama API URL (default: `http://localhost:11434`)
- `LOCALCODE_CONFIG` - Path to custom config file

## How It Works

localcode auto-discovers models from your local Ollama instance and provides a terminal-based AI coding agent with:

- Full file read/write/edit capabilities
- Shell command execution
- LSP integration
- MCP (Model Context Protocol) support
- Git integration

## Project Structure

```
packages/
  localcode/     # Core CLI & agent
  app/           # Shared UI components
  ui/            # Design system
  desktop/       # Desktop app (Tauri)
  console/       # Web dashboard
  sdk/           # TypeScript SDK
  plugin/        # Plugin system
```

## License

MIT

made by guicybercode 謝謝你們 >,<
