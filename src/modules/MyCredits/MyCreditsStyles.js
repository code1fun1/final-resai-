import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sideCustomStyle: {
    '&.MuiTypography-root': {
      padding: '16px px 17px 24px'
    },
    paddingLeft: '100px',
    paddingRight: '100px',
    marginTop: '20px',
    color: '#000842', //as theme
    // Add responsive styles for mobile devices
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      marginTop: '20px',
      marginBottom: '50px'
    }
  }
}));
