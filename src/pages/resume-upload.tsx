import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ResumeUpload from '~/modules/ResumeUpload';
import Layout from '~/shared/components/Layout/Layout';

function ResumeUploadPage() {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={true} pageTitle={i18n('pageTitles.resumeUpload')}>
      <ResumeUpload />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'resumeUpload']))
    }
  };
};

export default ResumeUploadPage;
