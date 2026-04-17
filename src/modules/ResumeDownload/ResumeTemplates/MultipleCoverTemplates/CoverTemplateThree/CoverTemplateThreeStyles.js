import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.neutral[700],
    padding: '30px',
    color: theme.palette.neutral[70],
    '& p': {
      margin: 0
    }
  },
  personalInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-start'
  },
  nameRole: {
    flexGrow: 1
  },
  contactsLink: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-end',
    textAlign: 'right',
    width: '100%'
  },
  contactsIconText: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center'
  },
  letterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
    width: '100%'
  },
  letterStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  textStyle: {
    marginBottom: '5px'
  },
  iconImage: {
    width: '10px',
    height: '10px'
  },
  smallDivider: {
    // backgroundColor: theme.palette.cool.main,
    backgroundColor: '#424246',
    width: '100%',
    height: '3px',
    margin: '10px 0'
  },
  screenContactsText: {
    fontSize: theme.typography.title3.fontSize
  },
  screenLargeFontStyle: {
    fontSize: '26px'
  }
}));
