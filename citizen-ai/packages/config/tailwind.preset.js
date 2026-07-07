/** @type {import('tailwindcss').Config} */
// CitizenAI Design System — Stitch Design Tokens (Deep Space Dark)
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Surface & Background (Deep Space)
        'surface': '#001233',
        'surface-dim': '#001233',
        'surface-bright': '#25385f',
        'surface-container-lowest': '#000d29',
        'surface-container-low': '#031a40',
        'surface-container': '#071e44',
        'surface-container-high': '#14294f',
        'surface-container-highest': '#20345b',
        'surface-variant': '#20345b',
        'background': '#001233',
        // On-Surface
        'on-surface': '#d8e2ff',
        'on-surface-variant': '#c3c6d6',
        'on-background': '#d8e2ff',
        // Primary (Royal Azure)
        'primary': '#b2c5ff',
        'on-primary': '#002b73',
        'primary-container': '#0052cc',
        'on-primary-container': '#c4d2ff',
        'primary-fixed': '#dae2ff',
        'primary-fixed-dim': '#b2c5ff',
        'on-primary-fixed': '#001848',
        'on-primary-fixed-variant': '#0040a2',
        'inverse-primary': '#0c56d0',
        // Secondary (Emerald)
        'secondary': '#40e56c',
        'on-secondary': '#003912',
        'secondary-container': '#02c953',
        'on-secondary-container': '#004d1b',
        'secondary-fixed': '#69ff87',
        'secondary-fixed-dim': '#3ce36a',
        'on-secondary-fixed': '#002108',
        'on-secondary-fixed-variant': '#00531e',
        // Tertiary (Purple — AI Glow)
        'tertiary': '#edb1ff',
        'on-tertiary': '#520070',
        'tertiary-container': '#8438a2',
        'on-tertiary-container': '#f2c2ff',
        'tertiary-fixed': '#f9d8ff',
        'tertiary-fixed-dim': '#edb1ff',
        'on-tertiary-fixed': '#320046',
        'on-tertiary-fixed-variant': '#6e208c',
        // Error
        'error': '#ffb4ab',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        // Outline
        'outline': '#8d90a0',
        'outline-variant': '#434654',
        // Inverse
        'inverse-surface': '#d8e2ff',
        'inverse-on-surface': '#1c3056',
        'surface-tint': '#b2c5ff',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        'unit': '8px',
        'gutter': '24px',
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        'section-gap': '120px',
        'container-max': '1440px',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'headline-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title-md': ['24px', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0052cc 0%, #8438a2 100%)',
        'gradient-aurora': 'radial-gradient(ellipse at 20% 50%, rgba(0,82,204,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(132,56,162,0.25) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(2,201,83,0.15) 0%, transparent 60%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0,18,51,0.37)',
        'glass-lg': '0 16px 64px 0 rgba(0,18,51,0.5)',
        'glow-primary': '0 0 20px rgba(0,82,204,0.4)',
        'glow-tertiary': '0 0 40px rgba(132,56,162,0.5)',
        'glow-secondary': '0 0 20px rgba(2,201,83,0.4)',
        'orb': '0 0 80px 20px rgba(132,56,162,0.4)',
        'card': 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px 0 rgba(0,18,51,0.37)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'aurora': 'aurora 15s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 60px 10px rgba(132,56,162,0.3)', transform: 'scale(0.98)' },
          '100%': { boxShadow: '0 0 100px 30px rgba(132,56,162,0.6)', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        'glass': '40px',
        'glass-sm': '20px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
