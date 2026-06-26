export default function BackgroundTexture() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Large radial wash — top-right warm gradient */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: '800px',
          height: '800px',
          transform: 'translate(30%, -30%)',
          background: 'radial-gradient(ellipse at center, rgba(139,58,42,0.06) 0%, rgba(44,10,10,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Large radial wash — bottom-left cooler gradient */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: '700px',
          height: '700px',
          transform: 'translate(-20%, 20%)',
          background: 'radial-gradient(ellipse at center, rgba(74,18,18,0.08) 0%, rgba(44,10,10,0.02) 45%, transparent 70%)',
        }}
      />

      {/* Faint geometric ring — top area */}
      <div
        className="absolute"
        style={{
          top: '12%',
          left: '50%',
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(232,93,58,0.06)',
          borderRadius: '50%',
        }}
      />

      {/* Faint geometric ring — wider */}
      <div
        className="absolute"
        style={{
          top: '10%',
          left: '50%',
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(232,93,58,0.03)',
          borderRadius: '50%',
        }}
      />

      {/* Horizontal accent line — mid page */}
      <div
        className="absolute inset-x-0"
        style={{
          top: '55%',
          height: '1px',
          background: 'linear-gradient(to right, transparent 20%, rgba(232,93,58,0.06) 45%, rgba(232,93,58,0.1) 50%, rgba(232,93,58,0.06) 55%, transparent 80%)',
        }}
      />

      {/* Subtle diagonal slash — upper right */}
      <div
        className="absolute"
        style={{
          top: '5%',
          right: '15%',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(to right, rgba(232,93,58,0.08), transparent)',
          transform: 'rotate(-30deg)',
        }}
      />
    </div>
  )
}
