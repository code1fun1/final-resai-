import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.between(685, 896)]: {
      width: 'calc(100vw - 79%)',
      flexGrow: 0
    }
  },
  cardBoxWrapper: {
    height: 'calc(250px - 10px)',
    overflow: 'scroll',
    paddingRight: '16px',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(227px - 10px)'
    }
  }
}));
