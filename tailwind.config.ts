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
        'slide-in-right': 'slideInRight .6s ease-out both',
        'scale-up': 'scaleUp .35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(22px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleUp: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-9px)' } },
        pulseSubtle: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.94', transform: 'scale(1.02)' } },
        glow: { '0%,100%': { filter: 'drop-shadow(0 0 15px rgba(24, 169, 229, 0.25))' }, '50%': { filter: 'drop-shadow(0 0 28px rgba(24, 169, 229, 0.55))' } },
      },
    },
  },
  plugins: [],
};
export default config;
