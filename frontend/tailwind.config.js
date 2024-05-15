/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '28p': '28%',
        '68': '68%'

      },
      width: {
        '47': '47%'
      },
    },
  },
  plugins: [],
}