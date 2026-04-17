import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
  IconButton,
  InputAdornment
} from '@mui/material';

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
import {
  // getUserCreditData,
  // setUserCreditData,
  // getAlreadyDownloadedCv,
  // setUserCvDowloadedData,
  handleSetUserCreditData,
  handleSetUserResumeData
} from '~/modules/auth/Utils/CreditUtils';
import { useStyles } from '../LoginStyles';
import StayLoggedIn from '../StayLoggedIn';
import { loginWithCredentials } from '../Utils/LoginUtils';
import { useStylesGoldTheme } from '~/modules/globalStyles';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { STORAGE_TYPES, clearStorage } from '~/shared/utils/storage';
// import { UserCreditDetails, UserDownlodedCvData } from '~/shared/redux/actions';
interface LoginFormProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLoadWithoutMount }) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const theme = useTheme();
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
      // clearStorage(STORAGE_TYPES.LOCAL); //CLEAR STORAGE IF BEFORE LOGIN
      // clearStorage(STORAGE_TYPES.SESSION);
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
        //set UserCreditDetails start
        await handleSetUserCreditData(dispatch);
        await handleSetUserResumeData(dispatch);
        //end
        // Call handleUserRedirection after resume data is loaded
        handleUserRedirection(userStep);
      }
      // setLoadWithoutMount(false);
    }
  });
  // const handleSetUserCreditData = async () => {
  //   const resCreditData = await getUserCreditData();
  //   const staticUserCreditData: UserCreditDetails = {
  //     user_current_credit: resCreditData?.data?.user_current_credit,
  //     user_total_credit: resCreditData?.data?.user_total_credit,
  //     user_used_credit: resCreditData?.data?.user_used_credit
  //   };
  //   // Call setUserCreditData with static data
  //   setUserCreditData(staticUserCreditData, dispatch);
  // };
  // const handleSetUserResumeData = async () => {
  //   const resResumeData = await getAlreadyDownloadedCv();
  //   // Extract resume IDs from the downloadedCvList
  //   const downloadableResumeIds = resResumeData?.data?.map((cv:any) => cv);
  //   const staticUserResumeData: UserDownlodedCvData = {
  //     downloadable_resume_ids: downloadableResumeIds
  //   };
  //   // Call setUserCreditData with static data
  //   setUserCvDowloadedData(staticUserResumeData, dispatch);
  // };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap="5px">
              <Typography className={styles.labelText}>{i18n('enterMailPhoneNumber')}</Typography>
              <TextField
                variant="outlined"
                placeholder={i18n('enterPlaceholderMailPhoneNumber')}
                className={`${styles.textfieldStyle} ${globalStyles.focusedTextField}`}
                name="emailAndPhone"
                value={values.emailAndPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emailAndPhone && Boolean(errors.emailAndPhone)}
                helperText={touched.emailAndPhone && errors.emailAndPhone}
                FormHelperTextProps={{
                  style: {
                    color: theme.palette.error.main
                  }
                }}
              />
            </Box>
          </FormControl>
          <FormControl fullWidth>
            <Box display="flex" flexDirection="column" gap="5px">
              <Typography className={styles.labelText}>
                {i18n('createPassword.password', { ns: 'common' })}
              </Typography>
              <TextField
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                placeholder={i18n('createPassword.password', { ns: 'common' })}
                className={`${styles.textfieldStyle} ${globalStyles.focusedTextField}`}
                name="password"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  setIsPasswordTyped(!!e.target.value);
                }}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                FormHelperTextProps={{
                  style: {
                    color: theme.palette.error.main
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          setShowPassword((show) => !show);
                        }}
                        onMouseDown={(event: React.SyntheticEvent<Element, Event>) => {
                          event.preventDefault();
                        }}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </FormControl>
          <FormControl fullWidth>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap="5px">
              <StayLoggedIn />
              <Link href={ROUTES.FORGOT_PASSWORD}>
                <Button variant="text" className={styles.linkText}>
                  {i18n('forgetPassword')}
                </Button>
              </Link>
            </Box>
          </FormControl>
          <Button
            variant="contained"
            // color="primary"
            className={globalStyles.btnBlackColor}
            type="submit"
            disabled={!isEmailOrPhone(values.emailAndPhone) || !isPasswordTyped}
          >
            {i18n('logIn')}
          </Button>
        </Box>
      </form>
      <Typography component="p" className={styles.linkWrap} textAlign="center">
        {i18n('noAccount')}{' '}
        <strong>
          <Link href={ROUTES.SIGN_UP}>
            <Button variant="text" className={styles.linkText}>
              {i18n('signUp')}
            </Button>
          </Link>
        </strong>
      </Typography>
      {toastState.open && <Toast toastState={toastState} />}
    </>
  );
};
export default withLoader(LoginForm);
