import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  linkStyle: {
    '&.MuiButtonBase-root.MuiButton-text': {
      ...theme.typography.body1,
      color: theme.palette.neutral[70],
      textTransform: 'none',
      padding: '6px 8px'
    }
  }
}));
