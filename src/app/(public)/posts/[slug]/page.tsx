import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import MarkdownRenderer from '@/components/markdown-renderer'
import GiscusComments from '@/components/giscus-comments'
import TagBadge from '@/components/tag-badge'
import Image from 'next/image'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await db.query.posts.findFirst({ where: eq(posts.slug, slug) })
  if (!post) return {}
  return { title: post.title }
}

export const revalidate = 60

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
    with: { postTags: { with: { tag: true } } },
  })

  if (!post || post.status !== 'published') notFound()

  return (
    <article>
      {post.coverImageUrl && (
        <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
          <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
        {post.postTags.length > 0 && (
          <div className="flex gap-2">
            {post.postTags.map(({ tag }) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </div>

      <MarkdownRenderer content={post.content} />

      <div className="mt-16">
        <GiscusComments />
      </div>
    </article>
  )
}
