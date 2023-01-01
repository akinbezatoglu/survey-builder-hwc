module.exports = {
  purge: [
    './public/**/*.html',
    './public/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'f': '58rem'
      }
    },
    minHeight: {
      'text-head': '5rem',
      'text-opt': '4rem',
    },
    maxWidth: {
      'repeat': '4rem',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}