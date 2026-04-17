// config.js

const getEnvConfig = () => {
  if (typeof window !== 'undefined') {
    // Ensure this is run client-side
    const currentOrigin = window.location.origin;
    // const currentPath = window.location.pathname; // Get the current path (e.g., /en or /hi)
    // Check if we are on the production environment
    if (
      currentOrigin.includes('https://app.resai.co') //you can also check http/www if used
    ) {
      return {
        NextENV: 'PROD',
        NEXTBASEURL: 'https://app.resai.co/'
      };
    }
    if (currentOrigin.includes('https://dev.resai.co')) {
      return {
        NextENV: 'DEV',
        NEXTBASEURL: 'https://dev.resai.co/'
      };
    } else {
      return {
        NextENV: 'LOCAL',
        NEXTBASEURL: 'http://localhost:3000/'
      };
    }
  }

  // Default to DEV if no `window` is available (for SSR or fallback)
  return {
    NextENV: 'DEV',
    NEXTBASEURL: 'https://dev.resai.co/'
  };
};

// Export the result of getEnvConfig
export const envConfig = getEnvConfig();
