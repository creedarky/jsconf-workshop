/* eslint-disable import/no-dynamic-require,global-require */
module.exports = () => {
  const env = process.env.NODE_ENV;
  if (env) {
    return require(`./config.${env}.js`);
  }
  return require('./config.development.js');
};
