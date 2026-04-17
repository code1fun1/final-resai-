import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  circluarProgressBar: {
    '& .CircularProgressbar-text': {
      fill: theme.palette.neutral[190]
    }
  },
  titleText: {
    ...theme.typography.title3,
    color: theme.palette.neutral[70],
    display: 'flex',
    alignItems: 'center',
    gap: '3px'
  },
  progressBarWrapper: {
    '&>div>div>div': {
      transform: 'translateY(17%)'
    }
  }
}));
