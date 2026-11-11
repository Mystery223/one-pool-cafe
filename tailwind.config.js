/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          50:  '#f4f0e8',
          100: '#e4dccc',
          200: '#c8b898',
          300: '#a89060',
          400: '#8a7040',
          500: '#6b5528',
          600: '#4e3c18',
          700: '#342810',
          800: '#1e1608',
          900: '#120e05',
          950: '#0a0704',
        },
        gold: {
          100: '#f5ead6',
          200: '#edd5a8',
          300: '#deba78',
          400: '#c9a050',
          500: '#b58a36',
          600: '#9a7228',
          700: '#7d5b1e',
          800: '#5f4415',
          900: '#3f2d0d',
        },
        parchment: {
          50:  '#fdfbf6',
          100: '#faf6ed',
          200: '#f4ecda',
          300: '#ecdfc3',
          400: '#e0ceaa',
          500: '#d0ba8e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.45em',
      },
      animation: {
        'fade-up':   'fadeUp 0.8s ease-out forwards',
        'fade-in':   'fadeIn 1s ease-out forwards',
        'scale-in':  'scaleIn 0.6s ease-out forwards',
        'line-grow': 'lineGrow 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
