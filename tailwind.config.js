/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1920px',
    },
    extend: {
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primaryHover)',
        danger: 'var(--color-danger)',
        dangerHover: 'var(--color-dangerHover)',
        warning: 'var(--color-warning)',
        warningHover: 'var(--color-warningHover)',
        success: 'var(--color-success)',
        successHover: 'var(--color-successHover)',
      },
    },
  },
  plugins: [],
}

