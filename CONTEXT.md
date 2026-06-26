# Blog

个人博客系统，支持单一作者在后台撰写和发布 Markdown 文章，读者在前台浏览和评论。

## Language

**Post（文章）**:
博主撰写的一篇内容，由标题、Markdown 正文和封面图组成，始终处于 Draft 或 Published 两种状态之一。
_Avoid_: article、entry、content

**Draft（草稿）**:
尚未对读者公开的 Post。Draft 只在管理后台可见。
_Avoid_: unpublished、hidden、private

**Published（已发布）**:
对所有读者公开的 Post 状态。Post 从 Draft 变为 Published 是不可逆的日常操作（可以重新拉回草稿，但语义上"发布"意味着公开）。
_Avoid_: live、active、visible

**Tag（标签）**:
用于归类 Post 的关键词。一篇 Post 可以有多个 Tag，一个 Tag 可以属于多篇 Post（多对多）。
_Avoid_: category（分类）、label、topic

**Cover Image（封面图）**:
每篇 Post 的代表性图片，展示在文章详情顶部和列表预览卡片中。存储于 Vercel Blob。
_Avoid_: thumbnail（缩略图）、hero image、featured image

**Admin（管理员）**:
唯一一个可以登录管理后台、创建/编辑/发布 Post 的人，即博主本人。通过 GitHub OAuth 身份验证。
_Avoid_: author（作者）、user（用户）、owner

**Comment（评论）**:
读者对某篇 Post 的回复，由第三方服务 Giscus（基于 GitHub Discussions）托管，博客系统本身不存储评论数据。
_Avoid_: reply、feedback、discussion

## Example Dialogue

> **Dev**: 我要在首页展示所有"文章"。
> **博主**: 你说的"文章"是指所有的，还是只有已经发布的？
> **Dev**: 读者看到的首页，所以只显示 Published 的 Post。Draft 只在管理后台显示。
> **博主**: 对。另外首页可以按 Tag 筛选吗？
> **Dev**: 可以，点击某个 Tag 会过滤出该 Tag 下所有 Published 的 Post，时间倒序排列。
> **博主**: 封面图如果我没上传，显示什么？
> **Dev**: Cover Image 是可选的，没有就不显示，不用占位图。
