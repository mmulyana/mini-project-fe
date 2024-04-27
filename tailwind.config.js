/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        btn: '0 1px 2px 0 rgba(0,0,0,0.12)',
        dialog: '0 4px 4px 0 rgba(0,0,0,0.08)',
      },
      colors: {
        neutral: {
          40: '#E0E0E0',
          50: '#EDEDED',
          70: '#757575',
          90: '#404040',
          100: '#1D1F20',
        },
        primary: '#01959F',
        danger: '#E11428',
        secondary: '#1D1F20',
        success: '#43936C',
      },
    },
  },
  plugins: [],
}
