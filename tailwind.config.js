/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./apps/*/src/**/*.{js,ts,jsx,tsx,html,astro}",
      "./libs/*/src/**/*.{js,ts,jsx,tsx,html,astro,css}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }