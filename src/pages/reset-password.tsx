import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import ResetPassword from '~/modules/auth/ResetPassword';
import Layout from '~/shared/components/Layout';
import { NULL, SEARCH_PARAMS_KEYS } from '~/shared/constants/constants';

function ResetPasswordPage() {
  const { t: i18n } = useTranslation();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const passwordToken: string =
    useMemo(() => {
      if (searchParams.get(SEARCH_PARAMS_KEYS.PASSWORD_TOKEN) !== '') {
        return searchParams.get(SEARCH_PARAMS_KEYS.PASSWORD_TOKEN);
      }
    }, [searchParams]) || NULL;

  return (
    <Layout includeHeaderFooter={false} pageTitle={i18n('pageTitles.resetPassword')}>
      <ResetPassword passwordToken={passwordToken} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth']))
    }
  };
};

export default ResetPasswordPage;
