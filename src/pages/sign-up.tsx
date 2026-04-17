import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SignUp from '~/modules/auth/SignUp';
import Layout from '~/shared/components/Layout/Layout';

function SignUpPage() {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={false} pageTitle={i18n('pageTitles.signUp')}>
      <SignUp />
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

export default SignUpPage;
