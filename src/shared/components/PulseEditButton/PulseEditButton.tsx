import React from 'react';
import { Box, Fab, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getStorageItem } from '~/shared/utils/storage';
import { usePulseEditButtonStyles } from './PulseEditButtonStyles';

const PulseEditButton: React.FC = React.memo(() => {
  const styles = usePulseEditButtonStyles();
  const router = useRouter();

  const lastResumeId = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
  const userId = getStorageItem({ key: 'user-id', useCombineStorage: true });

  const urlRedirect = `/rr/${userId}/${lastResumeId}`;

  const handleRedirect = () => {
    router.push(urlRedirect, urlRedirect, { locale: false });
  };

  return (
    <Box className={styles.wrapper}>
      <Fab onClick={handleRedirect} className={styles.fab} aria-label="edit-resume">
        <Box className={styles.content}>
          <Image src="/image/editIcon.svg" alt="Edit" width={14} height={14} />
          <Typography className={styles.text}>Edit Resume</Typography>
        </Box>
      </Fab>
    </Box>
  );
});

export default PulseEditButton;
