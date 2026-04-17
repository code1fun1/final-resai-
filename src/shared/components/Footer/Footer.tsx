import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import TermsAndPrivacyLinks from '../TermsAndPrivacyLinks';
import { useStyles } from './FooterStyles';
// import getConfig from 'next/config';
import { useWebsiteUrl } from '~/shared/hooks/useWebsiteUrl';

// const { serverRuntimeConfig: configs = {} } = getConfig() || {};
const Footer = () => {
  const styles = useStyles();
  const { t: i18n } = useTranslation('common');
  const websiteUrl = useWebsiteUrl();
  const SITE_URL: string = websiteUrl;
  // let SITE_URL: string = '';
  // if (process.env.NODE_ENV === 'development') {
  //   SITE_URL = 'https://dev-static.resai.co/en';
  // } else if (process.env.NODE_ENV === 'production') {
  //   SITE_URL = 'https://www.resai.co/en'; //change production home page url
  // }
  // Get the current year
  const currentYear = new Date().getFullYear();
  return (
    <Box position="fixed" bottom={0} width="100%">
      <Container maxWidth={false} className={`${styles.footerWrapper} ${styles.footerText}`}>
        <Box display="flex" alignItems="center" gap="5px">
          <Box display={{ xs: 'none', sm: 'block' }}>
            <Typography
              style={{
                color: '#424246',
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              {i18n('footer.copyrightText', { ns: 'common' })}
            </Typography>
          </Box>
          <Typography
            style={{
              color: '#424246',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            {i18n('footer.copyrightIconText', { year: currentYear })}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <TermsAndPrivacyLinks
            privacyTitle={i18n('footer.privacyPolicy', { ns: 'common' })}
            termsTitle={i18n('footer.termsOfUse', { ns: 'common' })}
            termsLink={`${SITE_URL}en/terms-and-conditions`}
            privacyLink={`${SITE_URL}en/privacy-policy`}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
