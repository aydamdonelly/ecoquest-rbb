// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Updated from "purge" to "content"
  darkMode: 'class', // Enables dark mode with the 'class' strategy
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC',
        dark: '#1A1A19',
        darkLighter: '#2A2A28',
        greenLight: '#A4C465',
        greenDark: '#859F3D',
      },
    },
  },
  plugins: [],
};
