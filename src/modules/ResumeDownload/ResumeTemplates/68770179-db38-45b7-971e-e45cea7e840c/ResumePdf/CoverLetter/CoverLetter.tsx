/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { CoverLetterBodyDetails, CoverLetterContent } from '../../../../Utils/ResumeDownloadUtils';
import { styles } from './CoverLetterStyles';

interface CoverLetterProps {
  coverLetterContent: CoverLetterContent;
}

const CoverLetter: React.FC<CoverLetterProps> = ({
  coverLetterContent: {
    user_details: { email, linkedin, name, phone, state, country },
    salutation,
    body
  }
}) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.personalInfo}>
            <View style={styles.nameRole}></View>
            <View style={styles.contactsLink}>
              {email && (
                <View style={styles.contactsIconText}>
                  <Text style={{ ...styles.pdfContactsText }}>{email}</Text>
                  <Image src="/image/mail-Icon.png" style={styles.iconImage} />
                </View>
              )}
              {phone && (
                <View style={styles.contactsIconText}>
                  <Text style={{ ...styles.pdfContactsText }}>{phone}</Text>
                  <Image src="/image/mobile-Icon.png" style={styles.iconImage} />
                </View>
              )}
              {country && (
                <View style={styles.contactsIconText}>
                  <Text style={{ ...styles.pdfContactsText }}>
                    {state && `${state} ,`}
                    {country && country}
                  </Text>
                  <Image src="/image/location-Icon.png" style={styles.iconImage} />
                </View>
              )}

              {linkedin && (
                <View style={styles.contactsIconText}>
                  <Text style={{ ...styles.pdfContactsText }}>{linkedin}</Text>
                  <Image src="/image/linkedin-Icon.png" style={styles.iconImage} />
                </View>
              )}
            </View>
          </View>
          <View style={styles.letterWrapper}>
            <View style={styles.letterStyle}>
              <Text style={{ ...styles.pdfLargeFontStyle }}>Cover Letter</Text>
              <View style={styles.smallDivider}></View>
            </View>
            <Text style={{ ...styles.pdfContentHeadingStyle }}>{salutation},</Text>
            {body.map(({ text }: CoverLetterBodyDetails, index: number) => {
              return (
                <Text key={`${text}-${index}`} style={{ ...styles.pdfContentStyle }}>
                  {text}
                </Text>
              );
            })}
            <View style={styles.letterStyle}>
              <Text style={{ ...styles.pdfSmallTextStyle }}>Regards,</Text>
              <Text style={{ ...styles.pdfContactsText }}>{name}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};
export default CoverLetter;
