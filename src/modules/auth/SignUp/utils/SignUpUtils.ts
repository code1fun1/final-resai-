import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { PasswordData, RequestBodyType, STORAGE_HEADERS } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';
import { STORAGE_TYPES, setStorageItem } from '~/shared/utils/storage';

export interface FormData extends PasswordData {
  valueType: string;
  value: string;
  countryCode: string;
  passwordToken: string;
  otp: string[];
}

export interface RegisterUserHeaderType {
  userID: string;
  orgId: string;
  roleId: string;
}
interface RegisterUserReqType {
  user_id: string | null;
  email_phone: string;
}

export const registerUser = async (reqParam: string, { userID }: RegisterUserHeaderType) => {
  const { USER_REGISTER } = APIS;

  const request: RequestBodyType<RegisterUserReqType> = {
    url: USER_REGISTER,
    method: API_METHOD.POST,
    body: {
      req_param: {
        user_id: userID === '' ? null : userID,
        email_phone: reqParam
      }
    }
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: response[0]?.res_data?.data,
      status: API_STATUS.SUCCESS,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};

interface VerifyOTPReqType {
  otp: string;
}

export const verifyOTP = async (reqParam: string, reqHeaders?: Partial<RegisterUserHeaderType>) => {
  const { USER_VERIFY_OTP } = APIS;
  let request: RequestBodyType<VerifyOTPReqType> = {
    url: USER_VERIFY_OTP,
    method: API_METHOD.POST,
    body: {
      req_param: {
        otp: reqParam
      }
    }
  };
  if (reqHeaders) {
    const { userID = '', orgId = '', roleId = '' } = reqHeaders || {};
    const headers = {
      'user-id': userID,
      'org-id': orgId,
      'role-id': roleId
    };
    request = { ...request, headers };
  }
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: response[0].res_data?.data,
      status: API_STATUS.SUCCESS,
      message: response[0].res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};

interface ResendOTPType {
  type: string;
  email_phone: string;
}

export const resendOTP = async (
  { valueType, value }: { valueType: string; value: string },
  reqHeaders?: Partial<RegisterUserHeaderType>
) => {
  const { USER_RESEND_OTP } = APIS;
  let request: RequestBodyType<ResendOTPType> = {
    url: USER_RESEND_OTP,
    method: API_METHOD.POST,
    body: {
      req_param: {
        type: valueType,
        email_phone: value
      }
    }
  };
  if (reqHeaders) {
    const { userID = '', orgId = '', roleId = '' } = reqHeaders || {};
    const headers = {
      'user-id': userID,
      'org-id': orgId,
      'role-id': roleId
    };
    request = { ...request, headers };
  }
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: null,
      status: API_STATUS.SUCCESS,
      message: response[0].res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};

interface SavePasswordReqType {
  password_token: string;
  password: string;
}

export const savePassword = async (
  {
    passwordToken,
    password
  }: {
    passwordToken: string;
    password: string;
  },
  reqHeaders?: Partial<RegisterUserHeaderType>
) => {
  const { USER_CREATE_PASSWORD } = APIS;
  let request: RequestBodyType<SavePasswordReqType> = {
    url: USER_CREATE_PASSWORD,
    method: API_METHOD.POST,
    body: {
      req_param: {
        password_token: passwordToken,
        password
      }
    }
  };
  if (reqHeaders) {
    const { userID = '', orgId = '', roleId = '' } = reqHeaders || {};
    const headers = {
      'user-id': userID,
      'org-id': orgId,
      'role-id': roleId
    };
    request = { ...request, headers };
  }
  const response = await httpRequest(request);
  if (response[0] !== null) {
    setStorageItem(
      STORAGE_HEADERS.accessToken,
      response[0].res_data.data.accesstoken,
      STORAGE_TYPES.SESSION
    );
    return {
      data: response[0].res_data,
      status: API_STATUS.SUCCESS,
      message: response[0].res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};
