import makeStyles from '@mui/styles/makeStyles';

export const useStylesResumeCustomize = makeStyles((theme) => ({
  mainWrapper: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr', // Default for xs screens
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr', // For md and up screens
      height: 'fit-content',
      marginTop: '20px'
    },
    marginRight: '10.5px',
    gap: theme.spacing(2), // Gap between grid items
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '100vh', // Set maximum height to enable scrolling within viewport height
    marginBottom: '20px', // Bottom margin
    [theme.breakpoints.up('xs')]: {
      height: 'fit-content',
      marginTop: '20px'
    }
  },
  labelText: {
    '&.MuiTypography-root': {
      ...theme.typography.captionRg,
      color: theme.palette.neutral[80],
      textTransform: 'capitalize'
    }
  },
  textfieldStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.neutral[20]
    },
    '& .MuiInputBase-input::placeholder': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[40],
      textTransform: 'capitalize'
    }
  },
  checkboxLabel: {
    '& .MuiButtonBase-root.MuiCheckbox-root': {
      '&.Mui-checked': {
        color: theme.palette.cool.main
      }
    },
    '& .MuiTypography-root': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[70]
    }
  },
  linkText: {
    '&.MuiButtonBase-root.MuiButton-root': {
      ...theme.typography.buttonMd,
      color: theme.palette.cool.main,
      padding: '0px'
    }
  },
  linkWrap: {
    '&.MuiTypography-root': {
      ...theme.typography.body2,
      color: theme.palette.neutral[100],
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center'
      }
    },
    '&>.MuiTypography-root.MuiLink-root': {
      color: theme.palette.neutral[100],
      textDecorationColor: theme.palette.neutral[100]
    }
  },
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: theme.palette.neutral[10]
    },
    '& .MuiDivider-wrapper': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[50]
    }
  },
  // tabWrapper: {
  //   [theme.breakpoints.up('xs')]: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     backgroundColor: '#f0f0f0',
  //     boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  //     borderRadius: '4px',
  //     padding: '4px',
  //   }
  // },
  tabStyle: {
    [theme.breakpoints.up('xs')]: {
      flexGrow: 1,
      '& .MuiTabs-flexContainer': {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0'
      },
      '& .MuiTab-root': {
        position: 'relative',
        backgroundColor: 'transparent',
        color: '#939ac2',
        fontWeight: 'normal',
        margin: '0',
        borderRadius: '4px',
        minWidth: '100%', //change 50% to 100% after remove cover letter
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #bdbdbd', // Grey border for the tabs
        borderLeft: 'none', // Remove the left border for all except the first tab
        boxShadow: 'none',
        transition: '0.3s',
        textTransform: 'none',
        '&:first-of-type': {
          borderLeft: '1px solid #bdbdbd' // Add left border to the first tab
        }
      },
      '& .Mui-selected': {
        fontWeight: 'bold', // Bold text for the active tab
        color: '#000000', // Black text color for active tab
        backgroundColor: '#ffffff',
        border: '1px solid #bdbdbd', // Grey border for the active tab
        borderLeft: 'none' // Ensure no double border between tabs
      },
      '& .MuiTab-root:hover': {
        backgroundColor: '#e0e0e0', // Slightly darker grey on hover
        color: 'black'
      },
      '& .MuiTab-wrapper': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      '& .tab-counter': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#939ac2', // Default color for inactive tabs
        color: '#ffffff', // White text for the counter
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        marginLeft: '8px',
        '&.active': {
          backgroundColor: '#185af9' // Primary color for the counter when active
        }
      },
      '& .down-arrow': {
        marginLeft: '8px',
        color: '#939ac2', // Default grey color for the down arrow
        '&.active': {
          color: '#185af9' // Primary color for the down arrow when active
        }
      }
    }
  }
}));
