import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  subTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.title2,
      color: theme.palette.neutral[50],
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.captionLg
      }
    }
  },
  title: {
    '&.MuiTypography-root': {
      ...theme.typography.h5,
      color: theme.palette.cool.dark,
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.title2.fontSize,
        fontWeight: theme.typography.title2.fontWeight,
        lineHeight: theme.typography.title1.lineHeight
      }
    }
  },
  textfieldStyle: {
    '& .Mui-focused, & .MuiInputBase-root': {
      '&::after': {
        borderColor: theme.palette.neutral[40]
      }
    }
  },
  mobGetStartedButton: {
    position: 'fixed',
    left: 0,
    bottom: '43px',
    zIndex: 1000,
    width: '100%',
    '& .MuiButton-contained': {
      width: '100%'
    }
  },

  TextBoxStyle: {
    '& .public-DraftEditorPlaceholder-inner': {
      marginTop: '10px'
    }
  },
  sideCustomStyle: {
    '&.MuiTypography-root': {
      padding: '16px px 17px 24px'
    },
    paddingLeft: '100px', //chnage from 100 to 80
    paddingRight: '100px', //chnage from 100 to 40
    marginTop: '20px',
    color: '#000842', //as theme
    // Add responsive styles for mobile devices
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      marginTop: '20px',
      marginBottom: '50px'
    }
  },
  resumeUploadWrapper: {
    minHeight: 'calc(100vh - 69px)',
    alignItems: 'center',
    paddingBottom: '74px',
    paddingTop: '24px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '79px'
    }
  },
  detailsWrapper: {
    minHeight: 'calc(100vh - 80px)',
    paddingBottom: '155px',
    paddingTop: '25px'
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
  stepStyle: {
    '& .MuiStepper-root.MuiStepper-vertical': {
      margin: '0 25px'
    },
    '& .MuiStepLabel-root': {
      pointerEvents: 'none',
      cursor: 'default'
    }
  },
  textHeadingStyle: {
    '&.MuiTypography-root.MuiTypography-h5': {
      color: theme.palette.cool.dark
    }
  },
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
    fontWeight: 'bold'
  },
  // Simplified JDForm styles following MyProfile pattern
  jdFormWrapper: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: '50px',
      paddingBottom: '200px'
    },
    paddingTop: '100px',
    paddingBottom: '50px'
  },
  jdFormCard: {
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff'
  },
  jdFormHeader: {
    padding: '24px 24px 0 24px'
  },
  jdFormContent: {
    padding: '24px'
  },
  jdFormTitle: {
    color: '#111827',
    fontWeight: 600,
    marginBottom: '8px'
  },
  jdFormSubtitle: {
    color: '#6b7280',
    marginBottom: '24px'
  },
  jdFormFieldLabel: {
    color: '#27282c',
    fontWeight: 500,
    fontSize: '16px',
    marginBottom: '8px'
  },
  jdFormTextField: {
    height: '56px',
    '& .MuiOutlinedInput-root': {
      height: '56px',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '& fieldset': {
        borderColor: '#d1d5db'
      },
      '&:hover fieldset': {
        borderColor: '#9ca3af'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0147fd'
      },
      '&.Mui-error fieldset': {
        borderColor: theme.palette.error.main
      }
    },
    '& .MuiInputBase-input': {
      color: '#919295',
      fontSize: '16px',
      '&::placeholder': {
        color: '#9ca3af',
        opacity: 1
      }
    }
  },
  jdFormEditorContainer: {
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    minHeight: '120px',
    padding: '5px',
    position: 'relative',
    zIndex: 0,
    '&:hover': {
      borderColor: '#9ca3af'
    },
    '&:focus-within': {
      borderColor: '#424246',
      borderWidth: '2px',
      zIndex: 0
    },
    '& .rdw-editor-main': {
      overflow: 'scroll',
      height: '120px',
      position: 'relative',
      zIndex: 3
    },
    '& .public-DraftEditorPlaceholder-inner': {
      position: 'relative',
      zIndex: 3
    }
  },
  jdFormErrorText: {
    marginTop: '8px',
    color: theme.palette.error.main
  },
  jdFormButtonContainer: {
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px'
  },
  jdFormButton: {
    minWidth: '120px'
  }
}));
