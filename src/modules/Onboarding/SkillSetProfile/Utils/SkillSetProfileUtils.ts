import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

const { TARGET_JOBS, RESUME_PARSE } = APIS;

export interface ExpertiseTab {
  id: number;
  grid: { xs: number; md: number; className: string };
  box: { px: { xs: number; md: number }; py: { xs: number; md: number } };
  data: {
    suggestionsKey: 'userStrengthsGaps' | 'userSkillsGaps' | 'userDomainsGaps';
    tabName: string;
    placeholder: string;
    selectionKey: 'userStrengths' | 'userSkills' | 'userDomains';
    suggestTitle: string;
  };
}

export const getTargetJobs = async (post: string) => {
  const [response] = await httpRequest({
    url: `${TARGET_JOBS}?designation=${post}`,
    method: API_METHOD.GET
  });
  if (response && response.length !== null) {
    return { status: 'success', data: response?.res_data?.data };
  } else {
    return { status: 'failed', message: response?.err?.message };
  }
};

interface ResumeRequestType {
  resume_url: string;
  resume_content: string;
  designation: string;
  target_job: string;
  is_onboarding: boolean;
}

export const getResumeData = async (data: ResumeRequestType) => {
  const request: RequestBodyType<ResumeRequestType> = {
    url: RESUME_PARSE,
    method: API_METHOD.POST,
    body: {
      req_param: { ...data }
    }
  };
  const response = await httpRequest(request);
  if (response && response.length && response[0] !== null) {
    return { status: 'success', data: response[0]?.res_data?.data };
  } else {
    return { status: 'failed', message: response[1].err.message };
  }
};
