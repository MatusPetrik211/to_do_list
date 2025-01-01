const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: "eval-source-map",
    devServer: {
      watchFiles: ["./src/index.html"],
    },
 });