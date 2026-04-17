import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  fullWidthHeading: {
    backgroundColor: theme.palette.neutral[700],
    color: 'black',
    padding: '15px',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  mainWrapper: {
    backgroundColor: theme.palette.neutral[700],
    color: 'black',
    borderRadius: '5px',
    display: 'grid',
    [theme.breakpoints.up('xs')]: {
      gridTemplateColumns: '1fr'
    },
    // Media query for larger screens
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '33.334% 66.667%'
    },
    '& h5': {
      fontSize: theme.typography.title2.fontSize
    },
    '& h6': {
      fontSize: theme.typography.body1.fontSize
    }
  },
  sidebarDetail: {
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 0px 4px 0px',
    borderRadius: '2px',
    padding: '30px',
    textAlign: 'center',
    '& .divider': {
      margin: '35px auto'
    }
  },
  divider: {
    background: '#e2e2e3',
    height: '1px'
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
    display: 'flex'
  },
  contentDetail: {
    padding: '30px'
  },
  workDetail: {
    '& ul': {
      margin: '0px',
      padding: '6px 18px'
    }
  },
  stepperClassDetails: {
    '& .MuiStepConnector-line': {
      minHeight: '16px'
      // borderColor: 'rgb(226 226 227 / var(--tw-bg-opacity))'
    },
    '& .Mui-completed': {
      color: '#d8f8ef !important',
      borderColor: '#fff !important'
    },
    '& .Mui-active': {
      color: '#424246',
      borderColor: '#fff !important',
      fontWeight: '700',
      fill: '#424246 !important'
    },
    '& .Mui-disabled .MuiStepIcon-text': {
      fontWeight: '700',
      fill: '#000322'
    },

    '& .MuiStepIcon-root': {
      borderColor: '#000322',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '12px',
      color: '#ffffff'
    },
    '& .MuiTypography-root': {
      color: '#424246'
    },
    '&.MuiStepIcon-completed': {
      color: '#ffffff' // Dark green color for the tick icon
    }
  },
  saveAndClose: {
    [theme.breakpoints.up('xs')]: {
      padding: '0'
    }
  },
  fixedSection: {
    position: 'absolute',
    bottom: '10px', // Fixed 10px from the bottom of the container
    left: '0',
    width: '100%', // Optional, makes the section full-width
    marginBottom: '10px', // Margin at the bottom of the section
    backgroundColor: '#f5f5f5', // Optional, for visual clarity
    padding: '10px' // Optional, for spacing inside the section
  }
}));
