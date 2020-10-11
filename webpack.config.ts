//'use strict'

import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";
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
          "style-loader",
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
    minimize: process.env.MINIMIZER === "TRUE" ? true : false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2015,
          beautify: false
        }
      })
    ]
  },
  plugins: [
    new UserScriptHeaderPlugin()
  ]
};

export default config;
