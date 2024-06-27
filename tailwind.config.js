
const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'header': ['"Bodoni Moda"'],
        'body': ['Inter'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'black': '#0f172a',
        'gray': '#727579',
      },
      screens: {
        'xxs': '375px',
        'xs': '425px',
        ...defaultTheme.screens,
        '3xl': '2108px'
      },
    },
    plugins: [],
  }