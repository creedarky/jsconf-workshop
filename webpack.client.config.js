const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const configs = {
  development: require('./webpack/development.js'),
  staging: require('./webpack/staging.js'),
  production: require('./webpack/production.js'),
};

const ENV = process.env.NODE_ENV || 'development';
const devEntries = ENV === 'development' ? ['webpack-hot-middleware/client', 'react-hot-loader/patch'] : [];
const entry = [
  'babel-polyfill',
  ...devEntries,
  path.join(__dirname, 'src/index.jsx'),
]
const commonConfig = {
  name: 'client',
  target: 'web',
  devtool: 'eval-source-map',
  entry: {
    index: entry,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      use: 'eslint-loader',
      exclude: /node_modules/,
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.?(sa|sc|c)ss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: false,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            outputStyle: 'expanded',
            includePaths: [
              path.resolve(__dirname, 'src/styles'),
            ],
          },
        }],
      }),
    }],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          emitWarning: ENV === 'development',
          emitError: ENV === 'staging' || ENV === 'production',
        },
      },
    }),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '.stylelintrc'),
      files: '**/*.?(sa|sc|c)ss',
      context: path.join(__dirname, 'src'),
      emitErrors: ENV !== 'development',
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bootstrap',
      // minChunks: number|Infinity|function(module, count) -> boolean,
      // chunks: string[], // Decide in which chunk or entry it should try to search.
      minChunks(module) {
        // This prevents stylesheet resources with the .css or .scss extension
        // from being moved from their original chunk to the vendor chunk
        if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
          return false;
        }
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      // minChunks(module, count) {
      //   if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
      //     return false;
      //   }
      //   return module.context && module.context.indexOf('node_modules') !== -1 && count > 2;
      // },
    }),
  ],
};

const environmentConfig = (() => {
  switch (ENV) {
    case 'production':
      return configs.production;
    case 'staging':
      return configs.staging;
    case 'development':
    default:
      return configs.development;
  }
})();

module.exports = merge(commonConfig, environmentConfig);
