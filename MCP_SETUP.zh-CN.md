> 🌐 **Language / 语言 / 語言:** [English](MCP_SETUP.md) · 简体中文 · [繁體中文](MCP_SETUP.zh-TW.md)

# 安装指南 — 把 Longbridge 接到你的 AI 助手

这是简化的食谱版。**官方权威指南**在 <https://open.longbridge.com/skill/install.md> — 如有不一致以官方为准。

安装是**两步流程**：

1. **连接** AI 工具到 Longbridge 平台 — CLI（推荐）或 MCP 二选一
2. **安装 Skill** — 一组指令文件，告诉 AI Longbridge 能做什么

少做哪一步，AI 都没法操盘。

---

## 第一步 — 连接到 Longbridge 平台

下面两种方法选**一种**。

| 路径                  | 适合谁                                                                | 需要本地安装？ |
| --------------------- | --------------------------------------------------------------------- | -------------- |
| **A. CLI**（推荐） | Claude Code、Codex（Work locally）、opencode、OpenClaw、Warp、Gemini CLI | 是             |
| **B. MCP**            | Claude Desktop、Cursor、Zed、Gemini CLI、Warp                         | 否             |

### 方法 A — CLI（推荐）

安装 `longbridge` 终端程序，AI 通过 shell 命令调用它。

**macOS — Homebrew：**

```bash
brew install --cask longbridge/tap/longbridge-terminal
```

**macOS / Linux — curl：**

```bash
curl -sSL https://open.longbridge.com/longbridge/longbridge-terminal/install | sh
```

**Windows — Scoop：**

```powershell
scoop install https://open.longbridge.com/longbridge/longbridge-terminal/longbridge.json
```

**Windows — PowerShell：**

```powershell
iwr https://open.longbridge.com/longbridge/longbridge-terminal/install.ps1 | iex
```

**授权登录：**

```bash
longbridge auth login
```

浏览器会自动打开 OAuth 登录页。模拟交易账户走同一流程。

**Claude Code 用户 — 一次性允许 `longbridge` 命令**，避免每次问权限。在项目根目录的 `.claude/settings.json` 加：

```json
{
  "permissions": {
    "allow": ["Bash(longbridge *)"]
  }
}
```

### 方法 B — MCP

在 AI 工具的配置里加上 Longbridge 远程 MCP 服务器：

```json
{
  "mcpServers": {
    "longbridge": {
      "url": "https://openapi.longbridge.com/mcp"
    }
  }
}
```

> **中国大陆用户**可使用加速端点：`https://openapi.longbridge.cn/mcp`

| 客户端         | 在哪里配置                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Desktop | 编辑 `~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）或 `%APPDATA%\Claude\claude_desktop_config.json`（Windows） |
| Cursor         | Settings → MCP Servers → Add Remote MCP Server                                                                                            |
| Zed            | `~/.config/zed/settings.json` 中的 `context_servers` 键                                                                                   |
| Gemini CLI     | `~/.gemini/settings.json` 中的 `mcpServers` 键                                                                                            |
| Warp           | Settings → AI → MCP Servers → Add                                                                                                         |

第一次提到 Longbridge 时，客户端会自动打开浏览器 OAuth 授权 — 不需要在配置文件里放 API key。

---

## 第二步 — 安装 Skill

Skill 是一组指令文件，告诉 AI 助手 Longbridge 能做什么、怎么调用。**没装 Skill 的话，AI 可能完成第一步后仍然不知道用 Longbridge。**

**Claude Code 插件（Claude Code 用户推荐）：**

在 Claude Code 会话里执行：

```
/plugin marketplace add longbridge/skills
/plugin install longbridge@longbridge-skills
```

通过 Claude Code 插件系统自动更新。

**npx / bunx（任何工具）：**

```bash
# Node
npx skills add longbridge/skills -g
# Bun
bunx skills add longbridge/skills -g
```

需要 [Node.js](https://nodejs.org) 或 [Bun](https://bun.sh)。

**ZIP 下载（手动）：**

下载 <https://open.longbridge.com/skill/longbridge-all.zip>，解压，放到 AI 工具的 Skill 目录：

- Claude Code：`.claude/skills/`
- Cursor：粘贴到 Rules 编辑器
- 其他：见 ZIP 内的 README

**OpenClaw** — 直接在聊天里发，自动安装：

```
Install the Longbridge Developers Skill from this zip file:
https://open.longbridge.com/skill/longbridge-all.zip
```

---

## 验证

在 AI 助手里输入：

```
Use Longbridge to get the current quote for AAPL
```

如果返回了实时报价，就装好了。如果 Skill 没自动触发，前面加 `/longbridge`：

```
/longbridge get the current quote for AAPL
```

---

## 已知限制

### Claude Desktop — 切到 **Code** 标签

Claude Desktop 的 Chat 和 Cowork 模式因网络白名单**会阻塞 CLI 安装和 MCP 连接**。切到 **Code** 标签（内嵌的 Claude Code）— 完整终端权限，一个会话搞定全部。

### Codex — 选 **Work locally**

Codex Cloud 模式有同样的限制。新建会话时选 **Work locally**，AI 才能完整访问你的 shell 和网络。

### Claude.ai 和 ChatGPT.com（网页版）

纯浏览器界面无法运行 shell 命令、也无法连接 MCP 服务器。请用 [Claude Desktop](https://claude.ai/download) 切到 Code 标签，或用上面任何本地客户端。

---

## 故障排查

**AI 说找不到 Longbridge 工具。** 重启客户端或开新会话 — Skill 加载需要刷新一次。

**每次都问授权。** 在终端跑 `longbridge auth login` 完成 OAuth。

**交易操作没反应。** 确认你的账户开通了 OpenAPI 交易权限，且在目标市场（港 / 美）有交易资格。

**MCP 路径报 `401 Unauthorized`。** 在 MCP 客户端的 Authenticate 菜单重做一次 OAuth。

**撤销授权。** Longbridge 账户 → 安全设置 → 管理已授权应用。

---

## 凭据安全

- **配置文件里不要放 token。** OAuth 凭据由 AI 工具客户端管理，不会进入你提交的配置文件。
- **模拟 ≠ 实盘。** 模拟交易账户是沙盒账户，不能下实单。本食谱里的所有 recipe 默认走模拟。
- **Python SDK 备用路径**（`recipes/NN/main.py` 的 headless 脚本）仍使用开发者平台的 `LONGBRIDGE_APP_KEY` / `LONGBRIDGE_APP_SECRET` / `LONGBRIDGE_ACCESS_TOKEN` — 与 Skill / MCP OAuth 是两条独立的凭据路径。

---

## 许可证 & 免责

MIT — 详见 [LICENSE](LICENSE)。这是配置文档，不构成投资建议。
