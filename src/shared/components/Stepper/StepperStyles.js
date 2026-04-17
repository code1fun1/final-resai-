import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    overflow: 'hidden',
    '& .horizontal.MuiStepper-root': {
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      '& .MuiBox-root': {
        position: 'static'
      },
      '& .kGsEGQ': {
        display: 'block'
      },
      '& .MuiStep-root:last-child': {
        '& .kGsEGQ': {
          display: 'none'
        }
      },
      '& .MuiStepLabel-iconContainer': {
        padding: 0
      },
      '& .MuiStepConnector-root': {
        display: 'none'
      }
    },
    '&.vertical': {
      overflow: 'visible'
    }
  },
  wrapper: {
    '& .MuiStep-root': {
      position: 'relative',
      [theme.breakpoints.down('lg')]: {
        padding: 0
      }
    },
    '& .MuiStepLabel-iconContainer': {
      '& .MuiSvgIcon-root': {
        display: 'none'
      }
    },
    '& .MuiStepLabel-label': {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      '& .MuiBox-root': {
        '& .MuiBox-root': {
          display: 'none'
        }
      }
    },
    '& .MuiStepLabel-label.Mui-active': {
      // color: theme.palette.cool.main,
      color: '#424246',
      '& .MuiBox-root': {
        border: '1px solid #424246',
        backgroundColor: '#424246',
        color: theme.palette.neutral[700]
      },
      '&>.MuiTypography-root': {
        color: '#424246'
      }
    },
    '& .MuiStepConnector-root': {
      transform: 'translateX(15px)',
      '& .MuiStepConnector-line': {
        borderColor: theme.palette.neutral[10],
        borderLeftWidth: '2px'
      }
    },
    '& .Mui-completed': {
      '&.MuiStepLabel-label': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        '& .MuiBox-root': {
          '& .MuiBox-root': {
            display: 'block'
          }
        }
      },
      '&.MuiStepLabel-label.Mui-disabled': {
        '& .MuiBox-root': {
          '& .MuiBox-root': {
            display: 'block'
          }
        }
      },
      '& .MuiBox-root': {
        '& .MuiTypography-root': {
          display: 'none !important'
        }
      },
      '&>.MuiBox-root': {
        border: 0
      }
    },
    '& .MuiStepLabel-vertical': {
      padding: '2px 0 0px 0'
    }
  },
  boxWrap: {
    '&.MuiBox-root': {
      height: '24px',
      width: '24px',
      justifyContent: 'center',
      borderRadius: '50%',
      color: theme.palette.neutral[190],
      position: 'relative',
      '& .MuiTypography-root.MuiTypography-body1': {
        display: 'flex',
        alignItems: 'center'
      },

      '& img': {
        height: '26px',
        width: '26px'
      }
    }
  },
  stepTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.buttonMd,
      whiteSpace: 'pre',
      color: '#424246',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px'
      }
    }
  },
  stepNumber: {
    '&.MuiTypography-root': {
      ...theme.typography.buttonRg
    }
  },
  arrowWrap: {
    stroke: '#B2B7BA',
    position: 'relative',
    top: '0px',
    left: '17px',
    display: 'none',
    [theme.breakpoints.down('lg')]: {
      left: '3px'
    }
  },
  noBorderStyle: {
    '&.MuiBox-root': {
      border: '0 !important',
      backgroundColor: 'transparent !important'
    }
  },
  boxBorderStyle: {
    '&.MuiBox-root': {
      border: '1.5px solid #424246'
    }
  }
}));
