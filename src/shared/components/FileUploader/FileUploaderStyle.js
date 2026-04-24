import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  inputWrap: {
    position: 'relative',
    width: '100%',
  },
  boxWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(0.75),
    background: '#FAF7F0',
    border: '1.5px dashed #DABF67',
    cursor: 'pointer',
    borderRadius: '12px',
    padding: theme.spacing(3),
    width: '100%',
    minHeight: '120px',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: '#F5F0E4',
    },
    '& p.MuiTypography-root': {
      fontSize: '13px',
      color: '#9CA3AF',
      textAlign: 'center',
    },
    '& p.errorMessage.MuiTypography-root': {
      color: theme.palette.error.main,
    },
    '& strong.MuiTypography-root': {
      color: '#DABF67',
      fontSize: '14px',
      fontWeight: 600,
    },
  },
  uploadIcon: {
    marginBottom: '4px',
    flexShrink: 0,
  },
  clickHereText: {
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: 1.5,
    letterSpacing: '-0.02em',
    color: '#735302',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    display: 'inline',
  },
  uploadText: {
    fontFamily: 'Satoshi, sans-serif !important',
    fontWeight: '400 !important',
    fontSize: '16px !important',
    lineHeight: '1.5 !important',
    letterSpacing: '-0.02em !important',
    color: '#7B7B7B !important',
    textAlign: 'center',
  },
  pdfText: {
    fontFamily: 'Satoshi, sans-serif !important',
    fontWeight: '400 !important',
    fontSize: '14px !important',
    lineHeight: '1.5 !important',
    letterSpacing: '-0.02em !important',
    color: '#7B7B7B !important',
    textAlign: 'center',
  },
  spinnerWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  selectedWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  selectedTopRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  selectedAction: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  selectedFileName: {
    fontFamily: 'Satoshi, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: '0em',
    color: '#04040E',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  inputFile: {
    display: 'none',
  },
  // responsive kept for compat
  viewDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  viewMob: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  arrowIcon: {
    color: '#DABF67',
  },
}));
