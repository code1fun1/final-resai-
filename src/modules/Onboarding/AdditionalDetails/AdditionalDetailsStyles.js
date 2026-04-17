import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  detailsWrapper: {
    minHeight: 'calc(100vh - 80px)',
    paddingBottom: '155px',
    paddingTop: '25px'
  },
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: theme.palette.neutral[10]
    },
    '& .MuiDivider-wrapper': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[50]
    }
  },
  stepStyle: {
    '& .MuiStepper-root.MuiStepper-vertical': {
      margin: '0 25px'
    },
    '& .MuiStepLabel-root': {
      pointerEvents: 'none',
      cursor: 'default'
    }
  },
  textHeadingStyle: {
    '&.MuiTypography-root.MuiTypography-h5': {
      color: theme.palette.cool.dark
    }
  }
}));
