import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MyResumes from '~/modules/MyResumes';
import Layout from '~/shared/components/Layout/Layout';

function MyResumesPage() {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={true} pageTitle={i18n('pageTitles.myResumes')}>
      <MyResumes />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'myResumes']))
    }
  };
};
export default MyResumesPage;
