import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts, postTags } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { toSlug } from '@/lib/utils'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().default(''),
  coverImageUrl: z.string().url().nullable().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  tagIds: z.array(z.string().uuid()).default([]),
})

export async function GET(req: NextRequest) {
  const session = await auth()
  const { searchParams } = req.nextUrl
  const statusFilter = searchParams.get('status')

  const isAdmin = !!session

  const allPosts = await db.query.posts.findMany({
    where: isAdmin && statusFilter
      ? eq(posts.status, statusFilter as 'draft' | 'published')
      : eq(posts.status, 'published'),
    orderBy: [desc(posts.updatedAt)],
    with: {
      postTags: { with: { tag: true } },
    },
  })

  return NextResponse.json(allPosts)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = createPostSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { title, content, coverImageUrl, status, tagIds } = parsed.data

  const [post] = await db
    .insert(posts)
    .values({
      title,
      slug: toSlug(title),
      content,
      coverImageUrl: coverImageUrl ?? null,
      status,
      publishedAt: status === 'published' ? new Date() : null,
    })
    .returning()

  if (tagIds.length > 0) {
    await db.insert(postTags).values(
      tagIds.map((tagId) => ({ postId: post.id, tagId }))
    )
  }

  return NextResponse.json(post, { status: 201 })
}
