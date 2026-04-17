import { Link, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './TermsAndPrivacyLinksStyles';

interface TermsAndPrivacyLinksProps {
  heading?: string;
  termsTitle: string;
  privacyTitle: string;
  termsLink: string;
  privacyLink: string;
}

const TermsAndPrivacyLinks = (props: TermsAndPrivacyLinksProps) => {
  const { heading, termsTitle, privacyTitle, termsLink, privacyLink } = props;
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  return (
    <>
      {heading && (
        <Typography component="p" className={`${styles.policyLink} ${styles.linkWrap}`}>
          {heading}
        </Typography>
      )}
      <Typography component="p" className={`${styles.policyLink} ${styles.linkWrap}`}>
        <strong>
          <Link href={termsLink} target="_blank" rel="noopener noreferrer">
            {termsTitle}
          </Link>
        </strong>
        {heading && ` ${i18n('and')} `}
        <strong>
          <Link href={privacyLink} target="_blank" rel="noopener noreferrer">
            {privacyTitle}
          </Link>
          {heading && '.'}
        </strong>
      </Typography>
    </>
  );
};

export default TermsAndPrivacyLinks;
