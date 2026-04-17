import React, { useState } from 'react';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
interface ContactInfoProps {
  data: {
    phone: string;
    email: string;
    // linkedin: string;
    // address: string;
  };
  onChange: (value: {
    phone: string;
    email: string;
    // linkedin: string;
    //  address: string
  }) => void;
}
const CoverContactInformation: React.FC<ContactInfoProps> = ({ data, onChange }) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const styles = useStylesResumeCustomize();
  const [formData, setFormData] = useState({
    phone: data.phone,
    email: data.email
    // linkedin: data.linkedin
    // address: data.address
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    const regex = /^\d{0,4}$/; // Allow up to 4 digits

    if (!regex.test(inputValue)) {
      // Remove non-numeric characters
      const newValue = inputValue.replace(/\D/g, '');
      (event.target as HTMLInputElement).value = newValue;
    }
  };
  return (
    <>
      <Box className={styles.mainWrapper}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('contactInfo.phonelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('contactInfo.phonePlaceholder')}
                  className={styles.textfieldStyle}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyUp={handleKeyUp}
                  inputProps={{ maxLength: 10 }}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('contactInfo.emaillabel')}
                <TextField
                  variant="outlined"
                  type={'email'}
                  placeholder={i18n('contactInfo.emailPlaceholder')}
                  className={styles.textfieldStyle}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('contactInfo.linkedinlabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('contactInfo.linkedinPlaceholder')}
                  className={styles.textfieldStyle}
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </Box>
            </FormControl> */}
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('contactInfo.addrersslabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('contactInfo.addrerssPlaceholder')}
                  className={styles.textfieldStyle}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Box>
            </FormControl> */}
          </Box>
        </form>
      </Box>
    </>
  );
};
export default CoverContactInformation;
