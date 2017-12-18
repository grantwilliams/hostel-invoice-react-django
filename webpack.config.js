const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  entry: './assets/js/index',
  output: {
    path: path.resolve('./assets/bundles'),
    // publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      },
      {test: /\.css$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]},
      {test: /\.gif$/, use: "url-loader?mimetype=image/png"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader?name=/media/[name].[ext]"},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "url-loader?limit=10000&mimetype=application/font-woff"}
    ]
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    disableHostCheck: true
  }
};