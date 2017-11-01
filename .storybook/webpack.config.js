const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader'
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          includePaths: [
            path.resolve(__dirname, '../src/styles')
          ]
        }
      }],
      include: path.resolve()
    }]
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules']
  }
};
