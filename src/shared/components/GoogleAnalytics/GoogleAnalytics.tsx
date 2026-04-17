// import getConfig from 'next/config';
// import Script from 'next/script';

// const GoogleAnalytics = () => {
//   const { publicRuntimeConfig: configs = {} } = getConfig() || {};
//   const { GOOGLE_ANALYTICS_MEASUREMENT_ID } = configs;

//   return (
//     <>
//       <Script
//         strategy="lazyOnload"
//         src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
//       />

//       <Script id="" strategy="lazyOnload">
//         {`
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', '${GOOGLE_ANALYTICS_MEASUREMENT_ID}', {
//               page_path: window.location.pathname,
//               });
//           `}
//       </Script>
//     </>
//   );
// };

// export default GoogleAnalytics;

import getConfig from 'next/config';
import Script from 'next/script';

const GoogleAnalytics = () => {
  const { publicRuntimeConfig: configs = {} } = getConfig() || {};
  const { GOOGLE_ANALYTICS_MEASUREMENT_ID } = configs;

  return (
    <>
      {/* Use locally hosted GA script */}
      <Script
        strategy="lazyOnload"
        src={'/gtag.js'} // Update path to local hosted script
      />

      <Script id="" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
