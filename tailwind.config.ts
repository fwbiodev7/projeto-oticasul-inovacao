import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A3766',
        accent: '#18A9E5',
        light: '#F4F9FC',
        ink: '#12395D',
      },
      fontFamily: { sans: ['Inter', 'Arial', 'sans-serif'] },
      boxShadow: { soft: '0 18px 55px rgba(6, 51, 92, .08)' },
      animation: {
        'fade-in': 'fadeIn .7s ease-out both',
        'slide-up': 'slideUp .7s ease-out both',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(22px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-9px)' } },
      },
    },
  },
  plugins: [],
};
export default config;
