import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  SelectChangeEvent
} from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface LanguageInfoProps {
  data: {
    language: string;
    level: string;
  }[];
  onChange: (
    value: {
      language: string;
      level: string;
    }[]
  ) => void;
}
const LanguageInformation: React.FC<LanguageInfoProps> = ({ data, onChange }) => {
  const styles = useStylesResumeCustomize();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const [languageSteps, setEduSteps] = useState([
    {
      language: '',
      level: ''
    }
  ]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setEduSteps(
        data.map((ach) => ({
          language: ach.language || '',
          level: ach.level || ''
        }))
      );
    }
  }, []);
  const [languageActiveStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setEduSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step, index) =>
        index === languageActiveStep ? { ...step, [name]: value } : step
      );
      onChange(updatedSteps);
      return updatedSteps;
    });
  };
  return (
    <>
      <Box className={styles.mainWrapper}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('languageInfo.languagelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('languageInfo.languagePlaceholder')}
                  className={styles.textfieldStyle}
                  value={languageSteps[languageActiveStep].language}
                  onChange={handleFieldChange}
                  name="language"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('languageInfo.levellabel')}
                <Select
                  variant="outlined"
                  value={languageSteps[languageActiveStep].level}
                  onChange={handleFieldChange}
                  name="level"
                  displayEmpty
                  className={styles.textfieldStyle}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </Box>
            </FormControl>
          </Box>
          {/* Same section multiple switch start */}
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            alignSelf="stretch"
            sx={{ mt: '15px' }}
          >
            <Box display="flex" justifyContent="center" gap={2}>
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  borderRadius={1}
                  border="1px solid"
                  borderColor="grey.400"
                  p={0.5}
                >
                  <IconButton disabled={languageActiveStep === 0} onClick={handleBack}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box width="100%">
                <Box
                  display="flex"
                  justifyContent="center"
                  borderRadius={1}
                  border="1px solid"
                  borderColor="grey.400"
                  p={0.5}
                  style={{ transform: 'rotate(360deg)' }}
                >
                  <IconButton
                    onClick={handleNext}
                    disabled={languageActiveStep === languageSteps.length - 1}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Same section multiple switch end */}
        </form>
        {/* <Box className={styles.divider}></Box> */}
      </Box>
    </>
  );
};
export default LanguageInformation;
