# Next.js 全栈而非独立 API 服务

项目初始计划是 React 前端 + 独立 Hono/Node.js 后端（部署在 Railway），但最终选择了 Next.js 全栈方案，前后端合并在单一仓库，统一部署到 Vercel。

## 原因

个人博客的后端逻辑是简单 CRUD，不存在独立服务才能解决的技术问题。独立后端会带来两个服务的部署、环境变量同步、跨域配置和类型共享的额外负担，而 Next.js Route Handlers 能覆盖所有需求。合并后：单仓库、单平台、前后端类型天然共享、冷启动由 Vercel 边缘网络优化。

## Considered Options

- **Next.js 全栈（选用）**: 单仓库，Route Handlers 作为 API，部署到 Vercel
- **独立 Hono 后端**: 灵活，但需要维护两个服务，对这个规模过度

## Consequences

如果将来有非 HTTP 的后端需求（如 WebSocket、长时任务），需要单独引入服务。当前阶段不考虑。
