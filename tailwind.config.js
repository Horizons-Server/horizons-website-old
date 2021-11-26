// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: {
    content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: ['dark'], //specific classes
    },
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    typography: (theme) => ({}),
    fontFamily: {
      display: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      body: [
        'Open\\ Sans',
        'Ubuntu',
        'ui-sans-serif',
        ' system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe\\ UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto\\ Sans',
        'sans-serif',
        'Apple\\ Color\\ Emoji',
        'Segoe\\ UI\\ Emoji',
        'Segoe\\ UI\\ Symbol',
        'Noto\\ Color\\ Emoji',
      ],
    },
    extend: {
      typography: (theme) => ({
        dark: {
          css: {
            color: 'white',
          },
        },
      }),
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
