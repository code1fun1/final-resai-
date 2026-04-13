/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_BASEPATH: string;
  readonly VITE_CONTACT_TO: string;
  readonly VITE_LOGIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
