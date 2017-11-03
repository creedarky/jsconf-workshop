const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const clientConfig = require('../webpack.client.config.js');
const serverConfig = require('../webpack.server.config.js');


const router = express.Router();
// Instance webpack and give the compilers (Configs)
const compiler = webpack([clientConfig, serverConfig]);

compiler.apply(new FriendlyErrorsWebpackPlugin()); // Just to show better messages and erros

router.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
}));

router.use(
  webpackHotMiddleware(
    compiler.compilers.find(c => c.name === 'client'),
    {
      log: () => {},
    },
  ),
);

router.use(webpackHotServerMiddleware(compiler));
module.exports = router;
