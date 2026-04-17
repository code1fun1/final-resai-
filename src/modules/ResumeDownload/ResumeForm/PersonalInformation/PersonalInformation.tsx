import React, { useState } from 'react';
import { Box, FormControl, TextField, Typography } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
interface PersonalInfoProps {
  data: {
    firstName: string;
    lastName: string;
    // professionalTitle: string;
  };
  onChange: (value: {
    firstName: string;
    lastName: string;
    // professionalTitle: string
  }) => void;
}
const PersonalInformation: React.FC<PersonalInfoProps> = ({ data, onChange }) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const styles = useStylesResumeCustomize();

  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName
    // professionalTitle: data.professionalTitle
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };
  return (
    <>
      <Box className={styles.mainWrapper}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('personalInfo.firstNamelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('personalInfo.firstNamePlaceholder')}
                  className={styles.textfieldStyle}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('personalInfo.lastNamelabel')}
                <TextField
                  variant="outlined"
                  placeholder={i18n('personalInfo.lastNamePlaceholder')}
                  className={styles.textfieldStyle}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('personalInfo.professionalTitlelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('personalInfo.professionalTitlePlaceholder')}
                  className={styles.textfieldStyle}
                  name="professionalTitle"
                  value={formData.professionalTitle}
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
export default PersonalInformation;
