import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { tags } from '@/db/schema'
import { auth } from '@/lib/auth'
import { toSlug } from '@/lib/utils'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

const createTagSchema = z.object({
  name: z.string().min(1).max(100),
})

export async function GET() {
  const allTags = await db.select().from(tags).orderBy(tags.name)
  return NextResponse.json(allTags)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = createTagSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { name } = parsed.data
  const slug = toSlug(name)

  const existing = await db.query.tags.findFirst({ where: eq(tags.slug, slug) })
  if (existing) return NextResponse.json(existing)

  const [tag] = await db.insert(tags).values({ name, slug }).returning()
  return NextResponse.json(tag, { status: 201 })
}
