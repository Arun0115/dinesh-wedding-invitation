import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScratchCard from './ScratchCard.jsx'
import Countdown from './Countdown.jsx'
import ScrollDownButton from './ScrollDownButton.jsx'
import weddingData from '../data/weddingData.js'

gsap.registerPlugin(ScrollTrigger)

const RAIN_COLORS = ['#F0C9CE', '#E8B4BE', '#C9DCC2', '#F5DCE0', '#D8A3AA']
const RAIN_GLYPHS = ['✿', '❀', '✦', '❁']

// Sparkles burst from the centre of the screen, then petals and little flowers rain over the whole screen.
function celebrate() {
  const W = window.innerWidth
  const H = window.innerHeight
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 1) sparkle burst from the centre
  for (let i = 0; i < 44; i++) {
    const el = document.createElement('div')
    el.className = 'sparkle-dot'
    const size = 4 + Math.random() * 7
    el.style.width = el.style.height = size + 'px'
    el.style.left = W / 2 + 'px'
    el.style.top = H / 2 + 'px'
    document.body.appendChild(el)
    const angle = Math.random() * Math.PI * 2
    const dist = 90 + Math.random() * Math.min(W, H) * 0.45
    gsap.set(el, { xPercent: -50, yPercent: -50 })
    gsap.to(el, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      scale: 0.2 + Math.random() * 1.2,
      opacity: 0,
      duration: 1.1 + Math.random() * 0.9,
      ease: 'power2.out',
      onComplete: () => el.remove(),
    })
  }

  if (reduce) return

  // 2) petals + flowers falling across the whole screen
  for (let i = 0; i < 46; i++) {
    const el = document.createElement('div')
    const isGlyph = Math.random() < 0.35
    el.style.position = 'fixed'
    el.style.left = Math.random() * W + 'px'
    el.style.top = '0px'
    el.style.pointerEvents = 'none'
    el.style.zIndex = '60'
    const color = RAIN_COLORS[Math.floor(Math.random() * RAIN_COLORS.length)]
    if (isGlyph) {
      el.textContent = RAIN_GLYPHS[Math.floor(Math.random() * RAIN_GLYPHS.length)]
      el.style.color = color
      el.style.fontSize = 12 + Math.random() * 12 + 'px'
    } else {
      const w = 9 + Math.random() * 8
      el.style.width = w + 'px'
      el.style.height = w * 1.25 + 'px'
      el.style.background = color
      el.style.borderRadius = '60% 0 60% 0'
      el.style.opacity = '0.9'
    }
    document.body.appendChild(el)
    gsap.fromTo(
      el,
      { y: -40, rotation: Math.random() * 360 },
      {
        y: H + 60,
        x: (Math.random() - 0.5) * 120,
        rotation: '+=' + (200 + Math.random() * 300),
        duration: 3.6 + Math.random() * 2.6,
        delay: Math.random() * 2.2,
        ease: 'none',
        onComplete: () => el.remove(),
      }
    )
  }
}

export default function SaveTheDate() {
  const revealedCount = useRef(0)
  const handleReveal = () => {
    revealedCount.current += 1
    if (revealedCount.current === 3) celebrate()
  }

  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const flourishRef = useRef(null)
  const subRef = useRef(null)
  const cardsRef = useRef(null)
  const taglineRef = useRef(null)
  const venueLineRef = useRef(null)
  const countdownRef = useRef(null)

  const date = new Date(weddingData.wedding.isoDate)
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day = String(date.getDate()).padStart(2, '0')
  const year = String(date.getFullYear())
  const venueCity = weddingData.wedding.venueAddress.split(',')[0]

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')
      .fromTo(flourishRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5 }, '-=0.3')
      .fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 16, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
        '-=0.25'
      )
      .fromTo(taglineRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo(venueLineRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo(countdownRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section id="save-the-date" ref={sectionRef} className="relative w-full flex justify-center" style={{ minHeight: '100svh' }}>
      <div
        className="relative w-full flex flex-col items-center justify-center gap-3 px-6 py-4 text-center"
        style={{ maxWidth: '520px' }}
      >
        <div>
          <p ref={eyebrowRef} className="text-[11px] tracking-[0.3em] text-maroon/70">
            THE DATE
          </p>
          <h2 ref={titleRef} className="font-display italic text-4xl text-maroon-deep mt-2">
            Save the Date
          </h2>
          <div ref={flourishRef} className="flex items-center justify-center gap-2 mt-3">
            <span className="w-8 h-px bg-gold-soft" />
            <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <span className="w-8 h-px bg-gold-soft" />
          </div>
        </div>

        <p ref={subRef} className="text-sm text-ink/70">
          Scratch below to reveal our wedding date
        </p>

        <div ref={cardsRef} className="flex items-center gap-3">
          <ScratchCard label="MONTH" value={month} onReveal={handleReveal} />
          <ScratchCard label="DAY" value={day} onReveal={handleReveal} />
          <ScratchCard label="YEAR" value={year} onReveal={handleReveal} />
        </div>

        <p ref={taglineRef} className="font-display text-lg italic text-ink/70 max-w-xs leading-relaxed">
          {weddingData.wedding.tagline}
        </p>

        <p ref={venueLineRef} className="text-[11px] tracking-[0.15em] text-maroon/70 pb-4 border-b border-gold-soft/60">
          THIRUMANAM &nbsp;·&nbsp; {day}.{date.getMonth() + 1}.{year} &nbsp;·&nbsp; {venueCity.toUpperCase()}
        </p>

        <div ref={countdownRef}>
          <Countdown targetIso={weddingData.wedding.isoDate} />
        </div>

        <ScrollDownButton targetId="gallery" className="mt-8" />
      </div>
    </section>
  )
}
