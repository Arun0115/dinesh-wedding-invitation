import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import weddingData from '../data/weddingData.js'

export default function InvitationReveal() {
  const sectionRef = useRef(null)
  const tamilHeadingRef = useRef(null)
  const kuralRef = useRef(null)
  const eyebrowRef = useRef(null)
  const namesRef = useRef(null)
  const cueRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
    tl.fromTo(tamilHeadingRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(kuralRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(eyebrowRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(namesRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(cueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  function scrollToNext() {
    document.getElementById('save-the-date')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative w-full flex justify-center" style={{ minHeight: '100svh' }}>
      <div
        className="relative w-full flex flex-col items-center justify-center px-6 py-6 text-center"
        style={{ maxWidth: '520px' }}
      >
        <p ref={tamilHeadingRef} className="font-tamil text-lg sm:text-xl text-maroon-deep">
          {weddingData.invocation.tamilHeading}
        </p>

        <p
          ref={kuralRef}
          className="mt-3 w-full max-w-[300px] sm:max-w-sm font-tamil text-[13px] sm:text-sm text-ink/70 leading-snug whitespace-pre-line"
        >
          {weddingData.invocation.kuralText}
          <br />
          <span className="text-xs text-maroon/60">{weddingData.invocation.kuralAttribution}</span>
        </p>

        <p ref={eyebrowRef} className="mt-5 max-w-xs text-[14px] text-ink/70 leading-snug">
          {weddingData.invocation.blessing}
        </p>

        <div ref={namesRef} className="mt-4 flex items-start justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <h1 className="font-display text-2xl sm:text-3xl text-maroon-deep">{weddingData.couple.groomName}</h1>
            <p className="mt-1 text-[10px] sm:text-[11px] text-ink/60 leading-snug max-w-[9rem]">{weddingData.couple.groomParents}</p>
          </div>
          <span className="font-display text-xl italic text-gold mt-1.5">&amp;</span>
          <div className="flex flex-col items-center">
            <h1 className="font-display text-2xl sm:text-3xl text-maroon-deep">{weddingData.couple.brideName}</h1>
            <p className="mt-1 text-[10px] sm:text-[11px] text-ink/60 leading-snug max-w-[9rem]">{weddingData.couple.brideParents}</p>
          </div>
        </div>

        {/* scroll cue — now a real tappable button that smooth-scrolls to Save the Date,
            compact so the whole block clears the video's top and bottom floral zones */}
        <button
          ref={cueRef}
          onClick={scrollToNext}
          className="mt-5 flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-ivory/85 backdrop-blur-sm text-maroon/70 active:scale-95 transition-transform"
        >
          <span className="text-[10px] tracking-[0.2em]">SCROLL TO REVEAL</span>
          <span className="w-2 h-2 border-b border-r border-maroon/60 rotate-45 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
