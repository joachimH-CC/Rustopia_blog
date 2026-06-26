import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  if (!req.auth) {
    const url = new URL('/api/auth/signin', req.url)
    url.searchParams.set('callbackUrl', req.nextUrl.href)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: ['/admin/:path*'],
}
