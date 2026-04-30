import mime from 'mime';

export const LOCALE_PAGE = {
  ONBOARDING: 'onboarding',
  AUTH: 'auth',
  RESUME_UPLOAD: 'resumeUpload',
  RESUME_DOWNLOAD: 'resumeDownload',
  SHARE_ON: 'shareOn',
  MY_PROFILE: 'myProfile',
  RESUME_CUSTOMIZE: 'resumeCustomize',
  MY_RESUMES: 'myResumes',
  MY_CREDITS: 'myCredits'
};

export const ERROR_MESSAGE = {
  TOKEN_ERROR_MESSAGE: 'TOKEN_AUTHENTICATION_ERROR'
};

export const UNDEFINED = 'undefined';
export const NULL = 'null';
export const LINKEDIN = 'Linkedin';

const FILE_TYPE = {
  PDF: 'pdf',
  DOCX: 'docx',
  WPS_DOC: 'wps-office.doc'
};
export const FILE_TYPE_MIME = {
  PDF: mime.getType(FILE_TYPE.PDF),
  DOCX: mime.getType(FILE_TYPE.DOCX),
  WPS_DOC: mime.getType(FILE_TYPE.WPS_DOC)
};
//image cropper -Start
const IMAGE_TYPE = {
  JPG: 'jpg',
  JPEG: 'jpeg',
  PNG: 'png'
};
export const IMAGE_TYPE_MIME = {
  JPG: mime.getType(IMAGE_TYPE.JPG), // image/jpeg
  JPEG: mime.getType(IMAGE_TYPE.JPEG), // image/jpeg
  PNG: mime.getType(IMAGE_TYPE.PNG) // image/png
};
//end
export const TAB_ID = {
  COMPLETED_CV: 1,
  SAVED_JOB: 2
};

export const STORAGE_HEADERS = {
  userID: 'user-id',
  accessToken: 'accesstoken',
  tokenType: 'tokentype',
  orgId: 'org_id',
  roleId: 'role_id',
  stayLoggedIn: 'stayLoggedIn'
};

export const SEARCH_PARAMS_KEYS = {
  CODE: 'code',
  ERROR: 'error',
  PASSWORD_TOKEN: 'password_token'
};

export const SEARCH_PARAMS_VALUES = {
  USER_CANCELLED_LOGIN: 'user_cancelled_login',
  USER_CANCELLED_AUTHORIZE: 'user_cancelled_authorize'
};

// TO-DO  SOMETHING_WRONG should come from lang const file
export const MESSAGE = {
  SOMETHING_WRONG: 'Something went wrong!'
};

export enum SIGN_UP_STEPS {
  SIGN_UP_FORM = 'signUp',
  OTP_INPUT = 'otp',
  PASSWORD_SETTING = 'password',
  RESET_SUCCESS_RESPONSE = 'resetSuccessResponse',
  RESET_FAILURE_RESPONSE = 'resetFailureResponse'
}

export enum FIELD_TYPE {
  EMAIL = 'email',
  PHONE = 'phone',
  VERIFY_EMAIL = 'verifyEmail',
  VERIFY_NUMBER = 'verifyNumber'
}

export type PasswordValidityType = {
  validLength: boolean;
  hasNumber: boolean;
  specialChar: boolean;
  matchingPassword: boolean;
};

export interface PasswordData {
  password: string;
  confirmPassword: string;
}

export type SetPasswordValidity = React.Dispatch<React.SetStateAction<PasswordValidityType>>;

export enum ICON_COLORS {
  DISABLED = 'disabled',
  ERROR = 'error',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export enum SEVERITY {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning'
}

export type ToastMessage = {
  open: boolean;
  severity: SEVERITY;
  message: string;
};

export enum MODAL_CONTENT_TYPE {
  LOGOUT = 'logout',
  RESET = 'reset'
}

export enum API_STATUS {
  SUCCESS,
  FAILED
}

export type RequestBodyType<T> = {
  url: string;
  method: string;
  headers?: {
    'user-id'?: string;
    'org-id'?: string;
    'role-id'?: string;
  };
  body?: { req_param: T } | object;
};

export enum CARD_VARIANT {
  ELEVATION = 'elevation',
  OUTLINED = 'outlined'
}

export interface KeyValuePair {
  [key: string]: string;
}
