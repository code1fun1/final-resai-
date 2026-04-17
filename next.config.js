const path = require('path');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  env: {
    apiEndPoint: process.env.API_ENDPOINT
  },
  devIndicators: {
    buildActivity: false
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  serverRuntimeConfig: {
    S3_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    S3_SECRET_KEY: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
    S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    S3_REGION: process.env.NEXT_PUBLIC_S3_REGION,
    WEB_RAZORPAYKEY: process.env.RAZARPAY_KEY,
    WebsiteUrl: process.env.WEBSITE_URL,
    apiUrl: process.env.API_URL
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    GOOGLE_ANALYTICS_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    REACTIVE_RESUME_BASE_URL: process.env.REACTIVE_RESUME_BASE_URL,
    WEB_ENVIRONMENT: process.env.NODE_ENV_NEXT,
    SENTRY_DSN_URL: process.env.NEXT_SENTRY_DSN_URL
  },
  i18n,
  async headers() {
    return [
      {
        source: '/locales/:lng/:ns*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-c.udemycdn.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com'
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com'
      },
      {
        protocol: 'http',
        hostname: 'cs109.org'
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'tutorial.djangogirls.org'
      },
      {
        protocol: 'https',
        hostname: 'www.tangowithdjango.com'
      },
      {
        protocol: 'https',
        hostname: 'eloquentjavascript.net'
      },
      {
        protocol: 'https',
        hostname: 'eloquentjavascript.net'
      },
      {
        protocol: 'https',
        hostname: 'javascript.info'
      },
      {
        protocol: 'https',
        hostname: 'www.filepicker.io'
      },
      {
        protocol: 'https',
        hostname: 'assets.datacamp.com'
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com'
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com'
      },
      {
        protocol: 'https',
        hostname: 'prod-discovery.edx-cdn.org'
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com'
      },
      {
        protocol: 'https',
        hostname: 'www.edureka.co'
      },
      {
        protocol: 'https',
        hostname: 'static-assets.codecademy.com'
      },
      {
        protocol: 'https',
        hostname: 'img-b.udemycdn.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'static.licdn.com',
        port: ''
      },

      {
        protocol: 'https',
        hostname: 'rfskillingacademy.com'
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
});
// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'resai',
  project: 'dev-resai-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
});
