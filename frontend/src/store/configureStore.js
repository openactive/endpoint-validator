/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux'
// reducer
import rootReducer from '../reducers'
// middleware
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'
import {hashHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import routes from '../routes'
import {createHistory} from 'history'

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import defaultImport from '../utils/defaultImport'

const enforceImmutableMiddleware = reduxImmutableStateInvariant()

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})


let createStoreWithMiddleware

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const { persistState } = require('redux-devtools')
  const DevTools = defaultImport(require('../containers/DevTools'))
  createStoreWithMiddleware = compose(
    applyMiddleware(
      enforceImmutableMiddleware,
      thunkMiddleware,
      promiseMiddleware,
      loggerMiddleware,
      routerMiddleware(hashHistory)
    ),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware,
      routerMiddleware(hashHistory)
    )
  )(createStore)
}

/**
 * Creates a preconfigured store.
 */
export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = defaultImport(require('../reducers/index'))

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
