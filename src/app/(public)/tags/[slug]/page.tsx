import { db } from '@/db'
import { posts, tags } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import PostCard from '@/components/post-card'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tag = await db.query.tags.findFirst({ where: eq(tags.slug, slug) })
  return { title: tag ? `#${tag.name}` : '标签' }
}

export const revalidate = 60

export default async function TagPage({ params }: Props) {
  const { slug } = await params
  const tag = await db.query.tags.findFirst({ where: eq(tags.slug, slug) })
  if (!tag) notFound()

  const taggedPosts = await db.query.posts.findMany({
    where: eq(posts.status, 'published'),
    with: { postTags: { with: { tag: true } } },
  })

  const filtered = taggedPosts.filter((p) =>
    p.postTags.some((pt) => pt.tag.slug === slug)
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">#{tag.name}</h1>
      {filtered.length === 0 ? (
        <p className="text-gray-500">该标签下暂无文章。</p>
      ) : (
        <div className="space-y-8">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
