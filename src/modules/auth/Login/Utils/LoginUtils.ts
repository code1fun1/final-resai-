import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

interface Request {
  email_phone: string;
  password: string;
}

export const loginWithCredentials = async (loginData: {
  email_phone: string;
  password: string;
}) => {
  const { LOGIN } = APIS;
  const { POST } = API_METHOD;
  const request: RequestBodyType<Request> = {
    url: LOGIN,
    method: POST,
    body: {
      req_param: loginData
    }
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: 'success',
      data: response[0]?.res_data?.data,
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
