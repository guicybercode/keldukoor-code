> *"너희가 내 안에 거하고 내 말이 너희 안에 거하면 무엇이든지 원하는 대로 구하라 그리하면 이루리라"* — 요한복음 15:7

# localcode

通过 [Ollama](https://ollama.com) 运行本地大语言模型的 AI 编程助手。

## 前提条件

- [Bun](https://bun.sh) 1.3+
- [Ollama](https://ollama.com) 已安装并运行

## 安装

1. 安装依赖：

```bash
bun install
```

2. 拉取模型：

```bash
ollama pull qwen2.5-coder:7b
```

3. 运行：

```bash
cd packages/localcode
bun dev
```

## 配置

在项目根目录创建 `localcode.json`：

```json
{
  "$schema": "https://localcode.dev/config.json",
  "model": "ollama/qwen2.5-coder:7b",
  "ollama": {
    "baseURL": "http://localhost:11434"
  }
}
```

### 环境变量

- `OLLAMA_BASE_URL` - Ollama API 地址（默认：`http://localhost:11434`）
- `LOCALCODE_CONFIG` - 自定义配置文件路径

## 工作原理

localcode 自动发现本地 Ollama 实例中的模型，并提供基于终端的 AI 编程助手，支持：

- 完整的文件读取/写入/编辑功能
- Shell 命令执行
- LSP 集成
- MCP（模型上下文协议）支持
- Git 集成

## 项目结构

```
packages/
  localcode/     # 核心 CLI 和代理
  app/           # 共享 UI 组件
  ui/            # 设计系统
  desktop/       # 桌面应用（Tauri）
  console/       # Web 控制台
  sdk/           # TypeScript SDK
  plugin/        # 插件系统
```

---

made by guicybercode 謝謝你們 >,<
