import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './MyProfileStyles';
import MyProfileForm from './MyProfileForm';
import CreditHistory from './CreditHistory';
const MyProfile: React.FC = () => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_PROFILE);
  const styles = useStyles();

  return (
    <Box className={styles.sideCustomStyle}>
      <Typography variant="h5" component="h5" sx={{ display: 'flex' }}>
        {i18n('pageHeading')}
      </Typography>
      <MyProfileForm />
      <CreditHistory />
    </Box>
  );
};

export default withLoader(MyProfile);
