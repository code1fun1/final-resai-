import { KeyValuePair } from './constants';

// export const API_END_POINT: string = 'http://app.resai.co:9000/api/v1/';
export const API_END_POINT: string = 'https://dev.resai.co/api/v1/';

export const API_METHOD: KeyValuePair = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD'
};

export const API_STATUS: KeyValuePair = {
  SUCCESS: 'success',
  FAILED: 'failed'
};

export const APIS: KeyValuePair = {
  DELETE_RESUME: 'user/resume',
  FETCH_JOB_LIST: 'portal/jobs',
  GET_CREDITS: 'credits/get',
  GOOGLE_ADD_USER: 'google/add-user',
  GOOGLE_LOGIN: 'google/login',
  LINKEDIN_ADD_USER: 'linkedin/add-user',
  LINKEDIN_LOGIN: 'linkedin/login',
  LOGIN: 'user/login',
  LOGOUT: 'logout',
  PORTAL_SAVED_JOBS: 'portal/saved/jobs',
  RESUME_PARSE: 'resume/parse',
  TARGET_JOBS: 'targetjobs',
  USER_CREATE_PASSWORD: 'user/create-password',
  CREATE_CV: 'user/cv',
  USER_CV: 'user/cv',
  USER_FORGOT_PASSWORD: 'user/forgot-password',
  USER_PROFILE: 'user/profile',
  USER_REGISTER: 'user/register',
  USER_RESEND_OTP: 'user/resend-otp',
  USER_RESET_PASSWORD: 'user/reset-password',
  USER_RESET_PASSWORD_OTP: 'user/reset-password-otp',
  USER_VERIFY_OTP: 'user/verify-otp',
  VERIFY_QUESTION: 'questions/verify',
  V1_COUNTRY: 'country',
  USER_MISSING_TABS: 'user/profile/missing/tabs',
  SIMILARITY_SCORE: 'user/cv/similarity-score',
  USER_AI_QUESTION: 'user/ai-questions',
  USER_LOAD_MORE_SUGGESTION: 'user/ai-questions/load-more',
  GET_AI_QUESTION: 'user/ai-questions-suggestions',
  USER_COURSES: 'courses',
  SAVED_USERINFO: 'user/saveprofile',
  USER_DOWNLOADCV: 'user/downloadcv',
  USER_SKILL_ANALYSIS: 'user/skill_analysis',
  RAPID_API: 'rapid-jobs',
  RAPID_COURSES_API: 'rapid-courses',
  GET_TEMPLATE_LIST: 'resume/templates',
  SPEND_CREDITS: 'credits/credit_spend',
  GET_USED_FEATURES: 'credits/get_used_features',
  SHARE_AND_INVITE: 'credits/share_and_invite',
  CREDIT_HISTORY: 'credits/get_user_credit_history',
  PROFILE_IMAGE_UPLOAD: '',
  ADMIN_DASHBOARD: 'admin/dashboard',
  TRAINING_PLAN_GENERATOR: 'training-plan/generator'
};
