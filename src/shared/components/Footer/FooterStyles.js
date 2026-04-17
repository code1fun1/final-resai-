import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    '&.MuiContainer-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.neutral[700],
      color: theme.palette.neutral[700],
      paddingTop: '11px',
      paddingBottom: '11px',
      gap: theme.spacing(1),
      position: 'relative',
      zIndex: 2,
      borderTop: `1px solid ${theme.palette.neutral[10]}`
    },
    '& .MuiTypography-root.MuiTypography-body1': {
      display: 'flex',
      gap: '10px',
      flexDirection: 'row-reverse'
    },
    '& .MuiTypography-root.MuiTypography-body2': {
      opacity: '50%'
    }
  },
  footerText: {
    '& .MuiTypography-root.MuiTypography-body2, & .MuiTypography-root.MuiTypography-inherit': {
      // color: theme.palette.neutral[700],
      color: ' #424246',
      ...theme.typography.title3,
      textTransform: 'none',
      textDecoration: 'none',
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.title4
      }
    }
  }
}));
