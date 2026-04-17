import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  pageNumber: {
    '&.MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.body3,
      color: theme.palette.neutral[30]
    }
  },
  iconBtn: {
    '&.MuiIconButton-root': {
      padding: 0
    }
  },
  darkIconBtn: {
    '&.MuiIconButton-root': {
      '&>svg': {
        fill: theme.palette.neutral[180]
      }
    }
  },
  disabled: {
    '&.MuiIconButton-root': {
      '&>svg': {
        fill: theme.palette.neutral[30]
      }
    }
  }
}));
