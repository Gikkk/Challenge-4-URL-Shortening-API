/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require('path')
const Clean = require("clean-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, "assets"),
    publicPath: 'assets'
  },
  devtool: "cheap-source-map",
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