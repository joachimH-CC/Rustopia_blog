import { db } from "@/db";
import { posts, tags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PostCard from "@/components/post-card";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await db.query.tags.findFirst({ where: eq(tags.slug, slug) });
  return { title: tag ? `#${tag.name}` : "Tag" };
}

export const revalidate = 60;

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await db.query.tags.findFirst({ where: eq(tags.slug, slug) });
  if (!tag) notFound();

  const allPosts = await db.query.posts.findMany({
    where: eq(posts.status, "published"),
    with: { postTags: { with: { tag: true } } },
  });

  const filtered = allPosts.filter((p) =>
    p.postTags.some((pt) => pt.tag.slug === slug),
  );

  return (
    <div>
      <div className="mb-12">
        <p
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 200,
            fontSize: "0.65rem",
            letterSpacing: "0.5em",
            color: "#c89878",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
        >
          ── Signal Filter
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cinzel)",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "0.35em",
            color: "#e85d3a",
            textTransform: "uppercase",
          }}
        >
          # {tag.name}
        </h2>
        <div
          className="mt-4 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(232,93,58,0.5), rgba(139,58,42,0.3), transparent)",
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p
          className="text-center py-20"
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 200,
            fontSize: "0.8rem",
            letterSpacing: "0.35em",
            color: "#9a6858",
            textTransform: "uppercase",
          }}
        >
          ── No transmissions found ──
        </p>
      ) : (
        <div className="space-y-6">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
