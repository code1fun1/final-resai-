import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  policyLink: {
    '&.MuiTypography-root': {
      color: theme.palette.neutral[70],
      textAlign: 'left',
      '& a': {
        textDecorationColor: theme.palette.neutral[70],
        color: theme.palette.neutral[70]
      }
    }
  },
  linkWrap: {
    '&.MuiTypography-root': {
      ...theme.typography.body2,
      color: theme.palette.neutral[100]
    },
    '&>.MuiTypography-root.MuiLink-root': {
      color: theme.palette.neutral[100],
      textDecorationColor: theme.palette.neutral[100]
    }
  }
}));
