import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import PostCard from "@/components/post-card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Archive" };
export const revalidate = 60;

export default async function HomePage() {
  const publishedPosts = await db.query.posts.findMany({
    where: eq(posts.status, "published"),
    orderBy: [desc(posts.publishedAt)],
    with: { postTags: { with: { tag: true } } },
  });

  return (
    <div>
      {/* Section header */}
      <div className="mb-12">
        <p
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 200,
            fontSize: "0.65rem",
            letterSpacing: "0.5em",
            color: "#7a5545",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
          }}
        >
          ── Transmission Log
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cinzel)",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "0.35em",
            color: "#d4b5a0",
            textTransform: "uppercase",
          }}
        >
          Recent Posts
        </h2>
        <div
          className="mt-4 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(232,93,58,0.5), rgba(139,58,42,0.3), transparent)",
          }}
        />
      </div>

      {publishedPosts.length === 0 ? (
        <p
          className="text-center py-20"
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 200,
            fontSize: "0.8rem",
            letterSpacing: "0.35em",
            color: "#4a3025",
            textTransform: "uppercase",
          }}
        >
          ── No transmissions found ──
        </p>
      ) : (
        <div className="space-y-6">
          {publishedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
