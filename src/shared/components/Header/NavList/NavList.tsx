import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import ButtonIcon from '../../ButtonIcon';
import MenuAppBar from '../../MenuAppBar';
import MenuItems from '../../MenuItems';
import { useStyles } from './NavListStyles';
import Router from 'next/router';
// import getConfig from 'next/config';
// import { ROUTES } from '~/shared/constants/routes';
import { useRouter } from 'next/router';
import { useWebsiteUrl } from '~/shared/hooks/useWebsiteUrl';
// const { serverRuntimeConfig: configs = {} } = getConfig() || {};

const NavList = () => {
  const router = useRouter();
  const currentLocale = router.locale;
  const websiteUrl = useWebsiteUrl();
  const styles = useStyles();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const openInNewTab = (url: string, target: string) => {
    if (target == 'newtab') {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    } else {
      Router.push(url);
    }
  };

  const { t: i18n } = useTranslation();
  const SITE_URL: string = websiteUrl;
  // let SITE_URL: string = '';
  // if (process.env.NODE_ENV === 'development') {
  //   SITE_URL = 'https://dev-static.resai.co/en/home';
  // } else if (process.env.NODE_ENV === 'production') {
  //   SITE_URL = 'https://www.resai.co/en/home'; //change production home page url
  // }
  const pages = [
    // {
    //   pageName: i18n('header.home', { ns: 'common' }),
    //   link: `${ROUTES.RESUME_UPLOAD}`,
    //   target: ''
    // },
    {
      pageName: i18n('header.home', { ns: 'common' }),
      link: `${SITE_URL}`,
      target: 'newtab'
    },
    {
      pageName: i18n('header.features', { ns: 'common' }),
      link: `${SITE_URL}${currentLocale}/home#features`,
      target: 'newtab'
    },
    {
      pageName: i18n('header.tutorials', { ns: 'common' }),
      link: `${SITE_URL}${currentLocale}/home#tutorials`,
      target: 'newtab'
    },
    {
      pageName: i18n('header.howItWorks', { ns: 'common' }),
      link: `${SITE_URL}${currentLocale}/home#howItWorks`,
      target: 'newtab'
    },
    {
      pageName: i18n('header.testimonials', { ns: 'common' }),
      link: `${SITE_URL}${currentLocale}/home#testimonials`,
      target: 'newtab'
    }
    // {
    //   pageName: i18n('header.uploadResume', { ns: 'common' }),
    //   link: `${ROUTES.RESUME_UPLOAD}`,
    //   target: ''
    // }
  ];
  return (
    <Box display="flex" flexGrow={1} alignItems="center">
      {/* mobile device */}
      <Box display={{ xs: 'block', lg: 'none' }}>
        <ButtonIcon
          aria-label="account of current user"
          aria-controls="menu-appbar"
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </ButtonIcon>
        <Box display={{ xs: 'block', lg: 'none' }}>
          <MenuAppBar
            anchorEl={anchorElNav}
            anchorOriginVertical="bottom"
            anchorOriginHorizontal="left"
            transformOriginVertical="top"
            transformOriginHorizontal="left"
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItems
                key={page.pageName}
                itemLabel={page.pageName}
                onClick={() => {
                  handleCloseNavMenu();
                  openInNewTab(page.link, page.target);
                }}
              />
            ))}
          </MenuAppBar>
        </Box>
      </Box>

      {/* desktop device */}
      <Box display={{ lg: 'flex', xs: 'none' }} ml={4} gap={2}>
        {pages.map((page) => (
          <Button
            key={page.pageName}
            className={styles.linkStyle}
            onClick={() => openInNewTab(page.link, page.target)}
          >
            {page.pageName}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default NavList;
