import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  tabWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0ff',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    padding: '4px'
  },
  tabStyle: {
    flexGrow: 1,
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#ecf0ff'
    },
    '& .MuiTab-root': {
      backgroundColor: 'transparent',
      color: '#939ac2',
      fontWeight: 'bold',
      margin: '0',
      borderRadius: '4px',
      minWidth: '50%',
      textAlign: 'center',
      padding: '10px',
      border: 'none',
      boxShadow: 'none',
      transition: '0.3s',
      textTransform: 'none'
    },
    '& .Mui-selected': {
      backgroundColor: '#ffffff',
      color: '#424246', // Changed from #185af9 (blue) to black
      border: '1px solid #ffffff',
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    '& .MuiTab-root:hover': {
      backgroundColor: '#bdbdbd', // Grey background on hover
      color: '#424246' // Changed from blue to black
    }
  },
  addNewButton: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#424246', // Changed from #0040f9 (blue) to black
    marginTop: '5px'
  }
}));
