import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import {
  CoverLetterBodyDetails,
  CoverLetterContent
} from '../../../../../Utils/ResumeDownloadUtils';
import { useStyles } from './PreviewCoverLetterStyles';

interface PreviewCoverLetterProps {
  coverLetterContent: CoverLetterContent;
}

const PreviewCoverLetter: React.FC<PreviewCoverLetterProps> = ({
  coverLetterContent: {
    user_details: { email, linkedin, name, phone, state, country },
    salutation,
    body
  }
}) => {
  const styles = useStyles();
  return (
    <Box className={styles.page}>
      <Box className={styles.personalInfo}>
        <Box className={styles.contactsLink}>
          {email && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {email}
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
          {phone && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {phone}
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
          {country && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {state} , {country}
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
          {linkedin && (
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
          )}
        </Box>
        <Box className={styles.letterWrapper}>
          <Box className={styles.letterStyle}>
            <Typography className={styles.screenLargeFontStyle}>Cover Letter</Typography>
            <Divider className={styles.smallDivider} />
          </Box>
          <Typography className={styles.screenContactsText} fontWeight={600}>
            {salutation},
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} textAlign="justify">
            {body.map(({ text }: CoverLetterBodyDetails, index: number) => {
              return (
                <Typography
                  key={`${text}-${index}`}
                  className={styles.screenContactsText}
                  sx={{ lineHeight: '22px' }}
                >
                  {text}
                </Typography>
              );
            })}
          </Box>
          <Box className={styles.letterStyle}>
            <Typography className={styles.screenContactsText}>Regards,</Typography>
            <Typography fontWeight={600} className={styles.screenContactsText}>
              {name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewCoverLetter;
