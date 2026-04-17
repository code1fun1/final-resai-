import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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

  checkboxLabel: {
    '& .MuiButtonBase-root.MuiCheckbox-root': {
      '&.Mui-checked': {
        color: theme.palette.cool.main
      }
    },
    '& .MuiTypography-root': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[70]
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
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: theme.palette.neutral[10]
    },
    '& .MuiDivider-wrapper': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[50]
    }
  }
}));
