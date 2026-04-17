import {
  Card,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Stack,
  FormControl,
  FormLabel,
  FormGroup,
  MenuItem,
  InputAdornment,
  Select,
  SelectChangeEvent
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import { handleToast } from '~/shared/utils/utils';
import { useStyles } from './MyProfileFormStyles';
import { useRouter } from 'next/navigation';
import Toast from '~/shared/components/Toast';
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { ROUTES } from '~/shared/constants/routes';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUserData } from '~/shared/redux/actions';
import { RootState } from '~/shared/redux/reducers';
import ImageCropper from '~/shared/components/ImageCropper';
import Modal from '~/shared/components/Modal';
interface MyProfileProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}
interface IFormInput {
  fname: string;
  lname: string;
  email: string;
  phone?: number;
  address?: string;
  country?: string;
  state?: string;
}
interface LoggedInUserData {
  first_name: string;
  last_name: string;
  profile_pic: string;
}
const MyProfileForm: React.FC<MyProfileProps> = ({ setLoadWithoutMount }) => {
  const [openCropper, setOpenCropper] = useState<boolean>(false);
  const handleClose = () => {
    setOpenCropper(false);
  };

  // Function to handle updating the avatar
  // const updateAvatar = (dataUrl: string) => {
  //   // eslint-disable-line @typescript-eslint/no-explicit-any
  //   // Implement the logic to upload or update the avatar here
  // };
  // const handleOpenModal = () => {
  //   setOpenCropper(true);
  // };
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_PROFILE);
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector(
    (state: RootState) => state?.user as { loggedInUser: LoggedInUserData }
  );
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  const { SAVED_USERINFO } = APIS;
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const schema = yup.object({
    fname: yup.string().nullable().required(i18n('fnameRequired')),
    lname: yup.string().nullable().required(i18n('lnameRequired')),
    email: yup.string().email(i18n('emailValid')).required(i18n('emailRequired'))
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });
  const countryCodes = [
    { code: '+91', label: 'India', flagUrl: 'https://flagcdn.com/in.svg' }
    // { code: '+1', label: 'USA', flagUrl: 'https://flagcdn.com/us.svg' }
    // Add more country data
  ];
  const [selectedCode, setSelectedCode] = useState(''); //static

  const [phoneErrorMessage, setPhoneError] = useState('');
  const [phoneErrorState, setPhoneState] = useState(false);
  const [phoneData, setPhoneData] = useState('');
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phonePattern = /^[0-9]+$/;
    const phoneNumber = event.target.value;
    if (phoneNumber == '' || phoneNumber == null || phoneNumber.length == 0) {
      setPhoneData(phoneNumber);
      setPhoneError(i18n('phoneRequired'));
      setPhoneState(true);
    } else if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      setPhoneData(phoneNumber);
      setPhoneError(i18n('phoneMin10'));
      setPhoneState(true);
    } else if (!phonePattern.test(phoneNumber)) {
      setPhoneData(phoneNumber);
      setPhoneError(i18n('phoneMatches'));
      setPhoneState(true);
    } else {
      setPhoneData(phoneNumber);
      setPhoneState(false);
      setPhoneError('');
    }
  };
  const handleSelectCode = (event: SelectChangeEvent<string>) => {
    setSelectedCode(event.target.value);
  };

  //get profile data
  const getUserProfile = async () => {
    const [response] = await httpRequest({
      url: SAVED_USERINFO,
      method: API_METHOD.GET
    });
    if (response && response.length !== null) {
      const userData = response?.res_data?.data?.data?.auth_by_pk;

      setValue('fname', userData.first_name);
      setValue('lname', userData.last_name);
      setValue('email', userData.email);
      setPhoneData(userData.phone);
      // Find the country code index in the countryCodes array
      const countryCodeIndex = countryCodes.findIndex(
        (cCode) => cCode.code == userData.country_code
      );
      // If a matching country code is found, use its country code, otherwise use the first index countrycode
      const selectedCountryCode =
        countryCodeIndex !== -1 ? countryCodes[countryCodeIndex].code : countryCodes[0].code;
      setSelectedCode(selectedCountryCode);

      return { status: 'success', data: userData };
    } else {
      return { status: 'failed', message: response?.err?.response?.message };
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  //update profile  dATA
  const onSubmitProfile = async (data: IFormInput) => {
    if (phoneErrorState == true) {
      const staticSeverity: SEVERITY = SEVERITY.ERROR;
      const toastMessage: Omit<ToastMessage, 'open'> = {
        severity: staticSeverity,
        message: i18n('SaveButtonValidationMessage') //chnage to i18 translator
      };
      handleToast(toastMessage, setToastState, toastState);
      return;
    }
    if (phoneData == null || phoneData == '') {
      const staticSeverity: SEVERITY = SEVERITY.ERROR;
      const toastMessage: Omit<ToastMessage, 'open'> = {
        severity: staticSeverity,
        message: i18n('PhoneCustomValidationMessage') //chnage to i18 translator
      };
      handleToast(toastMessage, setToastState, toastState);
      return;
    }
    setLoadWithoutMount(true, i18n('loaderMessage'));
    const submitData = {
      ...data,
      phone: phoneData,
      country_code: ''
    };
    //send data via api
    const request = {
      url: SAVED_USERINFO,
      method: API_METHOD.POST,
      body: {
        req_param: {
          auth: {
            // Add the "auth" key to match the target format
            first_name: submitData.fname,
            last_name: submitData.lname,
            email: submitData.email,
            phone: submitData.phone,
            country_code: submitData.country_code
          }
        }
      }
    };
    const response = await httpRequest(request);
    if (response[0] !== null) {
      const res = {
        status: API_STATUS.SUCCESS,
        data: response[0]?.res_data?.data,
        message: response[0]?.res_data?.message
      };
      router.push(ROUTES.MY_PROFILE);
      setLoadWithoutMount(false, '');
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      if (res?.status == SUCCESS) {
        dispatch(
          setLoggedInUserData({
            //to handle Avatar name
            ...loggedInUser,
            first_name: submitData.fname,
            last_name: submitData.lname
          })
        );
        handleToast({ severity, message: res.message }, setToastState, toastState);
      }
    } else {
      const errorMessage = response[1]?.err?.response?.responseMessage;
      const res = {
        data: null,
        status: API_STATUS.FAILED,
        message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
      };
      setLoadWithoutMount(false, '');
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      if (res?.status !== SUCCESS) {
        handleToast({ severity, message: res.message }, setToastState, toastState);
      }
    }
  };
  return (
    <Box className={styles.personalInfoWrapper}>
      {/* <Button
        type="submit"
        variant="contained"
        className={globalStyles.btnBlackColor}
        onClick={handleOpenModal}
      >
        Open Image Uploader Modal
      </Button> */}
      <FormGroup>
        <form onSubmit={handleSubmit(onSubmitProfile)} method="POST">
          <Card variant="outlined">
            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className={styles.customHeaderTitle}
                >
                  {i18n('formTitle')}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  <Button variant="contained" className={globalStyles.btnBlackColor} type="submit">
                    {i18n('profileSaveButton')}
                  </Button>
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }} className={styles.cardWrapper}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel>
                      {i18n('fnameLabel')}&nbsp;<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <TextField
                      {...register('fname')}
                      id="fname"
                      type="text"
                      variant="outlined"
                      fullWidth
                      size="small"
                      inputProps={{ style: { fontWeight: 'bold' } }}
                      className={globalStyles.focusedTextField}
                    />
                  </FormControl>
                  {errors.fname && (
                    <div className={styles.validationError}>{errors.fname.message}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel>
                      {i18n('lnameLabel')}&nbsp;<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <TextField
                      {...register('lname')}
                      id="lname"
                      type="text"
                      variant="outlined"
                      fullWidth
                      size="small"
                      inputProps={{ style: { fontWeight: 'bold' } }}
                      className={globalStyles.focusedTextField}
                    />
                  </FormControl>
                  {errors.lname && (
                    <div className={styles.validationError}>{errors.lname.message}</div>
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  {/* Keep it blank */}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel>
                      {i18n('phoneLabel')}&nbsp;<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <TextField
                      // {...register('phone')}
                      type="text"
                      id="phone"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={phoneData}
                      onChange={handlePhoneNumberChange}
                      className={globalStyles.focusedTextField}
                      InputProps={{
                        style: { fontWeight: 'bold' },
                        startAdornment: (
                          <InputAdornment position="start">
                            <Select
                              displayEmpty
                              variant="outlined"
                              size="small"
                              onChange={handleSelectCode}
                              value={selectedCode}
                              className={styles.countryCodeStyle}
                            >
                              {countryCodes.map((cCode) => (
                                <MenuItem value={cCode.code} key={cCode.code}>
                                  {cCode.code}
                                </MenuItem>
                              ))}
                            </Select>
                          </InputAdornment>
                        )
                      }}
                    />
                    {/* <TextField
                      {...register('phone')}
                      type="text"
                      id="phone"
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder={i18n('phonePlaceholder')}
                      inputProps={{ min: 0 }} /> */}
                  </FormControl>
                  {phoneErrorState == true && (
                    <div className={styles.validationError}>{phoneErrorMessage}</div>
                  )}
                  {/* {errors.phone && (
                    <div className={styles.validationError}>
                      {errors.phone.message}
                    </div>
                  )} */}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <FormLabel>{i18n('emailLabel')}</FormLabel>
                    <TextField
                      {...register('email')}
                      id="email"
                      variant="outlined"
                      type="email"
                      fullWidth
                      size="small"
                      name="email"
                      disabled
                      inputProps={{ style: { fontWeight: 'bold' }, readOnly: true }}
                      className={globalStyles.focusedTextField}
                    />
                  </FormControl>
                  {errors?.email && (
                    <div className={styles.validationError}>{errors.email.message}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  {/* Keep it blank */}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </form>
      </FormGroup>
      {toastState.open && <Toast toastState={toastState} />}
      {/* -------------------------------------OPEN IMAGE CROP MODAL -START---------------------------------- */}
      {openCropper && (
        <Modal open={openCropper} onClose={handleClose} closeOnBackdropClick={false}>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%" // Make Box take the full width
            maxWidth="100%" // Ensure the width doesn't have any maximum constraint
            my={2} // Margin for vertical spacing
          >
            {/* <CropModal/>  */}
            <ImageCropper
              // updateAvatar={updateAvatar} // Pass updateAvatar prop
              closeModal={handleClose}
            />
          </Box>
        </Modal>
      )}
      {/* -------------------------------------OPEN IMAGE CROP MODAL - END---------------------------------- */}
    </Box>
  );
};

export default withLoader(MyProfileForm);
