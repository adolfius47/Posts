var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3070
    },
        devtool: 'cheap-module-eval-source-map',
entry: './dev/js/index.js',

      module:{ 
      	loaders: [{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    "style",
    "css!sass")
 },
 {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }},
          {
                test: /\.css$/,
                loader: 'style!css'
            }]

  },
  plugins: [
    new ExtractTextPlugin('styleCss.css')
  ]
,
  output: {
    path: path.resolve(__dirname, "src"),
    publicPath: "/assets/",
    filename: "js/bundle.min.js"
  }
}