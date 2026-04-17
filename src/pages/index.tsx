import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Login from '~/modules/auth/Login';
import Settings from '~/modules/SiteSettings/Settings';
import Layout from '~/shared/components/Layout/Layout';

function Index() {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={false} pageTitle={i18n('pageTitles.login')}>
      <Settings />
      <Login />
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

export default Index;
