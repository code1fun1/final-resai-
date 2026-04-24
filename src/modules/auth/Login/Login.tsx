import { Button, Divider, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContainer from '~/shared/components/AuthContainer';
import Heading from '~/shared/components/Heading';
import SingleSignOn from '~/shared/components/SingleSignOn';
import { ROUTES } from '~/shared/constants/routes';
import { getStorageItem } from '~/shared/utils/storage';
import { handleSingleSignOn } from '../Utils/AuthUtils';
import LoginForm from './LoginForm';
import { useStyles } from './LoginStyles';

import withLoader from '~/shared/components/HOC/withLoader';
import { HEADING_TYPE } from '~/shared/components/Heading/Heading';
import LoadingIndicator from '~/shared/components/LoadingIndicator';
import useLoginRedirect from '~/shared/hooks/useLoginRedirect';

interface LoginProps {
  setLoadWithoutMount: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoadWithoutMount }) => {
  const { handleUserRedirection } = useLoginRedirect(setLoadWithoutMount);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const styles = useStyles();

  useEffect(() => {
    if (getStorageItem({ key: 'user-id', useCombineStorage: true })) {
      handleUserRedirection();
    } else {
      setHasAccess(true);
    }
  });

  const handleLoginClick = useCallback(
    async (value: { e: React.SyntheticEvent<Element, Event>; title: string }) => {
      setLoadWithoutMount(true);
      await handleSingleSignOn(value);
      setLoadWithoutMount(false);
    },
    []
  );

  return (
    <>
      {!hasAccess ? (
        <LoadingIndicator />
      ) : (
        <AuthContainer>
          <Heading
            title="Sign In"
            subTitle="To re-engineer your career journey"
            headingType={HEADING_TYPE.AUTH}
          />
          <LoginForm />
          <Divider className={styles.divider}>OR</Divider>
          <SingleSignOn onSingleSignOn={(value) => handleLoginClick(value)} />
          <Typography component="p" className={styles.linkWrap} textAlign="center">
            {'Don\'t have an account?'}{' '}
            <Link href={ROUTES.SIGN_UP}>
              <Button variant="text" className={styles.linkText}>
                Sign Up
              </Button>
            </Link>
          </Typography>
        </AuthContainer>
      )}
    </>
  );
};

export default withLoader(Login);
