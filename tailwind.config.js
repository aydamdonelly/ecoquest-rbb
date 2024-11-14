// tailwind.config.js
module.exports = {
  darkMode: 'class', // Aktiviert Dark Mode über eine Klasse
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkTeal: '#1f4748',
        buttonGreen: '#a4c465',
        backgroundLight: '#e2edf3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Moderne Schriftart
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
    },
  },
  plugins: [],
}
