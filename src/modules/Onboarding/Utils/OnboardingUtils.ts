import { ContentState, EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';
import { STORAGE_TYPES, setStorageItem } from '~/shared/utils/storage';
const { USER_PROFILE, SIMILARITY_SCORE, USER_COURSES } = APIS;

export type DataItem = {
  id: string;
  name: string;
};

export interface ProfileData {
  targetJob: DataItem;
  currentJob: DataItem & {
    isEditing: boolean;
  };
  userSkills: DataItem[];
  userDomains: DataItem[];
  userStrengths: DataItem[];
  userSkillsGaps: DataItem[];
  userDomainsGaps: DataItem[];
  userStrengthsGaps: DataItem[];
  resumeUrl: string;
  resumeContent: string;
}

export type JobData = {
  jobForm: {
    title: string;
    company: string;
    role: string;
    job_detail_url?: string;
    location?: string;
    portal_job_details_id?: string;
    portal_name?: string;
    post_date?: string;
    company_logo?: string | null;
    employment_type?: string | null;
    notice_period?: string | null;
    work_site?: string | null;
    id?: number;
  };
  editorState: EditorState;
};

export interface StepData {
  [key: string]: {
    editorState: EditorState;
    isCompleted: boolean;
  };
}

export interface ContactInfoData {
  phone: string | null | undefined;
  email: string | null | undefined;
  isCompleted?: boolean;
}

export type Suggestion = {
  title: string;
  description: string;
};

export interface Question {
  skill_name: string;
  question: string;
  suggestions: Suggestion[];
  answer?: string;
}

export type AdditionalData = {
  stepData: StepData;
  currentStep: number;
  contactInfoData?: ContactInfoData;
};

export type AIPromptData = {
  currentQuestionIndex: number;
  editorData: EditorState;
  questionList: Question[];
};

export type OnboardingData = {
  profileData: ProfileData;
  additionalData: AdditionalData;
  jobData: JobData;
  aiPromptData: AIPromptData;
  similarityScoreData: SimilarityScoreData;
};
export interface SimilarityScoreData {
  isModalOpen: boolean;
  scorePercent: number;
  last_attempt: number; //attempt change
}

export type OnSaveFunction = (data: OnboardingData) => void;

export const DEFAULT_USER_PROFILE_DATA = {
  targetJob: {
    id: '',
    name: ''
  },
  currentJob: {
    id: '',
    name: '',
    isEditing: false
  },
  userSkills: [],
  userDomains: [],
  userStrengths: [],
  userSkillsGaps: [],
  userDomainsGaps: [],
  userStrengthsGaps: [],
  resumeUrl: '',
  resumeContent: ''
};
export const DEFAULT_USER_JOB_DATA = {
  jobForm: {
    title: '',
    company: '',
    role: '',
    job_detail_url: '',
    location: '',
    portal_job_details_id: '',
    portal_name: '',
    post_date: '',
    ompany_logo: '',
    employment_type: '',
    notice_period: '',
    work_site: ''
    // company_logo: '' || null,
    // employment_type: '' || null,
    // notice_period: '' || null,
    // work_site: '' || null
  },
  editorState: EditorState.createEmpty(),
  simiarlityScore: 0
};
export const DEFAULT_SIMILARITY_DATA = {
  isModalOpen: false,
  scorePercent: 0,
  last_attempt: 1 //attempt change
};

export const DEFAULT_AI_PROMPT_DATA = {
  currentQuestionIndex: 0,
  editorData: EditorState.createEmpty(),
  questionList: []
};

// export interface DEFAULT_ADDITIONAL_DATA_TYPE {
//   stepData: Object;
//   currentStep: Number;
//   contactInfoData?: ContactInfoData;
// }

export const DEFAULT_ADDITIONAL_DATA = {
  stepData: {},
  currentStep: 0,
  contactInfoData: {
    phone: null,
    email: null,
    isCompleted: false
  } as ContactInfoData
};
// as DEFAULT_ADDITIONAL_DATA_TYPE;

export interface ProfileDataResponse {
  current_job: DataItem;
  user_jobs: DataItem;
  resume_content: string;
  resume_url: string;
  user?: {
    resume_content: string;
    resume_url: string;
  };
  user_domains: DataItem[];
  user_domains_gaps: DataItem[];
  user_skills: DataItem[];
  user_skill_gaps: DataItem[];
  user_strengths: DataItem[];
  user_strengths_gaps: DataItem[];
}
export interface SaveSkillsRequest {
  current_job: {};
  user_jobs: {};
  user_skills: DataItem[];
  user_strengths: DataItem[];
  user_domains: DataItem[];
}

export const saveUserSkillsData = async (data: SaveSkillsRequest) => {
  const request: RequestBodyType<SaveSkillsRequest> = {
    url: USER_PROFILE,
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

export const getUserData = async () => {
  const [response] = await httpRequest({
    url: USER_PROFILE,
    method: API_METHOD.GET
  });
  if (response && response.length !== null) {
    setStorageItem(
      'userSkills',
      JSON.stringify(response?.res_data?.data.user_skills),
      STORAGE_TYPES.LOCAL
    );
    return { status: 'success', data: response?.res_data?.data };
  } else {
    return { status: 'failed', message: response?.err?.response?.message };
  }
};

export const getUserCourses = async () => {
  const [response] = await httpRequest({
    url: USER_COURSES,
    method: API_METHOD.GET
  });
  if (response && response.length !== null) {
    return { status: 'success', data: response?.res_data?.data };
  } else {
    return { status: 'failed', message: response?.err?.response?.message };
  }
};

export interface SimilarityScoreRequest {
  company: string;
  employment_type: string | null;
  job_description: string;
  location: string;
  notice_period: string | null;
  role: string;
  title: string;
  work_site: string | null;
}

export const getSimilarityScore = async (data: SimilarityScoreRequest) => {
  const request: RequestBodyType<SimilarityScoreRequest> = {
    url: SIMILARITY_SCORE,
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
export const hasText = (editorData: EditorState) => {
  const currentContent: ContentState = editorData?.getCurrentContent();
  const plainText: string = currentContent?.getPlainText('');
  return !!plainText?.trim();
};

export const isSkillSetProfileStepValid = (onboardingData: OnboardingData): boolean => {
  const {
    profileData: { userDomains, userSkills, userStrengths, currentJob, targetJob }
  } = onboardingData;
  let localJobTitle: any = ''; // eslint-disable-line @typescript-eslint/no-explicit-any

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('jdFormValue');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.jobTitle && parsed.jobTitle.trim() !== '') {
          // console.log('parsed.jobTitle', parsed.jobTitle);
          localJobTitle = parsed.jobTitle;
          // return false;
          // jobTitle = parsed.jobTitle;
        }
      } catch (e) {
        // ignore parse errors
      }
    }
  }
  // return true;
  // return (
  //   userDomains?.length > 0 &&
  //   userSkills?.length > 0 &&
  //   userStrengths?.length > 0 &&
  //   !!currentJob?.name &&
  //   !!targetJob?.name
  // );
  if (
    userDomains?.length > 0 &&
    userSkills?.length > 0 &&
    userStrengths?.length > 0 &&
    !!currentJob?.name &&
    !!targetJob?.name
  ) {
    return true;
  } else if (
    userDomains?.length > 0 &&
    userSkills?.length > 0 &&
    userStrengths?.length > 0 &&
    !!currentJob?.name &&
    !!localJobTitle
  ) {
    return true;
  } else {
    return false;
  }
};

export const enableStepKeyContinueButton = [
  'professional_development',
  'last_name',
  'total_experience',
  'user_achievements',
  'user_education',
  'user_professional_experience',
  'user_projects'
];

export const isAdditionalDetailsStepValid = (onboardingData: OnboardingData): boolean => {
  const { additionalData } = onboardingData;

  // Check if we're dealing with contact info
  // if (additionalData.contactInfoData !== undefined) {
  //   // If both phone and email are required
  //   if (
  //     additionalData.contactInfoData.phone !== undefined &&
  //     additionalData.contactInfoData.email !== undefined
  //   ) {
  //     return additionalData.contactInfoData.isCompleted === true;
  //   }
  //   // If only phone is required
  //   else if (additionalData.contactInfoData.phone !== undefined) {
  //     return additionalData.contactInfoData.isCompleted === true;
  //   }
  //   // If only email is required
  //   else if (additionalData.contactInfoData.email !== undefined) {
  //     return additionalData.contactInfoData.isCompleted === true;
  //   }
  // }

  // For non-contact info steps
  const currentStepKey: string = Object.keys(additionalData.stepData)[additionalData.currentStep];
  let currentStepData: { isCompleted: boolean; editorState: EditorState } =
    additionalData.stepData[currentStepKey];
  if (enableStepKeyContinueButton.includes(currentStepKey)) {
    currentStepData = { isCompleted: true, editorState: currentStepData?.editorState };
  }
  const isEditorValid = enableStepKeyContinueButton.includes(currentStepKey)
    ? true
    : hasText(currentStepData?.editorState);

  return currentStepData && currentStepData.isCompleted && isEditorValid;
};

export const isAIQuestionStepValid = (onboardingData: OnboardingData): boolean => {
  const {
    aiPromptData: { editorData }
  } = onboardingData;
  return hasText(editorData);
};

export const isJobProfileStepValid = (onboardingData: OnboardingData): boolean => {
  const { jobData } = onboardingData;
  const { title, role, company } = jobData?.jobForm || {};
  const editorState = jobData?.editorState;
  return (
    typeof title === 'string' &&
    title.trim() !== '' &&
    typeof role === 'string' &&
    role.trim() !== '' &&
    typeof company === 'string' &&
    company.trim() !== '' &&
    editorState &&
    editorState.getCurrentContent().getPlainText('').trim().length > 0
  );
};

export const isCurrentStepValid = (onboardingData: OnboardingData, activeSteps: number) => {
  const actions = [
    isSkillSetProfileStepValid,
    isAdditionalDetailsStepValid,
    isAIQuestionStepValid,
    isJobProfileStepValid
  ];

  return actions[activeSteps] && actions[activeSteps](onboardingData);
};

export enum RESPONSE_TYPE {
  PROFILE,
  PARSE
}

export const updateProfileData = (
  data: ProfileDataResponse,
  responseType: RESPONSE_TYPE,
  onSave: Dispatch<SetStateAction<OnboardingData>>
) => {
  onSave((prev: OnboardingData) => {
    const updatedProfileData = { ...prev.profileData };
    const newData = {
      userDomains: data?.user_domains,
      userSkills: data?.user_skills,
      userStrengths: data?.user_strengths,
      userDomainsGaps: data?.user_domains_gaps,
      userSkillsGaps: data?.user_skill_gaps,
      userStrengthsGaps: data?.user_strengths_gaps,
      resumeContent:
        responseType === RESPONSE_TYPE.PROFILE
          ? data?.user?.resume_content || ''
          : data?.resume_content,
      resumeUrl:
        responseType === RESPONSE_TYPE.PROFILE ? data?.user?.resume_url || '' : data?.resume_url
    };

    if (responseType === RESPONSE_TYPE.PROFILE) {
      updatedProfileData.currentJob = { ...updatedProfileData.currentJob, ...data?.current_job };
      updatedProfileData.targetJob = data?.user_jobs;
    }
    return {
      ...prev,
      profileData: {
        ...updatedProfileData,
        ...newData
      }
    };
  });
};
