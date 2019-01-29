const path = require('path')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './bin/www',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  target: "node",
  optimization: {
    minimizer: [new UglifyjsWebpackPlugin()],
  },
};