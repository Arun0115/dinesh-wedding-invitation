import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import butterflyVideoSrc from '../assets/decorations/butterfly-loop.mp4'

// Plays the green-screen butterfly clip into a hidden <video>, then draws
// each frame onto a <canvas>, stripping out the green pixels in real time.
// This works everywhere (including iPhone/Safari), unlike relying on a
// browser's native support for transparent video, which Safari lacks.
//
// Doesn't autoplay or loop — call the exposed play() once, at the moment
// you want the fly-in-and-land motion to happen. It plays through once
// and settles on the landed pose.
const ChromaButterfly = forwardRef(function ChromaButterfly({ size = 120, className = '' }, ref) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const rafIdRef = useRef(null)

  useImperativeHandle(ref, () => ({
    play: () => {
      const v = videoRef.current
      if (!v) return
      v.currentTime = 0
      v.play()
        .then(() => {
          // only start painting frames once playback has actually begun,
          // so the canvas stays blank (not a stray unkeyed first frame)
          // until the moment we actually want the butterfly to appear
          if (!rafIdRef.current) rafIdRef.current = requestAnimationFrame(drawFrameRef.current)
        })
        .catch(() => {})
    },
  }))

  const drawFrameRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const RES = 340
    canvas.width = RES
    canvas.height = RES

    let cancelled = false

    function drawFrame() {
      if (cancelled) return
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, RES, RES)
        const frame = ctx.getImageData(0, 0, RES, RES)
        const data = frame.data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const diff = g - Math.max(r, b)
          if (diff > 55) {
            data[i + 3] = 0
          } else if (diff > 15) {
            const t = (diff - 15) / 40
            data[i + 3] = data[i + 3] * (1 - t)
            data[i + 1] = Math.min(g, Math.max(r, b))
          }
        }
        ctx.putImageData(frame, 0, 0)
      }
      rafIdRef.current = requestAnimationFrame(drawFrame)
    }
    drawFrameRef.current = drawFrame

    // once landed, stop redrawing every frame — the canvas keeps showing
    // the last painted (landed) frame with no extra cost
    function handleEnded() {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    video.addEventListener('ended', handleEnded)

    // canvas starts fully blank — nothing is drawn until play() is called

    return () => {
      cancelled = true
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      <video
        ref={videoRef}
        src={butterflyVideoSrc}
        muted
        loop={false}
        playsInline
        preload="auto"
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 10px 14px rgba(90,22,32,0.35))',
        }}
      />
    </div>
  )
})

export default ChromaButterfly
