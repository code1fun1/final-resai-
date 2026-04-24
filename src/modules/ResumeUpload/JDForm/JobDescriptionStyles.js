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
    paddingLeft: '100px',
    paddingRight: '100px',
    marginTop: '20px',
    color: '#000842',
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

  // ── New Figma design styles ──────────────────────────────────────

  // Outer wrapper: fills the right panel, flex column
  jdPanelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      minHeight: 'calc(100vh - 64px)'
    }
  },

  // Top header row (title + progress)
  jdPanelHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '32px 40px 20px 40px',
    borderBottom: '1px solid #f3f4f6',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      padding: '24px 24px 16px 24px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      padding: '16px 16px 12px 16px',
      gap: '10px'
    }
  },

  jdPanelTitle: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '22px',
      fontWeight: 700,
      color: '#04040E',
      lineHeight: 1.3,
      marginBottom: '6px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
        marginBottom: '4px'
      }
    }
  },

  jdPanelSubtitle: {
    '&.MuiTypography-root': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      color: '#04040E',
      lineHeight: 1,
      letterSpacing: '0px',
      maxWidth: '520px',
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px'
      }
    }
  },

  // Progress indicator (top-right)
  jdProgressBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    minWidth: '120px',
    paddingTop: '4px',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start'
    }
  },

  jdProgressBarTrack: {
    width: '110px',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    marginBottom: '4px'
  },

  jdProgressBarFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#DABF67',
    borderRadius: '3px'
  },

  jdProgressLabel: {
    '&.MuiTypography-root': {
      fontSize: '12px',
      color: '#9ca3af'
    }
  },

  // Scrollable form body
  jdPanelContent: {
    flex: 1,
    padding: '28px 40px',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      overflowY: 'visible',
      padding: '20px 24px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px'
    }
  },

  // Field label
  jdFieldLabel: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      color: '#04040E',
      marginBottom: '4px',
      display: 'block'
    }
  },

  // Text fields
  jdTextField: {
    '& .MuiOutlinedInput-root': {
      height: '48px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      fontFamily: 'Satoshi, sans-serif',
      '& fieldset': {
        borderColor: '#d1d5db'
      },
      '&:hover fieldset': {
        borderColor: '#9ca3af'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#424246'
      },
      '&.Mui-error fieldset': {
        borderColor: theme.palette.error.main
      }
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Satoshi, sans-serif',
      color: '#04040E',
      fontSize: '16px',
      '&::placeholder': {
        fontFamily: 'Satoshi, sans-serif',
        color: '#595959',
        opacity: 1
      }
    }
  },

  // Draft.js editor wrapper
  jdEditorContainer: {
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    minHeight: '140px',
    padding: '4px 8px',
    position: 'relative',
    zIndex: 0,
    '&:hover': {
      borderColor: '#9ca3af'
    },
    '&:focus-within': {
      borderColor: '#424246',
      borderWidth: '2px'
    },
    '& .rdw-editor-main': {
      overflow: 'auto',
      height: '130px'
    },
    '& .public-DraftEditorPlaceholder-root, & .public-DraftEditorPlaceholder-inner': {
      fontFamily: 'Satoshi, sans-serif !important',
      color: '#595959 !important',
      fontSize: '16px !important',
      letterSpacing: 0,
      '& span, & *': {
        fontFamily: 'Satoshi, sans-serif !important',
        color: '#595959 !important',
        fontSize: '16px !important'
      }
    },
    '& .DraftEditor-editorContainer, & .public-DraftEditor-content': {
      fontFamily: 'Satoshi, sans-serif !important',
      fontSize: '16px !important',
      color: '#04040E !important'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '160px',
      '& .rdw-editor-main': {
        height: '150px'
      }
    }
  },

  // Footer button bar
  jdPanelFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    borderTop: '1px solid #e5e7eb',
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      padding: '14px 24px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '12px 16px',
      flexWrap: 'wrap',
      gap: '8px'
    }
  },

  jdCancelBtn: {
    '&.MuiButton-root': {
      fontFamily: 'Satoshi, sans-serif',
      color: '#FF3B30',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1.5,
      letterSpacing: '-0.36px',
      textTransform: 'none',
      padding: '0',
      minWidth: 'auto',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        letterSpacing: '-0.28px'
      }
    }
  },

  jdBackBtn: {
    '&.MuiButton-root': {
      fontFamily: 'Satoshi, sans-serif',
      backgroundColor: '#ffffff',
      borderColor: '#DABF67',
      color: '#04040E',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1.5,
      letterSpacing: '-0.36px',
      textTransform: 'none',
      borderRadius: '999px',
      padding: '12px 32px',
      height: '50px',
      whiteSpace: 'nowrap',
      '&:hover': {
        borderColor: '#C8AD55',
        backgroundColor: '#fffdf5'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '10px 20px',
        fontSize: '14px',
        letterSpacing: '-0.28px',
        height: '42px'
      }
    }
  },

  jdSubmitBtn: {
    '&.MuiButton-root': {
      fontFamily: 'Satoshi, sans-serif',
      backgroundColor: '#DABF67',
      color: '#04040E',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: 1.5,
      letterSpacing: '-0.36px',
      textTransform: 'none',
      borderRadius: '999px',
      padding: '12px 32px',
      height: '50px',
      boxShadow: 'none',
      whiteSpace: 'nowrap',
      '&:hover': {
        backgroundColor: '#C8AD55',
        boxShadow: 'none'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '10px 20px',
        fontSize: '14px',
        letterSpacing: '-0.28px',
        height: '42px'
      }
    }
  },

  // Legacy styles kept for backward compatibility
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
      }
    }
  },
  jdFormEditorContainer: {
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    minHeight: '120px',
    padding: '5px'
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
