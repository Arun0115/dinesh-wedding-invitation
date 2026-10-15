// A small embossed botanical flourish for the envelope's corners —
// pass a Tailwind text-color class via `className` (uses currentColor),
// and flipX/flipY to mirror it into each of the 4 corners.
export default function FloralCorner({ className = '', flipX = false, flipY = false, opacity = 0.4, rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      style={{
        width: 46,
        height: 46,
        opacity,
        transform: `scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1}) rotate(${rotate}deg)`,
      }}
    >
      <path
        d="M2,58 C10,42 7,24 20,12 C27,5 33,7 36,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M13,33 C9,29 5,29 3,33 C5,37 9,37 13,33 Z" fill="currentColor" opacity="0.75" />
      <path d="M21,20 C17,16 13,16 11,20 C13,24 17,24 21,20 Z" fill="currentColor" opacity="0.75" />
      <circle cx="34" cy="6" r="3" fill="currentColor" opacity="0.85" />
      <circle cx="29" cy="3" r="1.8" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
