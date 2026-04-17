import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { API_STATUS, RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';
import { JobData } from '../../Utils/OnboardingUtils';
const { FETCH_JOB_LIST, CREATE_CV } = APIS;

export interface JobListResponse {
  title: string;
  role: string;
  company: string;
  job_description: string;
  location: string;
  job_detail_url: string;
  portal_job_details_id: string;
  portal_name: string;
  post_date: string;
  company_logo: string | null;
  employment_type: string | null;
  notice_period: string | null;
  work_site: string | null;
  id: number;
}

export const getJobList = async (targetJob: string) => {
  const [response] = await httpRequest({
    url: `${FETCH_JOB_LIST}?target_jobs=${JSON.stringify(targetJob)}`,
    method: API_METHOD.GET
  });
  const errorMessage = response?.err?.response?.responseMessage;
  if (response !== null) {
    return {
      status: 'success',
      data: response?.res_data?.data,
      message: response?.res_data?.message
    };
  } else {
    return { status: 'failed', message: errorMessage?.error?.message };
  }
};

export type CreateCvRequest = JobData['jobForm'] & { job_description: string };

export const createUserCv = async (data: CreateCvRequest) => {
  const request: RequestBodyType<CreateCvRequest> = {
    url: CREATE_CV,
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
