import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  titleStyles: {
    '&.MuiTypography-subtitle1': {
      ...theme.typography.title1,
      color: theme.palette.cool.dark,
      [theme.breakpoints.down('md')]: {
        ...theme.typography.buttonLg
      }
    }
  },
  editorStyles: {
    border: `1px solid ${theme.palette.neutral[10]}`,
    borderRadius: '6px',
    minHeight: '150px',
    [theme.breakpoints.down('md')]: {
      '& .public-DraftEditorPlaceholder-root': {
        padding: 0
      }
    },
    '& .DraftEditor-editorContainer': {
      zIndex: 0
    }
  }
}));
