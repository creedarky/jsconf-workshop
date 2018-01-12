/* eslint-disable no-unused-vars */
import renderApp from '../src/server.jsx';

module.exports = function serverRenderer({ clientStats, serverStats }) {
  return async (req, res, next) => {
    const html = await renderApp({ req, context: {}, clientStats });
    res.status(200).send(html);
  };
};
