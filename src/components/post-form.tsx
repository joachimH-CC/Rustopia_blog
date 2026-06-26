'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import CoverImageUpload from './cover-image-upload'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface Tag {
  id: string
  name: string
  slug: string
}

interface PostFormProps {
  postId?: string
  initialData?: {
    title: string
    content: string
    coverImageUrl: string | null
    status: 'draft' | 'published'
    postTags: Array<{ tag: Tag }>
  }
}

export default function PostForm({ postId, initialData }: PostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [content, setContent] = useState(initialData?.content ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(initialData?.coverImageUrl ?? null)
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status ?? 'draft')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    initialData?.postTags.map((pt) => pt.tag.id) ?? []
  )
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [newTagName, setNewTagName] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/tags')
      .then((r) => r.json())
      .then(setAllTags)
  }, [])

  function toggleTag(tagId: string) {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  async function createTag() {
    if (!newTagName.trim()) return
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTagName.trim() }),
    })
    const tag = await res.json()
    setAllTags((prev) => [...prev.filter((t) => t.id !== tag.id), tag])
    setSelectedTagIds((prev) => [...prev, tag.id])
    setNewTagName('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('标题不能为空')
      return
    }

    setSaving(true)
    setError('')

    const body = { title, content, coverImageUrl, status, tagIds: selectedTagIds }
    const res = await fetch(postId ? `/api/posts/${postId}` : '/api/posts', {
      method: postId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      setError('保存失败，请重试')
      setSaving(false)
      return
    }

    router.push('/admin/posts')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="文章标题"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg font-medium"
        />
      </div>

      <CoverImageUpload value={coverImageUrl} onChange={setCoverImageUrl} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">正文（Markdown）</label>
        <div data-color-mode="light">
          <MDEditor
            value={content}
            onChange={(v) => setContent(v ?? '')}
            height={480}
            preview="live"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {allTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                selectedTagIds.includes(tag.id)
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
              }`}
            >
              #{tag.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                createTag()
              }
            }}
            placeholder="输入新标签名按回车"
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="button"
            onClick={createTag}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            添加
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="draft">草稿</option>
          <option value="published">已发布</option>
        </select>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {saving ? '保存中…' : '保存'}
          </button>
        </div>
      </div>
    </form>
  )
}
