import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import OTPInput from '~/shared/components/OTPInput';
import {
  OTP_FIELD_LENGTH,
  SECONDS_IN_A_MINUTE,
  calculateTimeRemaining
} from '~/shared/utils/utils';
import {} from '../../../modules/auth/SignUp/utils/SignUpUtils';
import { useStyles } from './OTPVerificationStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';
interface OTPVerificationProps {
  otpFieldLength?: number;
  onClick: (otp: string) => void;
  resendOTP: () => void;
  authFactorType: string;
  otp: string[];
  onSetOtp: (newOTP: string[]) => void;
  otpExpirationTime: number;
  showDivider?: boolean;
  primaryButton: string;
  secondaryButton: string;
  primaryHeading: string;
  secondaryHeading: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  otpFieldLength = OTP_FIELD_LENGTH,
  onClick,
  resendOTP,
  otp,
  onSetOtp,
  otpExpirationTime,
  showDivider,
  primaryButton,
  secondaryButton,
  primaryHeading,
  secondaryHeading
}) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const { minutes, seconds } = calculateTimeRemaining(otpExpirationTime, SECONDS_IN_A_MINUTE);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClick(otp.join(''));
      event.preventDefault();
    }
  };

  return (
    <>
      {showDivider && <Divider className={styles.divider} />}
      <Typography
        component="p"
        className={styles.linkWrap}
        textAlign={{ xs: 'center', md: 'left' }}
      >
        {primaryHeading}
      </Typography>
      <Box>
        <Stack
          direction="row"
          spacing={1}
          gap={{ xs: '5px', sm: 1 }}
          justifyContent={{ xs: 'center', md: 'space-between' }}
        >
          <OTPInput otpFieldLength={otpFieldLength} otp={otp} onSetOtp={onSetOtp} />
        </Stack>
      </Box>
      <Button
        variant="contained"
        // color="primary"
        className={globalStyles.btnBlackColor}
        disabled={otp.some((value) => value === '')}
        onClick={() => onClick(otp.join(''))}
        onKeyDown={handleKeyDown}
      >
        {primaryButton}
      </Button>
      {otpExpirationTime > 0 ? (
        <Box display={'flex'} flexDirection="column" gap={0}>
          <Typography component="p" className={styles.linkWrap} textAlign="center">
            {secondaryHeading}
          </Typography>
          <Typography component="p" className={styles.linkWrap} textAlign="center">
            {minutes > 10 ? minutes : `0${minutes}`}:{seconds > 9 ? seconds : `0${seconds}`}
          </Typography>
        </Box>
      ) : (
        <Button
          variant="text"
          // color="primary"
          className={globalStyles.btnBlackColorWithWhite}
          onClick={resendOTP}
        >
          {secondaryButton}
        </Button>
      )}
    </>
  );
};

export default memo(OTPVerification);
