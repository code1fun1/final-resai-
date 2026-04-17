import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MyCredits from '~/modules/MyCredits';
import Layout from '~/shared/components/Layout/Layout';

function MyCreditsPage() {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={true} pageTitle={i18n('pageTitles.myCredits')}>
      <MyCredits />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'myCredits']))
    }
  };
};
export default MyCreditsPage;
