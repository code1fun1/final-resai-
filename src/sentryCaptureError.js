import * as Sentry from '@sentry/react';

// Your function to capture the exception
const sentryCaptureError = (resProfile, APIURL) => {
  try {
    // Set the custom tag for the error
    Sentry.setTag('resai_error_type', 'api_failure' + ' - ' + APIURL);
    // Capture the exception with Sentry
    Sentry.captureException(new Error(resProfile));
  } catch (error) {
    console.error('Error capturing exception: ', error);
  }
};

export default sentryCaptureError;
