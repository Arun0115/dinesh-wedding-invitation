import { useState } from 'react'
import Opening from './components/Opening.jsx'
import PetalField from './components/PetalField.jsx'

const GOLD_RAIN_COLORS = ['#E8C87A', '#D4AF37', '#F0D488', '#C9A227', '#EFCB68']
import InvitationReveal from './components/InvitationReveal.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import FamilyBlessings from './components/FamilyBlessings.jsx'
import Gallery from './components/Gallery.jsx'
import WeddingCeremony from './components/WeddingCeremony.jsx'
import Reception from './components/Reception.jsx'
import ThankYou from './components/ThankYou.jsx'
import floralFrameSrc from './assets/decorations/floral-frame.mp4'

function App() {
  const [stage, setStage] = useState('opening')

  return (
    <main className="min-h-screen">
      {stage === 'opening' && <Opening onOpen={() => setStage('main')} />}

      {stage === 'main' && (
        <div className="relative">
          {/* one shared decorative backdrop, fixed behind every section from here on */}
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

          {/* light GOLDEN rain over the whole site — separate from the pastel petals
              on the opening screen, and separate from the scratch-card sparkle burst */}
          <PetalField count={9} fixed light colors={GOLD_RAIN_COLORS} />

          {/* section content scrolls on top of the fixed backdrop */}
          <div className="relative z-10">
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
