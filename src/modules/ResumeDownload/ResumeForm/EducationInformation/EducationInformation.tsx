import React, { useEffect, useState } from 'react';
import { Box, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface EducationInfoProps {
  data: {
    degree_name: string;
    degree_type: string;
    institute: string;
    marks: string;
    marks_type: string;
    passing_year: string;
  }[];
  onChange: (
    value: {
      degree_name: string;
      degree_type: string;
      institute: string;
      marks: string;
      marks_type: string;
      passing_year: string;
    }[]
  ) => void;
}
const EducationInformation: React.FC<EducationInfoProps> = ({ data, onChange }) => {
  const styles = useStylesResumeCustomize();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const [eduSteps, setEduSteps] = useState([
    {
      degree_name: '',
      degree_type: '',
      institute: '',
      marks: '',
      marks_type: '',
      passing_year: ''
    }
  ]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setEduSteps(
        data.map((edu) => ({
          degree_name: edu.degree_name || '',
          degree_type: edu.degree_type || '',
          institute: edu.institute || '',
          marks: edu.marks || '',
          marks_type: edu.marks_type || '',
          passing_year: edu.passing_year || ''
        }))
      );
    }
  }, []);
  const [eduActiveStep, setActiveStep] = useState(0);

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
        index === eduActiveStep ? { ...step, [name]: value } : step
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
                  {i18n('educationInfo.degreelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.degreelabel')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].degree_name}
                  onChange={handleFieldChange}
                  name="degree_name"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('educationInfo.universitylabel')}
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.universityPlaceholder')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].institute}
                  onChange={handleFieldChange}
                  name="institute"
                />
              </Box>
            </FormControl>
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('educationInfo.placelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.placePlaceholder')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].passingYear}
                  onChange={handleFieldChange}
                  name="passingYear"
                />
              </Box>
            </FormControl> */}
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('educationInfo.passingYearlabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.passingYearPlaceholder')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].passing_year}
                  onChange={handleFieldChange}
                  name="passing_year"
                  onKeyUp={handleKeyUp}
                  inputProps={{ maxLength: 4 }}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('educationInfo.degreeTypelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.degreeTypePlaceholder')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].degree_type}
                  onChange={handleFieldChange}
                  name="degree_type"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('educationInfo.marksTypelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.marksTypePlaceholder')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].marks_type}
                  onChange={handleFieldChange}
                  name="marks_type"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('educationInfo.markslabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('educationInfo.marksPlaceholder')}
                  className={styles.textfieldStyle}
                  value={eduSteps[eduActiveStep].marks}
                  onChange={handleFieldChange}
                  name="marks"
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
                  <IconButton disabled={eduActiveStep === 0} onClick={handleBack}>
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
                  <IconButton onClick={handleNext} disabled={eduActiveStep === eduSteps.length - 1}>
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
export default EducationInformation;
