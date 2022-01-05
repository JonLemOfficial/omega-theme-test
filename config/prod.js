"use strict";

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env = {} ) => ({
  mode: "production",
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "..", "public", "robots.txt"), to: "./" }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HTMLWebpackPlugin({
      title: "Omega Theme test - Jonathan Lemos",
      template: path.join(__dirname, "..", "public", "index.html"),
      filename: "index.html",
      favicon: path.join(__dirname, "..", "public", "favicon.ico"),
      inject: "body",
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0',
        description: "A React/Polaris test by Omega Theme for Jonathan Lemos"
      },
      xhtml: true
    })
  ]
});