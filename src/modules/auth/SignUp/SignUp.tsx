import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthContainer from '~/shared/components/AuthContainer';
import CreatePassword from '~/shared/components/CreatePassword';
import withLoader from '~/shared/components/HOC/withLoader';
import Heading from '~/shared/components/Heading';
import { HEADING_TYPE } from '~/shared/components/Heading/Heading';
import Icon from '~/shared/components/Icon';
import LoadingIndicator from '~/shared/components/LoadingIndicator';
import OTPVerification from '~/shared/components/OTPVerification';
import SingleSignOn from '~/shared/components/SingleSignOn';
import Toast from '~/shared/components/Toast';
import { API_STATUS } from '~/shared/constants/apiConstants';

// import { useSelector } from 'react-redux';
// import { RootState } from '~/shared/redux/reducers'; // Adjust the path if needed

import {
  FIELD_TYPE,
  LOCALE_PAGE,
  PasswordValidityType,
  SEVERITY,
  SIGN_UP_STEPS,
  ToastMessage
} from '~/shared/constants/constants';
import useLoginRedirect from '~/shared/hooks/useLoginRedirect';
import { getStorageItem } from '~/shared/utils/storage';
import {
  MASKED_STRING_NUMBER,
  OTP_FIELD_LENGTH,
  RESEND_OTP_TIMER,
  checkPasswordValidity,
  handleToast,
  isEmailId,
  maskedStringFromLast
} from '~/shared/utils/utils';
import { handleSingleSignOn, setAuthData } from '../Utils/AuthUtils';
import SignUpForm from './SignUpForm';
import { useStyles } from './SignUpStyles';
import {
  FormData,
  RegisterUserHeaderType,
  registerUser,
  resendOTP,
  savePassword,
  verifyOTP
} from './utils/SignUpUtils';
import { useRouter } from 'next/router';
import { ROUTES } from '~/shared/constants/routes';
import { handleSetUserCreditData, handleSetUserResumeData } from '~/modules/auth/Utils/CreditUtils';
interface SignUpProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setLoadWithoutMount }) => {
  // const settings = useSelector((state: RootState) => state.siteSettings);
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const styles = useStyles();
  const router = useRouter();
  const { asPath } = router;
  const { SIGN_UP_FORM, OTP_INPUT, PASSWORD_SETTING } = SIGN_UP_STEPS;
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  const { EMAIL, PHONE, VERIFY_EMAIL, VERIFY_NUMBER } = FIELD_TYPE;
  const [step, setStep] = useState<string>(SIGN_UP_FORM);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { handleUserRedirection } = useLoginRedirect(setLoadWithoutMount);
  const [formData, setFormData] = useState<FormData>({
    valueType: '',
    value: '',
    countryCode: '',
    password: '',
    confirmPassword: '',
    passwordToken: '',
    otp: new Array(OTP_FIELD_LENGTH).fill('')
  });
  const [otpExpirationTime, setOTPExpirationTime] = useState<number>(RESEND_OTP_TIMER);
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const [apiRequestHeader, setAPIRequestHeader] = useState<RegisterUserHeaderType>({
    userID: '',
    orgId: '',
    roleId: ''
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
    if (getStorageItem({ key: 'user-id', useCombineStorage: true })) {
      handleUserRedirection();
    } else {
      setHasAccess(true);
    }
  });

  const handleRegisterUser = useCallback(
    async (value: string) => {
      setLoadWithoutMount(true);
      const res = await registerUser(value, apiRequestHeader);
      const isThisEmail: boolean = isEmailId(value);
      setFormData((prevState) => ({
        ...prevState,
        valueType: isThisEmail ? EMAIL : PHONE,
        value
      }));
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      handleToast({ severity, message: res.message }, setToastState, toastState);
      if (res?.status === SUCCESS) {
        setFormData((prevState) => ({
          ...prevState,
          countryCode: res?.data?.country_code
        }));
        setAPIRequestHeader((prevState) => ({
          ...prevState,
          userID: res?.data?.id,
          orgId: res?.data?.org_id,
          roleId: res?.data?.role_id
        }));
        setStep(OTP_INPUT);
      }
      setLoadWithoutMount(false);
    },
    [formData || apiRequestHeader]
  );

  const handleOTPVerify = useCallback(
    async (otp: string) => {
      setLoadWithoutMount(true);
      const res = await verifyOTP(otp, apiRequestHeader);
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      handleToast({ severity, message: res.message }, setToastState, toastState);
      if (res?.status === SUCCESS) {
        setStep(PASSWORD_SETTING);
        setFormData((prevState) => ({ ...prevState, passwordToken: res.data.password_token }));
      }
      setLoadWithoutMount(false);
    },
    [apiRequestHeader]
  );

  const handleResendOTP = useCallback(async () => {
    setLoadWithoutMount(true);
    setOTPExpirationTime(RESEND_OTP_TIMER);
    const res = await resendOTP(formData, apiRequestHeader);
    const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    setLoadWithoutMount(false);
  }, [formData || apiRequestHeader]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSetOTP = useCallback((newOTP: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      otp: newOTP
    }));
  }, []);

  const handleEditClick = useCallback(() => {
    setStep(SIGN_UP_FORM);
    setFormData((prevState) => ({
      ...prevState,
      otp: new Array(OTP_FIELD_LENGTH).fill('')
    }));
    setOTPExpirationTime(RESEND_OTP_TIMER);
  }, []);

  const handleSignUp = useCallback(async () => {
    setLoadWithoutMount(true, i18n('loaderMessages.thisMayTakeUptoAMinuteOrTwo', { ns: 'common' }));
    const res = await savePassword(formData, apiRequestHeader);
    // const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
    // handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res?.status === SUCCESS) {
      setAuthData(res?.data?.data, dispatch);
      const { user_step: userStep } = res?.data?.data.user_details;
      handleUserRedirection(userStep);
      //set UserCreditDetails - start
      await handleSetUserCreditData(dispatch); //set UserCreditDetails
      await handleSetUserResumeData(dispatch); //set UserResumeData
      //set UserCreditDetails - end
      if (asPath === ROUTES.RESUME_DOWNLOAD) {
        // Stop the loader when the URL matches
        setLoadWithoutMount(false, '');
      }
    }
    setLoadWithoutMount(false);
  }, [formData || apiRequestHeader]);
  //handle Set user Credit Data and Downloded CV -START

  //handle Set user Credit Data and Downloded CV -END
  const [passwordValidity, setPasswordValidity] = useState<PasswordValidityType>({
    validLength: false,
    hasNumber: false,
    specialChar: false,
    matchingPassword: false
  });

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

  const handleLoginClick = useCallback(
    async (value: { e: React.SyntheticEvent<Element, Event>; title: string }) => {
      setLoadWithoutMount(true);
      await handleSingleSignOn(value);
      setLoadWithoutMount(false);
    },
    []
  );
  const isPasswordValid: boolean = Object.values(passwordValidity).every((value) => value === true);

  return (
    <>
      {/* <ul>
        {settings.features &&
          settings.features.map((feature, index) => {
            return (
              <li key={index}>
                <strong>{feature.id}</strong>
                <br />
                <strong>{feature.name}</strong>
                <br />
                Type: {feature.type}
                <br />
                Weight: {feature.weight}
              </li>
            );
          })}
      </ul> */}

      {!hasAccess ? (
        <LoadingIndicator />
      ) : (
        <AuthContainer showTermsAndPrivacyLinks>
          <Heading
            title={
              step === SIGN_UP_FORM
                ? i18n('createAccount')
                : step === OTP_INPUT
                  ? i18n(formData.valueType === EMAIL ? VERIFY_EMAIL : VERIFY_NUMBER)
                  : i18n('createPassword')
            }
            subTitle={step === SIGN_UP_FORM ? i18n('quicklogIn') : undefined}
            headingType={HEADING_TYPE.AUTH}
          />
          {step === SIGN_UP_FORM && (
            <>
              <SingleSignOn onSingleSignOn={(value) => handleLoginClick(value)} />
              <Divider className={styles.divider}>{i18n('or_translate')}</Divider>
              <SignUpForm
                label={i18n('enterMailPhoneNumber')}
                placeholder={i18n('enterPlaceholderMailPhoneNumber')}
                showSubtitle
                onClick={(value) => handleRegisterUser(value)}
                buttonName={i18n('getVerificationCode')}
                defaultValue={formData.value}
              />
            </>
          )}
          {step === OTP_INPUT && (
            <>
              <Box display="flex" alignItems="center" justifyContent={{ xs: 'center', md: 'left' }}>
                <Typography className={`${styles.subTitle} ${styles.editNumber}`}>
                  {maskedStringFromLast(
                    formData?.valueType === EMAIL
                      ? formData.value
                      : `${formData?.countryCode ?? ''} ${formData.value}`,
                    MASKED_STRING_NUMBER
                  )}{' '}
                </Typography>
                <IconButton className={styles.docEditIconStyle} onClick={handleEditClick}>
                  <Icon name="docEditIcon" />
                </IconButton>
              </Box>
              <OTPVerification
                authFactorType={formData.valueType}
                onClick={handleOTPVerify}
                resendOTP={handleResendOTP}
                otp={formData?.otp}
                onSetOtp={handleSetOTP}
                otpExpirationTime={otpExpirationTime}
                showDivider={true}
                primaryButton={i18n('buttonTexts.verify', { ns: 'common' })}
                secondaryButton={i18n('createPassword.resendOTP', { ns: 'common' })}
                primaryHeading={
                  formData.valueType === EMAIL
                    ? i18n('enterCodeFromEmail')
                    : i18n('enterCodeFromNumber')
                }
                secondaryHeading={i18n('createPassword.resendVerificationCode', {
                  ns: 'common'
                })}
              />
            </>
          )}
          {step === PASSWORD_SETTING && (
            <CreatePassword
              buttonName={i18n('signUp')}
              passwordValidity={passwordValidity}
              onClick={handleSignUp}
              onChange={handleChange}
              disableSignUpBtn={!isPasswordValid}
              passwordValidationRules={passwordValidationRules}
            />
          )}
          {toastState.open && <Toast toastState={toastState} />}
        </AuthContainer>
      )}
    </>
  );
};

export default withLoader(SignUp);
