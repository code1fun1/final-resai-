import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 1
  },
  contentArea: {
    flex: 1,
    padding: '36px 40px 20px',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '24px 16px 16px'
    }
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    paddingTop: '4px'
  },
  progressTrack: {
    width: '120px',
    height: '10px',
    backgroundColor: '#EDEDED',
    borderRadius: '5px',
    overflow: 'hidden',
    flexShrink: 0
  },
  progressFill: {
    height: '100%',
    width: '10px',
    backgroundColor: '#DABF67',
    borderRadius: '5px'
  },
  scratchDivider: {
    margin: '28px 0',
    '&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: '#E5E7EB'
    },
    '& .MuiDivider-wrapper': {
      color: '#04040E',
      fontFamily: 'Satoshi, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '100%',
      letterSpacing: '0em',
      textTransform: 'uppercase'
    }
  },
  fieldsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '24px',
      '& fieldset': { borderColor: '#E5E7EB' },
      '&:hover fieldset': { borderColor: '#DABF67' },
      '&.Mui-focused fieldset': { borderColor: '#DABF67' }
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#DABF67' },
    '& .MuiInputBase-input::placeholder': {
      fontFamily: 'Satoshi, sans-serif',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0%',
      color: '#595959',
      opacity: 1
    }
  },
  additionalLinksField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '& fieldset': { borderColor: '#E5E7EB' },
      '&:hover fieldset': { borderColor: '#DABF67' },
      '&.Mui-focused fieldset': { borderColor: '#DABF67' }
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#DABF67' },
    '& .MuiInputBase-input::placeholder': {
      fontFamily: 'Satoshi, sans-serif',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0%',
      color: '#595959',
      opacity: 1
    }
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderTop: '1px solid #E5E7EB',
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
      paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '10px'
    }
  },
  footerActions: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    }
  },
  cancelBtn: {
    color: '#FF3B30',
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '150%',
    letterSpacing: '-0.02em',
    textTransform: 'none',
    padding: '8px 4px',
    '&:hover': {
      backgroundColor: 'rgba(255, 59, 48, 0.06)'
    }
  },
  backBtn: {
    borderRadius: '999px',
    border: '1px solid #DABF67',
    backgroundColor: '#FFFFFF',
    color: '#04040E',
    height: '50px',
    minWidth: '103px',
    padding: '0 24px',
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0em',
    textTransform: 'none',
    '&:hover': {
      border: '1px solid #DABF67',
      backgroundColor: 'rgba(218, 191, 103, 0.10)'
    },
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      minWidth: 0,
      padding: '0 16px'
    }
  },
  getStartedBtn: {
    borderRadius: '999px',
    backgroundColor: '#DABF67',
    color: '#04040E',
    height: '50px',
    minWidth: '151px',
    padding: '0 28px',
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0em',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#C9A84C',
      boxShadow: 'none'
    },
    '&.Mui-disabled': {
      backgroundColor: '#E5E7EB',
      color: '#9CA3AF'
    },
    [theme.breakpoints.down('sm')]: {
      flex: 1,
      minWidth: 0,
      padding: '0 16px'
    }
  },
  // legacy kept for any external references
  titleWrap: {},
  divider: {},
  textEditorWrapper: {},
  mobGetStartedButton: {},
  TextBoxStyle: {}
}));
