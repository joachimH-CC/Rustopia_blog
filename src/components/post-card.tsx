import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import TagBadge from './tag-badge'

interface Tag {
  id: string
  name: string
  slug: string
}

interface PostCardProps {
  post: {
    id: string
    title: string
    slug: string
    coverImageUrl: string | null
    publishedAt: Date | string | null
    postTags: Array<{ tag: Tag }>
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`}>
        {post.coverImageUrl && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-gray-600 mb-2">
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-3 text-sm text-gray-500">
        {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
        {post.postTags.length > 0 && (
          <div className="flex gap-2">
            {post.postTags.map(({ tag }) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
