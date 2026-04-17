import { Dispatch } from 'redux';
import {
  setLoggedInCreditData,
  UserCreditDetails,
  UserDownlodedCvData,
  setLoggedInDownloadedCvData
} from '~/shared/redux/actions';
import httpRequest from '~/shared/utils/axios';
import { RequestBodyType } from '~/shared/constants/constants';
import { API_METHOD, API_STATUS, APIS } from '~/shared/constants/apiConstants';
// import { useDispatch } from 'react-redux';

export interface UserCreditDataUpdate {
  credits: number;
  status: string;
  entity_type: string;
  entity_id: string;
  actions: string;
}
export interface UserUpdateShareStatusProps {
  credits: number;
  status: string;
  actions: string;
  share_and_invite: {
    whatsapp: {
      share: number;
    };
  };
}

const { GET_CREDITS, SPEND_CREDITS, GET_USED_FEATURES, SHARE_AND_INVITE } = APIS;
//------------------------------------------------- Redux Structure Declaration Code Start ----------------------------------------------------

//Set UserCredit Data into Redux -Start
export const setUserCreditData: (dataCredit: UserCreditDetails, dispatch: Dispatch) => void = (
  dataCredit: UserCreditDetails,
  dispatch
) => {
  const {
    user_current_credit: userCurrentCredit,
    user_total_credit: userTotalCredit,
    user_used_credit: userUsedCredit
  } = dataCredit;

  // Set user data in Redux store
  dispatch(
    setLoggedInCreditData({
      user_current_credit: userCurrentCredit ?? 0,
      user_total_credit: userTotalCredit ?? 0,
      user_used_credit: userUsedCredit ?? 0
    })
  );
};
//Set UserCredit Data into Redux -End

//Set UserDownloadCv Data into Redux -Start
export const setUserCvDowloadedData: (
  dataResume: UserDownlodedCvData,
  dispatch: Dispatch
) => void = (dataResume: UserDownlodedCvData, dispatch) => {
  const { downloadable_resume_ids: downloadableResumeIds } = dataResume;

  // Dispatch the action to the Redux store
  dispatch(
    setLoggedInDownloadedCvData({
      downloadable_resume_ids: downloadableResumeIds ?? [] // Default to empty array if undefined
    })
  );
};
//Set UserDownloadCv Data into Redux -End
//------------------------------------------------- Redux Structure Declaration Code End ----------------------------------------------------

//------------------------------------------------- API START ---------------------------------------------------------------------

//Get UserCreditData- Start
export const getUserCreditData = async () => {
  const [response] = await httpRequest({
    url: GET_CREDITS, //define Api url here
    method: API_METHOD.GET
  });
  if (response && response.length !== null) {
    return { status: 'success', data: response?.res_data?.data };
  } else {
    return { status: 'failed', message: response?.err?.response?.message };
  }
};
//Get UserCreditData- End

//Update Spend Credit- Start
export const updateUserCreditData = async (data: UserCreditDataUpdate) => {
  const request: RequestBodyType<UserCreditDataUpdate> = {
    url: SPEND_CREDITS, //define Api url here
    method: API_METHOD.POST,
    body: {
      req_param: { ...data }
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      status: API_STATUS.FAILED,
      data: null,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};
//Update Spend Credit- End

//Get DownloadedCV- Start
// export const getAlreadyDownloadedCv = async () => {
//   const [response] = await httpRequest({
//     url: GET_USED_FEATURES, //define Api url here
//     method: API_METHOD.GET
//   });
//   if (response && response.length !== null) {
//     return { status: 'success', data: response?.res_data?.data[0]?.entity_ids };
//   } else {
//     return { status: 'failed', message: response?.err?.response?.message };
//   }
// };
export const getAlreadyDownloadedCv = async () => {
  const [response] = await httpRequest({
    url: GET_USED_FEATURES, // define API url here
    method: API_METHOD.GET
  });

  if (response && response.res_data && response.res_data.data) {
    // Filter for "resume-download" action and get the first occurrence (0 or 1 index)
    /* eslint-disable*/
    const resumeDownloadData = response.res_data.data.find(
      (item: any) => item.action === 'resume-download'
    );
    /* eslint-enable*/
    if (resumeDownloadData) {
      return { status: 'success', data: resumeDownloadData.entity_ids };
    } else {
      return { status: 'failed', message: 'No resume-download data found' };
    }
  } else {
    return { status: 'failed', message: response?.err?.response?.message || 'Unknown error' };
  }
};

//Get DownloadedCV- End

//Whatsapp share and spend -START
export const updateShareStatus = async (data: UserUpdateShareStatusProps) => {
  const request: RequestBodyType<UserUpdateShareStatusProps> = {
    url: SHARE_AND_INVITE, //define Api url here
    method: API_METHOD.POST,
    body: {
      req_param: { ...data }
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      status: API_STATUS.FAILED,
      data: null,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};
//Whatsapp share and spend -END
//-------------------------------------------------API End--------------------------------------------------------------------------------

// -------------------------------GLOBAL FUNCTION TO SET CREDIT AND DOWNLOADED CV DATA INTO REDUX - START--------------------------------------

export const handleSetUserCreditData: (dispatch: Dispatch) => Promise<void> = async (
  dispatch: Dispatch
) => {
  const resCreditData = await getUserCreditData();
  const staticUserCreditData: UserCreditDetails = {
    user_current_credit: resCreditData?.data?.user_current_credit,
    user_total_credit: resCreditData?.data?.user_total_credit,
    user_used_credit: resCreditData?.data?.user_used_credit
  };
  // Call setUserCreditData with static data
  setUserCreditData(staticUserCreditData, dispatch);
};
export const handleSetUserResumeData: (dispatch: Dispatch) => Promise<void> = async (
  dispatch: Dispatch
) => {
  type ResumeId = string;
  const resResumeData = await getAlreadyDownloadedCv();
  // Extract resume IDs from the downloadedCvList
  const downloadableResumeIds: ResumeId[] = resResumeData?.data?.map((cv: ResumeId) => cv);
  const staticUserResumeData: UserDownlodedCvData = {
    downloadable_resume_ids: downloadableResumeIds
  };
  // Call setUserCreditData with static data
  setUserCvDowloadedData(staticUserResumeData, dispatch);
};
// -------------------------------GLOBAL FUNCTION TO CREDIT AND DOWNLOADED CV DATA INTO REDUX - END--------------------------------------
