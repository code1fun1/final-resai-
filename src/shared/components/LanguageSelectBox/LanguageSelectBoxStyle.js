import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  selectBoxWrap: {
    '& .MuiOutlinedInput-notchedOutline, .MuiFormLabel-root': {
      display: 'none'
    },
    '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
      minHeight: 'auto',
      padding: '4.5px 14px 4.5px 0'
    },
    '& .MuiInputBase-root': {
      color: theme.palette.neutral[80],
      ...theme.typography.captionLg,
      '& .MuiInputAdornment-root > svg': {
        width: '16px',
        height: '16px'
      },
      '& .MuiSvgIcon-root.MuiSvgIcon-colorDisabled': {
        color: theme.palette.neutral[80]
      }
    },
    '& .MuiPaper-root.MuiPopover-paper': {
      background: 'red'
    }
  },
  selectList: {
    '&.MuiMenuItem-root': {
      ...theme.typography.body3,
      color: '#424246',
      '&:hover': {
        backgroundColor: '#E2E2E3'
      }
    },
    '&.Mui-selected': {
      // backgroundColor: 'transparent',
      color: '#000003',
      backgroundColor: '#E2E2E3'
    }
  }
}));
