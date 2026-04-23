import { useMemo } from 'react';
import { Store, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve()
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

let store: Store | undefined;

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

function initStore(initialState: object) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState: object) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }
  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};

export function useStore(initialState: object) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
