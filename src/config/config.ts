interface EnvConfig {
  apiBaseUrl: string | undefined;
  apiVersion: string | undefined;
  basePath: string | undefined;
  contactTo: string | undefined;
  loginUrl: string | undefined;
}

let ENV: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  apiVersion: import.meta.env.VITE_API_VERSION,
  basePath: import.meta.env.VITE_BASEPATH,
  contactTo: import.meta.env.VITE_CONTACT_TO,
  loginUrl: import.meta.env.VITE_LOGIN_URL,
};

export const appConfig = {
  env: ENV,
  ...{
    apiUrl: ENV.apiBaseUrl + "v1/",
    loginUrl: ENV.loginUrl,
    lng: "en",
    version: "1.0",
    globalVar: {
      loaderColor: '#00A1DE',
    }
  }
};