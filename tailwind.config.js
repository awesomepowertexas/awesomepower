/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'open-sans': ["'Open Sans'", 'sans-serif'],
      solway: ['"Solway"', 'serif'],
    },
    extend: {
      // eslint-disable-next-line
      maxWidth: ({ theme }) => ({
        ...theme('spacing'), // eslint-disable-line
      }),
      // eslint-disable-next-line
      minHeight: ({ theme }) => ({
        ...theme('spacing'), // eslint-disable-line
      }),
      // eslint-disable-next-line
      minWidth: ({ theme }) => ({
        ...theme('spacing'), // eslint-disable-line
      }),
      spacing: {
        88: '22rem',
        96: '24rem',
        104: '26rem',
        112: '28rem',
        120: '30rem',
        128: '32rem',
        136: '34rem',
        144: '36rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
