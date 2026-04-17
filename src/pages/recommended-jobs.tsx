import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '~/shared/components/Layout/Layout';
import RecommendedJobs from '~/modules/RecommendedJobs';

const RecommendedJobsPage = () => {
  const { t: i18n } = useTranslation('onboarding');

  return (
    <Layout includeHeaderFooter pageTitle={i18n('recommendedJobs')}>
      <RecommendedJobs />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = '' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'onboarding']))
  }
});

export default RecommendedJobsPage;
