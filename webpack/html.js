const fromDir = require('./finder')
const HtmlWebPackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production'

const pugFiles = fromDir('./src', '.pug')

function generateHtmlPage(path) {
  return new HtmlWebPackPlugin({
    template: 'src/index.pug',
    inject: true,
    minify: isProduction ? {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true
    } : {},
  })
}

module.exports = pugFiles.map(generateHtmlPage)
