import * as types from '../constants';

const initialState = {
  errorMessage: ''
};

export const loggedDataReducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case types.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action?.payload
      };
    default:
      return state;
  }
};
