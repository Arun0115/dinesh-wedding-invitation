/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF6EC',
        'ivory-deep': '#F3EAD6',
        maroon: '#7A1F2B',
        'maroon-deep': '#5A1620',
        gold: '#D8A3AA',
        'gold-soft': '#F2DEE1',
        ink: '#2B2118',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
        tamil: ['"Noto Serif Tamil"', 'serif'],
      },
    },
  },
  plugins: [],
}
