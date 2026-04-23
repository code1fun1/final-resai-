import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  title: {
    '&.MuiTypography-root': {
      ...theme.typography.h5,
      color: theme.palette.cool.dark,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        ...theme.typography.title1
      }
    }
  },
  subTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.body2,
      color: theme.palette.neutral[70],
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  },
  primaryBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left'
  },
  authTitle: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: 0,
      color: '#04040e',
      [theme.breakpoints.down('md')]: {
        fontSize: '29px'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '22px'
      }
    }
  },
  authSubTitle: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '155%',
      color: '#04040e',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
        lineHeight: '25px'
      }
    }
  }
}));
