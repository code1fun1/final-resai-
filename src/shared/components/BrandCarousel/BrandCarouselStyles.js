import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  logoHeader: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '35px',
      left: '24px',
      width: 'auto'
    }
  }
}));
