import { APIS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';

export const getEarnedCredits = async () => {
  const { GET_CREDITS } = APIS;

  const request = {
    url: GET_CREDITS,
    method: 'GET'
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return response[0]?.res_data?.data;
  } else {
    const data = { credits: null };
    return data;
  }
};
