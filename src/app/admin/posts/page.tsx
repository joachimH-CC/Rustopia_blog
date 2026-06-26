'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface PostItem {
  id: string
  title: string
  slug: string
  status: string
  publishedAt: string | null
  updatedAt: string
  postTags: Array<{ tag: { id: string; name: string; slug: string } }>
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchPosts() {
    setLoading(true)
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  async function deletePost(id: string) {
    if (!confirm('确定要删除这篇文章吗？')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700"
        >
          + 新建文章
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">加载中…</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">暂无文章，点击右上角新建。</p>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {post.status === 'published' ? '已发布' : '草稿'}
                  </span>
                  <h2 className="text-sm font-medium text-gray-900 truncate">{post.title}</h2>
                </div>
                <p className="text-xs text-gray-400">
                  更新于 {formatDate(post.updatedAt)}
                  {post.postTags.length > 0 && (
                    <span className="ml-2">
                      {post.postTags.map((pt) => `#${pt.tag.name}`).join(' ')}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  编辑
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
