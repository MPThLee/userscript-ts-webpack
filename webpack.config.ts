//'use strict'

import webpack from "webpack";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from "path";
import { UserScriptHeaderPlugin } from "./config/header";

const packageJson = require("./package.json");

const node_env = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "production";
    case "development":
      return "development";
    default:
      return "none";
  }
};

const config: webpack.Configuration = {
  mode: node_env(),
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `${packageJson.name}.user.js`
  },
  resolve: {
    extensions: [".js", ".ts", ".css", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          "to-string-loader",
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: new RegExp(
              // Licenses
              "@(preserve|license|cc_on)" +
                // Greasemonkey metadata.
                "|@(description|exclude|grant|icon|include|match|name|namespace|noframes|require|resource|run-at|version)" +
                "|==/?UserScript==",
              "i"
            ),
            beautify: false
          }
        }
      })
    ]
  },
  plugins: [
    new UserScriptHeaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};

export default config;
