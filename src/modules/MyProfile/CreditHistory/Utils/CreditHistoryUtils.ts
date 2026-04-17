import { APIS, API_METHOD } from '~/shared/constants/apiConstants';

import httpRequest from '~/shared/utils/axios';

const { CREDIT_HISTORY } = APIS;
export interface CreditHistoryRow {
  id: string;
  created_at: string;
  actions: string;
  credits: string;
  status: string;
}
export const getCreditHistory = async () => {
  const [response] = await httpRequest({
    url: CREDIT_HISTORY,
    method: API_METHOD.GET
  });
  if (response && response.length !== null) {
    return { status: 'success', data: response?.res_data?.data };
  } else {
    return { status: 'failed', message: response?.err?.response?.message };
  }
};
