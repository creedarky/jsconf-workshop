import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from 'reducers/index.js';
import { routerMiddleware } from 'react-router-redux';

function configureStore(history, initialState = {}) {
  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose;
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers/index.js', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('reducers/index.js').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

export default configureStore;
