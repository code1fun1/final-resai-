import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  mainWrapper: {
    backgroundColor: theme.palette.neutral[700],
    // color: theme.palette.neutral[50],
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    borderRadius: '5px',
    // display: 'grid',
    // gridTemplateColumns: '33.334% 66.667%',
    '& h4,h5': {
      textTransform: 'capitalize'
    },
    '& h5': {
      fontSize: theme.typography.title2.fontSize
    },
    '& h6': {
      fontSize: theme.typography.body1.fontSize
    }
  },
  sidebarDetail: {
    backgroundColor: '#9d9d9d45',
    padding: '30px',
    textAlign: 'center',
    '& .divider': {
      margin: '35px auto'
    }
  },
  divider: {
    // background: theme.palette.neutral[170],
    backgroundColor: 'grey',
    height: '1px',
    margin: '14px 0' //change Gap here 35 to 15
  },
  personalDetail: {
    gap: '2px',
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
    flexDirection: 'column',
    marginTop: '1px' //change Gap here 20 to 10
  },
  contentDetail: {
    padding: '30px',
    textAlign: 'center'
  },
  workDetail: {
    '& ul': {
      margin: '0px'
      // textTransform: 'capitalize'
      // padding: '6px 18px'
    }
    // textTransform: 'capitalize'
  },
  //if you have a font size of 12 pt in Word:
  //text{font-size (in px)} = 12 \text{ pt} \times 1.333 \approx 16 \text{ px}font-size (in px)=12 pt×1.333≈16 px
  nameSection: {
    //
    fontFamily: 'Verdana',
    fontSize: '46px',
    fontWeight: 'bold',
    paddingBottom: '5px'
  },
  designationSection: {
    fontFamily: 'Verdana',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  emailSection: {
    fontFamily: 'Verdana',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  sectionHeading: {
    fontFamily: 'Verdana',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  childContentProfessionalandSkill: {
    // fontFamily: 'Times New Roman',
    fontFamily: 'Verdana',
    fontSize: '17px'
  },

  experinceSectionTitle: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '3px'
  },
  experinceSectionCompany: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    // fontStyle: 'italic',
    marginBottom: '3px'
  },
  experinceSectionDesc: {
    fontFamily: 'Verdana',
    fontSize: '14px'
    // fontStyle: 'italic'
  },
  experinceSectionBullets: {
    fontFamily: 'Verdana !important',
    fontSize: '14px !important',
    display: 'list-item',
    textAlign: 'justify',
    listStyleType: 'none', // Remove default bullet
    paddingLeft: '24px', // Add space for custom bullet
    position: 'relative', // Ensure the pseudo-element is positioned relative to the list item
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12px', // Width of the polygon
      height: '12px', // Height of the polygon
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Polygon shape
      backgroundColor: 'black' // Color of the polygon
    },
    '& .css-yui5zl-MuiTypography-root': {
      fontFamily: 'Verdana',
      fontSize: '14px'
    }
  },
  projectSectionTitle: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  projectSectionDetails: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    // fontStyle: 'italic',
    marginBottom: '10px'
  },
  projectSectionBullets: {
    fontFamily: 'Verdana !important',
    fontSize: '16px !important',
    display: 'list-item',
    textAlign: 'justify',
    listStyleType: 'none', // Remove default bullet
    paddingLeft: '24px', // Add space for custom bullet
    position: 'relative', // Ensure the pseudo-element is positioned relative to the list item
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12px', // Width of the polygon
      height: '12px', // Height of the polygon
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Polygon shape
      backgroundColor: 'black' // Color of the polygon
    },
    '& .css-yui5zl-MuiTypography-root': {
      fontFamily: 'Verdana',
      fontSize: '16px'
    }
  },
  workshopSectionTitle: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  workshopSectionUniversityCompany: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '10px'
  },
  workshopSectionDate: {
    fontFamily: 'Verdana',
    fontSize: '16px',
    marginBottom: '10px'
  },
  educationSectionDegree: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '3px'
    // textTransform: 'capitalize'
  },
  educationSectionPassing: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '3px'
    // fontWeight: 'bold',
    // textTransform: 'capitalize'
  },
  listItemDefaultModified: {
    '&.css-10h1h6r-MuiListItem-root': {
      paddingTop: '0px',
      paddingBottom: '0px'
    }
  },
  achievementSectionSummary: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '3px',
    fontWeight: 'bold'
  },
  achievementSectionDate: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '3px'
  },
  achievementSectionLocation: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '3px'
    // fontStyle: 'italic'
  },
  languageSectionTitle: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '3px'
    // fontWeight: 'bold'
  },
  languageSectionLevel: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    marginBottom: '3px'
    // textTransform: 'capitalize'
  },
  socialLinkSection: {
    fontFamily: 'Verdana',
    fontSize: '14px'
    // fontWeight: 'bold'
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    justifyContent: 'center',
    gap: '1rem'
  },
  profileIcon: {
    width: '40px' /* Adjust the size as needed */,
    height: '35px',
    display: 'flex' /* Use flexbox for centering */,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white' /* Set the icon color to white */
  },
  headlineSection: {
    fontFamily: 'Verdana',
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '4px',
    textTransform: 'capitalize'
  },
  locationSection: {
    fontFamily: 'Verdana',
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '4px'
  },
  ProfTechSkillTitle: {
    fontFamily: 'Verdana',
    fontSize: '14px',
    fontWeight: 'bold'
    // whiteSpace: 'nowrap'
    // marginBottom: '5px'
  },
  techandProfesSkill: {
    fontFamily: 'Verdana',
    fontSize: '14px'
    // textTransform: 'capitalize'
  },
  professionalSkillsRow: {
    display: 'flex',
    alignItems: 'flex-start' /* Vertically centers the content */,
    gap: '8px' /* Space between the title and the skill list */,
    flexWrap: 'wrap'
  }
}));
