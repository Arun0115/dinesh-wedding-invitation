import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingData from '../data/weddingData.js'
import ScrollDownButton from './ScrollDownButton.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function WeddingCeremony() {
  const sectionRef = useRef(null)
  const tamilRef = useRef(null)
  const titleRef = useRef(null)
  const dateRowRef = useRef(null)
  const timeRef = useRef(null)
  const flourishRef = useRef(null)
  const weddingTitleRef = useRef(null)
  const venueRef = useRef(null)
  const btnRef = useRef(null)

  const { wedding } = weddingData
  const date = new Date(wedding.isoDate)
  const weekdayShort = date.toLocaleString('en-US', { weekday: 'short' })
  const dayNum = date.getDate()
  const monthLong = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    tl.fromTo(tamilRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(dateRowRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo(timeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(flourishRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5 }, '-=0.2')
      .fromTo(weddingTitleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.15')
      .fromTo(venueRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo(btnRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      id="wedding-ceremony"
      ref={sectionRef}
      className="relative w-full flex justify-center items-center px-6 py-24 snap-start"
      style={{ minHeight: '100svh' }}
    >
      <div className="relative w-full flex flex-col items-center text-center" style={{ maxWidth: '480px' }}>
        <p ref={tamilRef} className="font-tamil text-xs tracking-[0.2em] text-maroon/70">
          முகூர்த்தம்
        </p>
        <h2 ref={titleRef} className="font-display italic text-5xl text-maroon-deep mt-2 leading-none">
          Muhurtham
        </h2>

        <div ref={dateRowRef} className="mt-6 flex items-center justify-center gap-4 text-maroon-deep">
          <span className="font-display text-lg">{weekdayShort}</span>
          <span className="h-7 w-px bg-gold" />
          <span className="font-display text-4xl leading-none">{dayNum}</span>
          <span className="h-7 w-px bg-gold" />
          <span className="font-display text-lg">{monthLong}</span>
        </div>
        <p className="mt-1 text-[10px] tracking-[0.3em] text-maroon/70">{year}</p>

        <p ref={timeRef} className="mt-4 font-display text-2xl text-maroon-deep">
          {wedding.time}
        </p>

        <div ref={flourishRef} className="flex items-center justify-center gap-2 mt-8">
          <span className="w-8 h-px bg-gold-soft" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <span className="w-8 h-px bg-gold-soft" />
        </div>

        <h3 ref={weddingTitleRef} className="font-display italic text-3xl text-maroon-deep mt-6">
          Wedding
        </h3>

        <div ref={venueRef} className="mt-4">
          <p className="font-display text-xl text-maroon-deep leading-snug">{wedding.venueName}</p>
          <p className="text-sm text-ink/60 mt-1">{wedding.venueAddress}</p>
        </div>

        <a
          ref={btnRef}
          href={wedding.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-block px-9 py-3 rounded-full bg-maroon text-ivory text-xs tracking-[0.18em] shadow-lg shadow-maroon/20"
        >
          VIEW ON MAP
        </a>

        <ScrollDownButton targetId="reception" className="mt-8" />
      </div>
    </section>
  )
}
