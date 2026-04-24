import { AppBar, Box, Toolbar, Typography } from '@mui/material';
// import { useTranslation } from 'next-i18next';
import Image from 'next/image';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ICON_COLORS } from '~/shared/constants/constants';
import { UserCreditDetails } from '~/shared/redux/actions';
import { RootState } from '~/shared/redux/reducers';
// import { isUserExistsOnSession } from '~/shared/utils/utils';
// import Icon from '../Icon';
import LanguageSelectBox from '../LanguageSelectBox';
import { useStyles } from './HeaderStyles';
//import NavList from './NavList';
import UserMenu from './UserMenu';
// import { getEarnedCredits } from './Utils';
// import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ROUTES } from '~/shared/constants/routes';
interface CreditButtonProps {
  creditPoints: string;
}
const CreditButton = (props: CreditButtonProps) => {
  const { creditPoints } = props;
  const styles = useStyles();
  const { t: i18n } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      py={{ xs: 1, sm: '10px' }}
      px={{ xs: '10px', sm: 2 }}
      className={styles.creditsWrapper}
    >
      {/* <Icon name="diamondIcon" /> */}
      <Image
        src="/image/Resai-black-logo-header.png"
        alt="Brand Logo"
        height={19}
        width={22}
        priority={true}
      />
      <Box display={{ xs: 'none', sm: 'block' }}>
        <Typography>{i18n('header.credits', { ns: 'common' })} </Typography>
      </Box>
      <Typography>{creditPoints}</Typography>
    </Box>
  );
};

const Header = () => {
  const router = useRouter();
  const styles = useStyles();
  // const currentPath = router.pathname;

  // This gives you the actual URL with dynamic values, e.g. "/post/123"
  const asPath = router.asPath;
  if (asPath != '/my-credits') {
    localStorage.setItem('prevPageRedirect', JSON.stringify(asPath));
  }
  // const dispatch = useDispatch();
  // const { loggedInUser } = useSelector((state: RootState) => state?.user);
  const { userCreditData } = useSelector(
    (state: RootState) => state?.user as { userCreditData: UserCreditDetails }
  );
  const userCredits = userCreditData?.user_current_credit ?? 0;
  const customColor = '#424246';
  // useEffect(() => {
  //   const isUserExists = isUserExistsOnSession();

  //   const fetchCreditPoints = async () => {
  //     const { credits } = await getEarnedCredits();
  //     dispatch(setLoggedInUserData({ ...(loggedInUser as object), credits }));
  //   };
  //   if (isUserExists) {
  //     fetchCreditPoints();
  //   }
  // }, []);
  const handleRouteRedirect = () => {
    router.push('/resume-upload');
  };
  const handleRouteRedirectCredit = () => {
    router.push(ROUTES.MY_CREDIT);
  };
  return (
    <AppBar id="app-header" position="static" className={styles.headerWrapper}>
      <Toolbar disableGutters>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Box display="flex" flexDirection={{ xs: 'row-reverse', lg: 'row' }}>
            {/*  resai logo */}
            <Box>
              <Box className={styles.logoStyle}>
                <a href="javascript:void(0)" onClick={handleRouteRedirect}>
                  <Image
                    src="/image/Resai-gold-logo-header.png"
                    alt="Brand Logo"
                    height={30}
                    width={100}
                    priority={true}
                  />
                </a>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexGrow={0} alignItems="center">
          <Box display="flex" alignItems="center">
            <Box className={styles.languageBox}>
              <LanguageSelectBox
                iconColor={ICON_COLORS.PRIMARY}
                style={{ color: `${customColor}` }}
                renderValueInitials={true}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
              <a href="javascript:void(0)" onClick={handleRouteRedirectCredit}>
                {/* <CreditButton creditPoints={userCredits} /> */}
                <CreditButton creditPoints={String(userCredits)} />
              </a>
              <UserMenu />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
