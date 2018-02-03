'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

const path = require('path');
const buildTM = new Date();
const platform = require('os').platform();

const conf = {
  debug: process.env.NODE_ENV !== 'production',
  devSrvPort: 3500,
  buildTS: buildTM.valueOf(),
  buildTM: buildTM.toISOString(),
  buildOS: platform
};

const dirs = {
  DIST: path.join(__dirname, 'dist'),
  SRC_ENTRY_JS: path.join(__dirname, './src/index.jsx'),
  SRC_ENTRY_PAGE: path.join(__dirname, './src/index-template.html')
};

exports = module.exports = {
  devtool: conf.debug ? 'inline-source-map' : undefined,
  entry: [ dirs.SRC_ENTRY_JS ],
  output: {
    path: dirs.DIST,
    filename: conf.debug ? 'bundle.js' : 'bundle.[hash:6].min.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ],
      include: [ /node_modules/ ]
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { cacheDirectory: true }
    }, {
      test: /\.(scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [ precss, autoprefixer ]
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: [ 'popper.js', 'default' ]
    }),
    new CleanWebpackPlugin([ dirs.DIST ], {
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: dirs.SRC_ENTRY_PAGE,
      minify: conf.debug ? {} : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new webpack.DefinePlugin({
      APP_DEBUG: JSON.stringify(conf.debug),
      APP_BUILD_TS: JSON.stringify(conf.buildTS),
      APP_BUILD_OS: JSON.stringify(conf.buildOS)
    }),
    new ExtractTextPlugin('./src/main.css')
  ],
  devServer: {
    contentBase: dirs.DIST,
    compress: true,
    port: conf.devSrvPort
  }
};
