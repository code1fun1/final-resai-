import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  inputWrap: {
    position: 'relative',
    width: '100%'
  },

  boxWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: theme.spacing(2),
    background: theme.palette.cool.light,
    border: `1px dashed ${theme.palette.neutral[20]}`,
    cursor: 'pointer',
    borderRadius: '8px',
    padding: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(1),
      padding: theme.spacing(2)
    },
    '& h3.MuiTypography-root, span.MuiTypography-root': {
      ...theme.typography.buttonLg,
      color: theme.palette.neutral[800],
      '& span': {
        color: theme.palette.cool.main,
        display: 'inline-block',
        marginLeft: '5px',
        position: 'relative',
        top: '1px'
      }
    },
    '& p.MuiTypography-root': {
      ...theme.typography.paragraph2,
      color: theme.palette.neutral[40],
      whiteSpace: 'initial',
      textAlign: 'center'
    },
    '& p.errorMessage.MuiTypography-root': {
      color: theme.palette.error.main
    },
    '& strong.MuiTypography-root': {
      color: theme.palette.cool.main,
      ...theme.typography.buttonLg
    }
  },
  viewDesktop: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  viewMob: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  arrowIcon: {
    stroke: theme.palette.neutral[80],
    [theme.breakpoints.down('md')]: {
      stroke: theme.palette.cool.main
    }
  },
  viewDesktop: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  viewMob: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  inputFile: {
    display: 'none'
  },
  spinnerWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  }
}));
