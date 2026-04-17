import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormData, savePassword, verifyOTP } from '~/modules/auth/SignUp/utils/SignUpUtils';
import { setAuthData } from '~/modules/auth/Utils/AuthUtils';
import OTPVerification from '~/shared/components/OTPVerification';
import Toast from '~/shared/components/Toast';
import { API_STATUS } from '~/shared/constants/apiConstants';
import {
  LOCALE_PAGE,
  PasswordValidityType,
  SEVERITY,
  SIGN_UP_STEPS,
  ToastMessage
} from '~/shared/constants/constants';
// import { RootState } from '~/shared/redux/reducers';
import {
  OTP_FIELD_LENGTH,
  RESEND_OTP_TIMER,
  checkPasswordValidity,
  handleToast
} from '~/shared/utils/utils';
import CreatePassword from '../../CreatePassword';
import Heading from '../../Heading';
import { TEXT_ALIGNMENT } from '../../Heading/Heading';
import { useStyles } from '../UserMenu/UserMenuStyles';
import { resetPasswordFromMenu } from '../UserMenu/utils/UserMenuUtils';

const UpdatePassword = () => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const styles = useStyles();
  const { OTP_INPUT, PASSWORD_SETTING, RESET_SUCCESS_RESPONSE, RESET_FAILURE_RESPONSE } =
    SIGN_UP_STEPS;
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  const dispatch = useDispatch();
  // const { loggedInUser } = useSelector((state: RootState) => state?.user);
  // const { credits: userCredits } = loggedInUser;
  const userCredits = '0';
  const [step, setStep] = useState<string>(OTP_INPUT);
  const [otpExpirationTime, setOTPExpirationTime] = useState<number>(RESEND_OTP_TIMER);
  const [formData, setFormData] = useState<FormData>({
    valueType: '',
    value: '',
    countryCode: '',
    password: '',
    confirmPassword: '',
    passwordToken: '',
    otp: new Array(OTP_FIELD_LENGTH).fill('')
  });
  const [passwordValidity, setPasswordValidity] = useState<PasswordValidityType>({
    validLength: false,
    hasNumber: false,
    specialChar: false,
    matchingPassword: false
  });
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const passwordValidationRules = useMemo(
    () => [
      {
        type: 'hasNumber',
        label: i18n('passwordValidityIndicators.containsAtLeastOneNumber', { ns: 'common' })
      },
      {
        type: 'specialChar',
        label: i18n('passwordValidityIndicators.containsAtLeastOneSymbol', { ns: 'common' })
      },
      {
        type: 'validLength',
        label: i18n('passwordValidityIndicators.betweenEightToTwentyFourChar', { ns: 'common' })
      },
      {
        type: 'matchingPassword',
        label: i18n('passwordValidityIndicators.matchWithConfirmPassword', { ns: 'common' })
      }
    ],
    []
  );

  useEffect(() => {
    checkPasswordValidity(formData, setPasswordValidity);
  }, [formData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (otpExpirationTime > 0) {
        setOTPExpirationTime((prevTimeLeft) => prevTimeLeft - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [otpExpirationTime]);

  const handleOTPVerify = useCallback(async (otp: string) => {
    const res = await verifyOTP(otp);
    const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);

    if (res?.status === SUCCESS) {
      setStep(PASSWORD_SETTING);

      setFormData((prevState) => ({ ...prevState, passwordToken: res.data.password_token }));
    }
  }, []);

  const handleSetOTP = useCallback((newOTP: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      otp: newOTP
    }));
  }, []);

  const handleResendOTP = async () => {
    const res = await resetPasswordFromMenu();
    const severity: SEVERITY = res?.status === SEVERITY.SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res?.status === SUCCESS) {
      setOTPExpirationTime(RESEND_OTP_TIMER);
    }
  };

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleResetPassword = useCallback(async () => {
    const res = await savePassword(formData);
    const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res?.status === SUCCESS) {
      setAuthData(
        {
          ...res?.data?.data,
          user_details: { ...res?.data?.data.user_details, credits: userCredits }
        },
        dispatch
      );
      setStep(RESET_SUCCESS_RESPONSE);
    } else {
      setStep(RESET_FAILURE_RESPONSE);
    }
  }, [formData]);
  const isPasswordValid: boolean = Object.values(passwordValidity).every((value) => value === true);

  return (
    <>
      {(step === OTP_INPUT || step === PASSWORD_SETTING) && (
        <Heading
          title={
            step === OTP_INPUT
              ? i18n('createPassword.verificationNeeded', { ns: 'common' })
              : step === PASSWORD_SETTING
                ? i18n('createPassword.resetYourPassword', { ns: 'common' })
                : ''
          }
          textTitleAlign={step === PASSWORD_SETTING ? TEXT_ALIGNMENT.LEFT : TEXT_ALIGNMENT.CENTER}
        />
      )}
      {step === OTP_INPUT && (
        <Box display="flex" flexDirection="column" gap={2} className={styles.titleStyles}>
          <OTPVerification
            authFactorType={formData.valueType}
            onClick={handleOTPVerify}
            resendOTP={handleResendOTP}
            otp={formData?.otp}
            onSetOtp={handleSetOTP}
            otpExpirationTime={otpExpirationTime}
            showDivider={false}
            primaryButton={i18n('buttonTexts.continue', { ns: 'common' })}
            secondaryButton={i18n('createPassword.resendOTP', { ns: 'common' })}
            primaryHeading={i18n('createPassword.enterVerificationCode', {
              ns: 'common'
            })}
            secondaryHeading={i18n('createPassword.resendVerificationCode', {
              ns: 'common'
            })}
          />
        </Box>
      )}
      {step === PASSWORD_SETTING && (
        <CreatePassword
          buttonName={i18n('createPassword.resetPassword', { ns: 'common' })}
          passwordValidity={passwordValidity}
          onClick={handleResetPassword}
          onChange={handleChange}
          disableSignUpBtn={!isPasswordValid}
          passwordValidationRules={passwordValidationRules}
        />
      )}
      {step === RESET_SUCCESS_RESPONSE && (
        <Box width={{ xs: '100%', md: '295px' }} margin="0 auto">
          <Box className={styles.imgWrap}>
            <Image
              src="/image/ResetSuccessResponse.svg"
              height={110}
              width={239}
              alt="Success Response"
            />
          </Box>
          <Heading
            title={i18n('createPassword.passwordUpdated', { ns: 'common' })}
            subTitle={i18n('createPassword.passwordChangedSuccessfully', {
              ns: 'common'
            })}
            textTitleAlign={TEXT_ALIGNMENT.CENTER}
          />
        </Box>
      )}
      {step === RESET_FAILURE_RESPONSE && (
        <Box>
          <Box>
            <Box className={styles.imgWrap}>
              <Image
                src="/image/ResetFailureResponse.svg"
                height={110}
                width={239}
                alt="Failure Response"
              />
            </Box>
            <Heading
              title={i18n('createPassword.failed', { ns: 'common' })}
              textTitleAlign={TEXT_ALIGNMENT.CENTER}
            />
          </Box>
        </Box>
      )}
      <Toast toastState={toastState} />
    </>
  );
};

export default UpdatePassword;
