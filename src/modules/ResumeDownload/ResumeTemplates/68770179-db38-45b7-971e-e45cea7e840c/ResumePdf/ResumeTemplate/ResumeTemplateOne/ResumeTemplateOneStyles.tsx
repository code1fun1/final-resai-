import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: '#696969'
  },
  pdfSpace: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  column: {
    flex: 1
  },
  sidebarDetail: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#9d9d9d45',
    padding: '30px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '35%'
  },
  sidebarHeading: {
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  sidebarSubHeading: {
    letterSpacing: '1px',
    margin: 0
  },
  sidebarDivider: {
    backgroundColor: '#696969',
    width: '100px',
    height: '3px',
    margin: '25px auto'
  },
  divider: {
    backgroundColor: '#696969',
    width: '100px',
    height: '3px',
    margin: '25px 0'
  },
  personalDetail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  personalHeading: {
    lineHeight: 1
  },
  educationDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    margin: '30px 0 0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailHeading: {
    fontWeight: 600,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  detailSubHeading: {
    fontWeight: 600
  },
  detailText: {
    fontWeight: 500,
    lineHeight: 1.2
  },
  detailTextAlign: {
    fontWeight: 500,
    lineHeight: 1.2,
    textAlign: 'justify'
  },
  contentDetail: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px',
    backgroundColor: '#fff'
  },
  companyDetailText: {
    fontStyle: 'italic'
  },
  profileWork: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  aboutWorktext: {
    margin: '3px 0 0'
  },
  profileWorkDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  expertiseDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'center',
    textAlign: 'center'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '5px',
    marginTop: '3px'
  },
  bullet: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#696969',
    marginTop: '3px'
  },
  listItemText: {
    fontWeight: 500
  },
  contentWorkDetail: {
    margin: '0 0 3px'
  },
  pdfNameStyle: {
    fontSize: '25px',
    lineHeight: 1
  },
  pdfRoleTextStyle: {
    fontSize: '15px',
    fontWeight: 600,
    textTransform: 'capitalize'
  },
  pdfContactStyle: {
    fontSize: '12px',
    fontWeight: 600
  },
  pdfContactStyleProfessional: {
    fontSize: '10px',
    fontWeight: 400
  },

  pdfDetailHeading: {
    fontSize: '15px'
  },
  pdfListItemText: {
    fontSize: '10px',
    lineHeight: '1.3px'
  },
  pdfPersonalDetail: {
    gap: '5px'
  },
  lastNameStyle: {
    marginBottom: '12px'
  },
  additionalUrl: {
    display: 'flex',
    flex: 1,
    marginBottom: '10px'
  }
});
