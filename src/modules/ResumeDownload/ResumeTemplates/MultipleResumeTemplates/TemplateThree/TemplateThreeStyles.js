import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  mainWrapper: {
    padding: '5px',
    backgroundColor: theme.palette.neutral[700],
    color: theme.palette.neutral[50],
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '33.334% 66.667%',
    '& h4,h5': {
      textTransform: 'uppercase'
    },
    '& h5': {
      fontSize: theme.typography.title2.fontSize
    },
    '& h6': {
      fontSize: theme.typography.body1.fontSize
    }
  },
  leftSidebarDetail: {
    backgroundColor: '#9d9d9d45',
    padding: '30px',
    textAlign: 'center',
    '& .divider': {
      margin: '35px auto'
    }
    // border: '1px solid #9d9d9d45',
  },
  divider: {
    background: theme.palette.neutral[170],
    width: '100px',
    height: '3px',
    margin: '35px 0'
  },
  personalDetail: {
    gap: '3px',
    '& p': {
      lineHeight: '1',
      wordBreak: 'break-all'
    }
  },
  educationDetail: {
    gap: '12px',
    margin: '30px 0'
  },
  displayColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  addBorderBottom: {
    borderBottom: '1px solid #9d9d9d45',
    // border: '1px solid #9d9d9d45',
    marginBottom: '20px',
    marginTop: '20px',
    padding: '0 !important',
    marginLeft: '-30px',
    marginRight: '-30px',
    padding: '0' // Resetting padding if any applied
  },
  rightSidebarDetail: {
    padding: '30px',
    border: '1px solid #9d9d9d45'
  },
  workDetail: {
    '& ul': {
      margin: '0px',
      padding: '6px 18px'
    },
    textTransform: 'capitalize'
  },
  experinceSectionBullets: {
    display: 'list-item',
    textAlign: 'justify',
    listStyleType: 'disc' // Remove default bullet
    // fontFamily: 'Verdana !important',
    // fontSize: '16px !important',
    // paddingLeft: '24px', // Add space for custom bullet
    // position: 'relative', // Ensure the pseudo-element is positioned relative to the list item
    // '&::before': {
    //   content: '""',
    //   position: 'absolute',
    //   left: 0,
    //   top: '50%',
    //   transform: 'translateY(-50%)',
    //   width: '12px', // Width of the polygon
    //   height: '12px', // Height of the polygon
    //   clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Polygon shape
    //   backgroundColor: 'black' // Color of the polygon
    // }
  },
  listItemDefaultModified: {
    '&.css-10h1h6r-MuiListItem-root': {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  },
  textCapitalise: {
    textTransform: 'capitalize'
  }
}));
