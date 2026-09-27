import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Site redesign (2026) tokens. Values live in CSS variables in app/globals.css
        // so the public site can switch to a dark palette with prefers-color-scheme.
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        night: 'rgb(var(--night) / <alpha-value>)',
        'night-ink': 'rgb(var(--night-ink) / <alpha-value>)',
        'night-muted': 'rgb(var(--night-muted) / <alpha-value>)',
        'night-accent': 'rgb(var(--night-accent) / <alpha-value>)',

        // Original palette (2025). Still used by /gphl, /playoffhockey, /workouts
        // and the playground demos, so keep these as they are.
        navy: {
          DEFAULT: '#192332',
          darker: '#130CC9',
        },
        slate: '#4B5564',
        bronze: '#A6602C',
        'off-white': '#F5F5F0',
        beige: {
          DEFAULT: '#EDDDCC',
          warm: '#C9C8C5',
        },
        gold: {
          light: '#FAAE1B',
          dark: '#B8860B',
        },
        red: {
          patriot: '#FF0000',
          medium: '#DC0000',
          dark: '#B40000',
        },
        green: {
          medium: '#1A612D',
          forest: '#005000',
          bright: '#12BD6E',
          standard: '#006400',
        },
        orange: {
          burnt: '#D65117',
        },
        gray: {
          dark: '#212226',
        },
      },
      fontFamily: {
        // Loaded with next/font in app/(site)/layout.tsx.
        heading: ['var(--font-heading)', '"Arial Narrow"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Charter', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Winner Sans Soft',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
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
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
