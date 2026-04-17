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
    gap: theme.spacing(5),
    textAlign: 'left',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(2),
      textAlign: 'center',
      marginTop: theme.spacing(2)
    }
  },
  authTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.h3,
      [theme.breakpoints.down('md')]: {
        ...theme.typography.title1
      }
    }
  },
  authSubTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.title3,
      color: theme.palette.neutral[60]
    }
  }
}));
