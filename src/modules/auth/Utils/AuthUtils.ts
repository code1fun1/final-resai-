import { Dispatch } from 'redux';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { NULL, STORAGE_HEADERS } from '~/shared/constants/constants';
import { setLoggedInUserData } from '~/shared/redux/actions';
import httpRequest from '~/shared/utils/axios';
import { STORAGE_TYPES, getStorageType, setStorageItem } from '~/shared/utils/storage';

enum LOGIN {
  GOOGLE = 'google',
  LINKEDIN = 'linkedin'
}

interface SessionItems {
  userID?: string | null;
  accessToken?: string | null;
  tokenType?: string | null;
  orgId?: string | null;
  roleId?: string | null;
}
interface LoginResponse {
  accesstoken: string;
  tokentype: string;
  user_details: {
    id: string;
    org_id: string;
    role_id: string;
    email: string;
    is_exists: boolean;
    first_name: string;
    last_name: string;
    phone: string;
    profile_pic: string;
    user_step: number;
  };
}

export const authenticate: (provider: string) => Promise<string> = async (provider: string) => {
  const { POST } = API_METHOD;
  let urlKey;
  if (provider === LOGIN.GOOGLE) {
    urlKey = APIS.GOOGLE_LOGIN;
  } else {
    urlKey = APIS.LINKEDIN_LOGIN;
  }

  const request = {
    url: urlKey,
    method: POST
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    const {
      res_data: { data }
    } = response[0];
    return data?.[`${provider}_url`];
  } else {
    return response[1].err.message;
  }
};

export const handleSingleSignOn = async (value: {
  e: React.SyntheticEvent<Element, Event>;
  title: string;
}) => {
  const { e, title } = value;
  e.preventDefault();

  let redirectUrl: string, provider: string;

  if (title === LOGIN.LINKEDIN) {
    redirectUrl = await authenticate(LOGIN.LINKEDIN);
    provider = 'LinkedIn';
  } else {
    redirectUrl = await authenticate(LOGIN.GOOGLE);
    provider = 'Google';
  }

  if (redirectUrl !== 'Failed to fetch') {
    window.location.assign(redirectUrl);
    return { loginStatus: 'success', message: '' };
  } else {
    return { loginStatus: 'failed', message: `Failed to login with ${provider}` };
  }
};

export const setAuthData: (data: LoginResponse, dispatch: Dispatch) => void = (
  data: LoginResponse,
  dispatch
) => {
  const {
    accesstoken: accessToken = NULL,
    user_details: userDetails,
    tokentype: tokenType = NULL
  } = data;

  const { id: userID = NULL, org_id: orgId = NULL, role_id: roleId = NULL } = userDetails || {};
  const storageType: STORAGE_TYPES = getStorageType();

  const sessionItems: SessionItems = {
    userID,
    accessToken,
    tokenType,
    orgId,
    roleId
  };

  // set user data in web storage
  for (const [key, value] of Object.entries(sessionItems)) {
    if (value !== undefined) {
      setStorageItem(STORAGE_HEADERS[key as keyof SessionItems], value, storageType);
    }
  }

  //Set user data in redux store
  dispatch(setLoggedInUserData({ ...userDetails, tokenType }));
};
