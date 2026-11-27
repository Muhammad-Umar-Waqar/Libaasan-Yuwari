/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#0F4C4A',
          deep: '#0A3634',
          soft: '#1B5F5C',
        },
        gold: {
          DEFAULT: '#B48A4A',
          soft: '#D9BC86',
          ink: '#8A6428',
        },
        blush: '#E8BBAA',
        cream: '#FBF8F1',
        arch: '#F5ECDD',
        ink: '#1D2A29',
        muted: '#5C6967',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        hand: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        arabic: ['"Amiri"', '"Traditional Arabic"', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
    },
  },
  plugins: [],
};
