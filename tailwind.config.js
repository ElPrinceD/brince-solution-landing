/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5c1b52',
          50: '#f5f0f5',
          100: '#e8d8e7',
          200: '#d4b5d2',
          300: '#b887b4',
          400: '#9a5f94',
          500: '#5c1b52',
          600: '#4d1745',
          700: '#3f1438',
          800: '#31112b',
          900: '#230e1e',
        },
        navy: {
          DEFAULT: '#0a1929',
          50: '#e6f0f8',
          100: '#cce1f1',
          200: '#99c3e3',
          300: '#66a5d5',
          400: '#3387c7',
          500: '#0a1929',
          600: '#081421',
          700: '#060f19',
          800: '#040a10',
          900: '#020508',
        },
        silver: {
          DEFAULT: '#cbd5e1',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

