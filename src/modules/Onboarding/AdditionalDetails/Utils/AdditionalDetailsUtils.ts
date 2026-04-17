import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

const { USER_MISSING_TABS } = APIS;

export interface Step {
  key: string;
  title: string;
}

export const getMissingTabs = async () => {
  const request: RequestBodyType<{}> = {
    url: USER_MISSING_TABS,
    method: API_METHOD.GET
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

interface SaveMissingData {
  [key: string]: string | boolean | Object;
}
export const saveMissingData = async (req: SaveMissingData, updateUserStep: boolean) => {
  // Extract the last key-value pair from the req object
  const lastKey = Object.keys(req).pop(); // Get the last key
  const lastValue = lastKey ? req[lastKey] : null; // Get the value for the last key

  const singleObject = lastKey ? { [lastKey]: lastValue } : {};
  // if (singleObject.professional_development == '') {
  //   singleObject.professional_development = 'n/a';
  // }
  // Prepare the request body with only the last key-value pair
  const request: RequestBodyType<SaveMissingData> = {
    url: USER_MISSING_TABS,
    method: API_METHOD.POST,
    body: {
      req_param: {
        ...singleObject, // Only send the last key-value pair
        update_user_step: updateUserStep
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

// export const saveMissingData = async (req: SaveMissingData, updateUserStep: boolean) => {
//   const request: RequestBodyType<SaveMissingData> = {
//     url: USER_MISSING_TABS,
//     method: API_METHOD.POST,
//     body: {
//       req_param: {
//         ...req,
//         update_user_step: updateUserStep
//       }
//     }
//   };
//   console.log("RequestMis---",req)
//   const response = await httpRequest(request);
//   if (response[0] !== null) {
//     return {
//       data: response[0]?.res_data?.data,
//       status: API_STATUS.SUCCESS,
//       message: response[0]?.res_data?.message
//     };
//   } else {
//     const errorMessage = response[1]?.err?.response?.responseMessage;
//     return {
//       data: null,
//       status: API_STATUS.FAILED,
//       message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
//     };
//   }
// };
