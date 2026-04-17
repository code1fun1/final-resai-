import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
  divider: {
    '&.MuiDivider-root,&.MuiDivider-root::before, &.MuiDivider-root::after': {
      borderColor: theme.palette.neutral[10]
    },
    '& .MuiDivider-wrapper': {
      ...theme.typography.captionLg,
      color: theme.palette.neutral[50]
    }
  },
  textEditorWrapper: {
    padding: '20px 20px 10px',
    border: `1px solid ${theme.palette.neutral[10]}`,
    borderRadius: '6px',
    '& .editorClassName': {
      height: '350px',
      '& .public-DraftStyleDefault-block': {
        margin: 0
      },
      '& .public-DraftEditor-content': {
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '5px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.neutral[20],
          borderRadius: '20px',
          border: 'transparent'
        }
      },
      '& .DraftEditor-root': {
        zIndex: 0
      }
    }
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
