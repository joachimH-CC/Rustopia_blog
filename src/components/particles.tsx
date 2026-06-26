'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: string
  bottom: string
  size: number
  duration: string
  delay: string
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const seed = [
      { l: 8,  b: 5,  s: 1.2, dur: 9.3,  del: 0.5 },
      { l: 15, b: 12, s: 1.5, dur: 11.1, del: 1.2 },
      { l: 22, b: 8,  s: 1.0, dur: 8.7,  del: 2.8 },
      { l: 31, b: 20, s: 1.8, dur: 12.5, del: 0.1 },
      { l: 38, b: 3,  s: 1.1, dur: 9.8,  del: 3.5 },
      { l: 45, b: 15, s: 1.4, dur: 10.2, del: 1.8 },
      { l: 52, b: 9,  s: 1.6, dur: 7.9,  del: 4.1 },
      { l: 59, b: 22, s: 1.0, dur: 11.8, del: 0.9 },
      { l: 66, b: 6,  s: 1.3, dur: 8.4,  del: 2.3 },
      { l: 73, b: 18, s: 1.7, dur: 13.1, del: 5.0 },
      { l: 79, b: 11, s: 1.2, dur: 9.6,  del: 1.5 },
      { l: 85, b: 25, s: 1.5, dur: 10.9, del: 3.2 },
      { l: 91, b: 7,  s: 1.1, dur: 8.2,  del: 0.3 },
      { l: 12, b: 35, s: 1.4, dur: 11.5, del: 4.7 },
      { l: 27, b: 42, s: 1.0, dur: 9.1,  del: 2.1 },
      { l: 43, b: 38, s: 1.6, dur: 12.3, del: 1.0 },
      { l: 57, b: 45, s: 1.2, dur: 10.7, del: 3.8 },
      { l: 71, b: 32, s: 1.8, dur: 8.9,  del: 5.5 },
      { l: 88, b: 40, s: 1.3, dur: 11.2, del: 0.7 },
      { l: 5,  b: 50, s: 1.1, dur: 9.4,  del: 2.9 },
      { l: 34, b: 55, s: 1.5, dur: 13.5, del: 1.4 },
      { l: 62, b: 48, s: 1.0, dur: 10.0, del: 4.3 },
      { l: 78, b: 60, s: 1.7, dur: 8.6,  del: 0.6 },
      { l: 94, b: 52, s: 1.2, dur: 12.8, del: 3.0 },
      { l: 20, b: 65, s: 1.4, dur: 9.9,  del: 5.8 },
    ]

    setParticles(
      seed.map((p, i) => ({
        id: i,
        left: `${p.l}%`,
        bottom: `${p.b}%`,
        size: p.s,
        duration: `${p.dur}s`,
        delay: `${p.del}s`,
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float-up"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `rgba(232, 93, 58, 0.75)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(232, 93, 58, 0.5)`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
