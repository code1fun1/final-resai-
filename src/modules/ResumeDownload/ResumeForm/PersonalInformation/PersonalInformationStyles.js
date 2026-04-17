import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: '1fr', // Default for xs screens
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr', // For md and up screens
      height: 'fit-content',
      marginTop: '20px'
    },
    marginRight: '10.5px',
    gap: theme.spacing(2), // Gap between grid items
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '100vh', // Set maximum height to enable scrolling within viewport height
    marginBottom: '20px', // Bottom margin
    [theme.breakpoints.up('xs')]: {
      height: 'fit-content',
      marginTop: '20px'
    }
  },
  allTemplateCssBox: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius, // Use theme for consistency
    backgroundColor: theme.palette.grey[50], // Use theme color
    padding: theme.spacing(2), // Equivalent to p={2}
    paddingBottom: '18px', // Custom value, not in theme spacing
    paddingTop: '17px' // Custom value, not in theme spacing
  },
  cardWrapper: {
    display: 'flex',
    height: 'fit-content',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      height: 'auto'
    },
    borderRadius: theme.shape.borderRadius, // Use theme for consistency
    backgroundColor: theme.palette.grey[50], // Use theme color
    padding: theme.spacing(2), // Equivalent to p={2}
    paddingBottom: '18px', // Custom value, not in theme spacing
    paddingTop: '17px',
    marginRight: '30px' // Custom value, not in theme spacing/ Equivalent to p: 2
  },
  chekedCardWrapper: {
    position: 'relative',
    height: 'fit-content',
    [theme.breakpoints.up('md')]: {
      height: 'auto'
    },
    borderRadius: theme.shape.borderRadius, // Equivalent to borderRadius: 1
    border: '2px solid #3b66fc',
    backgroundColor: '#dee2fe',
    padding: theme.spacing(2), // Equivalent to p: 2
    marginRight: '30px'
  },
  checkedIconClass: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    height: '32px',
    width: '32px'
  }
}));
