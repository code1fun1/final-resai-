import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    border: `1px solid ${theme.palette.neutral[10]}`,
    borderRadius: '6px'
  },
  gridBorder: {
    borderLeft: `1px solid ${theme.palette.neutral[10]}`,
    borderRight: `1px solid ${theme.palette.neutral[10]}`,
    [theme.breakpoints.down('md')]: {
      borderLeft: 0,
      borderRight: 0,
      borderTop: `1px solid ${theme.palette.neutral[10]}`,
      borderBottom: `1px solid ${theme.palette.neutral[10]}`
    }
  }
}));
