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
    },
    border: '1px solid'
  },
  fullWidthClass: {
    gridColumn: 'span 2', // This will make the fullWidthClass span across the entire grid (100%)
    gridTemplateColumns: '100%',
    textAlign: 'center',
    // border: '1px solid #000000',
    padding: '20px'
  },
  leftSidebarDetail: {
    // backgroundColor: '#9d9d9d45',
    padding: '20px',
    textAlign: 'right',
    // '& .divider': {
    //   margin: '35px auto'
    // },
    borderRight: '1px solid'
  },
  rightSidebarDetail: {
    padding: '30px'
    // border: '1px solid #000000',
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
    gap: '10px'
    // margin: '30px 0'
  },
  displayColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  addBorderBottom: {
    borderBottom: '1px solid',
    // border: '1px solid',
    marginBottom: '10px',
    marginTop: '10px',
    padding: '0 !important',
    // marginLeft: '-30px',
    // marginRight: '-30px',
    padding: '0' // Resetting padding if any applied
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
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    justifyContent: 'center',
    gap: '1rem'
  },
  circleIcon: {
    width: '40px' /* Adjust the size as needed */,
    height: '35px',
    borderRadius: '50%' /* Create a circular shape */,
    backgroundColor: theme.palette.neutral[50] /* Set the background color to black */,
    display: 'flex' /* Use flexbox for centering */,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white' /* Set the icon color to white */
  }
}));
