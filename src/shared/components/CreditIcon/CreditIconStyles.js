import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  creditsWrapper: {
    backgroundColor: '#E2E2E3',
    borderRadius: '100px',
    '& .MuiTypography-root': {
      ...theme.typography.buttonMd,
      color: '#000003'
    },
    '& svg': {
      fill: theme.palette.warm.dark
    }
  }
}));
