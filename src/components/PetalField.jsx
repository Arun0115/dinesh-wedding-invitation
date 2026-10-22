import { useMemo } from 'react'

const PETAL_COLORS = ['#F0C9CE', '#E8B4BE', '#C9DCC2', '#F5DCE0', '#D9C9A8']

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function PetalField({ count = 16, fixed = false, light = false, colors = PETAL_COLORS }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: randomBetween(0, 100),
      size: randomBetween(9, 18),
      duration: randomBetween(10, 18),
      delay: randomBetween(-14, 4),
      drift: randomBetween(-50, 50),
      rotateStart: randomBetween(0, 360),
      color: colors[i % colors.length],
    }))
  }, [count])

  return (
    <div
      className={`pointer-events-none ${fixed ? 'fixed z-20' : 'absolute'} inset-0 overflow-hidden`}
      style={light ? { opacity: 0.55 } : undefined}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.8,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift']: `${p.drift}px`,
            ['--rotateStart']: `${p.rotateStart}deg`,
          }}
        />
      ))}
    </div>
  )
}
