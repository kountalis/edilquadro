/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'visby': ['Visby CF', 'sans-serif'],
      },
      backgroundColor: {
        'navbar': '#1C1C1C',
        'light-gray': '#F5F5F5',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23333333' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-slower': 'float 16s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, 20px)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        }
      },
      colors: {
        whatsapp: '#0C462D',
        whatsappDark: '#041B13',
        dark: '#1C1C1C',
        greenDark: '#006400',
        greenDarker: '#004d00',
        viber: '#5C42D1',
        viberDark: '#31217B',
        'cta-green': {
          DEFAULT: '#0F4C2F',
          dark: '#061D14',
          light: '#1A6948',
        },
        grayBg: '#2d3436',
        // altri colori custom se servono
      }
    },
  },
  plugins: [],
}