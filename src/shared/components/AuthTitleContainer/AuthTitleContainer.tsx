import React, { FC } from 'react';
import { useStyles } from './AuthTitleContainerStyles';
import { Box, Typography } from '@mui/material';

interface AuthTitleContainerProps {
  title: string;
  subTitle?: string;
  editFieldValue?: string;
  onClick?: () => void;
}

const AuthTitleContainer: FC<AuthTitleContainerProps> = ({ title, subTitle }) => {
  const styles = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={{ xs: 2, sm: 5 }}
      textAlign={{ xs: 'center', md: 'left' }}
    >
      <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 0 }}>
        <Box component="h3" className={styles.headingTitle}>
          {title}
        </Box>
        {subTitle && <Typography className={styles.subTitle}>{subTitle}</Typography>}
      </Box>
    </Box>
  );
};
export default AuthTitleContainer;
