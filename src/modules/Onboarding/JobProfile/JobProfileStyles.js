import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sidebarTitle: {
    '&.MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.title1,
      color: theme.palette.tertiary.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.title2.fontSize,
        fontWeight: theme.typography.title2.fontWeight,
        lineHeight: theme.typography.title1.lineHeight
      }
    }
  },
  sidebarSubtitle: {
    '&.MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.body2,
      color: theme.palette.neutral[50]
    }
  }
}));
