import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PageNotFound = () => {
  const { t: i18n } = useTranslation();

  return (
    <Container maxWidth="sm">
      <Box my={12}>
        <h1>{i18n('404Page.pageNotFound')}</h1>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale = '' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

export default PageNotFound;
