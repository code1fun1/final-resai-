import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface PersonalDetailsData {
  full_name: string;
  email: string;
  phone_number: string;
  linkedin_profile: string;
  language?: string;
}

export interface ExperienceData {
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  description: string;
  currently_working?: boolean;
}

export interface EducationData {
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  description?: string;
}

export interface CertificateData {
  certificate_name: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface AwardData {
  award_name: string;
  issuing_organization: string;
  award_date: string;
  description?: string;
}

type ProfileTabType = 'personal' | 'experience' | 'education' | 'certificate' | 'award';

type ProfileTabData =
  | PersonalDetailsData
  | ExperienceData
  | EducationData
  | CertificateData
  | AwardData;

type EmptyRequestBody = Record<string, never>;

// ─────────────────────────────────────────────────────────────────────────────
// GET Requests - Fetch Data
// ─────────────────────────────────────────────────────────────────────────────

export const fetchPersonalDetails = async () => {
  const { PROFILE_TABS_PERSONAL } = APIS;
  const request: RequestBodyType<EmptyRequestBody> = {
    url: PROFILE_TABS_PERSONAL,
    method: API_METHOD.GET
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0]
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const fetchExperience = async () => {
  const { PROFILE_TABS_EXPERIENCE } = APIS;
  const request: RequestBodyType<EmptyRequestBody> = {
    url: PROFILE_TABS_EXPERIENCE,
    method: API_METHOD.GET
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0]
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const fetchEducation = async () => {
  const { PROFILE_TABS_EDUCATION } = APIS;
  const request: RequestBodyType<EmptyRequestBody> = {
    url: PROFILE_TABS_EDUCATION,
    method: API_METHOD.GET
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0]
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const fetchCertificates = async () => {
  const { PROFILE_TABS_CERTIFICATE } = APIS;
  const request: RequestBodyType<EmptyRequestBody> = {
    url: PROFILE_TABS_CERTIFICATE,
    method: API_METHOD.GET
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0]
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const fetchAwards = async () => {
  const { PROFILE_TABS_AWARD } = APIS;
  const request: RequestBodyType<EmptyRequestBody> = {
    url: PROFILE_TABS_AWARD,
    method: API_METHOD.GET
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0]
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// Generic GET for any profile tab
export const fetchProfileTabData = async (tabType: ProfileTabType) => {
  const tabEndpoints: Record<ProfileTabType, string> = {
    personal: APIS.PROFILE_TABS_PERSONAL,
    experience: APIS.PROFILE_TABS_EXPERIENCE,
    education: APIS.PROFILE_TABS_EDUCATION,
    certificate: APIS.PROFILE_TABS_CERTIFICATE,
    award: APIS.PROFILE_TABS_AWARD
  };

  const request: RequestBodyType<EmptyRequestBody> = {
    url: tabEndpoints[tabType],
    method: API_METHOD.GET
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0]
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// ─────────────────────────────────────────────────────────────────────────────
// POST Requests - Create New Data
// ─────────────────────────────────────────────────────────────────────────────

export const createPersonalDetails = async (data: PersonalDetailsData) => {
  const { PROFILE_TABS_PERSONAL } = APIS;
  const request: RequestBodyType<PersonalDetailsData> = {
    url: PROFILE_TABS_PERSONAL,
    method: API_METHOD.POST,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Personal details saved successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const addExperience = async (data: ExperienceData) => {
  const { PROFILE_TABS_EXPERIENCE } = APIS;
  const request: RequestBodyType<ExperienceData> = {
    url: PROFILE_TABS_EXPERIENCE,
    method: API_METHOD.POST,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Experience added successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const addEducation = async (data: EducationData) => {
  const { PROFILE_TABS_EDUCATION } = APIS;
  const request: RequestBodyType<EducationData> = {
    url: PROFILE_TABS_EDUCATION,
    method: API_METHOD.POST,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Education added successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const addCertificate = async (data: CertificateData) => {
  const { PROFILE_TABS_CERTIFICATE } = APIS;
  const request: RequestBodyType<CertificateData> = {
    url: PROFILE_TABS_CERTIFICATE,
    method: API_METHOD.POST,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Certificate added successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const addAward = async (data: AwardData) => {
  const { PROFILE_TABS_AWARD } = APIS;
  const request: RequestBodyType<AwardData> = {
    url: PROFILE_TABS_AWARD,
    method: API_METHOD.POST,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Award added successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// Generic POST for any profile tab
export const createProfileTabData = async (tabType: ProfileTabType, data: ProfileTabData) => {
  const tabEndpoints: Record<ProfileTabType, string> = {
    personal: APIS.PROFILE_TABS_PERSONAL,
    experience: APIS.PROFILE_TABS_EXPERIENCE,
    education: APIS.PROFILE_TABS_EDUCATION,
    certificate: APIS.PROFILE_TABS_CERTIFICATE,
    award: APIS.PROFILE_TABS_AWARD
  };

  const request: RequestBodyType<ProfileTabData> = {
    url: tabEndpoints[tabType],
    method: API_METHOD.POST,
    body: {
      req_param: data
    }
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: `${tabType} added successfully`
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT Requests - Update Data
// ─────────────────────────────────────────────────────────────────────────────

export const updatePersonalDetails = async (data: PersonalDetailsData) => {
  const { PROFILE_TABS_PERSONAL } = APIS;
  const request: RequestBodyType<PersonalDetailsData> = {
    url: PROFILE_TABS_PERSONAL,
    method: API_METHOD.PUT,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Personal details updated successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const updateExperience = async (experienceId: string, data: ExperienceData) => {
  const url = `${APIS.PROFILE_TABS_EXPERIENCE}/${experienceId}`;
  const request: RequestBodyType<ExperienceData> = {
    url,
    method: API_METHOD.PUT,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Experience updated successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const updateEducation = async (educationId: string, data: EducationData) => {
  const url = `${APIS.PROFILE_TABS_EDUCATION}/${educationId}`;
  const request: RequestBodyType<EducationData> = {
    url,
    method: API_METHOD.PUT,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Education updated successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const updateCertificate = async (certificateId: string, data: CertificateData) => {
  const url = `${APIS.PROFILE_TABS_CERTIFICATE}/${certificateId}`;
  const request: RequestBodyType<CertificateData> = {
    url,
    method: API_METHOD.PUT,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Certificate updated successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const updateAward = async (awardId: string, data: AwardData) => {
  const url = `${APIS.PROFILE_TABS_AWARD}/${awardId}`;
  const request: RequestBodyType<AwardData> = {
    url,
    method: API_METHOD.PUT,
    body: {
      req_param: data
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: 'Award updated successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// Generic PUT for any profile tab
export const updateProfileTabData = async (
  tabType: ProfileTabType,
  id: string,
  data: ProfileTabData
) => {
  const tabEndpoints: Record<ProfileTabType, string> = {
    personal: APIS.PROFILE_TABS_PERSONAL,
    experience: APIS.PROFILE_TABS_EXPERIENCE,
    education: APIS.PROFILE_TABS_EDUCATION,
    certificate: APIS.PROFILE_TABS_CERTIFICATE,
    award: APIS.PROFILE_TABS_AWARD
  };

  // Personal doesn't use ID in URL, others do
  const url = tabType === 'personal' ? tabEndpoints[tabType] : `${tabEndpoints[tabType]}/${id}`;

  const request: RequestBodyType<ProfileTabData> = {
    url,
    method: API_METHOD.PUT,
    body: {
      req_param: data
    }
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data || response[0],
      message: `${tabType} updated successfully`
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE Requests - Remove Data
// ─────────────────────────────────────────────────────────────────────────────

export const deleteExperience = async (experienceId: string) => {
  const url = `${APIS.PROFILE_TABS_EXPERIENCE}/${experienceId}`;
  const request: RequestBodyType<EmptyRequestBody> = {
    url,
    method: API_METHOD.DELETE
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      message: 'Experience deleted successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const deleteEducation = async (educationId: string) => {
  const url = `${APIS.PROFILE_TABS_EDUCATION}/${educationId}`;
  const request: RequestBodyType<EmptyRequestBody> = {
    url,
    method: API_METHOD.DELETE
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      message: 'Education deleted successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const deleteCertificate = async (certificateId: string) => {
  const url = `${APIS.PROFILE_TABS_CERTIFICATE}/${certificateId}`;
  const request: RequestBodyType<EmptyRequestBody> = {
    url,
    method: API_METHOD.DELETE
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      message: 'Certificate deleted successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

export const deleteAward = async (awardId: string) => {
  const url = `${APIS.PROFILE_TABS_AWARD}/${awardId}`;
  const request: RequestBodyType<EmptyRequestBody> = {
    url,
    method: API_METHOD.DELETE
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      message: 'Award deleted successfully'
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};

// Generic DELETE for any profile tab
export const deleteProfileTabData = async (
  tabType: Exclude<ProfileTabType, 'personal'>,
  id: string
) => {
  const tabEndpoints: Record<Exclude<ProfileTabType, 'personal'>, string> = {
    experience: APIS.PROFILE_TABS_EXPERIENCE,
    education: APIS.PROFILE_TABS_EDUCATION,
    certificate: APIS.PROFILE_TABS_CERTIFICATE,
    award: APIS.PROFILE_TABS_AWARD
  };

  const url = `${tabEndpoints[tabType]}/${id}`;
  const request: RequestBodyType<EmptyRequestBody> = {
    url,
    method: API_METHOD.DELETE
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      message: `${tabType} deleted successfully`
    };
  }
  return { status: API_STATUS.FAILED, message: response[1]?.message };
};
