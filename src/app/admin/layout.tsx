import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/api/auth/signin')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
              ← 返回博客
            </Link>
            <Link href="/admin/posts" className="text-sm font-medium hover:text-gray-700">
              文章管理
            </Link>
          </div>
          <a
            href="/api/auth/signout"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            退出
          </a>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
