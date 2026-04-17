import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Alert } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../utils/theme';
import { useStyles } from './ToastStyles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { ToastMessage } from '~/shared/constants/constants';

interface ToastProps {
  handleCloseToast?: () => void;
  toastState: ToastMessage;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const iconMapping = {
  success: <CheckCircleIcon fontSize="inherit" sx={{ color: '#1DAC58' }} />,
  error: <CancelRoundedIcon fontSize="inherit" sx={{ color: '#F93E2B' }} />,
  warning: <WarningRoundedIcon fontSize="inherit" sx={{ color: '#F9A301' }} />,
  info: <InfoRoundedIcon fontSize="inherit" sx={{ color: '#3775F9' }} />
};

const Toast = (props: ToastProps) => {
  const { toastState, handleCloseToast } = props;
  const styles = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={toastState.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        TransitionComponent={SlideTransition}
        key="Slide"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ top: '80px' }}
      >
        <Alert
          variant="filled"
          onClose={handleCloseToast}
          severity={toastState?.severity}
          iconMapping={iconMapping}
          className={styles.alertWrapper}
        >
          {toastState?.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Toast;
