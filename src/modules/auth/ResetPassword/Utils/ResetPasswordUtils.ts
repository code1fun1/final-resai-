import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

export interface ResetPasswordProps {
  passwordToken: string | null;
  setLoadWithoutMount: (value: boolean) => void;
}
interface RequestType {
  password_token: string | null;
  password: string;
}

export const resetPassword = async ({
  passwordToken,
  password
}: {
  passwordToken: string | null;
  password: string;
}) => {
  const { USER_RESET_PASSWORD } = APIS;
  const request: RequestBodyType<RequestType> = {
    url: USER_RESET_PASSWORD,
    method: API_METHOD.POST,
    body: {
      req_param: {
        password_token: passwordToken,
        password: password
      }
    }
  };

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
