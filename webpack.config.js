const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV || 'development'
const fileSuffix = env === 'development' ? '' : '-[contenthash].min'

module.exports = {
  entry: {
    app: ['./src/js/main.js', './src/scss/app.scss']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[name]${fileSuffix}.css`,
              outputPath: 'css'
            }
          },
          'extract-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `[name]${fileSuffix}.js`
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],

  mode: process.env.NODE_ENV
}
