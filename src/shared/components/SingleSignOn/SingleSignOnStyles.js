import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  outlineButtonGroup: {
    '&.MuiButtonBase-root.MuiButton-root': {
      color: theme.palette.neutral[80],
      borderColor: theme.palette.neutral[20],
      width: '100%',
      ...theme.typography.buttonLg,
      alignItems: 'self-end'
    }
  }
}));
