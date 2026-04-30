/**
 * ProfileTabsUtils.ts
 *
 * Typed API wrapper for all Profile Tab endpoints.
 * Payload shapes derived from Postman collection.
 *
 * NOTE: Body is sent directly (no req_param wrapper) — confirmed via Postman.
 */

import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';

const {
  PROFILE_TABS_PERSONAL,
  PROFILE_TABS_EXPERIENCE,
  PROFILE_TABS_EDUCATION,
  PROFILE_TABS_CERTIFICATE,
  PROFILE_TABS_AWARD
} = APIS;

// ── Shared response handler ─────────────────────────────────────────────────

type ApiResponseData = Record<string, unknown> & {
  res_data?: { data?: unknown; message?: string };
  data?: unknown;
  message?: string;
  err?: { response?: { responseMessage?: { error?: { message?: string } } }; message?: string };
};
type ApiResponse = [ApiResponseData | null, ApiResponseData | null];

const handleResponse = (response: ApiResponse) => {
  const [success, error] = response;
  if (success !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: success?.res_data?.data ?? success?.data,
      message: success?.res_data?.message ?? success?.message
    };
  }
  return {
    status: API_STATUS.FAILED,
    data: null,
    message:
      error?.err?.response?.responseMessage?.error?.message ??
      error?.err?.message ??
      'Something went wrong'
  };
};

// ════════════════════════════════════════════════════════════════
// PERSONAL TAB
// Payload confirmed from Postman collection
// ════════════════════════════════════════════════════════════════

export interface PersonalPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  language?: string;
  profile_pic?: string;
  links?: string[];
}

/** GET /user/profile-tabs/personal */
export const getPersonal = async () => {
  const response = await httpRequest({ url: PROFILE_TABS_PERSONAL, method: API_METHOD.GET });
  return handleResponse(response);
};

/** POST /user/profile-tabs/personal */
export const createPersonal = async (payload: PersonalPayload) => {
  const response = await httpRequest({
    url: PROFILE_TABS_PERSONAL,
    method: API_METHOD.POST,
    body: payload
  });
  return handleResponse(response);
};

/** PUT /user/profile-tabs/personal */
export const updatePersonal = async (payload: Partial<PersonalPayload>) => {
  const response = await httpRequest({
    url: PROFILE_TABS_PERSONAL,
    method: API_METHOD.PUT,
    body: payload
  });
  return handleResponse(response);
};

// ════════════════════════════════════════════════════════════════
// EXPERIENCE TAB
// Payload confirmed from Postman collection
// ════════════════════════════════════════════════════════════════

export interface ExperiencePayload {
  job_title?: string;
  company_name?: string;
  location?: string;
  // TODO: Add more fields when backend confirms (e.g. start_date, end_date, description)
}

/** GET /user/profile-tabs/experience */
export const getExperience = async () => {
  const response = await httpRequest({ url: PROFILE_TABS_EXPERIENCE, method: API_METHOD.GET });
  return handleResponse(response);
};

/** POST /user/profile-tabs/experience */
export const createExperience = async (payload: ExperiencePayload) => {
  const response = await httpRequest({
    url: PROFILE_TABS_EXPERIENCE,
    method: API_METHOD.POST,
    body: payload
  });
  return handleResponse(response);
};

/** PUT /user/profile-tabs/experience/{id} */
export const updateExperience = async (
  id: number | string,
  payload: Partial<ExperiencePayload>
) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_EXPERIENCE}/${id}`,
    method: API_METHOD.PUT,
    body: payload
  });
  return handleResponse(response);
};

/** DELETE /user/profile-tabs/experience/{id} */
export const deleteExperience = async (id: number | string) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_EXPERIENCE}/${id}`,
    method: API_METHOD.DELETE
  });
  return handleResponse(response);
};

// ════════════════════════════════════════════════════════════════
// EDUCATION TAB
// Payload confirmed from Postman collection
// ════════════════════════════════════════════════════════════════

export interface EducationPayload {
  degree?: string;
  institution_name?: string;
  // TODO: Add more fields when backend confirms (e.g. year, score, specialization)
}

/** GET /user/profile-tabs/education */
export const getEducation = async () => {
  const response = await httpRequest({ url: PROFILE_TABS_EDUCATION, method: API_METHOD.GET });
  return handleResponse(response);
};

/** POST /user/profile-tabs/education */
export const createEducation = async (payload: EducationPayload) => {
  const response = await httpRequest({
    url: PROFILE_TABS_EDUCATION,
    method: API_METHOD.POST,
    body: payload
  });
  return handleResponse(response);
};

/** PUT /user/profile-tabs/education/{id} */
export const updateEducation = async (id: number | string, payload: Partial<EducationPayload>) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_EDUCATION}/${id}`,
    method: API_METHOD.PUT,
    body: payload
  });
  return handleResponse(response);
};

/** DELETE /user/profile-tabs/education/{id} */
export const deleteEducation = async (id: number | string) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_EDUCATION}/${id}`,
    method: API_METHOD.DELETE
  });
  return handleResponse(response);
};

// ════════════════════════════════════════════════════════════════
// CERTIFICATE TAB
// TODO: Confirm exact field names from backend (not in Postman yet)
// ════════════════════════════════════════════════════════════════

export interface CertificatePayload {
  title?: string;
  issuer?: string;
  year?: string;
}

/** GET /user/profile-tabs/certificate */
export const getCertificates = async () => {
  const response = await httpRequest({ url: PROFILE_TABS_CERTIFICATE, method: API_METHOD.GET });
  return handleResponse(response);
};

/** POST /user/profile-tabs/certificate */
export const createCertificate = async (payload: CertificatePayload) => {
  const response = await httpRequest({
    url: PROFILE_TABS_CERTIFICATE,
    method: API_METHOD.POST,
    body: payload
  });
  return handleResponse(response);
};

/** PUT /user/profile-tabs/certificate/{id} */
export const updateCertificate = async (
  id: number | string,
  payload: Partial<CertificatePayload>
) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_CERTIFICATE}/${id}`,
    method: API_METHOD.PUT,
    body: payload
  });
  return handleResponse(response);
};

/** DELETE /user/profile-tabs/certificate/{id} */
export const deleteCertificate = async (id: number | string) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_CERTIFICATE}/${id}`,
    method: API_METHOD.DELETE
  });
  return handleResponse(response);
};

// ════════════════════════════════════════════════════════════════
// AWARD TAB
// TODO: Confirm exact field names from backend (not in Postman yet)
// ════════════════════════════════════════════════════════════════

export interface AwardPayload {
  description?: string;
}

/** GET /user/profile-tabs/award */
export const getAwards = async () => {
  const response = await httpRequest({ url: PROFILE_TABS_AWARD, method: API_METHOD.GET });
  return handleResponse(response);
};

/** POST /user/profile-tabs/award */
export const createAward = async (payload: AwardPayload) => {
  const response = await httpRequest({
    url: PROFILE_TABS_AWARD,
    method: API_METHOD.POST,
    body: payload
  });
  return handleResponse(response);
};

/** PUT /user/profile-tabs/award/{id} */
export const updateAward = async (id: number | string, payload: Partial<AwardPayload>) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_AWARD}/${id}`,
    method: API_METHOD.PUT,
    body: payload
  });
  return handleResponse(response);
};

/** DELETE /user/profile-tabs/award/{id} */
export const deleteAward = async (id: number | string) => {
  const response = await httpRequest({
    url: `${PROFILE_TABS_AWARD}/${id}`,
    method: API_METHOD.DELETE
  });
  return handleResponse(response);
};
