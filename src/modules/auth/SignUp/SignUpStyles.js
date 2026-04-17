import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: theme.palette.neutral[10]
    },
    '& .MuiDivider-wrapper': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[50]
    }
  },
  labelText: {
    '&.MuiTypography-root': {
      ...theme.typography.captionRg,
      color: theme.palette.neutral[80],
      textTransform: 'capitalize'
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
  },
  linkWrap: {
    '&.MuiTypography-root': {
      ...theme.typography.body2,
      color: theme.palette.neutral[70],
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    },
    '&>.MuiTypography-root.MuiLink-root': {
      color: theme.palette.neutral[100],
      textDecorationColor: theme.palette.neutral[100]
    }
  },
  linkText: {
    '&.MuiButtonBase-root.MuiButton-root': {
      ...theme.typography.buttonMd,
      // color: theme.palette.cool.main,
      color: '#424246',
      padding: '0px',
      marginBottom: '3px'
    }
  },
  subTitle: {
    ...theme.typography.title3,
    color: theme.palette.neutral[60]
  },
  editNumber: {
    color: theme.palette.neutral[70]
  },
  docEditIconStyle: {
    stroke: theme.palette.neutral[80],
    '&.MuiIconButton-root': {
      padding: '0 8px'
    }
  }
}));
