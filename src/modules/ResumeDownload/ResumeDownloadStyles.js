import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    backgroundColor: theme.palette.neutral[700],
    borderBottom: `1px solid ${theme.palette.neutral[10]}`
  },
  breadcrumbStyle: {
    '&.MuiTypography-root': {
      padding: 0
    }
  },
  sideCustomStyle: {
    backgroundImage: 'url(\'/image/dottedCanvas.png\')',
    height: 'calc(100vh - 15px)'
  },
  gridContainer: {
    '&.MuiGrid-container': {
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column-reverse'
      }
    }
  },
  downloadBtn: {
    '&.MuiButton-contained ': {
      padding: '8px 30px'
    }
  }
}));
