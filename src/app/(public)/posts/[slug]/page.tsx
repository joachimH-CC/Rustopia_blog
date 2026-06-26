import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import MarkdownRenderer from "@/components/markdown-renderer";
import GiscusComments from "@/components/giscus-comments";
import TagBadge from "@/components/tag-badge";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.query.posts.findFirst({ where: eq(posts.slug, slug) });
  if (!post) return {};
  return { title: post.title };
}

export const revalidate = 60;

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
    with: { postTags: { with: { tag: true } } },
  });

  if (!post || post.status !== "published") notFound();

  return (
    <article>
      {/* Back nav */}
      <Link
        href="/"
        style={{
          display: "inline-block",
          fontFamily: "var(--font-barlow)",
          fontWeight: 200,
          fontSize: "0.65rem",
          letterSpacing: "0.4em",
          color: "#7a5545",
          textTransform: "uppercase",
          marginBottom: "2.5rem",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
      >
        ← Return
      </Link>

      {/* Cover image */}
      {post.coverImageUrl && (
        <div
          className="relative w-full mb-10 overflow-hidden"
          style={{ height: 300, border: "1px solid rgba(139,58,42,0.5)" }}
        >
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            style={{ filter: "sepia(20%) brightness(0.85)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(44,10,10,0.75) 100%)",
            }}
          />
        </div>
      )}

      {/* Post header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="h-px w-8"
            style={{ backgroundColor: "rgba(232,93,58,0.5)" }}
          />
          <div
            className="w-1 h-1 rotate-45"
            style={{ backgroundColor: "#e85d3a", opacity: 0.7 }}
          />
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, rgba(232,93,58,0.3), transparent)",
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cinzel)",
            fontWeight: 900,
            fontSize: "clamp(1.4rem, 4vw, 2.1rem)",
            letterSpacing: "0.08em",
            color: "#d4b5a0",
            lineHeight: 1.25,
            textTransform: "uppercase",
            marginBottom: "1.2rem",
          }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          {post.publishedAt && (
            <time
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 200,
                fontSize: "0.68rem",
                letterSpacing: "0.35em",
                color: "#7a5545",
                textTransform: "uppercase",
              }}
            >
              {formatDate(post.publishedAt)}
            </time>
          )}
          {post.postTags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.postTags.map(({ tag }) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Separator */}
      <div
        className="mb-10 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(139,58,42,0.6), rgba(139,58,42,0.2), transparent)",
        }}
      />

      {/* Content */}
      <MarkdownRenderer content={post.content} />

      {/* Comments */}
      <div
        className="mt-20 pt-10 border-t"
        style={{ borderColor: "rgba(139,58,42,0.3)" }}
      >
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-cinzel)",
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.45em",
            color: "#7a5545",
            textTransform: "uppercase",
          }}
        >
          ◈ &nbsp; Transmissions
        </p>
        <GiscusComments />
      </div>
    </article>
  );
}
