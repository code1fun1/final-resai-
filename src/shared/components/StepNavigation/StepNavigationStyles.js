import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  backButton: {
    '&.MuiButtonBase-root.MuiButton-root.MuiButton-text,&.MuiIconButton-root': {
      padding: 0,
      color: theme.palette.neutral[80],
      '&[disabled]': {
        opacity: 0.5,
        pointerEvents: 'none',
        visibility: 'hidden' /* Hide the button but keep the space occupied */
      }
    }
  },
  skipButton: {
    '&.MuiButton-outlined': {
      border: `1px solid ${theme.palette.neutral[10]}`,
      backgroundColor: theme.palette.neutral[5],
      color: theme.palette.neutral[80],
      [theme.breakpoints.down('sm')]: {
        padding: '15px'
      }
    }
  },
  btnStyles: {
    '& .MuiButtonBase-root.MuiButton-root': {
      [theme.breakpoints.down('sm')]: {
        padding: '10px 15px',
        ...theme.typography.buttonMd
      }
    },
    '& .MuiIconButton-root': {
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    }
  }
}));
