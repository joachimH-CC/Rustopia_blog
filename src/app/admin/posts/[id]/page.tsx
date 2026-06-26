'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PostForm from '@/components/post-form'

interface PostData {
  id: string
  title: string
  content: string
  coverImageUrl: string | null
  status: 'draft' | 'published'
  postTags: Array<{ tag: { id: string; name: string; slug: string } }>
}

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-gray-500">加载中…</p>
  if (!post) return <p className="text-red-500">文章不存在</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑文章</h1>
      <PostForm postId={id} initialData={post} />
    </div>
  )
}
