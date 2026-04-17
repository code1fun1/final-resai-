import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  alertWrapper: {
    '&.MuiPaper-root.MuiAlert-root': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      fontSize: '17px',
      fontFamily: 'GilroyMedium',
      color: '#433F30'
    }
  }
}));
