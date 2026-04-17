import { Button, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import {} from '../../../modules/auth/SignUp/utils/SignUpUtils';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import { ROUTES } from '~/shared/constants/routes';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { useStyles } from '~/shared/components/PDFGenerator/PDFGeneratorStyles';

interface CreditAlertPopupProps {
  handleUpdateShare?: () => void;
  creditForPerShare?: number;
  canGetCreditWhatsAppShare?: boolean;
  onClose?: () => void;
}

const CreditAlertPopup: React.FC<CreditAlertPopupProps> = ({
  handleUpdateShare,
  creditForPerShare,
  canGetCreditWhatsAppShare,
  onClose
}) => {
  const router = useRouter();
  const globalStyles = useStylesGoldTheme();
  const styles = useStyles();
  const { asPath } = router;
  const [btnEnable, setBtnEnable] = useState(false);
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_CREDITS);

  // redirect to credits page
  const handleRouteRedirect = (value: string) => {
    setBtnEnable(true);
    router.push(value);
    if (asPath === value) {
      setBtnEnable(false);
    }
  };

  return (
    <>
      <Typography component="h2" textAlign={{ xs: 'center' }}>
        {i18n('creditAlertPopUp.alertTitle')}
      </Typography>

      <Button
        variant="contained"
        className={globalStyles.btnBlackColor}
        onClick={() => handleRouteRedirect(ROUTES.MY_CREDIT)}
      >
        {btnEnable
          ? i18n('loaderMessages.pleaseWait', { ns: 'common' })
          : i18n('creditAlertPopUp.alertBtnName')}
      </Button>

      {canGetCreditWhatsAppShare && (
        <>
          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }} color="textSecondary">
            Share on WhatsApp to earn {creditForPerShare} free credits instantly!
          </Typography>

          <WhatsappShareButton
            url={'https://app.resai.co/en'}
            title={'resai.co/en'}
            separator=":: "
          >
            <Button
              variant="contained"
              className={styles.whatsupSharreBtn}
              onClick={() => {
                if (handleUpdateShare) handleUpdateShare();
                if (onClose) onClose();
              }}
              endIcon={<WhatsappIcon size={24} round />}
              sx={{ mt: 1 }}
            >
              {i18n('buttonTexts.shareOn', { ns: 'common' })}
            </Button>
          </WhatsappShareButton>
        </>
      )}
    </>
  );
};

export default memo(CreditAlertPopup);
