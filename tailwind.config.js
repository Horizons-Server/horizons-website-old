// tailwind.config.js
module.exports = {
  mode: 'jit',
  content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Montserrat', 'sans-serif'],
      body: ['Open\\ Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'horz-green': {
          DEFAULT: '#144d29',
        },
        'horz-blue': {
          DEFAULT: '#0036e8',
        },
      },
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
