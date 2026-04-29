import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:        '#1b1918',
        charcoal:   '#2d2726',
        cream:      '#e8dfcf',
        burgundy:   '#7a1f24',
        sky:        '#2f5d7a',
        chartreuse: '#c4bc55',
        orange:     '#e67545',
        tobacco:    '#6b4d36',
        stone:      '#cfccc5',
      },
      fontFamily: {
        display: ['"commuters-sans"', 'Inter', 'sans-serif'],
        ui:      ['"Mytupi"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
        nav:     '0.16em',
        cta:     '0.20em',
        tight:   '-0.035em',
        tighter: '-0.04em',
      },
      maxWidth: { wrap: '1440px' },
      screens:  { tablet: '900px' },
    },
  },
  plugins: [],
}

export default config
