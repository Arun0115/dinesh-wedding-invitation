import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingData from '../data/weddingData.js'

gsap.registerPlugin(ScrollTrigger)

const ICON_PATHS = [
  // graduation cap — "met as classmates"
  <path key="a" d="M12 3 2 8l10 5 10-5-10-5Z M6 10v6c0 1.5 2.7 3 6 3s6-1.5 6-3v-6" />,
  // two hearts — "became something more"
  <path key="b" d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.3 1 5.5 3 2.2-2 3.5-3 5.5-3 3.5 0 6 3.5 4 7.5C19 16.65 12 21 12 21Z" />,
  // home — "families met"
  <path key="c" d="M4 11 12 4l8 7M6 10v9h5v-5h2v5h5v-9" />,
  // ring — "the proposal"
  <path key="d" d="M12 3v4M12 17v4M3 12h4M17 12h4 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />,
  // celebration — "the wedding"
  <path key="e" d="M4 12c0-4 3-8 8-8s8 4 8 8-3 8-8 8-8-4-8-8Z M9 12h6M12 9v6" />,
]

export default function OurStory() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const headerTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    headerTl
      .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')

    const lineAnim = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 0.6,
        },
      }
    )

    const itemTriggers = itemRefs.current.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        }
      )
    )

    return () => {
      headerTl.scrollTrigger && headerTl.scrollTrigger.kill()
      headerTl.kill()
      lineAnim.scrollTrigger && lineAnim.scrollTrigger.kill()
      itemTriggers.forEach((t) => {
        t.scrollTrigger && t.scrollTrigger.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex justify-center py-24 px-6">
      <div className="relative w-full flex flex-col items-center" style={{ maxWidth: '520px' }}>
        <p ref={eyebrowRef} className="text-[11px] tracking-[0.3em] text-maroon/70">
          OUR STORY
        </p>
        <h2 ref={titleRef} className="font-display italic text-4xl text-maroon-deep mt-2 mb-14 text-center">
          Two Hearts, One Journey
        </h2>

        <div className="relative w-full flex flex-col items-center gap-14">
          {/* the connecting thread, draws itself as you scroll */}
          <div
            ref={lineRef}
            className="absolute top-2 bottom-2 w-px bg-gold-soft origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          {weddingData.story.map((item, i) => (
            <div
              key={item.year}
              ref={(el) => (itemRefs.current[i] = el)}
              className="relative z-10 flex flex-col items-center text-center gap-3 bg-ivory/90 backdrop-blur-sm rounded-2xl px-6 py-5 max-w-xs"
            >
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center bg-ivory">
                <svg viewBox="0 0 24 24" fill="none" stroke="#5A1620" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  {ICON_PATHS[i % ICON_PATHS.length]}
                </svg>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-maroon/70">{item.year}</p>
              <p className="font-display text-lg italic text-ink/80 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
