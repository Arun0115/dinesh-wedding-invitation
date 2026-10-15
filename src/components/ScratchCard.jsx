import { useEffect, useRef } from 'react'

export default function ScratchCard({ label, value, onReveal }) {
  const onRevealRef = useRef(onReveal)
  onRevealRef.current = onReveal
  const canvasRef = useRef(null)
  const boxRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const box = boxRef.current
    const ctx = canvas.getContext('2d')
    let w, h

    function paintFoil() {
      const rect = box.getBoundingClientRect()
      w = canvas.width = rect.width
      h = canvas.height = rect.height

      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, '#F7EFDC')
      grad.addColorStop(0.5, '#E8D3A3')
      grad.addColorStop(1, '#F7EFDC')
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.font = '10px Poppins, sans-serif'
      for (let i = 0; i < 10; i++) {
        ctx.fillText('✦', Math.random() * w, Math.random() * h)
      }

      ctx.fillStyle = '#7A1F2B'
      ctx.font = '11px Poppins, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('SCRATCH', w / 2, h / 2 + 4)

      ctx.globalCompositeOperation = 'destination-out'
    }

    paintFoil()
    window.addEventListener('resize', paintFoil)

    let scratching = false
    let revealed = false

    function pos(e) {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    function scratchAt(x, y) {
      ctx.beginPath()
      ctx.arc(x, y, 18, 0, Math.PI * 2)
      ctx.fill()
    }

    function checkCleared() {
      const data = ctx.getImageData(0, 0, w, h).data
      let transparent = 0
      let samples = 0
      const step = 40
      for (let p = 3; p < data.length; p += 4 * step) {
        samples++
        if (data[p] < 40) transparent++
      }
      if (transparent / samples > 0.45) {
        canvas.style.transition = 'opacity .5s ease'
        canvas.style.opacity = '0'
        canvas.style.pointerEvents = 'none'
        if (!revealed) {
          revealed = true
          onRevealRef.current && onRevealRef.current()
        }
      }
    }

    function start(e) {
      scratching = true
      const p = pos(e)
      scratchAt(p.x, p.y)
      e.preventDefault()
    }
    function move(e) {
      if (!scratching) return
      const p = pos(e)
      scratchAt(p.x, p.y)
      e.preventDefault()
    }
    function end() {
      if (!scratching) return
      scratching = false
      checkCleared()
    }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', move)
    window.addEventListener('mouseup', end)
    canvas.addEventListener('touchstart', start, { passive: false })
    canvas.addEventListener('touchmove', move, { passive: false })
    canvas.addEventListener('touchend', end)

    return () => {
      window.removeEventListener('resize', paintFoil)
      window.removeEventListener('mouseup', end)
    }
  }, [])

  return (
    <div
      ref={boxRef}
      className="relative w-[92px] h-[88px] sm:w-[104px] sm:h-[96px] rounded-xl overflow-hidden border border-gold-soft bg-ivory"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[9px] tracking-[0.15em] text-maroon/70">{label}</span>
        <span className="font-display text-2xl text-maroon-deep mt-0.5">{value}</span>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full touch-none cursor-grab" />
    </div>
  )
}
