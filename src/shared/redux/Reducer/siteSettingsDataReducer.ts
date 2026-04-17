// redux/reducer.ts
import { SiteSettingsData } from '../actions'; // import the types
import * as types from '../constants';

const initialState: SiteSettingsData = {
  features: [],
  share_and_invite: []
};

export const siteSettingsDataReducer = (
  state = initialState,
  action: { type: string; payload: SiteSettingsData }
): SiteSettingsData => {
  switch (action.type) {
    case types.SET_SITE_SETTINGS_DATA:
      return {
        ...state,
        ...action.payload // Update the state with the action's payload
      };

    default:
      return state; // Always return the state if no action matches
  }
};
