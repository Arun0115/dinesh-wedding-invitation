import { useEffect, useState } from 'react'

function getTimeLeft(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown({ targetIso }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetIso))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetIso)), 1000)
    return () => clearInterval(id)
  }, [targetIso])

  if (!timeLeft) {
    return <p className="font-display text-xl text-maroon-deep">The celebration has begun!</p>
  }

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-start gap-5 sm:gap-8">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center w-12">
          <span className="font-display text-3xl sm:text-4xl text-maroon-deep tabular-nums">
            {String(u.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] tracking-[0.12em] text-maroon/60 mt-1">{u.label}</span>
        </div>
      ))}
    </div>
  )
}
