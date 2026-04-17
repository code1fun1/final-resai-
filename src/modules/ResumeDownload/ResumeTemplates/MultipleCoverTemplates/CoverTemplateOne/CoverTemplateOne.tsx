import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import {
  CoverLetterBodyDetails,
  CoverLetterContent,
  ReactiveResumeContent
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
import { useStyles } from './CoverTemplateOneStyles';
import {
  formatPhoneNumber,
  isValidValue
} from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/TemplateHelper';
import { useEffect, useState } from 'react';
interface PreviewCoverLetterProps {
  coverLetterContent: CoverLetterContent;
  reactiveResumeContent: ReactiveResumeContent;
}

const CoverTemplateOne: React.FC<PreviewCoverLetterProps> = ({
  coverLetterContent: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user_details: { email, linkedin, name, phone, state, country },
    salutation,
    body
  },
  reactiveResumeContent: {
    basics: {
      // headline: rrHeadline,
      // location: rrLocation,
      email: rrEmail,
      name: rrName,
      phone: rrPhone
    }
  }
}) => {
  // Note:In rr content all details are properly updated after and before update so name,email and phone directly show via rr content
  // So chnage name,email and phone to rrName,rrEmail and rrPhone respectively.
  const styles = useStyles();
  const [updatedBody, setUpdatedBody] = useState(body); // Create state for the body to hold modified content
  const [containsSincerely, setContainsSincerelyOrRegards] = useState(false);
  useEffect(() => {
    if (body.length > 0) {
      // const lastIndex = body[body[body.length - 1].text === "" ? body.length - 2 : body.length - 1];
      const lastIndex = body[body.length - 1]; // Get the last item(use -2 if last index =="" else -1 )
      const lastText = lastIndex.text ?? ''; // Ensure we handle undefined text
      // Check if "name" exists in the last text and replace it with "rrName"
      if (lastText.includes(name)) {
        const updatedText = lastText.replace(name, rrName || '');
        // Convert the updatedText with \n into <br /> to render as a new line
        // const formattedText = updatedText.split("\n").map((line, index) => (
        //   <span key={index}>{line}<br /></span>
        // ));
        // Create a new body array and modify the last index's text directly
        const updatedBody = [...body]; // Copy the body array
        // updatedBody[body[body.length - 1].text === "" ? body.length - 2 : body.length - 1] = {
        updatedBody[updatedBody.length - 1] = {
          // Get the last item(use -2 if last index =="" else -1 )
          ...lastIndex,
          text: updatedText // Replace the text in the last index
        };
        // Update the body with the modified array
        setUpdatedBody(updatedBody);
      } else {
        // If no "name" found, return the original body array
        setUpdatedBody(body);
      }
      // Check if the updated text contains "Sincerely"
      const textToCheck = lastText.replace(name, rrName || ''); // After replacement check for "Sincerely"
      setContainsSincerelyOrRegards(
        textToCheck.toLowerCase().includes('sincerely'.toLowerCase()) ||
          textToCheck.toLowerCase().includes('regards'.toLowerCase())
      );
    }
  }, [body, name, rrName]); // Dependencies to ensure re-run on body, name, or rrName changes
  return (
    <Box className={styles.page}>
      <Box className={styles.personalInfo}>
        <Box className={styles.contactsLink}>
          {rrEmail && isValidValue(rrEmail) && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {rrEmail}
              </Typography>
              <Image
                src="/image/mail-Icon.png"
                alt="icon"
                className={styles.iconImage}
                width={100}
                height={100}
              />
            </Box>
          )}
          {rrPhone && isValidValue(rrPhone) && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {formatPhoneNumber(rrPhone)}
              </Typography>
              <Image
                src="/image/mobile-Icon.png"
                alt="icon"
                className={styles.iconImage}
                width={100}
                height={100}
              />
            </Box>
          )}
          {((country && isValidValue(country)) || (state && isValidValue(state))) && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {state && country ? `${state}, ${country}` : state || country}
              </Typography>
              <Image
                src="/image/location-Icon.png"
                alt="icon"
                className={styles.iconImage}
                width={100}
                height={100}
              />
            </Box>
          )}
          {/* {linkedin && isValidValue(linkedin) && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {linkedin}
              </Typography>
              <Image
                src="/image/linkedin-Icon.png"
                alt="icon"
                className={styles.iconImage}
                width={100}
                height={100}
              />
            </Box>
          )} */}
        </Box>
        <Box className={styles.letterWrapper}>
          <Box className={styles.letterStyle}>
            {/* <Typography className={styles.screenLargeFontStyle}>Cover Letter</Typography> */}
            <Divider className={styles.smallDivider} />
          </Box>
          <Typography className={styles.screenContactsText} fontWeight={600}>
            {salutation && isValidValue(salutation) && salutation},
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} textAlign="justify">
            {updatedBody.map(({ text }: CoverLetterBodyDetails, index: number) => {
              const formattedText = text.replace(/\n/g, '<br />'); // Replace all \n with <br />
              return (
                <Typography
                  key={`${text}-${index}`}
                  className={styles.screenContactsText}
                  sx={{ lineHeight: '22px' }}
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                >
                  {/* {text} */}
                </Typography>
              );
            })}
          </Box>
          {!containsSincerely && (
            <Box className={styles.letterStyle}>
              <Typography className={styles.screenContactsText}>Regards,</Typography>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {rrName && isValidValue(rrName) && rrName}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CoverTemplateOne;
