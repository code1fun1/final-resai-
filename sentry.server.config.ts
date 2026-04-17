// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import getConfig from 'next/config';
const { publicRuntimeConfig: configs = {} } = getConfig() || {};
const { SENTRY_DSN_URL } = configs;
// Sentry.init({
//   dsn: SENTRY_DSN_URL,
//   // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
//   tracesSampleRate: 1,
//   // Setting this option to true will print useful information to the console while you're setting up Sentry.
//   debug: false
// });

Sentry.init({
  dsn: SENTRY_DSN_URL,
  integrations: [], // Disable default integrations
  autoSessionTracking: false, // Disable session tracking
  tracesSampleRate: 0.0, // Disable performance monitoring
  beforeSend(event, hint) {
    // Allow only manually triggered errors
    if (hint && hint.originalException) {
      return event;
    }
    return null;
  }
});
