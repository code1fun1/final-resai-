import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  stepsStyle: {
    border: '2px solid',
    width: '100%',
    borderRadius: '8px'
  },
  stepsPrimaryStyle: {
    // borderColor: theme.palette.primary.main
    borderColor: '#424246'
  },
  stepsGreyStyle: {
    borderColor: theme.palette.neutral[10]
  },
  stepTitle: {
    '&.MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.buttonMd,
      color: theme.palette.neutral[80]
    }
  }
}));
