/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        'colorG': '#F5F5F4',
        'colorB': '#86EFAC',
        'colorW': '#FFFFFF',
        'colorDB': '#4ADE80',
        'colorLB': '#CFFAFE',
        'colorDG': '#57534E',
        'colorG7': '#44403C',
        'colorG1': '#F5F5F4',
        'colorStar': '#F59E0B',
        'exit': '#EF4444',
        'colorG4': '#D6D3D1',
        'colorLB': '#D1FAE5',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        readex: ['Readex Pro', 'sans-serif'],
      },
      boxShadow: {
        shadow1: '4.1px -5px 0 0 #8BC34A',
        shadow2: '-4.1px -5px 0 0 #8BC34A'
      },
      keyframes: {
        'spinner-grow': {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        'spinner-grow': 'spinner-grow 0.8s ease-in-out infinite',
      },
      rotate: {
        '135': '135deg',
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      md: "768px",
      // md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
