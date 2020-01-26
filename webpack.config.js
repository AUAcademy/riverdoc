const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), isProduction ? 'production' : 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images/photo',
          name: '[name].[ext]',
          esModule: false,
        }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images/icons',
          name: '[name].[ext]',
          esModule: false,
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
          name: '[name].[ext]'
        }
      },
      {
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
              config: { path: 'config/' }
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              engine: 'postcss',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ]
      }
    ]
  },
  optimization: {
    minimizer: isProduction ? [new TerserJSPlugin({
      terserOptions: {
        ecma: 3,
        ie8: true
      }
    })] : []
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
      inject: true
    }),
  ]
}
