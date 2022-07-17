module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#008ef1',
          25: '#0088ff',
          50: 'rgba(0, 128, 255, 0.8)',
          100: '#0096ff',
          200: '#73b9ff',
          400: '#16487a',
          500: '#2c4776',
          600: '#003366',
          700: 'rgba(2, 28, 48, 0.2)',
          800: '#00264d',
          850: 'rgba(2, 28, 48, 0.4)',
          900: '#001031',
          1000: '#00020e'
        },
        gray: {
          DEFAULT: '#4a4a4a',
          100: '#d2d2d2',
          200: '#ccc'
        },
        fire: {
          DEFAULT: '#f5222d'
        },
        accent: '#1295f3',
        'light-blue': '#63bfff',
        'off-black': '#1f1f1f',
        midnight: '#010007'
      }
    }
  },
  plugins: []
}
