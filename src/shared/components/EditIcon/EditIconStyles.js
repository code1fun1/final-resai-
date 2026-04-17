import makeStyles from '@mui/styles/makeStyles';

export const useStylesEdit = makeStyles(() => ({
  fabIcon: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424246 ',
    '&:hover': {
      backgroundColor: '#424246 '
    }
  },
  iconContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: '55px',
    height: '25px'
  }
}));
