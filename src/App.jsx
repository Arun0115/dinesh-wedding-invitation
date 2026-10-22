import { useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Opening from './components/Opening.jsx'
import PetalField from './components/PetalField.jsx'
import InvitationReveal from './components/InvitationReveal.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import FamilyBlessings from './components/FamilyBlessings.jsx'
import Gallery from './components/Gallery.jsx'
import WeddingCeremony from './components/WeddingCeremony.jsx'
import Reception from './components/Reception.jsx'
import ThankYou from './components/ThankYou.jsx'
import floralFrameSrc from './assets/decorations/floral-frame.mp4'

gsap.registerPlugin(ScrollTrigger)

// Every ScrollTrigger created anywhere in the app (in any section component)
// will watch #scroll-root instead of the browser window, because the actual
// page body never scrolls anymore — see the layout note below. This one line,
// run once when this module loads (before any component mounts or registers
// its own ScrollTrigger), is enough to redirect all of them.
ScrollTrigger.defaults({ scroller: '#scroll-root' })

const GOLD_RAIN_COLORS = ['#E8C87A', '#D4AF37', '#F0D488', '#C9A227', '#EFCB68']

function App() {
  const [stage, setStage] = useState('opening')

  return (
    <main className="h-full">
      {stage === 'opening' && <Opening onOpen={() => setStage('main')} />}

      {stage === 'main' && (
        <div className="relative h-full">
          {/* one shared decorative backdrop — truly fixed to the viewport, and
              structurally outside the scrolling container below, so it is
              physically impossible for it to move while scrolling */}
          <div
            className="fixed inset-0 z-0 flex justify-center overflow-hidden bg-ivory"
            style={{ height: '100svh' }}
          >
            <div className="relative h-full w-full" style={{ maxWidth: '520px' }}>
              <video
                src={floralFrameSrc}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* light GOLDEN rain over the whole site — also fixed, also outside
              the scrolling container, so it never jumps either */}
          <PetalField count={9} fixed light colors={GOLD_RAIN_COLORS} />

          {/* the ONE scrollable element on the whole page — every section
              scrolls inside here, never the browser window itself */}
          <div
            id="scroll-root"
            className="relative z-10 h-full overflow-y-auto"
            style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'contain' }}
          >
            <InvitationReveal />
            <SaveTheDate />
            {/* Family Blessings section removed — felt too lengthy. FamilyBlessings.jsx still exists if wanted back. */}
            <Gallery />
            <WeddingCeremony />
            <Reception />
            <ThankYou />
            {/* RSVP section omitted for now — RSVP.jsx still exists, just not rendered */}
            {/* more sections get added here, one per step, in scroll order */}
          </div>
        </div>
      )}
    </main>
  )
}

export default App
