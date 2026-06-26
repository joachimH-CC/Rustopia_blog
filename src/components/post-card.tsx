import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import TagBadge from "./tag-badge";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    coverImageUrl: string | null;
    publishedAt: Date | string | null;
    postTags: Array<{ tag: Tag }>;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article
      className="group relative overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "rgba(44,10,10,0.75)",
        border: "1px solid rgba(139,58,42,0.55)",
      }}
    >
      {/* Corner TL accent */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: 12,
          height: 12,
          borderTop: "1px solid rgba(232,93,58,0.6)",
          borderLeft: "1px solid rgba(232,93,58,0.6)",
        }}
        aria-hidden="true"
      />
      {/* Corner BR accent */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: 12,
          height: 12,
          borderBottom: "1px solid rgba(232,93,58,0.6)",
          borderRight: "1px solid rgba(232,93,58,0.6)",
        }}
        aria-hidden="true"
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(232,93,58,0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <Link href={`/posts/${post.slug}`} className="block">
        {post.coverImageUrl && (
          <div
            className="relative w-full overflow-hidden"
            style={{ height: 180 }}
          >
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "sepia(15%) brightness(0.8)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(44,10,10,0.85) 100%)",
              }}
            />
            <div
              className="absolute top-3 right-3 w-2 h-2 rotate-45"
              style={{ backgroundColor: "#e85d3a", opacity: 0.65 }}
            />
          </div>
        )}

        <div className="px-6 py-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="h-px w-4"
              style={{ backgroundColor: "rgba(232,93,58,0.5)" }}
            />
            <span
              style={{
                fontFamily: "var(--font-barlow)",
                fontWeight: 200,
                fontSize: "0.62rem",
                letterSpacing: "0.4em",
                color: "#c89878",
                textTransform: "uppercase",
              }}
            >
              {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-cinzel)",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.12em",
              color: "#f5e2d2",
              textTransform: "uppercase",
              lineHeight: 1.35,
              marginBottom: "1rem",
              transition: "color 0.25s",
            }}
          >
            {post.title}
          </h2>

          {post.postTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.postTags.map(({ tag }) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Bottom hover line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(232,93,58,0.5), transparent)",
        }}
        aria-hidden="true"
      />
    </article>
  );
}
