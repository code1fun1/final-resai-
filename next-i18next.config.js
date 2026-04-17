const path = require('path');

module.exports = {
  // debug: process.env.NODE_ENV === 'development',
  i18n: {
    // all the locales supported in the application
    locales: ['default', 'en', 'es', 'hi'],
    // the default locale to be used when visiting
    defaultLocale: 'en',
    localeDetection: false
  },
  trailingSlash: true,
  localePath: path.resolve('./public/locales'),
  backend: {
    loadPath: path.resolve('./public/locales/{{lng}}/{{ns}}.json')
  }
};
