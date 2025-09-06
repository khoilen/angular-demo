/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#5f6FFF',
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
};
