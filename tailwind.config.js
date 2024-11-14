// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        dark: '#1A1A19',
        greenDark: '#31511E',
        greenLight: '#859F3D',
        cream: '#F6FCDF',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
