import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  carouselBgImg: {
    backgroundImage: 'url(\'/image/frameLoginGold.jpg\')',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    color: theme.palette.neutral[700],
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      padding: theme.spacing(5)
    }
  },
  outlinedButton: {
    '&.MuiButtonBase-root.MuiButton-root': {
      borderColor: theme.palette.neutral[700],
      color: theme.palette.neutral[700]
    }
  },
  buttonsWrap: {
    background: theme.palette.neutral[700]
  }
}));
