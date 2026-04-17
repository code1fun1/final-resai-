import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  personalInfoWrapper: {
    // minHeight: 'calc(100vh - 69px)',
    alignItems: 'center',
    paddingTop: '24px',
    marginTop: '40px'
  },
  cardWrapper: {
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  buttonStyle: {
    backgroundColor: '#1a1717',
    borderRadius: '5px',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1a1717'
    }
  },
  validationError: {
    padding: '5px',
    color: 'red'
  },
  countryCodeStyle: {
    marginRight: '8',
    marginLeft: '-14px'
  },
  flagStyle: {
    marginRight: '8',
    marginLeft: '-14px'
  },
  customHeaderTitle: {
    fontWeight: 'bold'
  }
}));
