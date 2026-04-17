import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sidebarSuggestion: {
    background: theme.palette.neutral[700],
    padding: theme.spacing(3)
  },
  detailsWrapper: {
    minHeight: 'calc(100vh - 80px)',
    paddingBottom: 'calc(194px - 80px)',
    '& .editorClassName': {
      height: 'max-content',
      paddingBottom: '50px',
      [theme.breakpoints.down('md')]: {
        height: '103px'
      },
      '& .public-DraftStyleDefault-block': {
        margin: 0
      },
      '& .public-DraftEditor-content': {
        overflowY: 'scroll'
      },
      '& .DraftEditor-editorContainer': {
        zIndex: 0
      }
    }
  }
}));
