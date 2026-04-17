import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContainer from '~/shared/components/AuthContainer';
import CreatePassword from '~/shared/components/CreatePassword';
import withLoader from '~/shared/components/HOC/withLoader';
import Heading from '~/shared/components/Heading';
import { HEADING_TYPE } from '~/shared/components/Heading/Heading';
import LoadingIndicator from '~/shared/components/LoadingIndicator';
import Toast from '~/shared/components/Toast';
import { API_STATUS } from '~/shared/constants/apiConstants';
import {
  LOCALE_PAGE,
  PasswordData,
  PasswordValidityType,
  SEVERITY,
  ToastMessage
} from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import useLoginRedirect from '~/shared/hooks/useLoginRedirect';
import { getStorageItem } from '~/shared/utils/storage';
import { checkPasswordValidity, handleToast } from '~/shared/utils/utils';
import { ResetPasswordProps, resetPassword } from './Utils/ResetPasswordUtils';

const ResetPassword: React.FC<ResetPasswordProps> = ({ passwordToken, setLoadWithoutMount }) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const { SUCCESS } = API_STATUS;
  const router = useRouter();
  const { handleUserRedirection } = useLoginRedirect();

  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });

  const [formData, setFormData] = useState<PasswordData>({
    password: '',
    confirmPassword: ''
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

  const [passwordValidity, setPasswordValidity] = useState<PasswordValidityType>({
    validLength: false,
    hasNumber: false,
    specialChar: false,
    matchingPassword: false
  });

  useEffect(() => {
    if (getStorageItem({ key: 'user-id', useCombineStorage: true })) {
      handleUserRedirection();
    } else {
      setHasAccess(true);
    }
  });

  const handleResetPassword = useCallback(async () => {
    setLoadWithoutMount(true);
    const resetPasswordReq: { password: string; passwordToken: string | null } = {
      password: formData.password,
      passwordToken: passwordToken
    };
    const res = await resetPassword(resetPasswordReq);
    const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : SEVERITY.ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res?.status === SUCCESS) {
      router.push(ROUTES.LOGIN);
    }
    setLoadWithoutMount(false);
  }, [formData, passwordToken]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  useEffect(() => {
    checkPasswordValidity(formData, setPasswordValidity);
  }, [formData]);

  const isPasswordValid: boolean = Object.values(passwordValidity).every((value) => value === true);

  return (
    <>
      {!hasAccess ? (
        <LoadingIndicator />
      ) : (
        <AuthContainer>
          <Heading
            title={i18n('createPassword.resetYourPassword', { ns: 'common' })}
            headingType={HEADING_TYPE.AUTH}
          />
          <CreatePassword
            buttonName={i18n('createPassword.resetPassword', { ns: 'common' })}
            passwordValidity={passwordValidity}
            onClick={handleResetPassword}
            onChange={handleChange}
            disableSignUpBtn={!isPasswordValid}
            passwordValidationRules={passwordValidationRules}
          />
          {toastState.open && <Toast toastState={toastState} />}
        </AuthContainer>
      )}
    </>
  );
};

export default withLoader(ResetPassword);
