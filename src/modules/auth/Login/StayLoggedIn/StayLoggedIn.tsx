import { Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { LOCALE_PAGE, STORAGE_HEADERS } from '~/shared/constants/constants';
import {
  STORAGE_TYPES,
  getStorageItem,
  removeStorageItem,
  setStorageItem
} from '~/shared/utils/storage';
import { useStyles } from '../LoginStyles';

const StayLogin = () => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setIsChecked(checked);

    if (checked) {
      setStorageItem('stayLoggedIn', 'true', STORAGE_TYPES.LOCAL);
    } else {
      removeStorageItem('stayLoggedIn', STORAGE_TYPES.LOCAL);
    }
  };

  useEffect(() => {
    const stayLoggedIn: string | null = getStorageItem({
      key: STORAGE_HEADERS.stayLoggedIn,
      storageType: STORAGE_TYPES.LOCAL
    });
    setIsChecked(stayLoggedIn === 'true');
  }, []);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={i18n('stayLogged')}
      className={styles.checkboxLabel}
    />
  );
};

export default StayLogin;
