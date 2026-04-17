import React, { useEffect, useState } from 'react';
import { Box, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface AchievementInfoProps {
  data: {
    achievement_date: string;
    location: string; //new add
    summary: string;
  }[];
  onChange: (
    value: {
      achievement_date: string;
      location: string; //new add
      summary: string;
    }[]
  ) => void;
}
const AcheivementsInformation: React.FC<AchievementInfoProps> = ({ data, onChange }) => {
  const styles = useStylesResumeCustomize();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  // const embedMonthAndDateIntoYear = (year: string): string => {
  //   const month = '01'; // Months are 0-based, so add 1
  //   const day = '01';
  //   return `${year}-${month}-${day}`;
  // };
  const [achSteps, setEduSteps] = useState([
    {
      achievement_date: '',
      location: '',
      summary: ''
    }
  ]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setEduSteps(
        data.map((ach) => ({
          achievement_date: ach.achievement_date || '',
          location: ach.location || '',
          summary: ach.summary || ''
        }))
      );
    }
  }, []);
  const [achActiveStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEduSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step, index) =>
        index === achActiveStep ? { ...step, [name]: value } : step
      );
      onChange(updatedSteps);
      return updatedSteps;
    });
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
                  {i18n('acheivementsInfo.datelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('acheivementsInfo.datePlaceholder')}
                  className={styles.textfieldStyle}
                  value={achSteps[achActiveStep].achievement_date}
                  onChange={handleFieldChange}
                  name="achievement_date"
                  onKeyUp={handleKeyUp}
                  inputProps={{ maxLength: 4 }}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('acheivementsInfo.locationlabel')}
                <TextField
                  variant="outlined"
                  placeholder={i18n('acheivementsInfo.locationPlaceholder')}
                  className={styles.textfieldStyle}
                  value={achSteps[achActiveStep].location}
                  onChange={handleFieldChange}
                  name="location"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('acheivementsInfo.summarylabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  rows={5}
                  multiline
                  placeholder={i18n('acheivementsInfo.summaryPlaceholder')}
                  className={styles.textfieldStyle}
                  value={achSteps[achActiveStep].summary}
                  onChange={handleFieldChange}
                  name="summary"
                />
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
                  <IconButton disabled={achActiveStep === 0} onClick={handleBack}>
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
                  <IconButton onClick={handleNext} disabled={achActiveStep === achSteps.length - 1}>
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
export default AcheivementsInformation;
