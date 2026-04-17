import { LoggedInUserData, UserCreditDetails } from '../actions';
import * as types from '../constants';

const initialState = {
  loggedInUser: { credits: null },
  userCreditData: {}
};

export const userDataReducer = (
  state = initialState,
  action: { type: string; payload: LoggedInUserData | UserCreditDetails | {} }
) => {
  // switch (action.type) {
  //   case types.SET_LOGGEDIN_USER_DATA:
  //     return {
  //       ...state,
  //       loggedInUser: action.payload
  //     };

  //   default:
  //     return state;
  // }
  switch (action.type) {
    case types.SET_LOGGEDIN_USER_DATA:
      return {
        ...state,
        loggedInUser: action.payload as LoggedInUserData // Ensure payload is treated as LoggedInUserData
      };

    case types.SET_LOGGEDIN_CREDIT_DATA:
      return {
        ...state,
        userCreditData: action.payload as UserCreditDetails // Ensure payload is treated as UserCreditDetails
      };

    default:
      return state;
  }
};
