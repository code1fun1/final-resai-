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
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  dateTitle: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '16px',
    textAlign: 'left',
    color: '#919295'
  },
  customHeaderCompany: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '16px',
    textAlign: 'left',
    color: '#5C5D61',
    textTransform: 'capitalize'
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '16px',
    color: '#232323'
    // paddingLeft: '0px',
    // paddingRight: '15px'
  },
  menuTitleMobile: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '16px',
    color: '#232323'
  },
  primaryBtn: {
    '&.MuiButtonBase-root': {
      padding: '12px 27px'
      // '& svg': {
      //   stroke: theme.palette.neutral[700]
      // }
    }
  },
  imageContainer: {
    width: '100%',
    height: 'auto',
    position: 'relative'
  }
}));
