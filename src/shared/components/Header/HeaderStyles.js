import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    '&.MuiAppBar-root': {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.neutral[700],
      width: 'auto',
      padding: '2px 32px',
      borderBottom: `1px solid ${theme.palette.neutral[10]}`,
      [theme.breakpoints.down('lg')]: {
        width: '100%',
        padding: '2px 16px'
      },
      position: 'relative',
      zIndex: 2
    }
  },
  languageBox: {
    '& .MuiBox-root:first-child': {
      width: '80px'
    }
  },
  iconColor: {
    '&.MuiSvgIcon-root': {
      width: '18px',
      height: '18px',
      color: theme.palette.cool.main
    }
  },

  buttonStyle: {
    '&.MuiButtonBase-root.MuiButton-root': {
      textTransform: 'none',
      borderRadius: '5px',
      '&.MuiButton-contained': {
        backgroundColor: theme.palette.cool.main
      },
      '&.MuiButton-outlined': {
        backgroundColor: theme.palette.neutral[5],
        border: `1px solid ${theme.palette.neutral[10]}`,
        color: theme.palette.neutral[80]
      }
    }
  },
  creditsWrapper: {
    backgroundColor: '#E2E2E3',
    borderRadius: '100px',
    '& .MuiTypography-root': {
      ...theme.typography.buttonMd,
      color: '#000003'
    },
    '& svg': {
      fill: theme.palette.warm.dark
    }
  },
  logoStyle: {
    '& img': {
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        height: '24px'
      }
    }
  }
}));
