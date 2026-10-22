import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PetalField from './PetalField.jsx'
import ChromaButterfly from './ChromaButterfly.jsx'
import FloralCorner from './FloralCorner.jsx'
import coupleStickerSrc from '../assets/decorations/couple-sticker.webp'
import weddingData from '../data/weddingData.js'

export default function Opening({ onOpen }) {
  const rootRef = useRef(null)
  const sealRef = useRef(null)
  const sealWrapRef = useRef(null)
  const titleRef = useRef(null)
  const baseRef = useRef(null)
  const flapTopRef = useRef(null)
  const flapBottomRef = useRef(null)
  const flapLeftRef = useRef(null)
  const flapRightRef = useRef(null)

  const glowRef = useRef(null)

  const butterflyRef = useRef(null)
  const chromaRef = useRef(null)
  const butterfly2Ref = useRef(null)
  const chroma2Ref = useRef(null)
  const butterfly3Ref = useRef(null)
  const chroma3Ref = useRef(null)

  const revealTextRef = useRef(null)
  const flourishRef = useRef(null)
  const stickerRef = useRef(null)
  const hintRef = useRef(null)
  const cornersRef = useRef(null)
  const openedRef = useRef(false)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo([titleRef.current, sealRef.current], { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15 })
      .fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.4')
      .to(sealRef.current, {
        boxShadow: '0 0 0 16px rgba(201,162,75,0)',
        repeat: -1,
        yoyo: true,
        duration: 1.6,
        ease: 'sine.inOut',
      })
    return () => tl.kill()
  }, [])

  function spawnSparkles(x, y) {
    const count = 20
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span')
      dot.className = 'sparkle-dot'
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      document.body.appendChild(dot)
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3
      const dist = 55 + Math.random() * 95
      gsap.fromTo(
        dot,
        { opacity: 1, scale: 0, x: 0, y: 0 },
        {
          opacity: 0,
          scale: 1,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          duration: 0.8 + Math.random() * 0.3,
          ease: 'power2.out',
          onComplete: () => dot.remove(),
        }
      )
    }
  }

  function landButterfly(wrapperRef, chromaCtrlRef, { scale = 1, duration = 0.9 } = {}) {
    return gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, scale: scale * 0.6, y: 10 },
      {
        opacity: 1,
        scale,
        y: 0,
        duration,
        ease: 'back.out(1.4)',
        onStart: () => chromaCtrlRef.current && chromaCtrlRef.current.play(),
      }
    )
  }

  function handleOpen() {
    if (openedRef.current) return
    openedRef.current = true

    const rect = sealRef.current.getBoundingClientRect()
    spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2)

    const shadowFrom = { filter: 'drop-shadow(0px 0px 0px rgba(90,22,32,0))' }
    const shadowTo = { filter: 'drop-shadow(0px 24px 26px rgba(90,22,32,0.4))' }

    const tl = gsap.timeline()

    tl.to(hintRef.current, { opacity: 0, duration: 0.3 })
      .addLabel('flaps', '+=0.1')
      // the left flap AND the seal rotate together, in perfect sync, around the
      // same hinge — that's what makes the seal look physically attached to it
      .fromTo(
        [flapLeftRef.current, sealWrapRef.current],
        shadowFrom,
        { ...shadowTo, rotateY: 148, duration: 2.8, ease: 'power2.inOut' },
        'flaps'
      )
      .fromTo(flapTopRef.current, shadowFrom, { ...shadowTo, rotateX: -148, duration: 2.8, ease: 'power2.inOut' }, 'flaps')
      .fromTo(flapBottomRef.current, shadowFrom, { ...shadowTo, rotateX: 148, duration: 2.8, ease: 'power2.inOut' }, 'flaps')
      .fromTo(flapRightRef.current, shadowFrom, { ...shadowTo, rotateY: -148, duration: 2.8, ease: 'power2.inOut' }, 'flaps')
      .to(baseRef.current, { opacity: 0, duration: 0.6 }, 'flaps+=1.9')
      .to(cornersRef.current, { opacity: 0, duration: 0.6 }, '<')

      // soft gold glow blooms behind the arrivals
      .fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 'flaps+=1.3')

      // three butterflies land, one after another, at different spots
      .add(landButterfly(butterfly2Ref, chroma2Ref, { scale: 0.55, duration: 0.7 }), 'flaps+=1.5')
      .add(landButterfly(butterflyRef, chromaRef, { scale: 1, duration: 0.9 }), 'flaps+=1.9')
      .add(landButterfly(butterfly3Ref, chroma3Ref, { scale: 0.45, duration: 0.7 }), 'flaps+=2.4')

      .fromTo(revealTextRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 'flaps+=2.9')
      .fromTo(flourishRef.current, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.6 }, '-=0.3')
      // couple sticker rises up from the bottom of the card, like the butterflies did
      .fromTo(stickerRef.current, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.1')
      .to({}, { duration: 1.5 })
      .to(rootRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => onOpen && onOpen(),
      })
  }

  const flapCommon = 'absolute inset-0 [backface-visibility:hidden]'

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-ivory-deep via-ivory to-ivory-deep px-3 py-6"
    >
      <PetalField />

      <div
        className="relative rounded-[28px] overflow-hidden border border-gold-soft shadow-2xl shadow-maroon-deep/20"
        style={{ width: 'min(94vw, 460px)', aspectRatio: '3 / 4', maxHeight: '92vh', perspective: '1000px' }}
      >
        {/* delicate inner border frame — common premium-invitation touch */}
        <div className="absolute inset-[10px] border border-gold-soft/50 rounded-[18px] pointer-events-none z-10" />

        <div className="absolute inset-0">
          {/* soft gold glow behind the arrivals */}
          <div
            ref={glowRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,162,75,0.28) 0%, rgba(201,162,75,0) 70%)' }}
          />

          {/* main butterfly — center */}
          <div ref={butterflyRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ChromaButterfly ref={chromaRef} size={220} />
          </div>

          {/* accent butterfly — upper left */}
          <div ref={butterfly2Ref} className="absolute" style={{ left: '10%', top: '24%' }}>
            <ChromaButterfly ref={chroma2Ref} size={110} />
          </div>

          {/* accent butterfly — lower right */}
          <div ref={butterfly3Ref} className="absolute" style={{ right: '8%', top: '66%' }}>
            <ChromaButterfly ref={chroma3Ref} size={95} />
          </div>

          {/* text, flourish and sticker stack naturally, bottom-anchored —
              no manual pixel offsets, so nothing can overlap regardless of card size */}
          <div className="absolute left-0 right-0 bottom-3 flex flex-col items-center gap-2 px-6">
            <p ref={revealTextRef} className="text-center font-display text-xl sm:text-2xl text-maroon-deep">
              You're cordially invited
            </p>
            <div ref={flourishRef} className="flex items-center gap-2">
              <span className="w-7 h-px bg-gold-soft" />
              <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
              <span className="w-7 h-px bg-gold-soft" />
            </div>
            {/* custom couple illustration — rises up last, below everything else */}
            <img
              ref={stickerRef}
              src={coupleStickerSrc}
              alt=""
              aria-hidden="true"
              className="w-14 sm:w-16 h-auto opacity-0"
              style={{ filter: 'drop-shadow(0 8px 14px rgba(90,22,32,0.25))' }}
            />
          </div>
        </div>

        <div ref={baseRef} className="absolute inset-0 bg-ivory-deep" />

        {/* four flaps show a visible embossed fold via shading/shadow alone —
            no drawn seam lines, which read as flat rather than realistic */}
        <div ref={flapTopRef} className={flapCommon} style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)', transformOrigin: '50% 0%', background: 'linear-gradient(180deg, #FBF4F1 0%, #E8C3C8 100%)', boxShadow: 'inset 0 -20px 30px -10px rgba(90,22,32,0.15)' }} />
        <div ref={flapBottomRef} className={flapCommon} style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)', transformOrigin: '50% 100%', background: 'linear-gradient(0deg, #D9AEB4 0%, #F2DEE1 100%)', boxShadow: 'inset 0 20px 30px -10px rgba(90,22,32,0.18)' }} />
        <div ref={flapLeftRef} className={flapCommon} style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)', transformOrigin: '0% 50%', background: 'linear-gradient(90deg, #D8A3AA 0%, #F2DEE1 100%)', boxShadow: 'inset -20px 0 30px -10px rgba(90,22,32,0.14)' }} />
        <div ref={flapRightRef} className={flapCommon} style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', transformOrigin: '100% 50%', background: 'linear-gradient(270deg, #D8A3AA 0%, #F2DEE1 100%)', boxShadow: 'inset 20px 0 30px -10px rgba(90,22,32,0.14)' }} />

        {/* floral flourishes stay only at the true corners */}
        <div ref={cornersRef} className="absolute inset-0 pointer-events-none">
          <FloralCorner className="absolute top-3 left-3 text-maroon-deep" />
          <FloralCorner className="absolute top-3 right-3 text-maroon-deep" flipX />
          <FloralCorner className="absolute bottom-3 left-3 text-maroon-deep" flipY />
          <FloralCorner className="absolute bottom-3 right-3 text-maroon-deep" flipX flipY />
        </div>

        <div ref={titleRef} className="absolute top-[13%] left-0 right-0 flex flex-col items-center gap-1 z-10">
          <span className="font-display text-2xl sm:text-3xl text-maroon-deep">
            {weddingData.couple.groomName.charAt(0)} &amp; {weddingData.couple.brideName.charAt(0)}
          </span>
          <span className="text-[10px] tracking-[0.3em] text-maroon/70">WEDDING INVITATION</span>
        </div>

        {/* the seal's wrapper shares the LEFT flap's exact hinge, so tweening
            them with identical rotateY values makes the seal swing away
            attached to that flap, instead of cracking apart in place */}
        <div
          ref={sealWrapRef}
          className="absolute inset-0 z-20 [backface-visibility:hidden]"
          style={{ transformOrigin: '0% 50%' }}
        >
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open wedding invitation"
            ref={sealRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center border border-gold cursor-pointer"
            style={{ background: 'radial-gradient(circle at 35% 30%, #F2DEE1, #D8A3AA 75%)', boxShadow: '0 6px 16px rgba(90,22,32,0.25)' }}
          >
            {/* decorative beaded ring around the seal — simple and safe, no overlapping paths */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#5A1620" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="37" stroke="#5A1620" strokeOpacity="0.25" strokeWidth="0.6" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180
                const x = 50 + 40 * Math.cos(rad)
                const y = 50 + 40 * Math.sin(rad)
                return <circle key={deg} cx={x} cy={y} r="1.3" fill="#5A1620" opacity="0.3" />
              })}
            </svg>
            <span className="font-display text-2xl text-maroon-deep tracking-wide">{weddingData.couple.groomName.charAt(0)} • {weddingData.couple.brideName.charAt(0)}</span>
          </button>
        </div>

        <p ref={hintRef} className="absolute left-0 right-0 text-center text-[11px] tracking-[0.15em] text-maroon/60 z-10" style={{ top: 'calc(50% + 62px)' }}>
          tap the seal to open
        </p>
      </div>
    </section>
  )
}
