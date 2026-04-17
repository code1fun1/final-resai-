import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

const SessionTimeoutAlert = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleSessionTimeout = (event: CustomEvent) => {
      setMessage(event.detail.message);
      setOpen(true);
    };

    window.addEventListener('sessionTimeout', handleSessionTimeout as EventListener);

    return () => {
      window.removeEventListener('sessionTimeout', handleSessionTimeout as EventListener);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity="warning" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SessionTimeoutAlert;
