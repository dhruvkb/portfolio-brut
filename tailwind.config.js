const screenSizes = require('./src/constants/screen_sizes')
const solarizedColours = require('./src/constants/colours')

const macSystemSansSerif = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
]

module.exports = {
  // mode: 'jit',
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,css}',
  ],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        ch: '1ch',
        indent: '2ch',
        ln: '2ex',
      },
      cursor: {
        help: 'help',
      },
      fontSize: {
        mono: ['0.875rem', '1.2'],
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
      white: '#ffffff',
      black: '#000000',
      sol: {
        ...solarizedColours.colors.accent,
        ...solarizedColours.colors.base,
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
