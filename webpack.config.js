const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPuPlugin = require("html-webpack-pug-plugin");

const PATHS = {
  src: path.resolve(__dirname, "./src")
};

module.exports = env => ({
  mode: env && env.production ? "production" : "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js"
  },
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: {
          loader: "pug-loader",
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.pug",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single", //create a single runtime bundle for all chunks
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
        // styles: {
        //   name: "styles",
        //   test: /\.css$/,
        //   chunks: "all",
        //   enforce: true
        // }
      }
    }
  }
});
