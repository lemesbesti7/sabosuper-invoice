/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          50: '#f5f5f6',
          100: '#e5e5ea',
          200: '#cdcdd5',
          300: '#aaaab6',
          400: '#80808f',
          500: '#656574',
          600: '#565662',
          700: '#4a4a53',
          800: '#404047',
          900: '#18181f',
          950: '#0a0a0f',
        },
        surface: {
          DEFAULT: '#12121a',
          light: '#1a1a2e',
          border: '#2a2a3e',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          green: '#10b981',
          cyan: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'glow-violet': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.3)',
        'glow-md': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 40px -10px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
};
