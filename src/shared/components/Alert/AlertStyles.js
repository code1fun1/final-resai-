import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  toastContainer: {
    '& .MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.title2,
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.title3
      }
    },
    color: theme.palette.tertiary.dark,
    padding: '19px 30px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 10px'
    }
  },
  toastCrossIcon: {
    stroke: theme.palette.neutral[150],
    width: '12px',
    height: '12px'
  },
  toastSuccessContainer: {
    backgroundColor: theme.palette.tertiary.main
  },
  toastWarningContainer: {
    backgroundColor: theme.palette.warning.dark
  }
}));
