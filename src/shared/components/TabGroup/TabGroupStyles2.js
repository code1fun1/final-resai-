import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  tabBtnWrapper: {
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    position: 'relative',
    alignItems: 'center',
    paddingBottom: theme.spacing(8) // Adds space below tabs for buttons
  },
  tabBtnWrapper2: {
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    position: 'relative',
    alignItems: 'center',
    paddingBottom: theme.spacing(2) // Adds space below tabs for buttons
  },
  tabBtn: {
    '&.MuiButtonBase-root.MuiTab-root': {
      ...theme.typography.body1,
      color: theme.palette.neutral[50],
      textTransform: 'none',
      backgroundColor: theme.palette.neutral[700],
      minHeight: 'max-content',
      padding: '8px 13px',
      border: `1px solid ${theme.palette.neutral[10]}`
    }
  },
  gapTabBtn: {
    '& .MuiTabs-flexContainer': {
      gap: theme.spacing(1)
    }
  },
  containedTabBtn: {
    '&.MuiButtonBase-root.MuiTab-root': {
      '&.Mui-selected': {
        color: theme.palette.neutral[90],
        fontWeight: theme.typography.buttonLg.fontWeight
      },
      '&:first-child': {
        borderRadius: '6px 0 0 6px'
      },
      '&:last-child': {
        borderRadius: '0 6px 6px 0',
        borderLeft: 0
      }
    }
  },
  outlinedTabBtn: {
    '&.MuiButtonBase-root.MuiTab-root': {
      borderRadius: '8px',
      ...theme.typography.body1,
      color: '#424246',
      '&.Mui-selected': {
        color: '#424246',
        // borderColor: '#424246',
        border: '2px solid #424246'
      }
    }
  },
  IconStyle: {
    '&.MuiIconButton-root': {
      border: `1px solid ${theme.palette.neutral[10]}`,
      backgroundColor: theme.palette.neutral[5],
      position: 'absolute',
      top: 'calc(48% + 5px)', // Positions the buttons below the tabs
      zIndex: 1
    },
    '&.MuiIconButton-root.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  prevIcon: {
    '&.MuiIconButton-root': {
      left: theme.spacing(2), // Adds consistent spacing
      [theme.breakpoints.down('sm')]: {
        left: '100px'
      }
    }
  },
  nextIcon: {
    '&.MuiIconButton-root': {
      right: theme.spacing(2), // Adds consistent spacing
      [theme.breakpoints.down('sm')]: {
        right: '100px'
      }
    }
  }
}));
