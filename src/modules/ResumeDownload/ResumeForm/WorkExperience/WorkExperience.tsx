import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  // Grid,
  IconButton,
  // MenuItem,
  // Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface WorkInfoProps {
  data: {
    description: string;
    location: string;
    title: string;
    date: string;
    company: string;
    // workingHere?: string;
    // from?: string;
    // to?: string;
    bullet_points: string[];
  }[];
  onChange: (
    value: {
      description: string;
      location: string;
      title: string;
      date: string;
      company: string;
      // workingHere?: string;
      // from?: string;
      // to?: string;
      bullet_points: string[];
    }[]
  ) => void;
}
const WorkExperience: React.FC<WorkInfoProps> = ({ data, onChange }) => {
  const styles = useStylesResumeCustomize();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const [workSteps, setWorkSteps] = useState([
    {
      description: '',
      location: '',
      title: '',
      date: '',
      company: '',
      // workingHere: '',
      // from: '',
      // to: '',
      bullet_points: ['']
    }
  ]);
  // const extractDate = (dateExp: string) => {
  //   let startYear = '';
  //   let endYear = '';
  //   let isRange = false;
  //   let currentWorkingHere = 'no';
  //   // Split the date expression by '-'
  //   const parts = dateExp.split('-');

  //   if (parts.length === 2) {
  //     // Case 1 or Case 2: It's a range (e.g., "2022-Present" or "2022-2024")
  //     startYear = parts[0];
  //     endYear = parts[1];
  //     const presentData = ['Present', 'present'];
  //     if (presentData.includes(endYear)) {
  //       endYear = '';
  //       isRange = false;
  //       // currentWorkingHere = "yes";
  //     } else {
  //       isRange = true;
  //       currentWorkingHere = 'no';
  //     }
  //   } else {
  //     // Case 3: Single year (e.g., "2022")
  //     startYear = dateExp == 'present' ? '' : dateExp; //if this is date else blank
  //     endYear = ''; // No end year for a single year
  //     isRange = false; // Not a range
  //   }

  //   return {
  //     startYear,
  //     endYear,
  //     isRange,
  //     currentWorkingHere
  //   };
  // };
  useEffect(() => {
    if (Array.isArray(data)) {
      setWorkSteps(
        data.map((wrk) => {
          // const { startYear, endYear, currentWorkingHere } = extractDate(wrk.date); // Extract date details

          return {
            description: wrk?.description || '',
            location: wrk?.location || '',
            title: wrk?.title || '',
            date: wrk?.date || '', // Keep original date for display purposes
            company: wrk?.company || '',
            // workingHere: currentWorkingHere || 'no', // Maintain existing workingHere value
            // from: startYear, // Update from with startYear
            // to: endYear,
            bullet_points: wrk?.bullet_points // Update to with endYear
          };
        })
      );
    }
  }, []);
  const [workActiveStep, setActiveStep] = useState(0);

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
    setWorkSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step, index) =>
        index === workActiveStep ? { ...step, [name]: value } : step
      );
      onChange(updatedSteps);
      return updatedSteps;
    });
  };
  // const handleFieldChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  // ) => {
  //   const { name, value } = e.target;

  //   setWorkSteps((prevSteps) => {
  //     const updatedSteps = prevSteps.map((step, index) => {
  //       if (index === workActiveStep) {
  //         const updatedStep = { ...step, [name]: value };

  //         // Check if both 'from' and 'to' fields are set and update the 'date' field accordingly
  //         if (updatedStep.from && updatedStep.to) {
  //           updatedStep.date = `${updatedStep.from} - ${updatedStep.to}`;
  //         }
  //         if (updatedStep.from &&updatedStep.to=="") {
  //           updatedStep.date = `${updatedStep.from}`;
  //         }
  //         if (updatedStep.to && updatedStep.from=="") {
  //           updatedStep.date = `${updatedStep.to}`;
  //         }
  //         return updatedStep;
  //       }

  //       return step;
  //     });

  //     onChange(updatedSteps);
  //     return updatedSteps;
  //   });
  // };

  // const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   const inputValue = (event.target as HTMLInputElement).value;
  //   const regex = /^\d{0,4}$/; // Allow up to 4 digits

  //   if (!regex.test(inputValue)) {
  //     // Remove non-numeric characters
  //     const newValue = inputValue.replace(/\D/g, '');
  //     (event.target as HTMLInputElement).value = newValue;
  //   }
  // };

  return (
    <>
      <Box className={styles.mainWrapper}>
        <form>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('workExpInfo.jobPositionlabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={i18n('workExpInfo.jobPositionPlaceholder')}
                  className={styles.textfieldStyle}
                  name="title"
                  value={workSteps[workActiveStep].title}
                  onChange={handleFieldChange}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('workExpInfo.companylabel')}
                <TextField
                  variant="outlined"
                  placeholder={i18n('workExpInfo.companyPlaceholder')}
                  className={styles.textfieldStyle}
                  name="company"
                  value={workSteps[workActiveStep].company}
                  onChange={handleFieldChange}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('workExpInfo.locationlabel')}
                <TextField
                  variant="outlined"
                  placeholder={i18n('workExpInfo.locationPlaceholder')}
                  className={styles.textfieldStyle}
                  name="location"
                  value={workSteps[workActiveStep].location}
                  onChange={handleFieldChange}
                />
              </Box>
            </FormControl>
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('workExpInfo.fromDate')}
                <TextField
                  variant="outlined"
                  className={styles.textfieldStyle}
                  // type="date"
                  // InputLabelProps={{ shrink: true }}
                  placeholder={i18n('workExpInfo.fromDatePlaceholder')}
                  name="from"
                  value={workSteps[workActiveStep].from}
                  onChange={handleFieldChange}
                  onKeyUp={handleKeyUp}
                  inputProps={{ maxLength: 4 }}
                />
              </Box>
            </FormControl> */}
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('workExpInfo.currentlyWorkingHerelabel')}
                <Select
                  variant="outlined"
                  value={workSteps[workActiveStep].workingHere}
                  onChange={handleFieldChange}
                  name="workingHere"
                  displayEmpty
                  className={styles.textfieldStyle}
                  defaultValue="no"
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </Box>
            </FormControl> */}
            {/* <Typography variant="body2" component="span" sx={{ textAlign: 'center' }}>
              OR
            </Typography> */}
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                {i18n('workExpInfo.toDate')}
                <TextField
                  variant="outlined"
                  className={styles.textfieldStyle}
                  // type="date"
                  // InputLabelProps={{ shrink: true }}
                  placeholder={i18n('workExpInfo.toDatePlaceholder')}
                  name="to"
                  value={workSteps[workActiveStep].to}
                  onChange={handleFieldChange}
                  disabled={workSteps[workActiveStep].workingHere === 'yes'} // Disable the field if workingHere is "yes"
                  onKeyUp={handleKeyUp}
                  inputProps={{ maxLength: 4 }}
                />
              </Box>
            </FormControl> */}
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={i18n('workExpInfo.fromDate')}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  name="fromDate"
                  fullWidth
                  value={workSteps[workActiveStep].date}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={i18n('workExpInfo.toDate')}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  name="toDate"
                  fullWidth
                  value={workSteps[workActiveStep].date}
                  onChange={handleFieldChange}
                />
              </Grid>
            </Grid> */}
            {/* <FormControl fullWidth>
              <Box display="flex" flexDirection="column" gap="5px">
                <Typography className={styles.labelText}>
                  {i18n('workExpInfo.descriptionlabel')}
                </Typography>
                <TextField
                  variant="outlined"
                  rows={5}
                  multiline
                  placeholder={i18n('workExpInfo.descriptionPlaceholder')}
                  className={styles.textfieldStyle}
                  name="description"
                  value={workSteps[workActiveStep].description}
                  onChange={handleFieldChange}
                />
              </Box>
            </FormControl> */}
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
                  <IconButton disabled={workActiveStep === 0} onClick={handleBack}>
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
                    disabled={workActiveStep === workSteps.length - 1}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Same section multiple switch end */}
        </form>
      </Box>
    </>
  );
};
export default WorkExperience;
