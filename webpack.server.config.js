const webpack = require('webpack');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const sConfig = {
  name: 'server',
  target: 'node',
  entry: './server/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: 'server.js',
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
      test: /\.scss$/,
      use: [{
        loader: 'css-loader/locals',
      }, {
        loader: 'postcss-loader',
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          includePaths: [
            path.resolve(__dirname, 'src/styles'),
          ],
        },
      }],
    }],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
        SERVER_SIDE: JSON.stringify(true),
        API_URL: JSON.stringify(`http://localhost:${port}/api`),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          emitWarning: ENV === 'development',
          emitError: ENV === 'staging' || ENV === 'production',
        },
      },
    }),
  ],
};

module.exports = sConfig;
