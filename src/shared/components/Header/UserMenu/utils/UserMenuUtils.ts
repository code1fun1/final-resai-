import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';

export const LogoutHandler = async () => {
  const [response] = await httpRequest({
    url: APIS.LOGOUT,
    method: API_METHOD.POST
  });

  if (response?.res_data?.data === null) {
    return { message: 'success' };
  }
};

export const resetPasswordFromMenu = async () => {
  const [response, error] = await httpRequest({
    url: APIS.USER_RESET_PASSWORD_OTP,
    method: API_METHOD.POST
  });
  if (response && response !== null) {
    return {
      data: response.res_data?.data,
      status: API_STATUS.SUCCESS,
      message: response.res_data?.message
    };
  } else {
    const errorMessage = error?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};
