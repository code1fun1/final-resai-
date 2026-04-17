import { getCookie } from 'cookies-next';
import fetch from 'unfetch';
import {
  STORAGE_TYPES,
  clearStorage,
  getStorageItem,
  getStorageType
} from '~/shared/utils/storage';
import { getBaseUrl } from '~/shared/utils/utils';
import { API_METHOD } from '../constants/apiConstants';
import { ERROR_MESSAGE, MESSAGE, RequestBodyType, STORAGE_HEADERS } from '../constants/constants';
import { ROUTES } from '../constants/routes';

// Create a custom event for session timeout
const createSessionTimeoutEvent = () => {
  const event = new CustomEvent('sessionTimeout', {
    detail: { message: 'Session has timed out. Please log in again.' }
  });
  window.dispatchEvent(event);
};

// will be as any as we don't know the type of response at this stage
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const handleResponse = async (response: any) => {
  const storageType: STORAGE_TYPES = getStorageType();
  if (response.ok) {
    return response.json();
  }
  const clonedResponse = response.clone();
  const res = clonedResponse.json();
  res.then((errorData: { error: { msg_code: string } }) => {
    if (errorData?.error?.msg_code === ERROR_MESSAGE.TOKEN_ERROR_MESSAGE) {
      // Dispatch session timeout event
      createSessionTimeoutEvent();

      // Clear storage and redirect after 3 seconds
      setTimeout(() => {
        clearStorage(storageType);
        window.location.assign(ROUTES.LOGIN);
      }, 3000);
    }
  });

  // convert non-2xx HTTP responses into errors:
  const err: Error = new Error(response.statusText);
  const error = {
    ...err,
    response: {
      responseMessage: await response.json(),
      hasError: true,
      message: MESSAGE.SOMETHING_WRONG
    }
  };
  return Promise.reject(error);
};

export const fetchData = <T>(fetchData: RequestBodyType<T>) => {
  const { url, method = API_METHOD.GET, headers = {}, body } = fetchData;
  const locale: string = getCookie('NEXT_LOCALE') || 'en';
  const storageType: STORAGE_TYPES = getStorageType();

  const userRole = {
    'org-id': getStorageItem({ key: STORAGE_HEADERS.orgId, storageType }) ?? '',
    'role-id': getStorageItem({ key: STORAGE_HEADERS.roleId, storageType }) ?? '',
    'user-id': getStorageItem({ key: STORAGE_HEADERS.userID, storageType }) ?? '',
    accesstoken: getStorageItem({ key: STORAGE_HEADERS.accessToken, storageType }) ?? '',
    tokentype: getStorageItem({ key: STORAGE_HEADERS.tokenType, storageType }) ?? ''
  };

  const combineHeaders = {
    /** static headers */
    'Content-Type': 'application/json',
    locale,
    ...(userRole['org-id'] && userRole['role-id'] && { ...userRole }),
    /** custom headers */
    ...headers
  };

  try {
    const baseUrl: string = getBaseUrl();
    const fullURL: string = baseUrl + url;
    return fetch(fullURL, {
      method: method,
      headers: combineHeaders,
      body: JSON.stringify(body)
    })
      .then(handleResponse)
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err: Error) => {
        const error = { err, hasError: true, message: MESSAGE.SOMETHING_WRONG };
        return Promise.reject(error);
      });
  } catch (err: unknown) {
    const error = { err, hasError: true, message: MESSAGE.SOMETHING_WRONG };
    return Promise.reject(error);
  }
};

const httpRequest = async <T>(args: RequestBodyType<T>) => {
  return await fetchData(args)
    .then((data) => [data, null])
    .catch((error: { err: Error; hasError: boolean; message: string }) => [null, error]);
};

export default httpRequest;
