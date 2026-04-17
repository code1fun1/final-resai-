import { Box, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './MyResumesStyles';
import MyResumesBox from './MyResumesBox';

const MyResumes: React.FC = () => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_RESUMES);
  const styles = useStyles();

  return (
    <Box className={styles.sideCustomStyle}>
      <Typography variant="h5" component="h5">
        {i18n('pageHeading')}
      </Typography>
      <Grid xs={12} sm={12}>
        <MyResumesBox />
      </Grid>
    </Box>
  );
};

export default withLoader(MyResumes);
