// redux/reducer.ts
import { UserDownlodedCvData } from '../actions'; // import the types
import * as types from '../constants';

const initialState: UserDownlodedCvData = {
  downloadable_resume_ids: []
};

export const userDownlodedCvReducer = (
  state = initialState,
  action: { type: string; payload: UserDownlodedCvData }
): UserDownlodedCvData => {
  switch (action.type) {
    case types.SET_USER_DOWNLOADED_CV_DATA:
      return {
        ...state,
        ...action.payload // Update the state with the action's payload
      };

    default:
      return state; // Always return the state if no action matches
  }
};
