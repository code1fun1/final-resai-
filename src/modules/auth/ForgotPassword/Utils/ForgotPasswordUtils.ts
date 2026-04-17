import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { API_STATUS, RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

interface ResetLinkResponse {
  data: { reset_link: string } | null;
  status: API_STATUS;
  message: string;
}
// RequestBody
export const sendResetLink = async (value: string): Promise<ResetLinkResponse> => {
  const { USER_FORGOT_PASSWORD } = APIS;
  const request: RequestBodyType<{ email_phone: string }> = {
    url: USER_FORGOT_PASSWORD,
    method: API_METHOD.POST,
    body: {
      req_param: {
        email_phone: value
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
