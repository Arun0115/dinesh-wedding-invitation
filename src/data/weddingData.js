// ============================================================
// All wedding-specific content lives here.
// Every component reads from this file instead of hardcoding
// text, so the same project can be reused for another wedding
// just by editing this one file (plus the photos folder).
// ============================================================

const weddingData = {
  invocation: {
    tamilHeading: 'திருமணம் அழைப்பிதழ்',
    kuralText: 'அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை\nபண்பும் பயனும் அது.',
    kuralAttribution: '— திருக்குறள் 45',
    blessing:
      'With the blessings of the Almighty and our beloved families, we joyfully invite you to grace the wedding of',
  },

  couple: {
    brideName: 'Harinisri S',
    groomName: 'Dinesh R',
    brideParents: 'D/o Mr. Sakthivel R & Mrs. Chandramathi D',
    groomParents: 'S/o Mr. Rajan G & Mrs. Sivashankari M',
  },

  wedding: {
    isoDate: '2026-11-13T04:30:00', // used by the countdown — keep in ISO format
    displayDate: 'Friday, 13 November 2026',
    time: '4:30 AM – 6:30 AM', // muhurtham range
    startTime: '4:30 AM', // shown as "FROM 4:30 AM ONWARDS"
    tagline: 'A new chapter, woven with two hearts and the blessings of family',
    venueName: 'Verakeswarar Temple',
    venueAddress: 'R. Pattanam, Tamil Nadu',
    mapUrl:
      'https://www.google.com/maps/place/Verakeswarar+Temple/@11.4741554,78.2077451,17.94z/data=!4m15!1m8!3m7!1s0x3babea0435341f55:0x447954ba6cbce842!2sR.Pattanam,+Tamil+Nadu!3b1!8m2!3d11.4716022!4d78.2087518!16s%2Fm%2F0gvqy9p!3m5!1s0x3babea048fbdf0a3:0xd67830f7d69e69a0!8m2!3d11.4752837!4d78.2086242!16s%2Fg%2F11cjkpt3jt',
  },

  reception: {
    isoDate: '2026-11-13T10:00:00',
    displayDate: 'Friday, 13 November 2026',
    startTime: '7:00 AM', // shown as "FROM 7:00 AM ONWARDS"
    schedule: [],
    venueName: 'Rangasamy Thirumana Mandabam',
    venueAddress: 'R. Pattanam, Tamil Nadu',
    mapUrl:
      'https://www.google.com/maps/place/RANGASAMY+THIRUMANA+MANDABAM/@11.4748139,78.2148046,17.23z/data=!4m15!1m8!3m7!1s0x3babea0435341f55:0x447954ba6cbce842!2sR.Pattanam,+Tamil+Nadu!3b1!8m2!3d11.4716022!4d78.2087518!16s%2Fm%2F0gvqy9p!3m5!1s0x3babebe2c3fa0ec1:0x24761cb210525c56!8m2!3d11.474696!4d78.215103!16s%2Fg%2F11q3cm49tn',
  },

  rsvp: {
    whatsappNumber: '919952745836', // include country code, digits only
    message: "We're delighted to accept the invitation for Dinesh & Harini Sri's wedding!",
  },

  // Each entry becomes one card in the "Our Story" section
  story: [
    { year: '2018', text: 'We met as college classmates.' },
    { year: '2020', text: 'Friendship quietly became something more.' },
    { year: '2024', text: 'Our families met, and it felt like coming home.' },
    { year: '2025', text: 'He asked, she said yes — surrounded by loved ones.' },
    { year: '2026', text: 'And now, two hearts begin one beautiful journey.' },
  ],

  // Filenames only — actual files live in src/assets/photos/thumb and /full
  gallery: [
    { file: 'photo-01.webp', caption: 'Exchanging rings, blessed by family' },
    { file: 'photo-02.webp', caption: 'A tender moment' },
    { file: 'photo-03.webp', caption: 'A little silliness, a lot of love' },
    { file: 'photo-04.webp', caption: 'Laughter and light hearts' },
    { file: 'photo-05.webp', caption: 'Seeking blessings together' },
    { file: 'photo-06.webp', caption: 'Surrounded by loved ones' },
    { file: 'photo-07.webp', caption: "With Harinisri's loving family" },
    { file: 'photo-08.webp', caption: "With Dinesh's loving family" },
  ],

  timeline: [
    { time: '4:30 – 6:30 AM', label: 'Muhurtham' },
  ],
}

export default weddingData
