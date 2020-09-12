/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require('path')
const Clean = require("clean-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "assets"),
    publicPath: 'assets'
  },
  devtool: "cheap-module-eval-source-map",
  // eslint-disable-next-line array-bracket-newline
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new Clean.CleanWebpackPlugin()
  ]
};