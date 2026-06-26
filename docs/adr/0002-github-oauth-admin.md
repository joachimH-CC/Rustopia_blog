# GitHub OAuth 用于管理员认证

管理后台（Admin）的登录采用 GitHub OAuth，而非用户名/密码。

## 原因

博主本人就是开发者，GitHub 账号是现成的身份凭证。自建密码系统需要处理哈希存储、忘记密码、暴力破解防护等问题，对单人博客是不必要的负担。GitHub OAuth 将这些责任转移给 GitHub，只需在后端验证回调并签发自己的 session JWT 即可。通过在 OAuth App 配置中只允许博主自己的 GitHub 账号通过，访问控制简单且安全。

## Considered Options

- **GitHub OAuth（选用）**: 零密码管理，依赖 GitHub 身份体系
- **用户名 + 密码 + JWT**: 完全自控，但需要自行处理密码安全
- **第三方托管认证（Clerk/Auth0）**: 功能过剩，对单用户场景引入不必要的外部依赖
