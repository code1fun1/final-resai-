import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  headingTitle: {
    ...theme.typography.h3,
    [theme.breakpoints.down('sm')]: {
      ...theme.typography.title1
    }
  },
  subTitle: {
    ...theme.typography.title3,
    color: theme.palette.neutral[60]
  }
}));
