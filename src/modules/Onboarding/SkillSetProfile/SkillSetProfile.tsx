import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import withLoader from '~/shared/components/HOC/withLoader';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { getStorageItem, setStorageItem, STORAGE_TYPES } from '~/shared/utils/storage';
import {
  DataItem,
  OnboardingData,
  ProfileData,
  RESPONSE_TYPE,
  updateProfileData
} from '../Utils/OnboardingUtils';
import Expertise from './Expertise';
import Profession from './Profession';
import { useStyles } from './SkillSetProfileStyle';
import { getResumeData } from './Utils/SkillSetProfileUtils';

interface SkillSetProfileProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
  userProfileData: ProfileData;
  onSave: Dispatch<SetStateAction<OnboardingData>>;
}

const SkillSetProfile: React.FC<SkillSetProfileProps> = ({
  setLoadWithoutMount,
  userProfileData,
  onSave
}) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const styles = useStyles();
  const getParseResumeResponse = async (targetJob: DataItem) => {
    const resumeData = {
      resume_url: userProfileData?.resumeUrl,
      resume_content: userProfileData?.resumeContent,
      designation: userProfileData?.currentJob.name,
      target_job: targetJob.name,
      is_onboarding: true
    };
    setLoadWithoutMount(true, i18n('loaderMessages.thisMayTakeUptoAMinuteOrTwo', { ns: 'common' }));
    const res = await getResumeData(resumeData);
    updateProfileData(res.data, RESPONSE_TYPE.PARSE, onSave);
    setLoadWithoutMount(false, '');
  };

  const handleTargetJobChange = (targetJob: DataItem) => {
    onSave((prev: OnboardingData) => {
      return { ...prev, profileData: { ...prev.profileData, targetJob } };
    });
    getParseResumeResponse(targetJob);
  };

  const handleCurrentJobChange = (currentJob: ProfileData['currentJob']) => {
    const targetJob: DataItem =
      userProfileData.currentJob.name.toLocaleLowerCase() === currentJob.name.toLocaleLowerCase()
        ? userProfileData.targetJob
        : { id: '', name: '' };
    onSave((prev: OnboardingData) => {
      return { ...prev, profileData: { ...prev.profileData, currentJob, targetJob } };
    });
  };
  // ---------------skill tasb chnages suggestexd and userskill-------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localskillData, setLocaluserSkillData] = useState<any[]>([]);
  const userSkillsLocal = getStorageItem({ key: 'userSkills', useCombineStorage: true });
  useEffect(() => {
    if (userSkillsLocal !== null) {
      try {
        const parsedSkills = JSON.parse(userSkillsLocal);
        setLocaluserSkillData(parsedSkills);
      } catch (error) {
        console.error('Error parsing local skills:', error);
      }
    }
  }, [userSkillsLocal]);
  const [filterSkillGaps, setFilteredSkillgapsData] = useState<DataItem[]>([]); // Initialize as empty array if no data is available
  const [filterRemoveSkill, setFilteredRemoveSkillData] = useState<DataItem[]>([]); // Initialize as empty array if no data is available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resumeExtractedSkill: any[] = localskillData;
  const newSkillGapsAdded = filterSkillGaps; //new skillGapsAdded
  const removeUserSkills = resumeExtractedSkill.filter((skill) =>
    filterRemoveSkill.some((extractedSkill) => extractedSkill.id === skill.id)
  ); //get list of skill deleted from resume extracted skill
  useEffect(() => {
    setStorageItem('newSkillGapsAdded', JSON.stringify(newSkillGapsAdded), STORAGE_TYPES.LOCAL);
    setStorageItem('removeUserSkills', JSON.stringify(removeUserSkills), STORAGE_TYPES.LOCAL);
    localStorage.setItem('IsImprovedScoreClick', JSON.stringify(0));
  }, [newSkillGapsAdded, removeUserSkills]);
  const [localJobTitle, setLocalJobTitle] = useState<string>('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jdFormValue');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.jobTitle && parsed.jobTitle.trim() !== '') {
            // console.log('parsed.jobTitle', parsed.jobTitle);
            setLocalJobTitle(parsed.jobTitle);
            // return false;
            // jobTitle = parsed.jobTitle;
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    }
    if (localJobTitle != '') {
      const localdata = {
        id: '',
        name: localJobTitle
      };
      onSave((prev: OnboardingData) => {
        return { ...prev, profileData: { ...prev.profileData, targetJob: localdata } };
      });
    }
  }, [localJobTitle]);

  const handleAddExpertise = (
    objKey: 'userSkills' | 'userDomains' | 'userStrengths',
    dataItem: DataItem
  ) => {
    // const filterSkillGapsData = userProfileData[objKey]?.filter((item: DataItem) =>
    //   !resumeExtractedSkill.some((extractedSkill) => extractedSkill.id === item.id)
    // );
    // setFilteredSkillgapsData(filterSkillGapsData)
    if (objKey === 'userSkills') {
      setFilteredSkillgapsData((prevSkills) => {
        // Step 2: Add the new dataItem to the array
        const updatedSkills = [...prevSkills, dataItem];
        return updatedSkills;
      });
    }

    onSave((prev: OnboardingData) => {
      return {
        ...prev,
        profileData: { ...prev.profileData, [objKey]: [...userProfileData[objKey], dataItem] }
      };
    });
  };
  const handleRemoveExpertise = (
    objKey: 'userSkills' | 'userDomains' | 'userStrengths',
    dataItem: DataItem
  ) => {
    if (objKey === 'userSkills') {
      setFilteredRemoveSkillData((prevSkills) => {
        // Step 2: Add the new dataItem to the array
        const updatedSkills = [...prevSkills, dataItem];
        return updatedSkills;
      });
    }
    const filteredValues = userProfileData[objKey]?.filter(
      (item: DataItem) => !(item?.id === dataItem?.id && item?.name === dataItem?.name)
    );
    if (objKey === 'userSkills') {
      const filterSkillGapsData = filteredValues?.filter(
        (item: DataItem) =>
          !resumeExtractedSkill.some((extractedSkill) => extractedSkill.id === item.id)
      );
      setFilteredSkillgapsData(filterSkillGapsData);
    }
    onSave((prev: OnboardingData) => {
      return {
        ...prev,
        profileData: { ...prev.profileData, [objKey]: filteredValues }
      };
    });
  };
  return (
    <Box className={styles.detailsWrapper}>
      <Box component={Paper} p={3} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5" className={styles.textHeadingStyle}>
          {i18n('skillsTitleHeading')}
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Profession
            currentJob={userProfileData?.currentJob}
            targetJob={userProfileData?.targetJob}
            onCurrentJobChange={handleCurrentJobChange}
            onTargetJobChange={handleTargetJobChange}
          />
          <Expertise
            userProfileData={userProfileData}
            onAddItem={handleAddExpertise}
            onRemoveItem={handleRemoveExpertise}
          />

          <Box display={{ xs: 'none', md: 'block' }}>
            <Typography className={styles.suggestionText}>{i18n('suggestionNoteText')}</Typography>
            <Typography className={styles.suggestionText}>
              {i18n('suggestionNoteTextPressEnter')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default withLoader(SkillSetProfile);
