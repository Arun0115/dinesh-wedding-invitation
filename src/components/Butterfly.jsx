export default function Butterfly({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="wing-left">
        <path
          d="M50 40 C 30 5, -2 8, 4 35 C -2 58, 30 66, 50 40 Z"
          fill="#FBF6EC"
          stroke="#C9A24B"
          strokeWidth="1.4"
        />
        <path
          d="M48 40 C 34 24, 16 26, 16 38 C 16 48, 32 52, 48 42 Z"
          fill="#F3EAD6"
          stroke="#C9A24B"
          strokeWidth="0.8"
          opacity="0.8"
        />
      </g>
      <g className="wing-right">
        <path
          d="M50 40 C 70 5, 102 8, 96 35 C 102 58, 70 66, 50 40 Z"
          fill="#FBF6EC"
          stroke="#C9A24B"
          strokeWidth="1.4"
        />
        <path
          d="M52 40 C 66 24, 84 26, 84 38 C 84 48, 68 52, 52 42 Z"
          fill="#F3EAD6"
          stroke="#C9A24B"
          strokeWidth="0.8"
          opacity="0.8"
        />
      </g>
      <line x1="50" y1="18" x2="50" y2="62" stroke="#7A1F2B" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="50" cy="18" r="2.2" fill="#7A1F2B" />
    </svg>
  )
}
