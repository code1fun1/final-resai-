import React, { useState } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
interface SummaryInfoProps {
  data: {
    professionalSummary: string;
  };
  onChange: (value: { professionalSummary: string }) => void;
}
const SummaryStatement: React.FC<SummaryInfoProps> = ({ data, onChange }) => {
  const styles = useStylesResumeCustomize();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const [formData, setFormData] = useState({
    professionalSummary: data.professionalSummary
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };
  return (
    <>
      <Box className={styles.mainWrapper} style={{ gridTemplateColumns: '1fr' }}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <TextField
                  variant="outlined"
                  multiline
                  rows={15}
                  placeholder={i18n('summaryStatement.summaryPlaceholder')}
                  className={styles.textfieldStyle}
                  name="professionalSummary"
                  value={formData.professionalSummary}
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
          </Box>
        </form>
      </Box>
    </>
  );
};
export default SummaryStatement;
