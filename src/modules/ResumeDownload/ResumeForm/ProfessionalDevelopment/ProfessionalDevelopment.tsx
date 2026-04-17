import React, { useEffect, useState } from 'react';
import { Box, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface ProfessionalDevelopmentInfoProps {
  data: {
    company?: string;
    date?: string;
    university?: string;
    workshop?: string;
    title?: string; //new add
    description?: string;
  }[];
  onChange: (
    value: {
      company: string;
      date: string;
      university: string;
      workshop: string;
      title: string; //new add
      description: string;
    }[]
  ) => void;
}
const ProfessionalDevelopmentInformation: React.FC<ProfessionalDevelopmentInfoProps> = ({
  data,
  onChange
}) => {
  const styles = useStylesResumeCustomize();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  // const getDateFromTimestamp = (timestamp: string): string => {
  //   const date = new Date(timestamp);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };
  const [prflSteps, setEduSteps] = useState([
    {
      company: '',
      date: '',
      university: '',
      workshop: '',
      title: '',
      description: ''
    }
  ]);
  useEffect(() => {
    if (Array.isArray(data)) {
      setEduSteps(
        data.map((prf) => ({
          company: prf.company || '',
          date: prf.date || '',
          university: prf.university || '',
          workshop: prf.workshop || '',
          title: prf.title || '',
          description: prf.description || ''
        }))
      );
    }
  }, []);
  const [prflActiveStep, setActiveStep] = useState(0);

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
        index === prflActiveStep ? { ...step, [name]: value } : step
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
                  {i18n('professionalDevInfo.titlelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('professionalDevInfo.titlePlaceholder')}
                  className={styles.textfieldStyle}
                  value={prflSteps[prflActiveStep].title}
                  onChange={handleFieldChange}
                  name="title"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('professionalDevInfo.universitylabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('professionalDevInfo.universityPlaceholder')}
                  className={styles.textfieldStyle}
                  value={prflSteps[prflActiveStep].university}
                  onChange={handleFieldChange}
                  name="university"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('professionalDevInfo.workshoplabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('professionalDevInfo.workshopPlaceholder')}
                  className={styles.textfieldStyle}
                  value={prflSteps[prflActiveStep].workshop}
                  onChange={handleFieldChange}
                  name="workshop"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('professionalDevInfo.companylabel')}
                <TextField
                  variant="outlined"
                  placeholder={i18n('professionalDevInfo.companyPlaceholder')}
                  className={styles.textfieldStyle}
                  value={prflSteps[prflActiveStep].company}
                  onChange={handleFieldChange}
                  name="company"
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('professionalDevInfo.datelabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('professionalDevInfo.datePlaceholder')}
                  className={styles.textfieldStyle}
                  value={prflSteps[prflActiveStep].date}
                  onChange={handleFieldChange}
                  name="date"
                  onKeyUp={handleKeyUp}
                  inputProps={{ maxLength: 4 }}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('professionalDevInfo.descriptionlabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  rows={5}
                  multiline
                  placeholder={i18n('professionalDevInfo.descriptionPlaceholder')}
                  className={styles.textfieldStyle}
                  value={prflSteps[prflActiveStep].description}
                  onChange={handleFieldChange}
                  name="description"
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
                  <IconButton disabled={prflActiveStep === 0} onClick={handleBack}>
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
                    disabled={prflActiveStep === prflSteps.length - 1}
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
export default ProfessionalDevelopmentInformation;
