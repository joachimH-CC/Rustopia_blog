import PostForm from '@/components/post-form'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '新建文章' }

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新建文章</h1>
      <PostForm />
    </div>
  )
}
