export default function GlowOrb() {
  return (
    <div
      className="fixed bottom-0 left-1/2 pointer-events-none"
      style={{ zIndex: 1, transform: "translateX(-50%) translateY(50%)" }}
      aria-hidden="true"
    >
      {/* Outer breathe ring — very subtle */}
      <div
        className="animate-breathe rounded-full"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(232,93,58,0.05) 0%, rgba(139,58,42,0.02) 35%, transparent 65%)",
        }}
      />
      {/* Inner core — barely visible */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full animate-pulse-slow"
        style={{
          width: "60px",
          height: "60px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(255,122,80,0.12) 0%, rgba(232,93,58,0.04) 50%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}
