const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  output: {
    filename: '[name].[chunkhash].js',
  },
  devtool: 'source-map',
  plugins: [
    new StatsWebpackPlugin('client-stats.json', {
      chunkModules: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_URL: JSON.stringify(`http://localhost:${port}/api`),
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
      },
    }),
  ],
};
