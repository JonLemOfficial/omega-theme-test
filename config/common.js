"use strict";

// const { merge } = require("webpack-merge");
const path = require("path");
const isProd = process.env.NODE_ENV && process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env = {} ) => ({
  context: path.join(__dirname, "..", "src"),
  entry: {
    app: "index.jsx"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "..", "dist"),
    publicPath: "/" 
  },
  module: {
    rules: [
      {
        test: /.jsx?$/i,
        use: [ "babel-loader" ],
        exclude: /[\/\\]node_modules[\/\\]/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          /*isProd ?*/ MiniCssExtractPlugin.loader /*: "style-loader"*/,
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.css$/i,
        use: [
          /*isProd ?*/ MiniCssExtractPlugin.loader /*: "style-loader"*/,
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|woff|svg|eot|ttf|otf|woff2)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: 'assets/img',
              publicPath: 'assets/img'
            }
          },
        ],
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "..", "src"),
      path.join(__dirname, "..", "node_modules"),
    ],
    extensions: [
      ".js", ".jsx"
    ]
  }
});