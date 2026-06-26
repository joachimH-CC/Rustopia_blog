import Link from "next/link";
import { auth } from "@/lib/auth";
import Particles from "@/components/particles";
import GlowOrb from "@/components/glow-orb";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#2c0a0a" }}
    >
      {/* Geometric grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(232,93,58,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,58,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Scan line */}
      <div
        className="fixed inset-x-0 h-px pointer-events-none opacity-10 animate-scan"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(232,93,58,0.8), transparent)",
          top: 0,
        }}
        aria-hidden="true"
      />

      <GlowOrb />
      <Particles />

      {/* HEADER */}
      <header
        className="relative border-b"
        style={{
          zIndex: 10,
          borderColor: "rgba(139,58,42,0.5)",
          backgroundColor: "rgba(44,10,10,0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 pt-7 pb-5">
          {/* Top decoration */}
          <div className="flex items-center gap-2 mb-5">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(139,58,42,0.6), rgba(232,93,58,0.4))",
              }}
            />
            <div
              className="w-1.5 h-1.5 rotate-45"
              style={{ backgroundColor: "#e85d3a", opacity: 0.8 }}
            />
            <div
              className="h-px w-12"
              style={{ backgroundColor: "rgba(232,93,58,0.3)" }}
            />
          </div>

          {/* Logo row */}
          <div className="flex items-end justify-between">
            <Link href="/" className="block group">
              <p
                style={{
                  fontFamily: "var(--font-barlow)",
                  fontWeight: 200,
                  fontSize: "0.65rem",
                  letterSpacing: "0.55em",
                  color: "#b08060",
                  textTransform: "uppercase",
                  marginBottom: "0.35rem",
                }}
              >
                Personal Archive
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-cinzel)",
                  fontWeight: 900,
                  fontSize: "1.75rem",
                  letterSpacing: "0.45em",
                  color: "#f0d4bc",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  transition: "color 0.4s",
                }}
              >
                JOACHIM
              </h1>
            </Link>

            <nav className="flex items-center gap-6 pb-0.5">
              {session && (
                <Link
                  href="/admin/posts"
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontWeight: 200,
                    fontSize: "0.65rem",
                    letterSpacing: "0.35em",
                    color: "#b08060",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "color 0.25s",
                  }}
                >
                  ◈ ADMIN
                </Link>
              )}
            </nav>
          </div>

          {/* Bottom decoration */}
          <div className="flex items-center gap-2 mt-5">
            <div
              className="h-px w-12"
              style={{ backgroundColor: "rgba(232,93,58,0.3)" }}
            />
            <div
              className="w-1.5 h-1.5 rotate-45"
              style={{ backgroundColor: "#e85d3a", opacity: 0.8 }}
            />
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, rgba(232,93,58,0.4), rgba(139,58,42,0.6), transparent)",
              }}
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main
        className="relative max-w-4xl mx-auto px-6 py-14"
        style={{ zIndex: 10 }}
      >
        {children}
      </main>

      {/* FOOTER */}
      <footer
        className="relative border-t mt-20"
        style={{ zIndex: 10, borderColor: "rgba(139,58,42,0.25)" }}
      >
        <div
          className="max-w-4xl mx-auto px-6 py-8 text-center"
          style={{
            fontFamily: "var(--font-barlow)",
            fontWeight: 200,
            fontSize: "0.65rem",
            letterSpacing: "0.45em",
            color: "#7a5040",
            textTransform: "uppercase",
          }}
        >
          ◈ &nbsp; END OF TRANSMISSION &nbsp; ◈
        </div>
      </footer>
    </div>
  );
}
