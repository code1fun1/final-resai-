import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  heading: {
    '&.MuiTypography-root': {
      ...theme.typography.title1,
      color: theme.palette.tertiary.dark,
      [theme.breakpoints.between('md', 'lg')]: {
        '&.MuiTypography-root': {
          fontSize: theme.typography.title2.fontSize,
          fontWeight: theme.typography.title1.fontWeight,
          lineHeight: theme.typography.title2.lineHeight
        }
      }
    }
  },
  subtitle: {
    color: theme.palette.neutral[60],
    [theme.breakpoints.down('lg')]: {
      '&.MuiTypography-root': {
        fontSize: theme.typography.title3.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        lineHeight: theme.typography.title3.lineHeight
      }
    }
  },
  customProgressBar: {
    height: 'auto'
  },
  circularBarWrapper: {
    marginLeft: '10px',
    '&>div': {
      [theme.breakpoints.between('md', 'lg')]: {
        width: '56px',
        height: '56px'
      }
    }
  },
  scoreTitle: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#787C80',
    marginTop: '10px',
    marginLeft: '0px',
    width: '90px'
  }
}));
