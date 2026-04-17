import React, { useEffect, useState } from 'react';
import { Box, FormControl, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useStylesResumeCustomize } from '../ResumeCustomizationstyles';
import { useTranslation } from 'react-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './ExpertiseStyles';
interface SkillInfoProps {
  data: {
    professionalSkills: string[];
    technicalSkills: string[];
  };
  onChange: (value: { professionalSkills: string[]; technicalSkills: string[] }) => void;
}
const Expertise: React.FC<SkillInfoProps> = ({ data, onChange }) => {
  const styles = useStylesResumeCustomize();
  const stylesExpert = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const [activeTab, setActiveTab] = useState(0);
  const [professionalSkills, setProfessionalSkills] = useState<string[]>(['']);
  const [technicalSkills, setTechnicalSkills] = useState<string[]>(['']);
  useEffect(() => {
    // Set the skills from the data prop into the state when the component mounts
    if (data) {
      setProfessionalSkills(data.professionalSkills.length > 0 ? data.professionalSkills : ['']);
      setTechnicalSkills(data.technicalSkills.length > 0 ? data.technicalSkills : ['']);
    }
  }, [data]);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSkillInfoChange = (
    skills: string[],
    setSkills: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);

    // Update the parent component with the new skills data
    onChange({
      professionalSkills: activeTab === 0 ? newSkills : professionalSkills,
      technicalSkills: activeTab === 1 ? newSkills : technicalSkills
    });
  };
  //   const addSkillField = (setSkills: React.Dispatch<React.SetStateAction<string[]>>) => {
  //     setSkills((prevSkills) => [...prevSkills, '']);
  //   };
  return (
    <>
      <Box className={styles.mainWrapper}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Tabs Start */}
          <Box className={stylesExpert.tabWrapper}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: { display: 'none' } // Hide default indicator
              }}
              className={stylesExpert.tabStyle}
            >
              <Tab label={i18n('expertInfo.professionalTabName')} />
              <Tab label={i18n('expertInfo.technicalTabName')} />
            </Tabs>
          </Box>
          {/* Tabs End */}
          {/* Form start Professional*/}
          <form>
            {activeTab === 0 && (
              <>
                {professionalSkills.map((skill: string, index: number) => (
                  <FormControl fullWidth key={index}>
                    {' '}
                    {/* Moved FormControl inside the map */}
                    <Box display="flex" flexDirection="column" gap="5px" mt={1.5}>
                      <Typography
                        className={styles.labelText}
                      >{`${i18n('expertInfo.skilllabel')} ${index + 1}`}</Typography>
                      <TextField
                        value={skill}
                        onChange={(e) =>
                          handleSkillInfoChange(
                            professionalSkills,
                            setProfessionalSkills,
                            index,
                            e.target.value
                          )
                        }
                        variant="outlined"
                        placeholder={`${i18n('expertInfo.skillPlaceholder')} ${index + 1}`}
                        className={styles.textfieldStyle}
                        name="skillName"
                      />
                    </Box>
                  </FormControl>
                ))}
              </>
            )}
          </form>
          {/* Form End Professional*/}
          {/* Form start Technical*/}
          {activeTab === 1 && (
            <>
              {technicalSkills.map((skill: string, index: number) => (
                <FormControl fullWidth key={index}>
                  {' '}
                  {/* Moved FormControl inside the map */}
                  <Box display="flex" flexDirection="column" gap="5px" mt={1.5}>
                    <Typography
                      className={styles.labelText}
                    >{`${i18n('expertInfo.skilllabel')} ${index + 1}`}</Typography>
                    <TextField
                      value={skill}
                      onChange={(e) =>
                        handleSkillInfoChange(
                          technicalSkills,
                          setTechnicalSkills,
                          index,
                          e.target.value
                        )
                      }
                      variant="outlined"
                      placeholder={`${i18n('expertInfo.skillPlaceholder')} ${index + 1}`}
                      className={styles.textfieldStyle}
                      name="skillName"
                    />
                  </Box>
                </FormControl>
              ))}
            </>
          )}
          {/* Form End Technical*/}
        </Box>
      </Box>
    </>
  );
};
export default Expertise;
