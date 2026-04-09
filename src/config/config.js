  let ENV = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
    apiVersion: process.env.REACT_APP_API_VERSION,
    basePath: process.env.REACT_APP_BASEPATH,
    contactTo: process.env.REACT_APP_CONTACT_TO,
    loginUrl: process.env.REACT_APP_LOGIN_URL,
  };

  export const config = { env: ENV, ...{
    apiUrl:ENV.apiBaseUrl+"v1/",
    loginUrl: ENV.loginUrl,
    lng: "en",
    version:"1.0",
    globalVar : {
      loaderColor: '#00A1DE',
    }
  }
  };
  
