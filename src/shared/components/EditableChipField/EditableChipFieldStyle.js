import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  chipTextfield: {
    flexGrow: 1,
    width: '100%',
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      ...theme.typography.captionLg,
      '&::placeholder': {
        color: theme.palette.neutral[40]
      }
    },
    '& .MuiInputBase-input': {
      padding: '7px 14px'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.neutral[20]
    }
  }
}));
