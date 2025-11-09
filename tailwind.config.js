module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        // DeenSource brand palette (adjustable)
        deen: {
          DEFAULT: '#0f766e', // teal-700 like
          light: '#34d399',
          dark: '#064e3b'
        },
        accent: {
          DEFAULT: '#0ea5a4'
        }
      }
    },
  },
  plugins: [],
}
