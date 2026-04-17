import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MyProfile from '~/modules/MyProfile';
import Layout from '~/shared/components/Layout/Layout';

function MyProfilePage() {
  const { t: i18n } = useTranslation();

  return (
    <Layout includeHeaderFooter={true} pageTitle={i18n('pageTitles.myProfile')}>
      <MyProfile />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'myProfile']))
    }
  };
};

export default MyProfilePage;
