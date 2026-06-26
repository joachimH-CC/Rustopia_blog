# JOACHIM

个人博客系统 —— 撰写 Markdown，发布到暗黑锈蚀风格的前台，读者通过 Giscus 留言。

## 技术栈

- **框架**: Next.js 15 + React 19（App Router）
- **语言**: TypeScript
- **样式**: Tailwind CSS + 自定义锈蚀主题
- **数据库**: PostgreSQL（Neon Serverless）+ Drizzle ORM
- **认证**: NextAuth v5，GitHub OAuth，仅限单一管理员
- **内容**: Markdown 撰写（`@uiw/react-md-editor`） + 渲染（`react-markdown` + `rehype-highlight` + `remark-gfm`）
- **图片**: Vercel Blob 存储封面图
- **评论**: Giscus（基于 GitHub Discussions）
- **部署**: Vercel

## 功能

### 前台（读者）

- 首页按时间倒序列出已发布文章
- 按 Tag 过滤文章
- Markdown 文章详情页（语法高亮、GFM 表格/任务列表）
- Giscus 评论区

### 后台（管理员）

- GitHub OAuth 登录（校验 `GITHUB_ADMIN_USERNAME`）
- 创建 / 编辑 Post，随时保存为 Draft 或 Publish
- 封面图上传至 Vercel Blob
- Tag 管理

## 项目结构

```
src/
├── app/
│   ├── (public)/           # 前台路由
│   │   ├── page.tsx        # 首页（已发布文章列表）
│   │   ├── posts/          # 文章详情页
│   │   └── tags/           # 按标签筛选
│   ├── admin/              # 后台路由（受 auth 保护）
│   │   └── posts/          # 文章 CRUD
│   ├── api/
│   │   ├── auth/           # NextAuth 回调
│   │   ├── posts/          # 文章 API
│   │   ├── tags/           # 标签 API
│   │   └── upload/         # 封面图上传
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── post-card.tsx       # 文章卡片
│   ├── post-form.tsx       # 编辑表单
│   ├── markdown-renderer.tsx
│   ├── cover-image-upload.tsx
│   ├── tag-badge.tsx
│   ├── giscus-comments.tsx
│   ├── glow-orb.tsx
│   └── particles.tsx
├── db/
│   ├── index.ts            # Drizzle 客户端
│   └── schema.ts           # posts / tags / post_tags
├── lib/
│   ├── auth.ts             # NextAuth 配置
│   └── utils.ts
├── instrumentation.ts
└── middleware.ts
```

## 数据库模型

| 表 | 说明 |
|---|---|
| `posts` | id, title, slug, content, cover_image_url, status (draft / published), published_at, created_at, updated_at |
| `tags` | id, name, slug |
| `post_tags` | post_id + tag_id（多对多，级联删除） |

## 环境变量

```bash
# 数据库（Neon）
DATABASE_URL=postgres://...

# NextAuth
AUTH_SECRET=                  # npx auth secret 生成
AUTH_GITHUB_ID=               # GitHub OAuth App Client ID
AUTH_GITHUB_SECRET=           # GitHub OAuth App Client Secret
GITHUB_ADMIN_USERNAME=        # 允许登录的 GitHub 用户名

# Vercel Blob（封面图上传）
BLOB_READ_WRITE_TOKEN=

# Giscus（评论）
NEXT_PUBLIC_GISCUS_REPO=      # 格式: owner/repo
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

## 本地开发

```bash
npm install
npm run db:push          # 同步数据库 schema
npm run dev              # localhost:3000
```

## 部署

项目为 Vercel 优化，关联 GitHub 仓库后推送到 main 分支即可自动部署。需在 Vercel 面板中配置上述环境变量。

## 协议

MIT
