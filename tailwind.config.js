module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        // DeenSource brand palette (finalized)
        deen: {
          dark: '#14532d',
          mid: '#15803d',
          light: '#86efac',
          gold: '#fbbf24'
        }
        ,
        // Light cream background used site-wide
        cream: '#fefce8'
      }
    },
  },
  plugins: [],
}
