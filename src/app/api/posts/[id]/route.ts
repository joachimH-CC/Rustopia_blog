import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts, postTags } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { toSlug } from '@/lib/utils'
import { z } from 'zod'

const updatePostSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().optional(),
  coverImageUrl: z.string().url().nullable().optional(),
  status: z.enum(['draft', 'published']).optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: { postTags: { with: { tag: true } } },
  })

  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const parsed = updatePostSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { tagIds, title, status, ...rest } = parsed.data

  const existing = await db.query.posts.findFirst({ where: eq(posts.id, id) })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const updates: Record<string, unknown> = { ...rest, updatedAt: new Date() }
  if (title) {
    updates.title = title
    updates.slug = toSlug(title)
  }
  if (status) {
    updates.status = status
    if (status === 'published' && !existing.publishedAt) {
      updates.publishedAt = new Date()
    }
  }

  const [updated] = await db
    .update(posts)
    .set(updates)
    .where(eq(posts.id, id))
    .returning()

  if (tagIds !== undefined) {
    await db.delete(postTags).where(eq(postTags.postId, id))
    if (tagIds.length > 0) {
      await db.insert(postTags).values(tagIds.map((tagId) => ({ postId: id, tagId })))
    }
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await db.delete(posts).where(eq(posts.id, id))
  return new NextResponse(null, { status: 204 })
}
