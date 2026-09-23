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
        'fade-in': 'fadeIn .6s ease-out both',
        'slide-up': 'slideUp .65s ease-out both',
        'slide-in-right': 'slideInRight .55s ease-out both',
        'scale-up': 'scaleUp .3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'float': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
        'ping-slow': 'pingSlow 2.5s ease-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(18px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleUp: { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        // float: NO scale, only vertical translate — prevents conflict with hover transforms
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-5px)' } },
        // pulse-subtle: opacity only, NO scale — scale on buttons conflicts with hover:-translate-y causing bounce
        pulseSubtle: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.82' } },
        glow: { '0%,100%': { filter: 'drop-shadow(0 0 8px rgba(24, 169, 229, 0.2))' }, '50%': { filter: 'drop-shadow(0 0 18px rgba(24, 169, 229, 0.45))' } },
        pingSlow: { '0%': { transform: 'scale(1)', opacity: '0.75' }, '100%': { transform: 'scale(2)', opacity: '0' } },
      },
    },
  },
  plugins: [],
};
export default config;
