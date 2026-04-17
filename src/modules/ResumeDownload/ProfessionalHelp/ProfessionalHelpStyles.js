import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  primaryBtn: {
    '&.MuiButtonBase-root': {
      padding: '12px 27px',
      '& svg': {
        stroke: theme.palette.neutral[700]
      }
    }
  },
  title: {
    '&.MuiTypography-root': {
      ...theme.typography.buttonLg,
      color: theme.palette.neutral[800]
    }
  },
  subTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.paragraph2,
      color: theme.palette.neutral[170]
    }
  }
}));
