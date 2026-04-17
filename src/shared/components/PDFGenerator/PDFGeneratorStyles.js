import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  shareAndDownloadBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  info: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: '14px',
      lineHeight: '14px'
    }
  },
  // downloadBtn: {
  //   '&.MuiButton-contained ': {
  //     padding: '8px 30px',
  //     width: '100%'
  //   }
  // },
  downloadBtn: {
    '&.MuiButton-contained': {
      padding: '8px 30px',
      width: '100%',
      backgroundColor: '#424246 ', // Set button color to black
      color: 'white', // Set text color to white for better contrast
      '&:hover': {
        backgroundColor: '#424246 ' // Optional: change background on hover
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabled, // Use disabled color from theme
        color: theme.palette.text.disabled // Use disabled text color from theme
      }
    },
    [theme.breakpoints.down('sm')]: {
      // Target screens with width less than 600px
      '&.MuiButton-contained': {
        width: '100%',
        padding: '8px 22px' // Adjust padding for xs screens
      }
    },
    [theme.breakpoints.down('xs')]: {
      // Target screens with width less than 600px
      '&.MuiButton-contained': {
        width: '100%',
        padding: '8px 22px' // Adjust padding for xs screens
      }
    }
  },
  whatsupSharreBtn: {
    '&.MuiButton-contained ': {
      padding: '8px 30px',
      background: '#01D392',
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      // Target screens with width less than 600px
      '&.MuiButton-contained': {
        padding: '8px 26px' // Adjust padding for xs screens
      }
    },
    [theme.breakpoints.down('xs')]: {
      // Target screens with width less than 600px
      '&.MuiButton-contained': {
        padding: '8px 26px' // Adjust padding for xs screens
      }
    }
  },
  courseBtn: {
    '&.MuiButton-contained': {
      padding: '8px 30px',
      width: '100%',
      backgroundColor: '#424246 ', // Set button color to black
      color: 'white', // Set text color to white for better contrast
      '&:hover': {
        backgroundColor: '#424246 ' // Optional: change background on hover
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabled, // Use disabled color from theme
        color: theme.palette.text.disabled // Use disabled text color from theme
      }
    },
    [theme.breakpoints.down('sm')]: {
      // Target screens with width less than 600px
      '&.MuiButton-contained': {
        padding: '8px 18px' // Adjust padding for xs screens
      }
    },
    [theme.breakpoints.down('xs')]: {
      // Target screens with width less than 600px
      '&.MuiButton-contained': {
        padding: '8px 18px' // Adjust padding for xs screens
      }
    }
  }
}));
