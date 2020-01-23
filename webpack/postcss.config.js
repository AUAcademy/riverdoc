module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0,
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace'
      }
    },
    'cssnano': {}
  }
}
