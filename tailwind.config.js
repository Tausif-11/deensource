module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // DeenSource brand palette (finalized)
        deen: {
          dark: '#0f3b2a',
          mid: '#14532d',
          light: '#86efac',
          gold: '#fbbf24'
        },
        // Light and dark neutrals
        cream: '#fefce8',
        charcoal: '#0b0b0d',
        slate: '#111827'
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(180deg, rgba(7,7,9,1) 0%, rgba(20,20,26,1) 50%, rgba(20,32,27,1) 100%)',
        'gold-accent': 'linear-gradient(90deg,#fbbf24,#f59e0b)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        arabic: ['"Noto Naskh Arabic"', 'serif']
      },
      boxShadow: {
        'soft-md': '0 6px 20px rgba(2,6,23,0.5)'
      }
    },
  },
  plugins: [],
}
