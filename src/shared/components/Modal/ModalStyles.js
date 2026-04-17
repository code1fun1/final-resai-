import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  modalWrapper: {
    '& .MuiDialog-paper': {
      backgroundColor: theme.palette.neutral[700]
    }
  },
  closeIconBtn: {
    stroke: theme.palette.neutral[80],
    '&.MuiIconButton-root': {
      position: 'absolute',
      top: '10px',
      right: '10px'
    },
    '& svg': {
      height: '20px',
      width: '11px'
    }
  }
}));
