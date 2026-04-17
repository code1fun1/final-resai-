import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { PUBLIC_ROUTES, ROUTES } from '~/shared/constants/routes';
import {
  isUserExistsOnSession,
  smoothScrollTop,
  storeApiUrl,
  getStoredApiUrl
} from '~/shared/utils/utils';
import Footer from '../Footer';
import Header from '../Header/Header';
import LoadingIndicator from '../LoadingIndicator';
import PageTitle from '../PageTitle';
import { Alert, Snackbar } from '@mui/material';
import SessionTimeoutAlert from '../SessionTimeoutAlert/SessionTimeoutAlert';

interface LayoutProps {
  includeHeaderFooter: boolean;
  children: ReactNode;
  pageTitle: string;
}

const Layout = (props: LayoutProps) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (!getStoredApiUrl()) {
      storeApiUrl();
    }
    const isUserExists = isUserExistsOnSession();
    if (!isUserExists) {
      if (PUBLIC_ROUTES.includes(pathname)) {
        setHasAccess(true);
      } else {
        setShowAlert(true);
        const timer = setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setHasAccess(true);
    }
  }, [pathname, router]);

  const { children, includeHeaderFooter = false, pageTitle } = props;
  const child = useMemo(() => {
    return <>{children}</>;
  }, [children]);

  smoothScrollTop();

  return (
    <>
      <SessionTimeoutAlert />
      {!hasAccess ? (
        <>
          <LoadingIndicator />
          <Snackbar open={showAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="warning" sx={{ width: '100%' }}>
              Session has timed out. Please log in again.
            </Alert>
          </Snackbar>
        </>
      ) : (
        <>
          <PageTitle pageTitle={pageTitle} />
          {includeHeaderFooter ? (
            <main>
              <Header />
              {child}
              <Footer />
            </main>
          ) : (
            child
          )}
        </>
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  includeHeaderFooter: PropTypes.bool
};
export default Layout;
