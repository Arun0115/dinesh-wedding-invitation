import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingData from '../data/weddingData.js'

gsap.registerPlugin(ScrollTrigger)

export default function ThankYou() {
  const sectionRef = useRef(null)
  const flourishTopRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const namesRef = useRef(null)
  const flourishBottomRef = useRef(null)
  const dateRef = useRef(null)

  const { couple, wedding } = weddingData
  const date = new Date(wedding.isoDate)
  const dayNum = date.getDate()
  const monthLong = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    tl.fromTo(flourishTopRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(bodyRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo(namesRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.25')
      .fromTo(flourishBottomRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6 }, '-=0.2')
      .fromTo(dateRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.2')

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      id="thank-you"
      ref={sectionRef}
      className="relative w-full flex justify-center items-center px-6 py-28 snap-start"
      style={{ minHeight: '100svh' }}
    >
      <div className="relative w-full flex flex-col items-center text-center" style={{ maxWidth: '440px' }}>
        <div ref={flourishTopRef} className="flex items-center justify-center gap-2">
          <span className="w-10 h-px bg-gold-soft" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <span className="w-10 h-px bg-gold-soft" />
        </div>

        <h2 ref={titleRef} className="font-display italic text-5xl text-maroon-deep mt-6">
          Thank You
        </h2>

        <p ref={bodyRef} className="mt-5 text-sm text-ink/70 leading-relaxed max-w-xs">
          For reading through our story and sharing in this joy. We can't wait to celebrate this beautiful
          beginning with you, surrounded by the people we love most.
        </p>

        <div ref={namesRef} className="mt-8 flex items-center gap-3">
          <span className="font-display text-3xl text-maroon-deep">{couple.groomName}</span>
          <span className="font-display text-xl italic text-gold">&amp;</span>
          <span className="font-display text-3xl text-maroon-deep">{couple.brideName}</span>
        </div>

        <div ref={flourishBottomRef} className="flex items-center justify-center gap-2 mt-6">
          <span className="w-10 h-px bg-gold-soft" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <span className="w-10 h-px bg-gold-soft" />
        </div>

        <p ref={dateRef} className="mt-6 text-[11px] tracking-[0.25em] text-maroon/60">
          {dayNum} {monthLong.toUpperCase()} {year}
        </p>
      </div>
    </section>
  )
}
