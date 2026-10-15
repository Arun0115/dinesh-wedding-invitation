// Reusable "scroll to next section" button, styled like the VIEW ON MAP buttons.
// Used on every section from Save the Date onward (Invitation Reveal keeps its
// own distinct "SCROLL TO REVEAL" button, and Thank You has nothing after it).
export default function ScrollDownButton({ targetId, className = '' }) {
  function handleClick() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to next section"
      className={`w-11 h-11 rounded-full bg-maroon text-ivory flex items-center justify-center shadow-lg shadow-maroon/25 active:scale-95 transition-transform ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v14M6 13l6 6 6-6" />
      </svg>
    </button>
  )
}
