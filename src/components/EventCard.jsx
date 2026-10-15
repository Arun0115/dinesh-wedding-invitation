import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollDownButton from './ScrollDownButton.jsx'

gsap.registerPlugin(ScrollTrigger)

// Compact card that sits inside the open centre of the floral video frame.
export default function EventCard({ dateLine, title, startTime, venueName, venueAddress, mapUrl, schedule = [], sectionId, nextTargetId }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
      }
    )
    return () => {
      anim.scrollTrigger && anim.scrollTrigger.kill()
      anim.kill()
    }
  }, [])

  return (
    <section
      id={sectionId}
      className="relative w-full flex flex-col justify-center items-center gap-8 px-6 snap-start"
      style={{ minHeight: '100svh' }}
    >
      <div
        ref={cardRef}
        className="rounded-3xl border border-gold-soft bg-ivory/90 backdrop-blur-sm shadow-lg px-5 py-6 text-center"
        style={{ width: 'min(80%, 330px)' }}
      >
        <p className="text-[10px] tracking-[0.22em] text-maroon/70">{dateLine}</p>
        <h2 className="font-display italic text-4xl text-maroon-deep mt-1.5 leading-tight">{title}</h2>
        <p className="text-[11px] tracking-[0.18em] text-maroon/70 mt-1">FROM {startTime.toUpperCase()} ONWARDS</p>

        <div className="mt-4">
          <p className="font-display text-lg text-maroon-deep leading-snug">{venueName}</p>
          <p className="text-xs text-ink/60 mt-0.5">{venueAddress}</p>
        </div>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-7 py-2.5 rounded-full bg-maroon text-ivory text-[10px] tracking-[0.18em] shadow-md shadow-maroon/20"
        >
          VIEW ON MAP
        </a>

        {schedule.length > 0 && (
          <ul className="mt-5 border-t border-gold-soft">
            {schedule.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between py-2.5 border-b border-gold-soft font-display text-sm text-maroon-deep"
              >
                <span>{row.time}</span>
                <span>{row.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {nextTargetId && <ScrollDownButton targetId={nextTargetId} />}
    </section>
  )
}
