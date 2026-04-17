import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    '&.MuiTypography-root': {
      padding: '16px 0px 17px 24px'
    }
  },
  breadcrumbIcon: {
    color: theme.palette.neutral[50]
  },
  activeBreadcrumb: {
    '&.MuiTypography-root': {
      color: theme.palette.neutral[80],
      ...theme.typography.buttonLg
    }
  },
  customLink: {
    '&.MuiTypography-root': {
      color: theme.palette.neutral[50],
      ...theme.typography.body1,
      cursor: 'pointer'
    }
  }
}));
