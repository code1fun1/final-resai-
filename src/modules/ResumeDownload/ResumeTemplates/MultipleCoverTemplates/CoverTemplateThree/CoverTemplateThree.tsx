import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import {
  CoverLetterBodyDetails,
  CoverLetterContent
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
import { useStyles } from './CoverTemplateThreeStyles';
import {
  formatPhoneNumber,
  isValidValue
} from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/TemplateHelper';
interface PreviewCoverLetterProps {
  coverLetterContent: CoverLetterContent;
}

const CoverTemplateThree: React.FC<PreviewCoverLetterProps> = ({
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
          {email && isValidValue(email) && (
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
          {phone && isValidValue(phone) && (
            <Box className={styles.contactsIconText}>
              <Typography fontWeight={600} className={styles.screenContactsText}>
                {formatPhoneNumber(phone)}
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
          {linkedin && isValidValue(linkedin) && (
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
            {salutation && isValidValue(salutation) && salutation},
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
              {name && isValidValue(name) && name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CoverTemplateThree;
