import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  resumeUploadWrapper: {
    minHeight: 'calc(100vh - 69px)',
    alignItems: 'center',
    paddingBottom: '74px',
    paddingTop: '24px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '79px'
    }
  },
  titleWrap: {
    '& .MuiTypography-root': {
      '&.MuiTypography-body2': {
        color: theme.palette.neutral[60]
      },
      '&.MuiTypography-h2': {
        color: theme.palette.cool.dark,
        [theme.breakpoints.down('md')]: {
          ...theme.typography.h4
        }
      }
    }
  },
  createResumeImage: {
    width: '100%',
    height: 'auto'
  },
  mobGetStartedButton: {
    position: 'fixed',
    left: 0,
    bottom: '43px',
    width: '100%',
    '& .MuiButton-contained': {
      width: '100%'
    }
  },

  TextBoxStyle: {
    '& .public-DraftEditorPlaceholder-inner': {
      marginTop: '10px'
    }
  }
}));
