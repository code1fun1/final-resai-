import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';
import { NextRouter, useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import AuthFooter from '../AuthFooter';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { useStyles } from './AuthContainerStyles';
//import getConfig from 'next/config';
import { useWebsiteUrl } from '~/shared/hooks/useWebsiteUrl';
// const { serverRuntimeConfig: configs = {} } = getConfig() || {};
interface AuthContainerProps {
  children: ReactNode;
  showTermsAndPrivacyLinks?: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  showTermsAndPrivacyLinks = false
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const router: NextRouter = useRouter();
  const websiteUrl = useWebsiteUrl();

  useEffect(() => {
    if (isMobile) {
      setShowButtonModule(router.pathname === ROUTES.LOGIN);
    }
  }, [router.pathname]);

  const [showButtonModule, setShowButtonModule] = useState<boolean>(false);
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);

  // const carouselCard = [
  //   {
  //     title: i18n('craftfirstJob'),
  //     description: i18n('jobFocused')
  //   },
  //   {
  //     title: i18n('elevateCareer'),
  //     description: i18n('aiAssistance')
  //   },
  //   {
  //     title: i18n('craftfirstJob'),
  //     description: i18n('jobFocused')
  //   },
  //   {
  //     title: i18n('elevateCareer'),
  //     description: i18n('aiAssistance')
  //   },
  //   {
  //     title: i18n('craftfirstJob'),
  //     description: i18n('jobFocused')
  //   }
  // ];
  const carouselCard = [
    {
      title: i18n('bannerData.buildResume'),
      description: i18n('bannerData.buildResumeHeading')
    },
    {
      title: i18n('bannerData.freeSkillBuilding'),
      description: i18n('bannerData.freeSkillBuildingHeading')
    },
    {
      title: i18n('bannerData.tailoredResume'),
      description: i18n('bannerData.tailoredResumeHeading')
    },
    {
      title: i18n('bannerData.jobRecommendation'),
      description: i18n('bannerData.jobRecommendationHeading')
    },
    {
      title: i18n('bannerData.similarityScore'),
      description: i18n('bannerData.similarityScoreHeading')
    }
  ];
  // const { WebsiteUrl } = configs;
  const SITE_URL: string = websiteUrl;
  const TermsAndPrivacyText = {
    heading: i18n('bySigningUpAgree'),
    termsTitle: i18n('termsAndCondition'),
    privacyTitle: i18n('privacyPolicy'),
    termsLink: `${SITE_URL}en/terms-and-conditions`,
    privacyLink: `${SITE_URL}en/privacy-policy`
  };
  const handleSignupClick = () => {
    router.push(ROUTES.SIGN_UP);
  };

  return (
    <Box
      style={{
        height: '100vh',
        backgroundColor: '#000'
      }}
    >
      {showButtonModule ? (
        //  mobile device
        <Box
          display={{ xs: 'flex', md: 'none' }}
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-around"
          alignItems="center"
          gap={10}
          className={styles.carouselBgImg}
          height="auto"
        >
          <BrandCarousel carousel={true} carouselCardData={carouselCard} />
          <Box display="flex" flexDirection={'column'} gap={2} width="100%">
            <Button
              variant="contained"
              className={styles.outlinedButton}
              onClick={() => setShowButtonModule(false)}
              style={{ backgroundColor: '#424246' }}
            >
              {i18n('logIn')}
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#424246' }}
              onClick={handleSignupClick}
            >
              {i18n('signUp')}
            </Button>
          </Box>
        </Box>
      ) : (
        // desktop device
        <Box component={Grid} container height={`${isMobile ? 'auto' : '100vh'}`}>
          <Box
            component={Grid}
            item
            xs={12}
            md={6}
            className={styles.carouselBgImg}
            display="flex"
            alignItems="center"
            height={{ xs: 'fit-content', md: 'auto' }}
          >
            <Box display={{ xs: 'block', md: 'none' }}>
              <BrandCarousel carousel={false} />
            </Box>
            <Box display={{ xs: 'none', md: 'block' }}>
              <BrandCarousel carousel={true} carouselCardData={carouselCard} />
            </Box>
          </Box>
          <Box
            component={Grid}
            item
            xs={12}
            md={6}
            className={styles.buttonsWrap}
            display="flex"
            pr={{ xs: '20px', sm: '30px' }}
            pl={{ xs: '20px', sm: '30px', md: '50px', lg: '90px' }}
            position="relative"
            height={{ xs: 'auto', md: 'auto' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              width="100%"
              justifyContent="space-around"
              height={{ xs: 'auto', md: '100%' }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                width={{ xs: '100%', md: '350px', lg: '450px' }}
              >
                {children}
              </Box>
              <AuthFooter
                TermsAndPrivacyText={TermsAndPrivacyText}
                showTermsAndPrivacyLinks={showTermsAndPrivacyLinks}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AuthContainer;
