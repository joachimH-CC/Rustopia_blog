import Link from 'next/link'
import { auth } from '@/lib/auth'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
            Blog
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            {session && (
              <Link href="/admin/posts" className="hover:text-gray-900">
                管理后台
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
    </div>
  )
}
