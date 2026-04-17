import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    '&.MuiPaper-elevation': {
      background: theme.palette.cool.light,
      boxShadow: 'none',
      border: `1px solid ${theme.palette.cool.light}`,
      '&:hover': {
        borderColor: '#424246',
        background: 'transparent',
        '& .MuiTypography-root.MuiTypography-body2': {
          color: '#424246'
        },
        '& .MuiTypography-root.MuiTypography-body1': {
          color: '#424246'
        }
      }
    },
    padding: theme.spacing(3)
  },
  cardTitle: {
    '&.MuiTypography-root.MuiTypography-body2': {
      ...theme.typography.buttonLg,
      color: '#424246',
      marginBottom: theme.spacing(2)
    }
  },
  cardContent: {
    '&.MuiTypography-root.MuiTypography-body1': {
      ...theme.typography.body2,
      color: theme.palette.neutral[80],
      textAlign: 'justify'
    }
  },
  cardAction: {
    '&.MuiCardActions-root': {
      justifyContent: 'end',
      padding: theme.spacing(1, 0, 0, 0)
    }
  },
  addBtn: {
    '&.MuiButton-text': {
      padding: theme.spacing(0),
      color: '#424246'
    },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled // Use theme's disabled color or a custom disabled color
    }
  },
  readMore: {
    '&.MuiTypography-root.MuiTypography-body1': {
      cursor: 'pointer',
      color: '#424246'
    }
  }
}));
