import { combineReducers } from 'redux'
import { emailReducer } from "./email-action-reducer";


export const rootReducer = combineReducers({
  email : emailReducer,  
});
