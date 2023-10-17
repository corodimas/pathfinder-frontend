/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:
      {
        sans:["joystix", "sans"],
        pixelus:["pixelus","sans"]
      },
      keyframes: {
        'moving-background': {
          'from': {
            'background-position': '0 0',
          },
          'to': {
            'background-position': '-10000px 0',
          },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
      animation:
      {
        'moving-background':'moving-background 250s linear infinite',
         'wiggle': 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}