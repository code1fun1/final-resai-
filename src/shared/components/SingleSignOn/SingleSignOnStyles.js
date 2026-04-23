import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  ssoButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      borderRadius: '999px',
      borderColor: '#dabf67',
      borderWidth: '1px',
      color: '#0f172a',
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'Satoshi, sans-serif',
      padding: '12px 16px',
      backgroundColor: '#fff',
      textTransform: 'none',
      justifyContent: 'center',
      '&:hover': {
        borderColor: '#dabf67',
        backgroundColor: 'rgba(218, 191, 103, 0.06)',
        borderWidth: '1px'
      }
    }
  }
}));
