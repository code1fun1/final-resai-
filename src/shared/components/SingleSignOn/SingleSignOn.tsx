import React from 'react';
import { Box, Button } from '@mui/material';
import Icon from '~/shared/components/Icon';
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

  return (
    <Box display="flex" flexDirection="column" gap="16px" width="100%">
      <Button
        variant="outlined"
        fullWidth
        startIcon={<Icon name="googleIcon" />}
        className={styles.ssoButton}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          onSingleSignOn({ e, title: LOGIN.GOOGLE })
        }
      >
        Continue with google
      </Button>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<Icon name="linkedinIcon" />}
        className={styles.ssoButton}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          onSingleSignOn({ e, title: LOGIN.LINKEDIN })
        }
      >
        Continue with LinkedIn
      </Button>
    </Box>
  );
};

export default SingleSignOn;
