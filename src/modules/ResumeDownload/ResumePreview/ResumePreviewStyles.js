import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tabContentWrapper: {
    '& .MuiTabs-flexContainer': {
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center'
      }
    }
  },
  templateWrapper: {
    [theme.breakpoints.down('lg')]: {
      overflow: 'auto'
    }
  }
}));
