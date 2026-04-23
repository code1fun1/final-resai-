import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { useWebsiteUrl } from '~/shared/hooks/useWebsiteUrl';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import LanguageSelectBox from '../LanguageSelectBox';
import { ICON_COLORS } from '~/shared/constants/constants';
import { useStyles } from './AuthContainerStyles';

interface AuthContainerProps {
  children: ReactNode;
  showTermsAndPrivacyLinks?: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const styles = useStyles();
  const websiteUrl = useWebsiteUrl();

  const SITE_URL: string = websiteUrl;
  const termsLink = `${SITE_URL}en/terms-and-conditions`;
  const privacyLink = `${SITE_URL}en/privacy-policy`;

  return (
    <Box className={styles.pageWrapper}>
      {/* Left panel — image carousel */}
      <BrandCarousel />

      {/* Right panel — form */}
      <Box className={styles.rightPanel}>
        <Box className={styles.formWrapper}>{children}</Box>
        <Box className={styles.termsRow}>
          <Typography className={styles.termsText}>
            {'By signing up, you agree to our '}
            <a
              href={termsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.termsLink}
            >
              Terms &amp; Conditions
            </a>
            {' and '}
            <a
              href={privacyLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.termsLink}
            >
              Privacy Policy.
            </a>
          </Typography>
        </Box>
        <Box className={styles.langRow}>
          <LanguageSelectBox iconColor={ICON_COLORS.DISABLED} renderValueInitials={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthContainer;
