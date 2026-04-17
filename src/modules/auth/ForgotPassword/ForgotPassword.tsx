import { FormikProps, useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContainer from '~/shared/components/AuthContainer';
import withLoader from '~/shared/components/HOC/withLoader';
import Heading from '~/shared/components/Heading';
import { HEADING_TYPE } from '~/shared/components/Heading/Heading';
import LoadingIndicator from '~/shared/components/LoadingIndicator';
import Toast from '~/shared/components/Toast';
import { API_STATUS, LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import useLoginRedirect from '~/shared/hooks/useLoginRedirect';
import { getStorageItem } from '~/shared/utils/storage';
import { handleToast } from '~/shared/utils/utils';
import { signUpFormSchema } from '~/shared/validations/validationSchema';
import PasswordResetForm from './PasswordResetForm';
import { sendResetLink } from './Utils/ForgotPasswordUtils';
import { useStyles } from '../SignUp/SignUpStyles';
import { Typography, Button } from '@mui/material';
import Link from 'next/link';
import { ROUTES } from '~/shared/constants/routes';
interface ForgotPasswordProps {
  setLoadWithoutMount: (value: boolean) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setLoadWithoutMount }) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  const { handleUserRedirection } = useLoginRedirect();
  const styles = useStyles();
  const formik: FormikProps<{ emailAndPhone: string }> = useFormik({
    enableReinitialize: true,
    initialValues: { emailAndPhone: '' },
    validationSchema: signUpFormSchema(i18n),
    onSubmit: (values, { resetForm }) => {
      resetForm();
    }
  });

  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });

  useEffect(() => {
    if (getStorageItem({ key: 'user-id', useCombineStorage: true })) {
      handleUserRedirection();
    } else {
      setHasAccess(true);
    }
  });

  const handleResetLink = useCallback(async (value: string) => {
    setLoadWithoutMount(true);
    const res = await sendResetLink(value);
    const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res?.status === SUCCESS) {
      formik.handleSubmit();
    }
    setLoadWithoutMount(false);
  }, []);

  return (
    <>
      {!hasAccess ? (
        <LoadingIndicator />
      ) : (
        <AuthContainer>
          <Heading title={i18n('forgotYourPassword')} headingType={HEADING_TYPE.AUTH} />
          <PasswordResetForm
            label={i18n('enterMailPhoneNumber')}
            placeholder={i18n('enterPlaceholderMailPhoneNumber')}
            onClick={(value) => handleResetLink(value)}
            buttonName={i18n('sendResetLink')}
            formik={formik}
          />
          <Typography
            component="div"
            className={styles.linkWrap}
            textAlign="center"
            alignItems="center"
          >
            {/* {i18n('backToLogin')}{' '} */}
            <strong>
              <Link href={ROUTES.LOGIN}>
                <Button variant="text" className={styles.linkText}>
                  {i18n('logIn')}
                </Button>
              </Link>
            </strong>
          </Typography>
          {toastState.open && <Toast toastState={toastState} />}
        </AuthContainer>
      )}
    </>
  );
};

export default withLoader(ForgotPassword);
