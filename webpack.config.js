var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    'dist/public/js/index.js': './src/public/ts/index',
		'dist/public/css/index.css': './src/public/scss/index.scss',
  },

  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name]'
  },

  resolve: {
    extensions: ['.ts']
  },

  node: {
    __dirname: false
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader'],
        exclude: [ /node_modules/ ]
      }, {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/public/index.html',
      to: 'dist/public'
    }])
  ],
};
