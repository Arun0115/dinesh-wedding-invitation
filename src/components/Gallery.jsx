import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import weddingData from '../data/weddingData.js'
import ScrollDownButton from './ScrollDownButton.jsx'

gsap.registerPlugin(ScrollTrigger)

// Pulls in every optimized photo from src/assets/photos/full automatically.
const fullModules = import.meta.glob('../assets/photos/full/*.webp', { eager: true, import: 'default' })

function urlFor(filename) {
  const key = Object.keys(fullModules).find((k) => k.endsWith(filename))
  return key ? fullModules[key] : null
}

const photos = weddingData.gallery
  .map((item) => ({ src: urlFor(item.file), caption: item.caption }))
  .filter((p) => p.src)

const SWIPE_THRESHOLD = 50
const TAP_THRESHOLD = 8

export default function Gallery() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const sliderRef = useRef(null)

  const [index, setIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)

  const count = photos.length
  const next = () => setIndex((i) => (i + 1) % count)
  const prev = () => setIndex((i) => (i - 1 + count) % count)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.35')
      .fromTo(sliderRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill()
      tl.kill()
    }
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  function onPointerDown(e) {
    startX.current = e.clientX
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function onPointerMove(e) {
    if (!dragging) return
    setDragX(e.clientX - startX.current)
  }
  function onPointerUp() {
    if (!dragging) return
    if (dragX < -SWIPE_THRESHOLD) next()
    else if (dragX > SWIPE_THRESHOLD) prev()
    else if (Math.abs(dragX) < TAP_THRESHOLD) next() // a simple tap continues
    setDragX(0)
    setDragging(false)
  }
  function onPointerCancel() {
    setDragX(0)
    setDragging(false)
  }

  if (count === 0) return null

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full flex justify-center items-center px-6 snap-start"
      style={{ minHeight: '100svh' }}
    >
      <div className="relative w-full flex flex-col items-center" style={{ maxWidth: '520px' }}>
        <p ref={eyebrowRef} className="text-[11px] tracking-[0.3em] text-maroon/70">
          ENGAGEMENT &amp; PRE-WEDDING
        </p>
        <h2 ref={titleRef} className="font-display italic text-3xl text-maroon-deep mt-1 mb-4 text-center">
          A Few Precious Moments
        </h2>

        <div ref={sliderRef} style={{ width: 'min(78%, 300px)' }}>
          <div
            className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
                transition: dragging ? 'none' : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {photos.map((photo, i) => (
                <div key={photo.src} className="w-full flex-none">
                  <div className="rounded-3xl overflow-hidden border border-gold-soft bg-ivory/90 shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
                      {/* soft blurred copy fills the frame so no photo is ever cropped */}
                      <img
                        src={photo.src}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-70"
                      />
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        draggable={false}
                        loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'}
                        className="relative w-full h-full object-contain"
                      />
                    </div>
                    <p className="px-4 py-2.5 text-center font-display italic text-base text-maroon-deep leading-snug">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="w-9 h-9 rounded-full border border-gold bg-ivory/90 text-maroon-deep flex items-center justify-center text-base"
            >
              &#8592;
            </button>
            <div className="text-center">
              <p className="text-[11px] tracking-[0.2em] text-maroon/70">
                {pad(index + 1)} / {pad(count)}
              </p>
              <p className="text-[9px] tracking-[0.2em] text-ink/50 mt-1">SWIPE OR TAP TO CONTINUE</p>
            </div>
            <button
              onClick={next}
              aria-label="Next photo"
              className="w-9 h-9 rounded-full border border-gold bg-ivory/90 text-maroon-deep flex items-center justify-center text-base"
            >
              &#8594;
            </button>
          </div>
        </div>

        <ScrollDownButton targetId="wedding-ceremony" className="mt-8 mx-auto" />
      </div>
    </section>
  )
}
