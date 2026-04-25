import { Box, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
import UpdateProfession from './Profession/UpdateProfession';
import { useStyles } from './SkillSetProfileStyle';
import { getResumeData, getTargetJobs } from './Utils/SkillSetProfileUtils';
import ChipComponent from '~/shared/components/Chip/Chip';
import Icon from '~/shared/components/Icon';

interface SkillSetProfileProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
  userProfileData: ProfileData;
  onSave: Dispatch<SetStateAction<OnboardingData>>;
  onBack?: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
}

const capitalizeWords = (str: string) => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};

const SKILL_SECTIONS: Array<{
  label: string;
  sub: string;
  selectionKey: 'userStrengths' | 'userSkills' | 'userDomains';
  gapKey: 'userStrengthsGaps' | 'userSkillsGaps' | 'userDomainsGaps';
}> = [
  {
    label: 'Strengths',
    sub: '(Natural Qualities)',
    selectionKey: 'userStrengths',
    gapKey: 'userStrengthsGaps'
  },
  {
    label: 'Skills',
    sub: '(Learned Skills)',
    selectionKey: 'userSkills',
    gapKey: 'userSkillsGaps'
  },
  {
    label: 'Your Domain',
    sub: '(Expertise)',
    selectionKey: 'userDomains',
    gapKey: 'userDomainsGaps'
  }
];

const SkillSetProfile: React.FC<SkillSetProfileProps> = ({
  setLoadWithoutMount,
  userProfileData,
  onSave,
  onBack,
  onCancel,
  onContinue
}) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const styles = useStyles();

  const [targetJobList, setTargetJobList] = useState<DataItem[]>([]);
  const [skillInput, setSkillInput] = useState('');

  // Fetch target job suggestions when current job changes
  useEffect(() => {
    const fetchJobs = async () => {
      if (!userProfileData.currentJob?.name) return;
      try {
        setLoadWithoutMount(true);
        const res = await getTargetJobs(userProfileData.currentJob.name);
        if (res.status === 'success') setTargetJobList(res.data);
      } catch {
        // ignore
      } finally {
        setLoadWithoutMount(false);
      }
    };
    fetchJobs();
  }, [userProfileData.currentJob?.name]);

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
    onSave((prev: OnboardingData) => ({
      ...prev,
      profileData: { ...prev.profileData, targetJob }
    }));
    getParseResumeResponse(targetJob);
  };

  const handleCurrentJobChange = (currentJob: ProfileData['currentJob']) => {
    const targetJob: DataItem =
      userProfileData.currentJob.name.toLocaleLowerCase() === currentJob.name.toLocaleLowerCase()
        ? userProfileData.targetJob
        : { id: '', name: '' };
    onSave((prev: OnboardingData) => ({
      ...prev,
      profileData: { ...prev.profileData, currentJob, targetJob }
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [localskillData, setLocaluserSkillData] = useState<any[]>([]);
  const userSkillsLocal = getStorageItem({ key: 'userSkills', useCombineStorage: true });
  useEffect(() => {
    if (userSkillsLocal !== null) {
      try {
        setLocaluserSkillData(JSON.parse(userSkillsLocal));
      } catch {
        /* ignore */
      }
    }
  }, [userSkillsLocal]);

  const [filterSkillGaps, setFilteredSkillgapsData] = useState<DataItem[]>([]);
  const [filterRemoveSkill, setFilteredRemoveSkillData] = useState<DataItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resumeExtractedSkill: any[] = localskillData;
  const newSkillGapsAdded = filterSkillGaps;
  const removeUserSkills = resumeExtractedSkill.filter((skill) =>
    filterRemoveSkill.some((s) => s.id === skill.id)
  );

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
          if (parsed.jobTitle?.trim()) setLocalJobTitle(parsed.jobTitle);
        } catch {
          /* ignore */
        }
      }
    }
    if (localJobTitle !== '') {
      onSave((prev: OnboardingData) => ({
        ...prev,
        profileData: { ...prev.profileData, targetJob: { id: '', name: localJobTitle } }
      }));
    }
  }, [localJobTitle]);

  const handleAddExpertise = (
    objKey: 'userSkills' | 'userDomains' | 'userStrengths',
    dataItem: DataItem
  ) => {
    if (objKey === 'userSkills') {
      setFilteredSkillgapsData((prev) => [...prev, dataItem]);
    }
    onSave((prev: OnboardingData) => ({
      ...prev,
      profileData: { ...prev.profileData, [objKey]: [...userProfileData[objKey], dataItem] }
    }));
  };

  const handleRemoveExpertise = (
    objKey: 'userSkills' | 'userDomains' | 'userStrengths',
    dataItem: DataItem
  ) => {
    if (objKey === 'userSkills') {
      setFilteredRemoveSkillData((prev) => [...prev, dataItem]);
    }
    const filtered = userProfileData[objKey]?.filter(
      (item: DataItem) => !(item?.id === dataItem?.id && item?.name === dataItem?.name)
    );
    if (objKey === 'userSkills') {
      setFilteredSkillgapsData(
        filtered?.filter((item: DataItem) => !resumeExtractedSkill.some((s) => s.id === item.id))
      );
    }
    onSave((prev: OnboardingData) => ({
      ...prev,
      profileData: { ...prev.profileData, [objKey]: filtered }
    }));
  };

  const handleAddSkill = () => {
    const text = skillInput.trim();
    if (!text) return;
    handleAddExpertise('userSkills', { id: '', name: text });
    setSkillInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Mobile dark header */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: '20px',
          bgcolor: '#04040E',
          color: '#ffffff',
          p: '32px 20px',
          textAlign: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#DABF67',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '140%',
              letterSpacing: '-0.28px'
            }}
          >
            Your AI Powered Career Engineer
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: '100%',
              color: '#ffffff'
            }}
          >
            Let&apos;s Get Started
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '140%',
              color: '#9CA3AF'
            }}
          >
            Create resumes, plan growth, and unlock better opportunities in few simple steps
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              mt: '8px'
            }}
          >
            <Box
              sx={{
                width: '120px',
                height: '6px',
                bgcolor: 'rgba(255,255,255,0.15)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <Box sx={{ width: '50%', height: '100%', bgcolor: '#DABF67', borderRadius: '3px' }} />
            </Box>
            <Typography
              sx={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 400, lineHeight: '140%' }}
            >
              2/4 completed
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main card */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          bgcolor: '#fff',
          borderRadius: { xs: 0, md: '12px' },
          border: '1px solid #f0f0f0',
          overflow: 'hidden',
          minHeight: 0
        }}
      >
        {/* Card header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            px: { xs: 2, sm: 4 },
            pt: { xs: 2, sm: 3 },
            pb: 2,
            gap: 1.5
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: 'Satoshi, sans-serif',
                fontSize: { xs: '20px', sm: '24px', md: '28px' },
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.2
              }}
            >
              {i18n('skillsTitleHeading')}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Satoshi, sans-serif',
                fontSize: { xs: '13px', sm: '14px' },
                color: '#374151',
                mt: '6px',
                lineHeight: 1.6
              }}
            >
              Based on your resume and industry standards
              <br />
              Review and refine before we build
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            <Box
              sx={{
                width: { xs: 80, sm: 110 },
                height: 7,
                bgcolor: '#e5e7eb',
                borderRadius: '999px',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{ width: '50%', height: '100%', bgcolor: '#DABF67', borderRadius: '999px' }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: 'Satoshi, sans-serif',
                fontSize: '13px',
                color: '#9ca3af',
                whiteSpace: 'nowrap'
              }}
            >
              2/4 completed
            </Typography>
          </Box>
        </Box>

        {/* Scrollable content */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
          {/* ── Profession bar ── */}
          <Box
            sx={{
              bgcolor: '#FAF7EE',
              borderRadius: '12px',
              py: { xs: '12px', sm: '16px' },
              px: { xs: '16px', sm: '24px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: { xs: 1.5, sm: 3 },
              mb: 3
            }}
          >
            {/* Current Role */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography
                sx={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '14px',
                  color: '#6b7280',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                Current Role
              </Typography>
              {userProfileData.currentJob.isEditing ? (
                <TextField
                  size="small"
                  defaultValue={capitalizeWords(userProfileData.currentJob.name)}
                  autoFocus
                  onBlur={(e) =>
                    handleCurrentJobChange({
                      ...userProfileData.currentJob,
                      isEditing: false,
                      name: e.target.value
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCurrentJobChange({
                        ...userProfileData.currentJob,
                        isEditing: false,
                        name: (e.target as HTMLInputElement).value
                      });
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      bgcolor: '#fff',
                      borderRadius: '8px'
                    }
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: { xs: '16px', sm: '18px' },
                    fontWeight: 700,
                    color: '#0f172a'
                  }}
                >
                  {capitalizeWords(userProfileData.currentJob.name)}
                </Typography>
              )}
              <IconButton
                size="small"
                onClick={() =>
                  handleCurrentJobChange({ ...userProfileData.currentJob, isEditing: true })
                }
                sx={{ p: '4px' }}
              >
                <Icon name="editPenIcon" />
              </IconButton>
            </Box>

            {/* Arrow circle */}
            <Box
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#fff',
                borderRadius: '50%',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ArrowForwardIcon sx={{ fontSize: 16, color: '#374151' }} />
            </Box>

            {/* Target Role */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography
                sx={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '14px',
                  color: '#6b7280',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                Target Role
              </Typography>
              <Box
                sx={{
                  '& .MuiTypography-root': {
                    fontFamily: 'Satoshi, sans-serif !important',
                    fontSize: '18px !important',
                    fontWeight: '700 !important',
                    color: '#0f172a !important'
                  }
                }}
              >
                <UpdateProfession
                  targetJobList={targetJobList}
                  targetJob={userProfileData.targetJob}
                  CurrentJobEdit={userProfileData.currentJob.isEditing}
                  onTargetJobChange={handleTargetJobChange}
                />
              </Box>
            </Box>
          </Box>

          {/* ── Add Skill ── */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontFamily: 'Satoshi, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: '#1a1a1a',
                mb: '6px'
              }}
            >
              Add Skill
            </Typography>
            <TextField
              fullWidth
              placeholder="Add strength, skill, or domain... (AI-powered search)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddSkill();
              }}
              InputProps={{
                endAdornment: skillInput ? (
                  <InputAdornment position="end">
                    <Box
                      onClick={handleAddSkill}
                      sx={{
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: '#DABF67',
                        fontFamily: 'Satoshi, sans-serif',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      + Add
                    </Box>
                  </InputAdornment>
                ) : null
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: '14px',
                  bgcolor: '#fafafa'
                }
              }}
            />
          </Box>

          {/* ── Skill sections ── */}
          {SKILL_SECTIONS.map((section, index) => (
            <Box key={section.selectionKey}>
              {index > 0 && <Divider sx={{ my: 2.5 }} />}

              {/* Section header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '12px' }}>
                <Typography
                  sx={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: { xs: '15px', sm: '16px' },
                    fontWeight: 700,
                    color: '#0f172a'
                  }}
                >
                  {section.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: { xs: '12px', sm: '13px' },
                    color: '#6b7280',
                    fontWeight: 400
                  }}
                >
                  {section.sub}
                </Typography>
                <Box
                  sx={{
                    bgcolor: '#FAF7EE',
                    borderRadius: '999px',
                    minWidth: 24,
                    height: 24,
                    px: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#b8973c'
                    }}
                  >
                    {userProfileData[section.selectionKey]?.length ?? 0}
                  </Typography>
                </Box>
              </Box>

              {/* Selected chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: '12px' }}>
                {userProfileData[section.selectionKey]?.map((item: DataItem, idx: number) => (
                  <ChipComponent
                    key={`${section.selectionKey}-${item.id}-${idx}`}
                    chipData={item}
                    onDelete={(d) => handleRemoveExpertise(section.selectionKey, d)}
                    variant="filled"
                  />
                ))}
              </Box>

              {/* Suggested chips */}
              {(userProfileData[section.gapKey]?.length ?? 0) > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '13px',
                      color: '#6b7280',
                      fontWeight: 400
                    }}
                  >
                    Suggested:
                  </Typography>
                  {userProfileData[section.gapKey]?.map((item: DataItem, idx: number) => {
                    const isSelected = userProfileData[section.selectionKey]?.some(
                      (s: DataItem) => s.name.toLowerCase() === item.name.toLowerCase()
                    );
                    return (
                      <ChipComponent
                        key={`${section.gapKey}-${item.id}-${idx}`}
                        chipData={item}
                        onClick={(d) => handleAddExpertise(section.selectionKey, d)}
                        variant="outlined"
                        disabled={isSelected}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
          ))}

          {/* Note */}
          <Box sx={{ mt: 3 }}>
            <Typography className={styles.suggestionText}>{i18n('suggestionNoteText')}</Typography>
            <Typography className={styles.suggestionText}>
              {i18n('suggestionNoteTextPressEnter')}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, sm: 4 },
            py: { xs: 1.5, sm: 2 }
          }}
        >
          <Typography
            onClick={onCancel}
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: { xs: '14px', sm: '15px' },
              fontWeight: 500,
              color: '#ef4444',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            Cancel
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 } }}>
            <Box
              onClick={onBack}
              sx={{
                px: { xs: 2.5, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                border: '1.5px solid #1a1a1a',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'Satoshi, sans-serif',
                fontSize: { xs: '13px', sm: '15px' },
                fontWeight: 500,
                color: '#1a1a1a',
                '&:hover': { bgcolor: '#f9f9f9' }
              }}
            >
              Back
            </Box>
            <Box
              onClick={onContinue}
              sx={{
                px: { xs: 2.5, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                bgcolor: '#DABF67',
                borderRadius: '999px',
                cursor: 'pointer',
                fontFamily: 'Satoshi, sans-serif',
                fontSize: { xs: '13px', sm: '15px' },
                fontWeight: 600,
                color: '#1a1a1a',
                '&:hover': { bgcolor: '#c9ae56' }
              }}
            >
              Continue
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default withLoader(SkillSetProfile);
