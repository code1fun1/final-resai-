import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  suggestionText: {
    '&.MuiTypography-root': {
      ...theme.typography.body3,
      fontWeight: theme.typography.body2.fontWeight,
      color: theme.palette.neutral[70]
    }
  },
  detailsWrapper: {
    minHeight: 'calc(100vh - 80px)',
    alignItems: 'center',
    paddingBottom: '155px',
    paddingTop: '25px'
  },
  textHeadingStyle: {
    '&.MuiTypography-root.MuiTypography-h5': {
      color: theme.palette.cool.dark
    }
  }
}));
