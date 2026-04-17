import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  menuItemList: {
    '&.MuiMenuItem-root': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      minHeight: 'auto'
    }
  }
}));
