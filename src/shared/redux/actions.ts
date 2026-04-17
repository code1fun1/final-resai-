import * as types from './constants';

export interface SiteSettingsData {
  features: Array<{
    id: number;
    name: string;
    type: string;
    weight: number;
  }>;
  share_and_invite: Array<{
    whatsapp: {
      share: Array<{
        credit_point: number;
        useable_count: number;
      }>;
    };
  }>;
}
export interface UserDownlodedCvData {
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  downloadable_resume_ids: string[];
}
export interface LoggedInUserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  org_id: string;
  phone?: number;
  profile_pic?: string;
  role_id: string;
  user_step: number;
  is_exists: boolean;
  tokenType: string;
  credits: number;
  share_and_invite: {
    whatsapp: {
      share: number;
    };
  };
}
export interface UserCreditDetails {
  user_current_credit: number;
  user_total_credit: number;
  user_used_credit: number;
}

export const setSiteSettingsData = (siteSettingsData: SiteSettingsData | {}) => {
  return {
    type: types.SET_SITE_SETTINGS_DATA,
    payload: siteSettingsData
  };
};

export const setLoggedInUserData = (userData: LoggedInUserData | {}) => {
  return {
    type: types.SET_LOGGEDIN_USER_DATA,
    payload: userData
  };
};

export const setLoggedInCreditData = (userCreditData: UserCreditDetails | {}) => {
  return {
    type: types.SET_LOGGEDIN_CREDIT_DATA,
    payload: userCreditData
  };
};
export const setLoggedInDownloadedCvData = (userCvDownloadedData: UserDownlodedCvData | {}) => {
  return {
    type: types.SET_USER_DOWNLOADED_CV_DATA,
    payload: userCvDownloadedData
  };
};
// google and linkedin error message
export const setLoginErrorMessage = (error: string) => {
  return {
    type: types.SET_ERROR_MESSAGE,
    payload: error
  };
};
