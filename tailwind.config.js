/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        Blue: '#003671',
        unahBlueDark: '#0b1f3b',
        unahYellow: '#f4c000',
        unahCard: '#173d7a',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.20)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 20%), linear-gradient(135deg, #003671, #0f4b91)',
      }
    },
  },
  plugins: [],
}
