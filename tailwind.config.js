const colours = require('tailwindcss/colors')
const screenSizes = require('./src/constants/screen_sizes')

const macSystemSansSerif = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
]

const solarizedColours = {
  base: {
    '03': '#002b36', // L* 15
    '02': '#073642', // L* 20
    '01': '#586e75', // L* 45
    '00': '#657b83', // L* 50
    0: '#839496', // L* 60
    1: '#93a1a1', // L* 65
    2: '#eee8d5', // L* 92
    3: '#fdf6e3', // L* 97
  },
  accent: {
    y: '#b58900', // yellow; Split comp
    o: '#cb4b16', // orange; Complement
    r: '#dc322f', // red; Triad
    m: '#d33682', // magenta; Tetrad
    v: '#6c71c4', // violet; Analogous
    b: '#268bd2', // blue; Monotone
    c: '#2aa198', // cyan; Analogous
    g: '#859900', // green; Tetrad
  },
}

module.exports = {
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,css}',
  ],
  darkMode: false,
  theme: {
    extend: {
      cursor: {
        help: 'help',
      },
    },
    screens: {
      ...Object.fromEntries(
        Object.entries(screenSizes.screenSizes)
          .map(([k, v]) => [k, v === 0 ? `${v}` : `${v}px`]),
      ),
    },
    colors: {
      tx: 'transparent',
      curr: 'currentColor',
      white: colours.white,
      black: colours.black,
      sol: {
        ...solarizedColours.accent,
        ...solarizedColours.base,
      },
    },
    fontFamily: {
      'sans-variable': [
        '"Inter var"', // Inter (variable)
        'ui-sans-serif', // system
        ...macSystemSansSerif, // macOS
        'sans-serif', // generic fallback
      ],
      sans: [
        'Inter', // Inter (standard)
        'ui-sans-serif', // system
        ...macSystemSansSerif, // macOS
        'sans-serif', // generic fallback
      ],
      mono: [
        '"JetBrains Mono"', // JetBrains Mono
        'ui-monospace', // system
        'monospace', // generic fallback
      ],
    },
  },
  variants: {
    extend: {
      padding: ['first', 'last'],
    },
  },
}
