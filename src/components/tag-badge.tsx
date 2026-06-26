import Link from 'next/link'

interface Tag {
  id: string
  name: string
  slug: string
}

export default function TagBadge({ tag }: { tag: Tag }) {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
    >
      #{tag.name}
    </Link>
  )
}
