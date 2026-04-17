import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  ListItemIcon,
  Divider,
  Alert,
  AlertColor,
  Snackbar
} from '@mui/material';
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE, ToastMessage, SEVERITY } from '~/shared/constants/constants';
import { useStyles } from './MyCreditsBoxStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import withLoader from '~/shared/components/HOC/withLoader';

import { API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/shared/redux/reducers';
import { useRouter } from 'next/router';
import {
  // getAlreadyDownloadedCv,
  // updateUserCreditData,
  // UserCreditDataUpdate,
  // updateShareStatus,
  // getUserCreditData,
  handleSetUserCreditData,
  updateShareStatus,
  UserUpdateShareStatusProps
  // setUserCreditData
  // UserUpdateShareStatusProps
} from '~/modules/auth/Utils/CreditUtils';
import { setLoggedInUserData, UserCreditDetails } from '~/shared/redux/actions'; // eslint-disable-line @typescript-eslint/no-unused-vars
// import getConfig from 'next/config';
// import { envConfig } from '../../../config';
import Toast from '~/shared/components/Toast';
import { handleToast } from '~/shared/utils/utils';
// Define TypeScript interfaces for Razorpay options and response
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  modal: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  prefill: {
    email: string;
    contact: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface LoggedUserProps {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
  phone: string;
  credits: number;
  share_and_invite: {
    whatsapp: {
      share: number;
    };
  };
}

interface CreditPackage {
  credits: number;
  price: number;
}
interface MyCreditBoxProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

// export default function Credits() {
const Credits: React.FC<MyCreditBoxProps> = ({ setLoadWithoutMount }) => {
  const router = useRouter();
  // const { serverRuntimeConfig: configs = {} } = getConfig() || {};
  // const { WEB_RAZORPAYKEY } = configs;
  // const { NextENV } = envConfig; // eslint-disable-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();
  const { loggedInUser }: { loggedInUser: LoggedUserProps } = useSelector(
    (state: RootState) => state?.user
  );
  //update credit purchase start
  const { userCreditData } = useSelector(
    (state: RootState) => state?.user as { userCreditData: UserCreditDetails }
  );
  //end
  const dispatch = useDispatch();
  // console.log('loggedInUser96', loggedInUser.email);

  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_CREDITS);
  const Customstyles = useStyles();
  const globalStyles = useStylesGoldTheme();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [PageRedirect, setPageRedirect] = useState<string>('');
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // const [loading, setLoading] = useState(true);

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  // Load Razorpay SDK only on this page

  const [razorpayKey, setRazorpayKey] = useState<string>('');

  useEffect(() => {
    const storedPageRedirect = localStorage.getItem('prevPageRedirect');
    if (storedPageRedirect) {
      try {
        const parsedPageRedirect = JSON.parse(storedPageRedirect);
        setPageRedirect(parsedPageRedirect);
      } catch (error) {
        console.error('Error parsing PageRedirect:', error);
      }
    }

    setLoadWithoutMount(true, 'Loading...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    setLoadWithoutMount(false, '');
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const response = await fetch('/api/get-razorpay-key');
        const data = await response.json();
        setRazorpayKey(data.key);
      } catch (error) {
        console.error('Error fetching Razorpay key:', error);
      }
    };

    fetchRazorpayKey();
  }, []);

  const handlePayment = async (amount: number, credits: number) => {
    try {
      // Step 1: Create an order on the backend
      const response = await httpRequest({
        url: 'credits/create_order',
        method: API_METHOD.POST,
        body: {
          req_param: {
            amount: amount,
            credits: credits
          }
        }
      });

      if (response && response.length !== null) {
        const ResData = response[0]?.res_data?.data;
        const orderId = ResData.payment_gateway_order_id;
        // console.log(ResData, 'ResData');

        // Step 2: Set up Razorpay options
        const options: RazorpayOptions = {
          key: razorpayKey,
          amount: amount,
          currency: 'INR', //chnage USD to INR
          name: 'Credit Purchase',
          description: 'Purchase credits',
          order_id: orderId,
          handler: async (
            response: any // eslint-disable-line @typescript-eslint/no-explicit-any
          ) => {
            try {
              // console.log(response, 'Payment successful, verifying...');

              // Step 3: Verify payment on backend
              const verificationRes = await httpRequest({
                url: 'credits/credit_purchase',
                method: API_METHOD.POST,
                body: {
                  req_param: {
                    payment_gateway_order_id: response.razorpay_order_id,
                    payment_gateway_transaction_id: response.razorpay_payment_id,
                    payment_gateway_signature: response.razorpay_signature,
                    order_id: ResData.id, //database order id
                    actions: 'credit-purchased', //database order id
                    paymentStatus: 'success'
                  }
                }
              });

              if (verificationRes && verificationRes.length !== null) {
                const verificationData = verificationRes[0]?.res_data?.data;
                if (verificationData.status === 'success') {
                  // console.log("RazorResponseSuccess", verificationData)
                  setAlertMessage('Payment verified successfully!');
                  setAlertSeverity('success');
                  //update credit after purchase and redux state
                  await handleSetUserCreditData(dispatch);
                  setTimeout(() => {
                    router.push(PageRedirect);
                  }, 1500);

                  //end
                } else {
                  setAlertMessage('Payment verification failed.');
                  setAlertSeverity('error');
                }
              }
            } catch (error) {
              setAlertMessage('Verification request failed.');
              setAlertSeverity('error');
            }
            setOpenSnackbar(true);
          },
          prefill: {
            email: loggedInUser.email,
            contact: loggedInUser.phone
          },
          modal: {
            ondismiss: () => {
              // User canceled the payment
              // console.log('Payment modal closed by user.');
              setAlertMessage('Payment cancelled by user.');
              setAlertSeverity('warning');
              setOpenSnackbar(true);
            }
          }
        };
        const rzp = new (window as any).Razorpay(options); // eslint-disable-line @typescript-eslint/no-explicit-any
        // Listen for payment failures
        rzp.on(
          'payment.failed',
          (
            response: any // eslint-disable-line @typescript-eslint/no-explicit-any
          ) => {
            console.error('Payment failed:', response);
            setAlertMessage(`Payment failed: ${response.error.description}`);
            setAlertSeverity('error');
            setOpenSnackbar(true);

            // Optional: Send failure details to the backend for logging
            httpRequest({
              url: 'credits/credit_purchase',
              method: API_METHOD.POST,
              body: {
                req_param: {
                  payment_gateway_order_id: response.error.metadata.order_id,
                  payment_gateway_transaction_id: response.error.metadata.payment_id,
                  paymentStatus: 'failure',
                  // razorpay_order_id: response.razorpay_order_id,
                  order_id: ResData.id, //database order id
                  actions: 'credit-purchased'
                }
              }
            });
          }
        );

        // Open Razorpay modal for payment
        rzp.open();

        // Step 4: Poll payment status in case of network issues
        // pollPaymentStatus(orderId);
      }
    } catch (error) {
      setAlertMessage('Payment initiation failed. Please try again.');
      setAlertSeverity('error');
      setOpenSnackbar(true);
      // console.error('Payment initiation error', error);
    }
  };

  // Polling function to check payment status on the backend
  // const pollPaymentStatus = async (orderId: string) => {
  //   try {
  //     const interval = setInterval(async () => {
  //       const statusResponse: any = await httpRequest({
  //         url: 'credits/check_payment_status',
  //         method: API_METHOD.POST,
  //         body: { req_param: { order_id: orderId } }
  //       });

  //       if (statusResponse && statusResponse?.status === 'paid') {
  //         setAlertMessage('Payment verified successfully!');
  //         setAlertSeverity('success');
  //         setOpenSnackbar(true);
  //         clearInterval(interval);
  //       } else if (statusResponse && statusResponse.status === 'failed') {
  //         setAlertMessage('Payment failed.');
  //         setAlertSeverity('error');
  //         setOpenSnackbar(true);
  //         clearInterval(interval);
  //       }
  //     }, 5000); // Poll every 5 seconds

  //     // Stop polling after a certain amount of time (e.g., 1 minute)
  //     setTimeout(() => clearInterval(interval), 60000);
  //   } catch (error) {
  //     console.error('Error checking payment status:', error);
  //   }
  // };

  const isSpecialUser = [
    'imran.galaxyweblinks@gmail.com',
    'ayazahmed.khan@galaxyweblinks.in',
    'shoaib.khan@galaxyweblinks.in',
    'mratunjaysingh.chauhan@galaxyweblinks.com'
  ].includes(loggedInUser.email);

  const creditPackages: CreditPackage[] = [
    { credits: 3, price: isSpecialUser ? 1 : 150 },
    { credits: 50, price: 750 }
  ];

  // const creditPackages: CreditPackage[] = [
  //   { credits: 3, price: 150 },
  //   { credits: 50, price: 750 }
  // ];

  //Whatsapp Share -Start
  const { SUCCESS } = API_STATUS;
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const settings = useSelector((state: RootState) => state.siteSettings);

  const userAlreadyWSharedCount = loggedInUser?.share_and_invite?.whatsapp?.share ?? 0; //set user based as dynamic
  const creditForPerShare = settings.share_and_invite[0]?.whatsapp?.share[0]?.credit_point;
  const userMaxWShareCountAllowed = settings.share_and_invite[0]?.whatsapp?.share[1]?.useable_count;
  const CanGetCreditWhatsAppShare = () => {
    return userAlreadyWSharedCount < userMaxWShareCountAllowed;
  };
  const dynamicLink =
    'https://api.whatsapp.com/send?text=resai.co%2Fen%3A%3A%20https%3A%2F%2Fdev.resai.co%2Fen'; //chnage this message accordingly
  const handleWhatsappMessage = async () => {
    // Define a smaller, dynamic popup size based on screen size
    const popupWidth = Math.min(window.innerWidth * 0.8, 600); // 80% of the screen width, max 600px
    const popupHeight = Math.min(window.innerHeight * 0.6, 400); // 60% of the screen height, max 400px

    // Center the popup on the screen
    const popupLeft = (window.innerWidth - popupWidth) / 2;
    const popupTop = (window.innerHeight - popupHeight) / 2;

    // Construct the window features for popup
    const windowFeatures = `width=${popupWidth},height=${popupHeight},top=${popupTop},left=${popupLeft},resizable=yes,scrollbars=yes`;
    window.open(dynamicLink, '_blank', windowFeatures);
    if (CanGetCreditWhatsAppShare() == true) {
      const updatedUserShareData: UserUpdateShareStatusProps = {
        credits: creditForPerShare,
        status: 'success',
        actions: 'whatsapp-share',
        share_and_invite: { whatsapp: { share: userAlreadyWSharedCount + 1 } }
      };
      const resShare = await updateShareStatus(updatedUserShareData);
      if (resShare.status === SUCCESS) {
        const severity: SEVERITY = SEVERITY.SUCCESS;
        const successMessage = `You have received ${creditForPerShare} free credits for sharing.`;
        handleToast({ severity, message: successMessage }, setToastState, toastState);
        // ------------------------------Update Credit Data START---------------------------------------------
        await handleSetUserCreditData(dispatch); //set UserCreditDetails
        // ------------------------------Update Credit Data END---------------------------------------------
        const shareCountUpdated = resShare?.data?.share_and_invite?.whatsapp?.share;
        // ------------------------------Update Logged in data START---------------------------------------------
        dispatch(
          setLoggedInUserData({
            //to handle share and invite
            ...loggedInUser,
            share_and_invite: { whatsapp: { share: shareCountUpdated } }
          })
        );
        // ------------------------------Update Logged in data END---------------------------------------------
      }
    }
  };
  //Whatsapp Share -End
  return (
    <Box sx={{ padding: 4, minHeight: '100vh' }}>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex', // Use flexbox for layout
          justifyContent: 'center', // Center horizontally
          alignItems: 'center' // Center vertically (optional, but useful for smaller screen heights)
          // height: '100vh', // Ensure the container takes full height of the viewport
        }}
      >
        {/* Available Credits Section */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#333', color: '#fff' }}>
            <CardContent>
              <Typography variant="body2" sx={{ fontSize: '20px', fontWeight: '600' }}>
                <ListItemIcon style={{ minWidth: '20px' }}>
                  <Image src="/image/creditDymond.png" alt="creditDymond" width={16} height={16} />
                </ListItemIcon>
                {i18n('Availablecredits')}
              </Typography>
              <Typography variant="h5" sx={{ mt: 2 }}>
                {userCreditData?.user_current_credit} {i18n('Credits')}
              </Typography>
              <Divider
                sx={{ marginBottom: '50px', marginTop: '50px', opacity: '20%', color: '#E3E4F0' }}
              />
              <Typography
                variant="caption"
                sx={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}
              >
                {/* {i18n('Lastpurchased')} */}
                &nbsp;
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '16px', fontWeight: '400' }}>
                &nbsp;
                {/* 14-03-2024 - 12:56:03 */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Credit Packages */}
        {creditPackages.map((item, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'visible',
                '::before, ::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  width: '15px',
                  height: '18px',
                  backgroundColor: '#f0f8ff',
                  borderRadius: '50%',
                  border: '2px solid #f0f8ff',
                  zIndex: 1
                },
                '::before': {
                  left: '-10px', // Cutout on the left side
                  transform: 'translateY(-50%)'
                },
                '::after': {
                  right: '-7.52px', // Cutout on the right side
                  transform: 'translateY(-50%)'
                }
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ fontSize: '20px', fontWeight: '600' }}>
                  {i18n('Buycredits')}
                </Typography>
                <Typography variant="h5" sx={{ mt: 2, fontSize: '48px', fontWeight: '700' }}>
                  {item.credits} {i18n('Credits')}
                </Typography>
                <Divider sx={{ marginBottom: '45px', marginTop: '32px' }} />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, fontSize: '18px', fontWeight: '600' }}
                  onClick={() => handlePayment(item.price, item.credits)}
                  className={`${Customstyles.primaryBtn} ${globalStyles.btnBlackColor}`}
                >
                  {i18n('Buyfor')} ₹{item.price}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Invite Friends Section */}
      <Box sx={{ mt: 4, textAlign: 'left' }}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={2}
              alignItems="center"
              gap={4}
              sx={{
                // Apply centering if CanGetCreditWhatsAppShare() is false
                justifyContent: CanGetCreditWhatsAppShare() ? 'flex-start' : 'center',
                textAlign: CanGetCreditWhatsAppShare() ? 'left' : 'center' // Center text if condition is false
              }}
            >
              <Grid item xs={12} md={4}>
                <ListItemIcon
                  // style={{ minHeight: '365px',width:'auto' }}
                  className={Customstyles.imageContainer}
                >
                  <Image
                    src="/image/ShareResAI.png"
                    alt="Custom Icon 2"
                    width={500}
                    height={365}
                    layout="responsive"
                  />
                </ListItemIcon>
                <Typography variant="body1"></Typography>
              </Grid>
              {CanGetCreditWhatsAppShare() == true && (
                <Grid item xs={12} md={6} onClick={handleWhatsappMessage}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: 'flex',
                      lineHeight: '40px',
                      fontSize: '20px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <WhatsAppIcon color="success" fontSize="large" />
                    {i18n('Invitefriends')}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#000',
                      fontSize: '40px',
                      lineHeight: '48px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {i18n('ShareResAIwithfriends')}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
      {toastState.open && <Toast toastState={toastState} />}
    </Box>
  );
};
export default withLoader(Credits);
