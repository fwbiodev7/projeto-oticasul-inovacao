import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--brand-primary) / <alpha-value>)',
        accent: 'rgb(var(--brand-accent) / <alpha-value>)',
        light: 'rgb(var(--brand-light) / <alpha-value>)',
        ink: 'rgb(var(--brand-ink) / <alpha-value>)',
        paper: 'rgb(var(--brand-paper) / <alpha-value>)',
        lime: 'rgb(var(--brand-lime) / <alpha-value>)',
      },
      fontFamily: { sans: ['Arial', 'Helvetica', 'sans-serif'] },
      boxShadow: { soft: '0 18px 55px rgba(6, 51, 92, .08)' },
      animation: {
        'fade-in': 'fadeIn .4s ease-out both',
        'scale-up': 'scaleUp .25s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ping-slow': 'pingSlow 3s ease-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        scaleUp: { from: { opacity: '0', transform: 'scale(0.97)' }, to: { opacity: '1', transform: 'scale(1)' } },
        pingSlow: { '0%': { transform: 'scale(1)', opacity: '0.75' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
      },
    },
  },
  plugins: [],
};
export default config;
