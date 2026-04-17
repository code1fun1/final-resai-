import * as Sentry from '@sentry/nextjs';

export const withSentry = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
