import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  labelText: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: '-0.16px',
      lineHeight: '20px',
      color: '#04040e',
      textTransform: 'none'
    }
  },
  textfieldStyle: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '999px',
      backgroundColor: '#fff',
      fontFamily: 'Satoshi, sans-serif'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#dfdfdf',
      borderWidth: '1px'
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#dfdfdf'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#dabf67',
      borderWidth: '1px'
    },
    '& .MuiInputBase-input': {
      padding: '14px 16px',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      color: '#585858'
    },
    '& .MuiInputBase-input::placeholder': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      color: '#737373',
      opacity: 1
    },
    '& .MuiInputAdornment-root': {
      marginRight: '12px'
    }
  },
  checkboxLabel: {
    '& .MuiButtonBase-root.MuiCheckbox-root': {
      color: '#dfdfdf',
      padding: '0',
      '&.Mui-checked': {
        color: '#dabf67'
      }
    },
    '& .MuiFormControlLabel-label': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      color: '#04040e'
    },
    margin: 0,
    gap: '12px'
  },
  forgotPasswordText: {
    fontFamily: 'Satoshi, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    color: '#735302',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  /* Gold Continue button — outer wrapper (actual <button> element) */
  continueButtonOuter: {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    width: '100%',
    '&:disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
      pointerEvents: 'none'
    },
    '&:not(:disabled):hover $continueLabelInner': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0'
    },
    '&:not(:disabled):hover $continueArrowInner': {
      marginLeft: '0',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0'
    }
  },
  continueLabelInner: {
    flex: 1,
    height: '100%',
    backgroundColor: '#dabf67',
    borderRadius: '999px',
    padding: '0 32px',
    fontSize: '18px',
    fontWeight: 500,
    fontFamily: 'Satoshi, sans-serif',
    color: '#04040e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-radius 0.3s ease',
    userSelect: 'none'
  },
  continueArrowInner: {
    width: '50px',
    height: '50px',
    flexShrink: 0,
    borderRadius: '999px',
    backgroundColor: '#dabf67',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8px',
    transition: 'border-radius 0.3s ease, margin-left 0.3s ease'
  },
  linkText: {
    '&.MuiButtonBase-root.MuiButton-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      color: '#735302',
      padding: '0px',
      minWidth: 'auto',
      textTransform: 'none'
    }
  },
  linkWrap: {
    '&.MuiTypography-root': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      color: '#0f172a',
      textAlign: 'center'
    }
  },
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: '#dfdfdf'
    },
    '& .MuiDivider-wrapper': {
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      color: '#7b7b7b'
    }
  }
}));
