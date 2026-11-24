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
        display: ['"Cormorant Garamond"', '"Iowan Old Style"', 'Georgia', 'serif'],
        body: ['"Nunito Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', '"Comic Sans MS"', 'cursive'],
        arabic: ['"Amiri"', '"Traditional Arabic"', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif'],
      },
    },
  },
  plugins: [],
};
