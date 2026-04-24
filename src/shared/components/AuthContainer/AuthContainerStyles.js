import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  pageWrapper: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f6f6f6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: '16px',
    gap: '80px',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    '@media (max-width: 1250px)': {
      gap: '48px'
    },
    '@media (max-width: 1100px)': {
      flexDirection: 'column',
      gap: '0',
      padding: '0'
    }
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '60px 20px',
    minWidth: 0,
    '@media (max-width: 1100px)': {
      width: '100%',
      padding: '40px 32px',
      boxSizing: 'border-box'
    },
    '@media (max-width: 768px)': {
      padding: '32px 20px'
    },
    '@media (max-width: 480px)': {
      padding: '24px 16px',
      boxSizing: 'border-box'
    }
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    alignSelf: 'stretch',
    maxWidth: '512px',
    width: '100%',
    margin: '0 auto'
  },
  termsRow: {
    marginTop: '24px',
    padding: '0 36px',
    '@media (max-width: 1100px)': {
      padding: '0 16px'
    },
    '@media (max-width: 480px)': {
      padding: '0 8px'
    }
  },
  termsText: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '14px',
      color: '#7b7b7b',
      lineHeight: '22px'
    }
  },
  termsLink: {
    fontWeight: 500,
    color: '#04040e',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  langRow: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '512px'
  }
}));
