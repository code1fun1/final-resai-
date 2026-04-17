import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    // color: theme.common.white
    color: 'white'
  }
}));
export default useStyles;
