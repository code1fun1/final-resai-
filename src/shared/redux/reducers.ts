import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggedDataReducer } from './Reducer/loggedDataReducer';
import { userDataReducer } from './Reducer/userDataReducer';
import { siteSettingsDataReducer } from './Reducer/siteSettingsDataReducer';
import { userDownlodedCvReducer } from './Reducer/userDownlodedCvReducer';
// COMBINED REDUCERS
const reducers = {
  user: userDataReducer,
  loggedUser: loggedDataReducer,
  siteSettings: siteSettingsDataReducer,
  downloadedResumeIds: userDownlodedCvReducer
};

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['counter'] // place to select which state you want to persist
};

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
