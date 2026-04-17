import { Box, Divider, FormControl, IconButton, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import withLoader from '~/shared/components/HOC/withLoader';
import Icon from '~/shared/components/Icon';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { DataItem, ProfileData } from '../../Utils/OnboardingUtils';
import { getTargetJobs } from '../Utils/SkillSetProfileUtils';
import { useStyles } from './ProfessionStyles';
import UpdateProfession from './UpdateProfession';
import { useStylesGoldTheme } from '~/modules/globalStyles';

interface ProfessionProps {
  setLoadWithoutMount: (value: boolean) => void;
  currentJob: ProfileData['currentJob'];
  targetJob: DataItem;
  onCurrentJobChange: (currentJob: ProfileData['currentJob']) => void;
  onTargetJobChange: (targetJob: DataItem) => void;
}

const Profession: React.FC<ProfessionProps> = ({
  setLoadWithoutMount,
  currentJob,
  targetJob,
  onCurrentJobChange,
  onTargetJobChange
}) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const [targetJobList, setTargetJobList] = useState<{ name: string; id: string }[]>([]);
  const [CurrentJobEdit, setCurrentJobEdit] = useState<boolean>(false);
  // const capitalizeWords = (str: string) => {
  //   //Capitalise work(RG)
  //   return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  // };
  const capitalizeWords = (str: string) => {
    // Check if the input is a valid string
    if (!str || typeof str !== 'string') {
      return '';
    }

    // Capitalize the first letter of each word
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  };
  useEffect(() => {
    const targetJob = async () => {
      setLoadWithoutMount(true);

      // Get jobTitle from localStorage if available
      // let jobTitle = currentJob?.name;
      // if (typeof window !== 'undefined') {
      //   const stored = localStorage.getItem('jdFormValue');
      //   if (stored) {
      //     try {
      //       const parsed = JSON.parse(stored);
      //       if (parsed.jobTitle && parsed.jobTitle.trim() !== '') {
      //         console.log('parsed.jobTitle', parsed.jobTitle);
      //         return false;
      //         jobTitle = parsed.jobTitle;
      //       }
      //     } catch (e) {
      //       // ignore parse errors
      //     }
      //   }
      // }

      try {
        const targetJobRes = await getTargetJobs(currentJob?.name);
        if (targetJobRes.status === 'success') {
          setTargetJobList(targetJobRes?.data);
        }
      } catch (e) {
      } finally {
        setLoadWithoutMount(false);
      }
    };
    currentJob?.name && targetJob();
  }, [currentJob?.name]);

  const handleEditClick = () => {
    onCurrentJobChange({ ...currentJob, isEditing: true });
  };

  const handleSaveCurrentJob = async (jobTitle: string) => {
    onCurrentJobChange({ ...currentJob, isEditing: false, name: jobTitle });
    setCurrentJobEdit(true);
  };
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const enteredValue = (event.target as HTMLInputElement).value;
      handleSaveCurrentJob(enteredValue);
    }
  };
  return (
    <Box p={{ xs: 0, md: 2 }} className={styles.boxWrapper}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'start', md: 'center' }}
        justifyContent="center"
        gap={{ xs: 0, md: 8 }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          p={{ xs: 2, md: 0 }}
        >
          <Typography className={styles.jobTitle}>{i18n('currentJob')}</Typography>
          <FormControl>
            {currentJob.isEditing ? (
              <TextField
                size="small"
                defaultValue={capitalizeWords(currentJob?.name)} //Capitalise work(RG)
                onBlur={(e) => handleSaveCurrentJob(e.target.value)}
                placeholder={i18n('enterCurrentJob')}
                className={`${styles.jobTextfield} ${globalStyles.focusedTextField}`}
                autoFocus
                onKeyDown={handleEnter}
              />
            ) : (
              <Typography className={styles.jobTextfield}>
                {capitalizeWords(currentJob?.name)}
              </Typography> //Capitalise work(RG)
            )}
          </FormControl>
          <IconButton onClick={handleEditClick}>
            <Icon name="editPenIcon" className={styles.editIcon} />
          </IconButton>
        </Box>

        <Box display={{ xs: 'block', md: 'none' }} width="100%">
          <Divider className={styles.divider}>
            <Box className={styles.outlineArrow}>
              <Icon name="leftdoubleArrow" />
            </Box>
          </Divider>
        </Box>
        <Box display={{ xs: 'none', md: 'block' }} className={styles.outlineArrow}>
          <Icon name="leftdoubleArrow" />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          p={{ xs: 2, md: 0 }}
        >
          <Typography className={styles.jobTitle}>{i18n('targetJob')}</Typography>
          {/* filter dropdown */}
          <UpdateProfession
            targetJobList={targetJobList}
            targetJob={targetJob}
            CurrentJobEdit={CurrentJobEdit}
            onTargetJobChange={onTargetJobChange}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default withLoader(Profession);
