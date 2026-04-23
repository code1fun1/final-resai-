import { Box, FormControl, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import withLoader from '~/shared/components/HOC/withLoader';
import Toast from '~/shared/components/Toast';
import { API_STATUS } from '~/shared/constants/apiConstants';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import useLoginRedirect from '~/shared/hooks/useLoginRedirect';
import { handleToast, isEmailOrPhone } from '~/shared/utils/utils';
import { loginFormSchema } from '~/shared/validations/validationSchema';
import { setAuthData } from '../../Utils/AuthUtils';
import { handleSetUserCreditData, handleSetUserResumeData } from '~/modules/auth/Utils/CreditUtils';
import { useStyles } from '../LoginStyles';
import StayLoggedIn from '../StayLoggedIn';
import { loginWithCredentials } from '../Utils/LoginUtils';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import NorthEastIcon from '@mui/icons-material/NorthEast';

interface LoginFormProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLoadWithoutMount }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { handleUserRedirection } = useLoginRedirect(setLoadWithoutMount);
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const [isPasswordTyped, setIsPasswordTyped] = useState<Boolean>(false);
  const { values, handleChange, handleSubmit, errors, touched, resetForm, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: {
      emailAndPhone: '',
      password: ''
    },
    validationSchema: loginFormSchema(i18n),
    validateOnBlur: true,

    onSubmit: async (values) => {
      const loginData: {
        email_phone: string;
        password: string;
      } = {
        email_phone: values?.emailAndPhone,
        password: values?.password
      };
      setLoadWithoutMount(true);
      const res = await loginWithCredentials(loginData);
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      if (res?.status !== SUCCESS) {
        handleToast({ severity, message: res.message }, setToastState, toastState);
        setLoadWithoutMount(false);
      }
      if (res?.status === SUCCESS) {
        resetForm();
        setAuthData(res?.data, dispatch);
        const { user_step: userStep } = res?.data.user_details;
        await handleSetUserCreditData(dispatch);
        await handleSetUserResumeData(dispatch);
        handleUserRedirection(userStep);
      }
    }
  });

  const isSubmitEnabled = isEmailOrPhone(values.emailAndPhone) && isPasswordTyped;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Email / Phone */}
          <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography className={styles.labelText}>{i18n('enterMailPhoneNumber')}</Typography>
              <TextField
                variant="outlined"
                placeholder={i18n('enterPlaceholderMailPhoneNumber')}
                className={styles.textfieldStyle}
                name="emailAndPhone"
                value={values.emailAndPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emailAndPhone && Boolean(errors.emailAndPhone)}
                helperText={touched.emailAndPhone && errors.emailAndPhone}
              />
            </Box>
          </FormControl>

          {/* Password */}
          <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap="4px">
              <Typography className={styles.labelText}>
                {i18n('createPassword.password', { ns: 'common' })}
              </Typography>
              <TextField
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder={i18n('createPassword.password', { ns: 'common' })}
                className={styles.textfieldStyle}
                name="password"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  setIsPasswordTyped(!!e.target.value);
                }}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(e: React.SyntheticEvent) => e.preventDefault()}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </FormControl>

          {/* Checkbox + Forgot Password */}
          <FormControl fullWidth>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap="5px">
              <StayLoggedIn />
              <Link href={ROUTES.FORGOT_PASSWORD} className={styles.forgotPasswordText}>
                Forgot Password?
              </Link>
            </Box>
          </FormControl>

          {/* Gold Continue Button */}
          <Box
            component="button"
            type="submit"
            className={styles.continueButtonOuter}
            disabled={!isSubmitEnabled}
          >
            <Box component="span" className={styles.continueLabelInner}>
              Continue
            </Box>
            <Box className={styles.continueArrowInner}>
              <NorthEastIcon style={{ color: '#04040e', width: 24, height: 24 }} />
            </Box>
          </Box>
        </Box>
      </form>
      {toastState.open && <Toast toastState={toastState} />}
    </>
  );
};

export default withLoader(LoginForm);
