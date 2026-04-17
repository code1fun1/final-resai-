import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import GoogleAnalytics from '~/shared/components/GoogleAnalytics';
import LoadingIndicator from '~/shared/components/LoadingIndicator';
import { useStore } from '../shared/redux/store';
import '../shared/styles/globals.scss';
import { createTheme } from '../shared/utils/theme/index';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { ...restPageProps } = pageProps;
  const store = useStore(restPageProps.initialReduxState);
  const persistor = persistStore(store);
  const theme = createTheme();

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <GoogleAnalytics />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
            <Component {...restPageProps} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default appWithTranslation(MyApp);
