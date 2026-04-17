import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  mainWrapper: {
    backgroundColor: theme.palette.neutral[700],
    color: theme.palette.neutral[50],
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '33.334% 66.667%',
    '& h4,h5': {
      textTransform: 'uppercase'
    },
    '& h5': {
      fontSize: theme.typography.title2.fontSize
    },
    '& h6': {
      fontSize: theme.typography.body1.fontSize
    }
  },
  sidebarDetail: {
    backgroundColor: '#9d9d9d45',
    padding: '30px',
    textAlign: 'center',
    '& .divider': {
      margin: '35px auto'
    }
  },
  divider: {
    background: theme.palette.neutral[170],
    width: '100px',
    height: '3px',
    margin: '35px 0'
  },
  personalDetail: {
    gap: '3px',
    '& p': {
      lineHeight: '1',
      wordBreak: 'break-all'
    }
  },
  educationDetail: {
    gap: '12px',
    margin: '30px 0'
  },
  displayColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  contentDetail: {
    padding: '30px'
  },
  workDetail: {
    '& ul': {
      margin: '0px',
      padding: '6px 18px'
    }
  }
}));
