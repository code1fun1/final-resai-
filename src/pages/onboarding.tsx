import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Onboarding from '~/modules/Onboarding';
import Layout from '~/shared/components/Layout';

const OnboardingPage = () => {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={true} pageTitle={i18n('pageTitles.onboarding')}>
      <Onboarding />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'onboarding']))
    }
  };
};

export default OnboardingPage;
