import { Box } from '@mui/material';
import React from 'react';
import { useStylesEdit } from './EditIconStyles';
import Image from 'next/image';
// import Link from 'next/link';
import Fab from '@mui/material/Fab';
import { getStorageItem } from '~/shared/utils/storage';
// import getConfig from 'next/config';
import { useRouter } from 'next/router';
// import { envConfig } from '../../../config'; // Import the configuration
const EditIcon: React.FC = React.memo(() => {
  const router = useRouter();
  const styles = useStylesEdit();
  const lastResumeId = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
  const userId = getStorageItem({ key: 'user-id', useCombineStorage: true });
  // Build the URL to be redirected
  // const urlRedirect = `${NEXTBASEURL}rr/${userId}/${lastResumeId}`;
  const urlRedirect = `/rr/${userId}/${lastResumeId}`;
  const handleRedirect = () => {
    // Apply the modifyUrl function
    // window.location.href = modifiedUrl;
    router.push(urlRedirect, urlRedirect, { locale: false });
  };

  return (
    <Box>
      {/* <Link href={modifiedUrl}> */}
      <Fab color="primary" aria-label="edit" className={styles.fabIcon} onClick={handleRedirect}>
        <div className={styles.iconContainer}>
          <Image
            src="/image/editIcon.svg"
            alt="Edit Icon Missing"
            width={5}
            height={10}
            className={styles.image}
          />
        </div>
      </Fab>
      {/* </Link> */}
    </Box>
  );
});

export default EditIcon;
