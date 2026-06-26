import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import PostCard from '@/components/post-card'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '文章列表' }
export const revalidate = 60

export default async function HomePage() {
  const publishedPosts = await db.query.posts.findMany({
    where: eq(posts.status, 'published'),
    orderBy: [desc(posts.publishedAt)],
    with: { postTags: { with: { tag: true } } },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">文章</h1>
      {publishedPosts.length === 0 ? (
        <p className="text-gray-500">暂无文章。</p>
      ) : (
        <div className="space-y-8">
          {publishedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
