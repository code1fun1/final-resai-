import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  avatarIcon: {
    '&.MuiAvatar-root': {
      backgroundColor: theme.palette.neutral[5],
      border: `1px solid ${theme.palette.neutral[10]}`,
      ...theme.typography.body1,
      color: theme.palette.neutral[80],
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.body3
      }
    }
  },

  creditsWrapper: {
    backgroundColor: theme.palette.warm.light,
    borderRadius: '100px',
    '& .MuiTypography-root': {
      ...theme.typography.buttonMd,
      color: theme.palette.warm.dark
    },
    '& svg': {
      fill: theme.palette.warm.dark
    }
  },
  outlinedButton: {
    '&.MuiButton-root.MuiButton-outlined': {
      backgroundColor: theme.palette.neutral[5],
      borderColor: theme.palette.neutral[10],
      color: theme.palette.neutral[80],
      '&:hover': {
        backgroundColor: theme.palette.neutral[10]
      }
    }
  },
  imgWrap: {
    width: '100%',
    textAlign: 'center',
    '&img': {
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    }
  },
  titleStyles: {
    '& .MuiTypography-root.MuiTypography-body1': {
      textAlign: 'center !important',
      margin: '0 auto',
      width: '302px',
      [theme.breakpoints.down('md')]: {
        width: '100%'
      }
    },
    '& .MuiInputBase-input.MuiOutlinedInput-input': {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      }
    }
  }
}));
