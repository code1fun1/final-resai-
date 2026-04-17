import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  subTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.title2,
      color: theme.palette.neutral[50],
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.captionLg
      }
    }
  },
  title: {
    '&.MuiTypography-root': {
      ...theme.typography.h5,
      color: theme.palette.cool.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.title2.fontSize,
        fontWeight: theme.typography.title2.fontWeight,
        lineHeight: theme.typography.title1.lineHeight
      }
    }
  },

  clearBtn: {
    '&.MuiButtonBase-root.MuiButton-text': {
      width: 'fit-content',
      padding: 0,
      textDecoration: 'underline',
      ...theme.typography.buttonLg,
      color: theme.palette.neutral[80]
    }
  }
}));
