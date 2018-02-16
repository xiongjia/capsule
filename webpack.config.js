'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const precss = require('precss');
const autoprefixer = require('autoprefixer');

const path = require('path');
const buildTM = new Date();
const platform = require('os').platform();

const conf = {
  debug: process.env.NODE_ENV !== 'production',
  devSrvPort: 3500,
  siteRoot: process.env.APP_SITE_ROOT || '/',
  buildTS: buildTM.valueOf(),
  buildTM: buildTM.toISOString(),
  buildOS: platform
};

const dirs = {
  DIST: path.join(__dirname, 'dist'),
  DIST_ASSETS: path.join(__dirname, './dist/assets'),
  SRC_ENTRY_JS: path.join(__dirname, './src/index.jsx'),
  SRC_ENTRY_PAGE: path.join(__dirname, './src/index-template.html'),
  SRC_ASSETS: path.join(__dirname, './src/assets')
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
  plugins: (() => {
    const plugins = [];
    if (conf.debug) {
      plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: [ 'popper.js', 'default' ]
    }));
    plugins.push(new CleanWebpackPlugin([ dirs.DIST ], {
      verbose: true,
      dry: false
    }));
    plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: dirs.SRC_ENTRY_PAGE,
      minify: conf.debug ? {} : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }));
    plugins.push(new webpack.DefinePlugin({
      APP_DEBUG: JSON.stringify(conf.debug),
      APP_BUILD_TS: JSON.stringify(conf.buildTS),
      APP_BUILD_OS: JSON.stringify(conf.buildOS),
      APP_SITE_ROOT: JSON.stringify(conf.siteRoot)
    }));
    plugins.push(new ExtractTextPlugin('./src/main.css'));
    plugins.push(new CopyWebpackPlugin([
      { from: dirs.SRC_ASSETS, to: dirs.DIST_ASSETS }
    ]));
    return plugins;
  })(),
  devServer: {
    contentBase: dirs.DIST,
    compress: true,
    port: conf.devSrvPort
  }
};
