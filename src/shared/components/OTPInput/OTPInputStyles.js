import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  linkWrap: {
    '&.MuiTypography-root': {
      ...theme.typography.body2,
      color: theme.palette.neutral[100],
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    },
    '&>.MuiTypography-root.MuiLink-root': {
      color: theme.palette.neutral[100],
      textDecorationColor: theme.palette.neutral[100]
    }
  },
  verifyCodeText: {
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      textAlign: 'center'
    }
  },
  textfieldStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.neutral[20]
    },
    '& .MuiInputBase-input::placeholder': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[40],
      textTransform: 'capitalize'
    }
  }
}));
