import { Divider } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';
import AuthContainer from '~/shared/components/AuthContainer';
import Heading from '~/shared/components/Heading';
import SingleSignOn from '~/shared/components/SingleSignOn';
import { LOCALE_PAGE } from '~/shared/constants/constants';
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
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
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
            title={i18n('logIn')}
            subTitle={i18n('quicklogIn')}
            headingType={HEADING_TYPE.AUTH}
          />
          <SingleSignOn onSingleSignOn={(value) => handleLoginClick(value)} />
          <Divider className={styles.divider}>{i18n('or_translate')}</Divider>
          <LoginForm />
        </AuthContainer>
      )}
    </>
  );
};

export default withLoader(Login);
