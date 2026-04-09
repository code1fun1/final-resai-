import { combineReducers } from 'redux'
import { authReducer } from "./email-action-reducer";

export const rootReducer = combineReducers({
  email: authReducer,  
});
