import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  labelText: {
    '&.MuiTypography-root': {
      ...theme.typography.captionRg,
      color: theme.palette.neutral[80],
      textTransform: 'capitalize'
    }
  },
  textfieldStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.neutral[20]
    },
    '& .MuiInputBase-input::placeholder': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[40],
      textTransform: 'capitalize'
    }
  },
  listGrup: {
    '&.MuiList-root': {
      padding: 0
    },
    '& .MuiListItem-root': {
      padding: theme.spacing(0)
    },
    '& .MuiListItemIcon-root ': {
      minWidth: '34px'
    },
    '& .MuiListItemText-root': {
      '& .MuiTypography-root': {
        ...theme.typography.body2,
        color: theme.palette.neutral[90]
      }
    }
  },
  selectIcon: {
    color: theme.palette.tertiary.main
  },
  selectList: {
    '&.MuiListItemText-root': {
      '& .MuiTypography-root': {
        color: theme.palette.neutral[90],
        fontWeight: theme.typography.body3.fontWeight
      }
    }
  }
}));
