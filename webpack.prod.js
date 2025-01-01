const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'eval-source-map',
});
