import { Avatar, Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOCALE_PAGE, MODAL_CONTENT_TYPE } from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import { STORAGE_TYPES, clearStorage } from '~/shared/utils/storage';
import ButtonIcon from '../../ButtonIcon';
import withLoader from '../../HOC/withLoader';
import Heading from '../../Heading';
import { TEXT_ALIGNMENT } from '../../Heading/Heading';
import MenuAppBar from '../../MenuAppBar';
import MenuItems from '../../MenuItems';
import Modal from '../../Modal';
import UpdatePassword from '../UpdatePassword';
import { useStyles } from './UserMenuStyles';
import { LogoutHandler, resetPasswordFromMenu } from './utils/UserMenuUtils';
import { RootState } from '~/shared/redux/reducers';
import {
  setLoggedInUserData,
  setLoggedInCreditData,
  setLoggedInDownloadedCvData
} from '~/shared/redux/actions';
import { useStylesGoldTheme } from '~/modules/globalStyles';

interface UserMenuProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}
interface LoggedInUserData {
  first_name: string;
  last_name: string;
  profile_pic: string;
}
const UserMenu = (props: UserMenuProps) => {
  const { setLoadWithoutMount } = props;
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const router = useRouter();
  const { asPath } = router;
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<MODAL_CONTENT_TYPE>();
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  // const { loggedInUser } = useSelector((state: RootState) => state?.user);
  // const { first_name: firstName, last_name: lastName, profile_pic: profilePic } = loggedInUser;

  const { loggedInUser } = useSelector(
    (state: RootState) => state?.user as { loggedInUser: LoggedInUserData }
  );
  const {
    first_name: firstName = '',
    last_name: lastName = '',
    profile_pic: profilePic = ''
  } = loggedInUser || {};
  // const storageType: STORAGE_TYPES = getStorageType();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleClose();
    // setLoadWithoutMount(true);
    setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
    const response = await LogoutHandler();
    if (response?.message === 'success') {
      router.push(ROUTES.LOGIN);
      // clearStorage(storageType);
      clearStorage(STORAGE_TYPES.LOCAL);
      clearStorage(STORAGE_TYPES.SESSION);
      dispatch(setLoggedInUserData({}));
      dispatch(setLoggedInCreditData({}));
      dispatch(
        setLoggedInDownloadedCvData({
          downloadable_resume_ids: []
        })
      );
      if (asPath === ROUTES.LOGIN) {
        // Stop the loader when the URL matches
        setLoadWithoutMount(false, '');
      }
      // setLoadWithoutMount(false);
    }
  };
  const handleResetPassword = async () => {
    await resetPasswordFromMenu();
  };
  const handleModalClick = (value: string) => {
    if (value === MODAL_CONTENT_TYPE.LOGOUT) {
      setOpenModal(true);
      setModalContent(MODAL_CONTENT_TYPE.LOGOUT);
    } else {
      handleResetPassword();
      setOpenModal(true);
      setModalContent(MODAL_CONTENT_TYPE.RESET);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  function capitalizeFirstChar(str: string) {
    return str.charAt(0).toUpperCase();
  }

  const userNameIntials =
    firstName && lastName
      ? `${capitalizeFirstChar(firstName[0])}${capitalizeFirstChar(lastName[0])}`
      : 'AA';
  //Redirect to route
  const handleRouteRedirect = (value: string) => {
    setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
    router.push(value);
    if (asPath === value) {
      // Stop the loader when the URL matches
      setLoadWithoutMount(false, '');
    }
    // router.push(value);
  };
  const settings = [
    {
      id: 1,
      label: i18n('header.myProfile', { ns: 'common' }),
      icon: 'userIcon',
      click: () => handleRouteRedirect(ROUTES.MY_PROFILE)
    },
    {
      id: 2,
      label: i18n('header.myUploadResume', { ns: 'common' }),
      icon: 'resUpload',
      click: () => handleRouteRedirect(ROUTES.RESUME_UPLOAD)
    },
    {
      id: 3,
      label: i18n('header.myResume', { ns: 'common' }),
      icon: 'resumeDoc',
      click: () => handleRouteRedirect(ROUTES.MY_RESUMES)
    },
    {
      id: 4,
      label: i18n('header.resetPassword', { ns: 'common' }),
      icon: 'shieldTick',
      click: () => handleModalClick(MODAL_CONTENT_TYPE.RESET)
    },
    {
      id: 5,
      label: i18n('header.logout', { ns: 'common' }),
      icon: 'logoutIcon',
      click: () => handleModalClick(MODAL_CONTENT_TYPE.LOGOUT)
    }
  ];

  return (
    <Box>
      <ButtonIcon onClick={handleOpenUserMenu}>
        <Avatar className={styles.avatarIcon} src={profilePic}>
          {userNameIntials}
        </Avatar>
      </ButtonIcon>
      <MenuAppBar
        anchorEl={anchorElUser}
        anchorOriginVertical="bottom"
        anchorOriginHorizontal="right"
        transformOriginVertical="top"
        transformOriginHorizontal="right"
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => {
          const { label, icon } = setting;
          return (
            <MenuItems
              key={setting.id}
              onClick={() => {
                handleCloseUserMenu();
                setting.click();
              }}
              itemLabel={label}
              itemIcon={icon}
            />
          );
        })}
      </MenuAppBar>
      {openModal && (
        <Modal
          open={openModal}
          onClose={handleClose}
          closeOnBackdropClick={modalContent === MODAL_CONTENT_TYPE.LOGOUT ? true : false}
        >
          {modalContent === MODAL_CONTENT_TYPE.LOGOUT && (
            <>
              <Heading
                title={i18n('modal.logout', { ns: 'common' })}
                subTitle={i18n('modal.areYouSureLogout', { ns: 'common' })}
                textTitleAlign={TEXT_ALIGNMENT.CENTER}
              />
              <Box
                display="flex"
                flexDirection={'column'}
                gap={2}
                width={{ xs: '100%', sm: '409px' }}
                my={2}
              >
                <Button
                  variant="outlined"
                  className={`${styles.outlinedButton} ${globalStyles.btnBlackColor}`}
                  onClick={handleLogout}
                >
                  {i18n('buttonTexts.yes', { ns: 'common' })}
                </Button>
                <Button
                  variant="contained"
                  className={`${globalStyles.btnBlackColor}`}
                  onClick={handleClose}
                >
                  {i18n('buttonTexts.no', { ns: 'common' })}
                </Button>
              </Box>
            </>
          )}
          {modalContent === MODAL_CONTENT_TYPE.RESET && (
            <Box
              display="flex"
              flexDirection={'column'}
              gap={2}
              width={{ xs: '100%', sm: '409px' }}
              my={2}
            >
              <UpdatePassword />
            </Box>
          )}
        </Modal>
      )}
    </Box>
  );
};

export default withLoader(UserMenu);
