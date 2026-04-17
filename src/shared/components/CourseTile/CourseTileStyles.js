import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  title: {
    '&.MuiTypography-root': {
      ...theme.typography.buttonMd,
      color: theme.palette.neutral[80],
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    }
  },
  subTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.buttonRg,
      color: theme.palette.neutral[50],
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    }
  },
  cardImage: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      alignSelf: 'center'
    },
    height: '100%',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  cardBoxCursor: {
    cursor: 'pointer'
  }
}));
