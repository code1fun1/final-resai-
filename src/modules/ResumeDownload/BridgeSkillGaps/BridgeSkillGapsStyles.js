import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  heading: {
    '&.MuiTypography-root': {
      ...theme.typography.title1,
      color: theme.palette.tertiary.dark
    }
  },
  subtitle: {
    color: theme.palette.neutral[60],
    [theme.breakpoints.down('md')]: {
      '&.MuiTypography-root': {
        fontSize: theme.typography.title3.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        lineHeight: theme.typography.title3.lineHeight
      }
    }
  }
}));
