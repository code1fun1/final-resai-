import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    border: `1px solid ${theme.palette.neutral[10]}`,
    borderRadius: '6px'
  },
  jobTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.body3,
      color: theme.palette.neutral[50]
    }
  },
  jobTextfield: {
    '& .MuiInputBase-root, &.MuiTypography-body1': {
      ...theme.typography.title2,
      color: theme.palette.cool.dark,
      '& .MuiInputBase-input': {
        padding: 0,
        width: '100%',
        whiteSpace: 'normal'
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 0
      }
    },
    '& .MuiFormLabel-root': {
      display: 'none'
    },
    '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
      minHeight: 'auto'
    }
  },
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: theme.palette.neutral[10]
    }
  },
  editIcon: {
    stroke: theme.palette.neutral[100]
  },
  outlineArrow: {
    border: `1px solid ${theme.palette.neutral[20]}`,
    borderRadius: '50%',
    backgroundColor: theme.palette.neutral[5],
    [theme.breakpoints.down('md')]: {
      transform: 'rotate(90deg)'
    }
  },

  customMenuList: {
    '&.MuiPaper-root.MuiMenu-paper': {
      overflowY: 'scroll',
      paddingBottom: '8px'
    },
    '& .MuiList-root.MuiList-padding.MuiMenu-list': {
      paddingTop: 0,
      maxHeight: 200
    }
  },
  jobSelection: {
    '& .MuiSvgIcon-root': {
      display: 'none'
    },
    '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
      paddingRight: '8px',
      cursor: 'default'
    }
  },

  searchTargetJob: {
    '&.MuiListSubheader-root': {
      backgroundColor: theme.palette.neutral[700],
      padding: '8px 8px 2px 8px',
      '& .MuiInputBase-root.MuiOutlinedInput-root': {
        backgroundColor: theme.palette.neutral[5],
        margin: 0
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid ${theme.palette.neutral[10]}`
      },
      '& .MuiInputAdornment-root': {
        stroke: theme.palette.neutral[170]
      }
    }
  },
  itemList: {
    '& .MuiInputBase-root.MuiOutlinedInput-root,&.MuiMenuItem-root': {
      ...theme.typography.buttonMd,
      color: theme.palette.neutral[180]
    },
    '&.MuiMenuItem-root': {
      marginLeft: '8px',
      marginRight: '8px',
      padding: '8px'
    },
    '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected, &.MuiButtonBase-root.MuiMenuItem-root:hover':
      {
        backgroundColor: theme.palette.neutral[5],
        borderRadius: '8px'
      }
  },
  roleText: {
    '&.MuiTypography-root': {
      margin: '5px 0 8px 10px',
      ...theme.typography.title4,
      color: theme.palette.neutral[50],
      textTransform: 'uppercase'
    }
  }
}));
