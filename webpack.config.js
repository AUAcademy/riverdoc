const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const html = require('./webpack/html')

const isProduction = process.env.NODE_ENV === 'production'

console.log(`Production: ${isProduction}`)

module.exports = {
  output: {
    path: path.join(process.cwd(), isProduction ? 'production' : 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      }, {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: 'webpack/' }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true
        },
      }
    ]
  },
  optimization: {
    minimizer: isProduction ? [
      new TerserJSPlugin({
        terserOptions: {
          ecma: 3,
          ie8: true
        }
      })
    ] : []
  },
  performance: {
    hints: isProduction ? 'warning' : false
  },
  plugins: [
    ...html,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'chunk-[id].css'
    }),
    new HardSourceWebpackPlugin(),
    new SpriteLoaderPlugin()
  ]
}
