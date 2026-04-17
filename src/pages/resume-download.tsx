import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ResumeDownload from '~/modules/ResumeDownload';
import Layout from '~/shared/components/Layout/Layout';

const ResumeDownloadPage = () => {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={true} pageTitle={i18n('pageTitles.resumeDownload')}>
      <ResumeDownload />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'resumeDownload',
        'resumeCustomize',
        'myCredits'
      ]))
    }
  };
};

export default ResumeDownloadPage;
