import makeStyles from '@mui/styles/makeStyles';

export const useStylesCreditHistory = makeStyles((theme) => ({
  personalInfoWrapper: {
    // minHeight: 'calc(100vh - 69px)',
    alignItems: 'center',
    paddingTop: '24px',
    marginTop: '40px',
    marginBottom: '80px'
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: '5px'
  },
  cardWrapper: {
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  customHeaderTitle: {
    fontWeight: 'bold'
  },
  tableHeader: {
    color: 'black'
  }
}));
