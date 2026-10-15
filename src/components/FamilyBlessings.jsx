import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingData from '../data/weddingData.js'

gsap.registerPlugin(ScrollTrigger)

export default function FamilyBlessings() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const flourishRef = useRef(null)
  const bodyRef = useRef(null)
  const familiesRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')
      .fromTo(flourishRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5 }, '-=0.3')
      .fromTo(bodyRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.2')
      .fromTo(familiesRef.current.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.25')

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex justify-center py-24 px-6">
      <div className="relative w-full flex flex-col items-center text-center" style={{ maxWidth: '520px' }}>
        <p ref={eyebrowRef} className="text-[11px] tracking-[0.3em] text-maroon/70">
          WITH GRATITUDE
        </p>
        <h2 ref={titleRef} className="font-display italic text-4xl text-maroon-deep mt-2">
          With Our Families' Blessings
        </h2>
        <div ref={flourishRef} className="flex items-center justify-center gap-2 mt-4">
          <span className="w-8 h-px bg-gold-soft" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <span className="w-8 h-px bg-gold-soft" />
        </div>

        <p ref={bodyRef} className="mt-8 max-w-sm text-[15px] text-ink/75 leading-relaxed">
          This union is made possible by the love, sacrifice, and blessings of our families.
          We are deeply grateful to our parents and elders, whose guidance and grace have
          brought us to this beautiful beginning.
        </p>

        <div ref={familiesRef} className="mt-10 grid grid-cols-2 gap-6 w-full">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] tracking-[0.2em] text-maroon/60">GROOM'S FAMILY</p>
            <p className="font-display text-lg text-maroon-deep mt-1">{weddingData.couple.groomName}</p>
            <p className="text-[11px] text-ink/60 leading-relaxed">{weddingData.couple.groomParents}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] tracking-[0.2em] text-maroon/60">BRIDE'S FAMILY</p>
            <p className="font-display text-lg text-maroon-deep mt-1">{weddingData.couple.brideName}</p>
            <p className="text-[11px] text-ink/60 leading-relaxed">{weddingData.couple.brideParents}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
