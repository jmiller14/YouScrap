import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from 'src/store/root';
import { State } from 'src/store/state';

let middleware = [createEpicMiddleware(rootEpic)];

if (process.env.NODE_ENV === 'development') {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  middleware = [...middleware, reduxImmutableStateInvariant];
} else {
  middleware = [...middleware];
}

export const configureStore = function (initialState: State) {
  return createStore<State>(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );
};
