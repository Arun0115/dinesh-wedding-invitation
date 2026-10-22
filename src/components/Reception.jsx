import EventCard from './EventCard.jsx'
import weddingData from '../data/weddingData.js'

export default function Reception() {
  const { reception } = weddingData
  return (
    <EventCard
      sectionId="reception"
      nextTargetId="thank-you"
      dateLine={reception.displayDate.toUpperCase().replace(',', ' ·')}
      title="Reception"
      startTime={reception.startTime}
      venueName={reception.venueName}
      venueAddress={reception.venueAddress}
      mapUrl={reception.mapUrl}
      schedule={reception.schedule}
    />
  )
}
