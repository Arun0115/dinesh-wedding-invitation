import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingData from '../data/weddingData.js'

gsap.registerPlugin(ScrollTrigger)

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.9 1.12-.17.19-.33.22-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01s-.5.07-.76.36c-.26.29-1 1-1 2.42 0 1.42 1.03 2.8 1.17 3 .15.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.31.19 1.81.12.55-.08 1.7-.7 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34Z" />
      <path d="M12.01 2C6.49 2 2 6.48 2 12c0 1.86.51 3.61 1.4 5.11L2 22l5.02-1.32A9.96 9.96 0 0 0 12.01 22C17.53 22 22 17.52 22 12S17.53 2 12.01 2Zm0 18.2c-1.68 0-3.25-.47-4.6-1.28l-.33-.2-3.06.8.82-2.99-.21-.31A8.17 8.17 0 0 1 3.8 12c0-4.53 3.68-8.2 8.21-8.2 4.53 0 8.2 3.67 8.2 8.2 0 4.53-3.67 8.2-8.2 8.2Z" />
    </svg>
  )
}

export default function RSVP() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const btnRef = useRef(null)

  const { rsvp } = weddingData
  const waLink = `https://wa.me/${rsvp.whatsappNumber}?text=${encodeURIComponent(rsvp.message)}`

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')
      .fromTo(bodyRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(btnRef.current, { opacity: 0, y: 14, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, '-=0.25')

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex justify-center items-center px-6 py-24 snap-start"
      style={{ minHeight: '100svh' }}
    >
      <div className="relative w-full flex flex-col items-center text-center" style={{ maxWidth: '440px' }}>
        <p ref={eyebrowRef} className="text-[11px] tracking-[0.3em] text-maroon/70">
          KINDLY RESPOND
        </p>
        <h2 ref={titleRef} className="font-display italic text-5xl text-maroon-deep mt-2">
          Will You Join Us?
        </h2>
        <p ref={bodyRef} className="mt-5 text-sm text-ink/70 leading-relaxed max-w-xs">
          Your presence would mean the world to us. Please let us know if you'll be celebrating with us.
        </p>

        <a
          ref={btnRef}
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-maroon text-ivory text-sm tracking-[0.08em] shadow-lg shadow-maroon/25"
        >
          <WhatsAppIcon className="w-5 h-5" />
          RSVP on WhatsApp
        </a>
      </div>
    </section>
  )
}
