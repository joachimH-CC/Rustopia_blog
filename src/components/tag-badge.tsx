import Link from "next/link";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function TagBadge({ tag }: { tag: Tag }) {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      style={{
        display: "inline-block",
        padding: "0.15rem 0.6rem",
        border: "1px solid rgba(232,93,58,0.35)",
        fontFamily: "var(--font-barlow)",
        fontWeight: 200,
        fontSize: "0.62rem",
        letterSpacing: "0.25em",
        color: "#e85d3a",
        textDecoration: "none",
        textTransform: "uppercase",
        backgroundColor: "rgba(232,93,58,0.04)",
        transition: "border-color 0.2s, background-color 0.2s",
      }}
    >
      #{tag.name}
    </Link>
  );
}
