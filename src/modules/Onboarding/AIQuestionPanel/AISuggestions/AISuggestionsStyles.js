import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sidebarTitle: {
    ...theme.typography.title1,
    color: theme.palette.tertiary.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.title2.fontSize,
      fontWeight: theme.typography.title2.fontWeight,
      lineHeight: theme.typography.title1.lineHeight
    }
  },
  sidebarSubtitle: {
    ...theme.typography.body2,
    color: theme.palette.neutral[50]
  },
  btnStyle: {
    '&.MuiButton-text': {
      textTransform: 'capitalize',
      padding: theme.spacing(0),
      color: '#424246'
    },
    '& .MuiButton-startIcon': {
      marginRight: 0,
      color: '#424246'
    },
    '& svg': {
      stroke: theme.palette.cool.main
    }
  }
}));
