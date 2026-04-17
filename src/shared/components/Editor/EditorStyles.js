import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  editorWrap: {
    width: '100%',
    overflow: 'hidden',
    scrollBehavior: 'auto',
    '& .rdw-editor-main': {
      overflow: 'hidden'
    },
    '& span': {
      lineHeight: '25px'
    },
    '& .public-DraftEditorPlaceholder-root': {
      userSelect: 'none',
      pointerEvents: 'none'
    },
    // Focus styling for the editor - matches focusedTextField behavior
    '&:focus-within': {
      '& .rdw-editor-main': {
        outline: 'none'
      }
    }
  },
  // Custom focus style for editor that matches focusedTextField
  editorFocused: {
    '&:focus-within': {
      borderColor: '#424246 !important',
      borderWidth: '2px !important'
    }
  }
}));
