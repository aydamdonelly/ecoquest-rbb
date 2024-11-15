// tailwind.config.js

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC',
        dark: '#1A1A19',
        greenLight: '#A4C465',
        greenDark: '#31511E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
