import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffff',
    padding: '40px',
    color: '#424246'
  },
  personalInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    alignItems: 'flex-start'
  },
  nameRole: {
    flexGrow: 1
  },
  contactsLink: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-end',
    textAlign: 'right'
  },
  contactsIconText: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center'
  },
  letterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px'
  },
  letterStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  textStyle: {
    marginBottom: '5px'
  },
  iconImage: {
    width: '10px',
    height: '10px'
  },
  smallDivider: {
    backgroundColor: '#3E64FF',
    width: '100%',
    height: '3px',
    margin: '10px 0'
  },

  pdfContactsText: {
    fontSize: '13px',
    fontWeight: 'bold'
  },
  pdfTextStyle: {
    fontSize: '14px'
  },
  pdfNameStyle: {
    fontSize: '16px'
  },
  pdfContentStyle: {
    fontSize: '12px',
    textAlign: 'justify',
    lineHeight: '1.8'
  },
  pdfContentHeadingStyle: {
    fontSize: '13px',
    textAlign: 'justify',
    lineHeight: '1.8'
  },
  pdfSmallTextStyle: {
    fontSize: '11px'
  },
  pdfLargeFontStyle: {
    fontSize: '22px',
    fontWeight: 'bold'
  }
});
