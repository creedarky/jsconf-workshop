const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const port = process.env.PORT || 3000;
module.exports = {
  output: {
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify(`http://localhost:${port}/api`),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: '3000',
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  devtool: 'eval-source-map',
};
