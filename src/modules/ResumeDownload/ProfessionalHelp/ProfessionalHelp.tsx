import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import Icon from '~/shared/components/Icon';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './ProfessionalHelpStyles';
// import { RootState } from '~/shared/redux/reducers';
// import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import Modal from '~/shared/components/Modal';
// import CreditAlertPopup from '~/shared/components/CreditAlertPopup';
// interface UserCreditDataProps {
//   user_share_status: {
//     whatsapp: boolean;
//   };
//   user_current_credit: number;
// }
const ProfessionalHelp = () => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const dynamicLink = 'https://wa.me/9985308286?text=Hello%20there';
  const handleWhatsappMessage = () => {
    window.open(dynamicLink, '_blank');
  };
  //buy Course Code start
  // const [openModal, setOpenModal] = useState<boolean>(false);
  // const handleClose = () => {
  //   setOpenModal(false);
  // };
  // const { userCreditData } = useSelector(
  //   (state: RootState) => state?.user as { userCreditData: UserCreditDataProps }
  // );
  // const {
  //   user_current_credit: currentCredit //remainingCredit
  // } = userCreditData || {};
  // const settings = useSelector((state: RootState) => state.siteSettings);
  // // Initialize the downloadCvCredit variable
  // let setPurchaseCourseCredit = 0; //set default 0 to handle undefined case
  // settings.features.forEach((setting) => {
  //   if (setting.id == 2 && setting.name === 'course-purchase' && setting.type === 'repeat-pay') {
  //     // Set downloadCvCredit to the weight of the 'resume-download' feature
  //     setPurchaseCourseCredit = setting.weight;
  //   }
  // });
  // const purchaseCourseCredit = setPurchaseCourseCredit;
  // const canPurchaseCourse = () => {
  //   return currentCredit >= purchaseCourseCredit;
  // };

  // const handleBuyCourse = async () => {
  //   if (canPurchaseCourse() == true) {
  //     //write code to purchase course
  //   } else {
  //     setOpenModal(true);
  //   }
  // };
  //end
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
      alignItems={{ xs: 'start', lg: 'center' }}
      justifyContent="space-between"
      gap={2}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography className={styles.title}>{i18n('needProfessionalHelp')}</Typography>
        <Typography className={styles.subTitle}>{i18n('getHelpFromExperts')}</Typography>
      </Box>
      <Button
        variant="contained"
        endIcon={<Icon name="GetInTouchIcon" />}
        className={`${styles.primaryBtn} ${globalStyles.btnBlackColor}`}
        // className={globalStyles.btnBlackColor}
        onClick={handleWhatsappMessage}
      >
        {i18n('buttonTexts.getInTouch', { ns: 'common' })}
      </Button>
      {/* <Button
        variant="contained"
        // endIcon={<Icon name="GetInTouchIcon" />}
        className={`${styles.primaryBtn} ${globalStyles.btnBlackColor}`}
        // className={globalStyles.btnBlackColor}
        onClick={handleBuyCourse}
      >
        Buy Course
      </Button> */}
      {/* modal open start */}
      {/* {openModal && (
        <Modal open={openModal} onClose={handleClose} closeOnBackdropClick={false}>
          <Box
            display="flex"
            flexDirection={'column'}
            gap={2}
            width={{ xs: '100%', sm: '409px' }}
            my={2}
          >
            <CreditAlertPopup />
          </Box>
        </Modal>
      )} */}
      {/* end */}
    </Box>
  );
};
export default ProfessionalHelp;
