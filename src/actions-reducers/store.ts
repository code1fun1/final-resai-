import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root', 
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({ 
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export const persistor = persistStore(store)
