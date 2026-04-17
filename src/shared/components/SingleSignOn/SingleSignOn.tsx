import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Icon from '~/shared/components/Icon';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './SingleSignOnStyles';

interface SingleSignOnProps {
  onSingleSignOn: (value: { e: React.SyntheticEvent<Element, Event>; title: string }) => void;
}

const LOGIN = {
  GOOGLE: 'google',
  LINKEDIN: 'linkedin'
};

const SingleSignOn: React.FC<SingleSignOnProps> = ({ onSingleSignOn }) => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);

  return (
    <Box>
      <Box
        component={ButtonGroup}
        variant="outlined"
        justifyContent={{ xs: 'center', md: 'left' }}
        width="100%"
      >
        <Button
          component="label"
          sx={{ color: '#000' }}
          variant="outlined"
          startIcon={<Icon name="googleIcon" />}
          className={styles.outlineButtonGroup}
          onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
            onSingleSignOn({ e, title: LOGIN.GOOGLE })
          }
        >
          {i18n('signInWithGoogle')}
        </Button>
        <Button
          onClick={(e: React.MouseEvent<HTMLLabelElement>) =>
            onSingleSignOn({ e, title: LOGIN.LINKEDIN })
          }
          component="label"
          variant="outlined"
          startIcon={<Icon name="linkedinIcon" />}
          className={styles.outlineButtonGroup}
        >
          {i18n('signInWithLinkedin')}
        </Button>
      </Box>
    </Box>
  );
};
export default SingleSignOn;
