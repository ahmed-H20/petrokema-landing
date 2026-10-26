/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: {
            DEFAULT: '#0f1f38',
            deep: '#0a1526',
            light: '#1b2d4b',
            accent: '#223c63',
          },
          orange: {
            DEFAULT: '#e85d26',
            hover: '#cf4e1b',
            light: '#ff7a45',
            soft: '#fff4ed',
          },
          blue: {
            DEFAULT: '#1d4ed8',
            vibrant: '#2563eb',
            teal: '#0891b2',
          },
          emerald: '#10b981',
          gold: '#f59e0b',
        },
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(15, 31, 56, 0.08), 0 4px 6px -2px rgba(15, 31, 56, 0.03)',
        'card-hover': '0 20px 35px -5px rgba(15, 31, 56, 0.15), 0 10px 10px -5px rgba(15, 31, 56, 0.04)',
        'hero-btn': '0 10px 20px rgba(232, 93, 38, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
