import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  outlinedButton: {
    '&.MuiButton-root.MuiButton-outlined': {
      backgroundColor: theme.palette.neutral[5],
      borderColor: theme.palette.neutral[10],
      color: theme.palette.neutral[80],
      '&:hover': {
        backgroundColor: theme.palette.neutral[10]
      }
    }
  }
}));
