import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { ICON_COLORS } from '~/shared/constants/constants';
import LanguageSelectBox from '../LanguageSelectBox';
import TermsAndPrivacyLink from '../TermsAndPrivacyLinks';

interface AuthFooterProps {
  TermsAndPrivacyText?: {
    heading: string;
    termsTitle: string;
    privacyTitle: string;
    termsLink: string;
    privacyLink: string;
  };
  showTermsAndPrivacyLinks: boolean;
}

const AuthFooter: FC<AuthFooterProps> = ({
  TermsAndPrivacyText,
  showTermsAndPrivacyLinks = false
}) => {
  const {
    heading,
    termsTitle,
    privacyTitle,
    termsLink = '#',
    privacyLink = '#'
  } = TermsAndPrivacyText || {};
  return (
    <Box component={Grid} container py={2} alignItems="end" textAlign="left">
      <Grid item xs={7}>
        {showTermsAndPrivacyLinks && (
          <TermsAndPrivacyLink
            heading={heading}
            termsTitle={termsTitle!}
            privacyTitle={privacyTitle!}
            termsLink={termsLink}
            privacyLink={privacyLink}
          />
        )}
      </Grid>
      <Grid item xs={5}>
        <Box display="flex" alignItems="center" justifyContent="end">
          <LanguageSelectBox iconColor={ICON_COLORS.DISABLED} renderValueInitials={false} />
        </Box>
      </Grid>
    </Box>
  );
};

export default AuthFooter;
