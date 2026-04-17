export const ROUTES = {
  LOGIN: '/',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  RESUME_UPLOAD: '/resume-upload',
  RESUME_DOWNLOAD: '/resume-download',
  MY_RESUMES: '/my-resumes',
  ONBOARDING: '/onboarding',
  TERMS_AND_CONDITION: '#',
  PRIVACY: '#',
  MY_PROFILE: '/my-profile',
  RESUME_CUSTOMIZE: '/resume-customize',
  MY_CREDIT: '/my-credits'
};

export const PUBLIC_ROUTES = [
  ROUTES.SIGN_UP,
  ROUTES.LOGIN,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD
];

export const REDIRECTION_MAPPINGS: { [key: number]: string } = {
  1: ROUTES.RESUME_UPLOAD,
  2: ROUTES.ONBOARDING,
  3: ROUTES.ONBOARDING,
  4: ROUTES.ONBOARDING,
  5: ROUTES.ONBOARDING,
  6: ROUTES.MY_RESUMES
};
