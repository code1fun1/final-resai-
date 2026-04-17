import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  content: {
    '&.MuiTypography-root': {
      ...theme.typography.title2,
      color: theme.palette.tertiary.dark,
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  },
  suggestTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.captionRg,
      color: theme.palette.neutral[70]
    }
  },
  skillsChipWrapper: {
    maxHeight: '314px',
    overflow: 'auto'
  },
  totalStrengthStyle: {
    // backgroundColor: theme.palette.cool.main,
    backgroundColor: '#DABF67',
    borderRadius: '50%',
    // color: theme.palette.neutral[700],
    color: '#424246',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.typography.buttonRg
  }
}));
