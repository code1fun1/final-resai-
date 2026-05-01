import { FC, useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Divider,
  Drawer,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  SelectChangeEvent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { OnboardingData, AdditionalData } from '~/modules/Onboarding/Utils/OnboardingUtils';
import { EducationSection } from './EducationSection';
import { CertificationsSection } from './CertificationsSection';
import { ExperienceSection } from './ExperienceSection';
import {
  createPersonal,
  getPersonal,
  updatePersonal,
  createExperience,
  updateExperience,
  deleteExperience as deleteExperienceApi,
  getExperience
} from '~/modules/Onboarding/AdditionalDetails/Utils/ProfileTabsUtils';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

interface PersonalDetailsFormProps {
  onSave: Dispatch<SetStateAction<OnboardingData>>;
  additionalData: AdditionalData;
  onBack?: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
}

const TABS = ['Personal Details', 'Work Experience', 'Education', 'Certifications/ Achievements'];

const labelSx = {
  fontFamily: 'Satoshi, sans-serif',
  fontSize: '13px',
  fontWeight: 500,
  color: '#1a1a1a',
  mb: '6px'
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: 'Satoshi, sans-serif',
    fontSize: '14px',
    bgcolor: '#fff'
  }
};

type PersonalDetailsApiData = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  linkedin?: string | null;
  language?: string | null;
  profile_pic?: string | null;
};

type ExperienceItem = {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLocation: string;
  startDate: string;
  endDate: string;
  achievements: string;
  keyResponsibilities: string;
};

const pillButtonSx = {
  px: { xs: 2.5, sm: 3 },
  py: { xs: 1, sm: 1.1 },
  borderRadius: '999px',
  cursor: 'pointer',
  fontFamily: 'Satoshi, sans-serif',
  fontSize: { xs: '13px', sm: '14px' },
  fontWeight: 600,
  userSelect: 'none' as const
};

const PersonalDetailsForm: FC<PersonalDetailsFormProps> = ({
  onSave,
  onBack,
  onCancel,
  onContinue
}) => {
  const theme = useTheme();
  const isTabletOrDown = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasFetchedPersonal = useRef(false);
  const hasExistingPersonal = useRef(false);
  const hasFetchedExperiences = useRef(false);

  const [fullName, setFullName] = useState('');
  const [language, setLanguage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  // Country code for phone
  const countryCodes = [
    { code: '+1', label: 'USA' },
    { code: '+91', label: 'India' },
    { code: '+44', label: 'UK' },
    { code: '+86', label: 'China' },
    { code: '+81', label: 'Japan' },
    { code: '+61', label: 'Australia' },
    { code: '+49', label: 'Germany' },
    { code: '+33', label: 'France' }
  ];
  const [countryCode, setCountryCode] = useState<string>('+1');

  const handleCountryCodeChange = (event: SelectChangeEvent) => {
    setCountryCode(event.target.value);
  };

  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>([]);
  const [experienceExpanded, setExperienceExpanded] = useState<Record<string, boolean>>({});
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [experienceDraft, setExperienceDraft] = useState<Omit<ExperienceItem, 'id'>>({
    jobTitle: '',
    companyName: '',
    companyLocation: '',
    startDate: '',
    endDate: '',
    achievements: '',
    keyResponsibilities: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfileImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // ── Fetch personal details when Tab 0 is active ───────────────
  useEffect(() => {
    if (activeTab !== 0) return;
    if (hasFetchedPersonal.current) return; // prevent double-fire in React StrictMode
    hasFetchedPersonal.current = true;
    const fetchPersonalDetails = async () => {
      const res = await getPersonal();
      if (res.status === 'success' && res.data) {
        const d = res.data as PersonalDetailsApiData;
        if (d.first_name || d.last_name) {
          setFullName(`${d.first_name ?? ''} ${d.last_name ?? ''}`.trim());
        } else if (d.full_name) {
          setFullName(d.full_name);
        }
        if (d.email) setEmail(d.email);
        if (d.phone || d.phone_number) {
          const rawPhone = d.phone ?? d.phone_number ?? '';
          // Detect country code prefix
          let detectedCode = '+1';
          let phoneDigits = rawPhone;
          for (const cc of countryCodes) {
            if (rawPhone.startsWith(cc.code)) {
              detectedCode = cc.code;
              phoneDigits = rawPhone.slice(cc.code.length);
              break;
            }
          }
          setCountryCode(detectedCode);
          setPhone(phoneDigits);
        }
        if (d.linkedin || d.linkedin_profile) setLinkedIn(d.linkedin ?? d.linkedin_profile ?? '');
        if (d.language) setLanguage(d.language);
        if (d.profile_pic) setProfileImage(d.profile_pic);
      }
    };
    fetchPersonalDetails();
  }, [activeTab]);

  // Fetch work experience on mount
  useEffect(() => {
    if (hasFetchedExperiences.current) return;
    hasFetchedExperiences.current = true;
    const fetchExperiences = async () => {
      const res = await getExperience();
      if (res.status === 'success' && Array.isArray(res.data)) {
        setExperienceItems(
          res.data.map((item: any) => ({
            id: String(item.id ?? item.experience_id),
            jobTitle: item.job_title ?? '',
            companyName: item.company_name ?? '',
            companyLocation: item.location ?? '',
            startDate: item.start_date ?? '',
            endDate: item.end_date ?? '',
            achievements: '',
            keyResponsibilities: item.description ?? ''
          }))
        );
      }
    };
    fetchExperiences();
  }, []);

  // Clear end date when currently working is checked
  useEffect(() => {
    if (currentlyWorking) {
      setExperienceDraft((prev) => ({ ...prev, endDate: '' }));
    }
  }, [currentlyWorking]);

  const handleContinue = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate language selection
    if (!language) {
      alert('Please select a language.');
      return;
    }

    // Validate phone: 10-15 digits if provided if provided
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
      alert('Please enter a valid phone number (10-15 digits).');
      return;
    }

    // Combine country code and phone
    const fullPhone = countryCode.replace(/\D/g, '') + phoneDigits;
    const phoneFilled = phoneDigits.length > 0;

    const [firstName, ...lastNameParts] = fullName.trim().split(/\s+/);
    const payload = {
      first_name: firstName ?? '',
      last_name: lastNameParts.join(' '),
      email,
      phone: fullPhone,
      linkedin: linkedIn,
      language,
      profile_pic: profileImage ?? undefined
    };

    const hasAnyPersonalValue = Object.values(payload).some(Boolean);
    if (hasAnyPersonalValue) {
      const res = hasExistingPersonal.current
        ? await updatePersonal(payload)
        : await createPersonal(payload);
      if (res.status === 'success') {
        hasExistingPersonal.current = true;
      }
    }

    onSave((prev: OnboardingData) => ({
      ...prev,
      additionalData: {
        ...prev.additionalData,
        stepData: {
          ...prev.additionalData.stepData,
          first_name: {
            editorState: prev.additionalData.stepData?.first_name?.editorState,
            isCompleted: !!fullName
          },
          email: {
            editorState: prev.additionalData.stepData?.email?.editorState,
            isCompleted: !!email
          },
          phone: {
            editorState: prev.additionalData.stepData?.phone?.editorState,
            isCompleted: phoneFilled
          },
          language: {
            editorState: prev.additionalData.stepData?.language?.editorState,
            isCompleted: !!language
          },
          linkedin: {
            editorState: prev.additionalData.stepData?.linkedin?.editorState,
            isCompleted: !!linkedIn
          },
          profile_pic: {
            editorState: prev.additionalData.stepData?.profile_pic?.editorState,
            isCompleted: !!profileImage
          }
        }
      }
    }));
    onContinue?.();
  };

  const openExperienceModalForCreate = () => {
    setEditingExperienceId(null);
    setCurrentlyWorking(false);
    setExperienceDraft({
      jobTitle: '',
      companyName: '',
      companyLocation: '',
      startDate: '',
      endDate: '',
      achievements: '',
      keyResponsibilities: ''
    });
    setIsExperienceModalOpen(true);
  };

  const openExperienceModalForEdit = (item: ExperienceItem) => {
    setEditingExperienceId(item.id);
    setCurrentlyWorking(item.endDate === '');
    setExperienceDraft({
      jobTitle: item.jobTitle,
      companyName: item.companyName,
      companyLocation: item.companyLocation,
      startDate: item.startDate,
      endDate: item.endDate,
      achievements: item.achievements,
      keyResponsibilities: item.keyResponsibilities
    });
    setIsExperienceModalOpen(true);
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
  };

  const saveExperienceDraft = async () => {
    if (!experienceDraft.jobTitle.trim() || !experienceDraft.companyName.trim()) return;

    const description = `${experienceDraft.keyResponsibilities}\n${experienceDraft.achievements}`.trim();
    const payload = {
      job_title: experienceDraft.jobTitle.trim(),
      company_name: experienceDraft.companyName.trim(),
      location: experienceDraft.companyLocation.trim(),
      start_date: experienceDraft.startDate.trim(),
      end_date: currentlyWorking ? '' : experienceDraft.endDate.trim(),
      description,
      currently_working: currentlyWorking
    };

    let res;
    if (editingExperienceId) {
      res = await updateExperience(editingExperienceId, payload);
    } else {
      res = await createExperience(payload);
    }

    if (res.status === 'success') {
      const savedData = res.data as any;
      const newItem: ExperienceItem = {
        id: editingExperienceId || savedData?.id || Date.now().toString(),
        jobTitle: experienceDraft.jobTitle.trim(),
        companyName: experienceDraft.companyName.trim(),
        companyLocation: experienceDraft.companyLocation.trim(),
        startDate: experienceDraft.startDate.trim(),
        endDate: currentlyWorking ? '' : experienceDraft.endDate.trim(),
        achievements: experienceDraft.achievements.trim(),
        keyResponsibilities: experienceDraft.keyResponsibilities.trim()
      };
      if (editingExperienceId) {
        setExperienceItems((prev) => prev.map((item) => (item.id === editingExperienceId ? newItem : item)));
      } else {
        setExperienceItems((prev) => [newItem, ...prev]);
      }
      setIsExperienceModalOpen(false);
    } else {
      console.error('Failed to save experience:', res.message);
    }
  };

  const deleteExperience = async (id: string) => {
    const res = await deleteExperienceApi(id);
    if (res.status === 'success') {
      setExperienceItems((prev) => prev.filter((it) => it.id !== id));
      setExperienceExpanded((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const toggleExperienceExpanded = (id: string) => {
    setExperienceExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const experienceBullets = (item: ExperienceItem) => {
    const bullets = [
      ...item.keyResponsibilities
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      ...item.achievements
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    ];
    return bullets.map((b) => b.replace(/^[-•]\s*/, '')).filter(Boolean);
  };

  return (
    <>
      {/* Mobile dark header */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: '20px',
          bgcolor: '#04040E',
          color: '#ffffff',
          p: { xs: '24px 16px', sm: '32px 20px' },
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
              fontSize: { xs: '28px', sm: '32px' },
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
              fontSize: { xs: '14px', sm: '16px' },
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
              <Box sx={{ width: '75%', height: '100%', bgcolor: '#DABF67', borderRadius: '3px' }} />
            </Box>
            <Typography
              sx={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 400, lineHeight: '140%' }}
            >
              3/4 completed
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          bgcolor: '#fff',
          borderRadius: { xs: 0, md: '12px' },
          border: '1px solid #f0f0f0',
          overflow: 'hidden',
          minHeight: { xs: 0, md: 'calc(100vh - 48px)' }
        }}
      >
        {/* Header */}
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
              Personal details
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
                sx={{ width: '75%', height: '100%', bgcolor: '#DABF67', borderRadius: '999px' }}
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
              3/4 completed
            </Typography>
          </Box>
        </Box>

        {isTabletOrDown ? (
          <Box
            sx={{
              mx: { xs: 2, sm: 4 },
              border: '1px solid #e0dbd2',
              borderRadius: '6px',
              overflow: 'hidden'
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 44,
                '& .MuiTabs-indicator': { bgcolor: '#C9A84C', height: 3 },
                '& .MuiTabs-scrollButtons': { color: '#6b7280' }
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab}
                  label={tab}
                  sx={{
                    minHeight: 44,
                    py: 1,
                    px: 1.5,
                    textTransform: 'none',
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: { xs: '12px', sm: '13px' },
                    fontWeight: 600,
                    color: '#6b7280',
                    whiteSpace: 'nowrap',
                    '&.Mui-selected': { color: '#0f172a' }
                  }}
                />
              ))}
            </Tabs>
          </Box>
        ) : (
          <>
            {/* ── Chevron Tab Nav ── */}
            {/* Outer border makes white tabs visible without using outline (which bleeds through) */}
            <Box
              sx={{
                display: 'flex',
                width: 'auto',
                mx: { xs: 2, sm: 4 },
                border: '1px solid #e0dbd2',
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            >
              {TABS.map((tab, i) => {
                const isActive = i === activeTab;
                const isDone = i < activeTab;
                const isLast = i === TABS.length - 1;
                const ARROW = 12; // px — keep small for minimal gap

                // Active → golden | Done → light beige | Upcoming → white
                const bg = isActive ? '#C9A84C' : isDone ? '#e8dfc8' : '#ffffff';
                const textColor = isActive ? '#ffffff' : isDone ? '#9a8a6a' : '#6b7280';
                const fontWeight = isActive ? 700 : isDone ? 600 : 500;

                return (
                  <Box
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    sx={{
                      position: 'relative',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '48px',
                      background: bg,
                      cursor: 'pointer',
                      paddingLeft: i === 0 ? '16px' : `${ARROW + 14}px`,
                      paddingRight: isLast ? '16px' : `${ARROW + 8}px`,
                      // Pull tabs together so clip-path edges touch exactly
                      marginRight: isLast ? 0 : `-${ARROW}px`,
                      // Earlier tabs sit on top so their arrow clips cleanly over the next
                      zIndex: TABS.length - i,
                      userSelect: 'none',
                      clipPath:
                        i === 0 && isLast
                          ? 'none'
                          : i === 0
                            ? `polygon(0% 0%, calc(100% - ${ARROW}px) 0%, 100% 50%, calc(100% - ${ARROW}px) 100%, 0% 100%)`
                            : isLast
                              ? `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, ${ARROW}px 50%)`
                              : `polygon(0% 0%, calc(100% - ${ARROW}px) 0%, 100% 50%, calc(100% - ${ARROW}px) 100%, 0% 100%, ${ARROW}px 50%)`
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight,
                        color: textColor,
                        fontFamily: 'Satoshi, sans-serif',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {tab}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
          {activeTab === 0 && (
            <>
              <Typography
                sx={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: { xs: '15px', sm: '16px' },
                  fontWeight: 700,
                  color: '#0f172a',
                  mb: '4px'
                }}
              >
                Your CV heading
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontSize: { xs: '12px', sm: '13px' },
                  color: '#6b7280',
                  mb: { xs: 2.5, sm: 3 }
                }}
              >
                How do you want employers to contact you?
              </Typography>

              {/* Profile image upload */}
              <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 76, sm: 90 },
                    height: { xs: 76, sm: 90 }
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 76, sm: 90 },
                      height: { xs: 76, sm: 90 },
                      borderRadius: '50%',
                      overflow: 'hidden',
                      bgcolor: '#e8e8e8'
                    }}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Image
                        src="/image/figma/contact_image.png"
                        width={90}
                        height={90}
                        alt="Contact"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    )}
                  </Box>
                  <Box
                    onClick={() => {
                      if (profileImage) {
                        setProfileImage(null);
                      } else {
                        fileInputRef.current?.click();
                      }
                    }}
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      width: { xs: 22, sm: 26 },
                      height: { xs: 22, sm: 26 },
                      bgcolor: '#DABF67',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: { xs: '15px', sm: '18px' },
                      color: '#fff',
                      fontWeight: 700,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                      lineHeight: 1
                    }}
                  >
                    {profileImage ? '×' : '+'}
                  </Box>
                </Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
              </Box>

              {/* Form grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: { xs: 2, sm: 2.5 }
                }}
              >
                <Box>
                  <Typography sx={labelSx}>Full Name</Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    sx={inputSx}
                  />
                </Box>

                <Box>
                  <Typography sx={labelSx}>Language</Typography>
                  <Select
                    fullWidth
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as string)}
                    displayEmpty
                    sx={{
                      borderRadius: '10px',
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    <MenuItem value="" disabled>
                      <Typography
                        sx={{
                          color: '#9ca3af',
                          fontFamily: 'Satoshi, sans-serif',
                          fontSize: '14px'
                        }}
                      >
                        Select language
                      </Typography>
                    </MenuItem>
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Hindi">Hindi</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                  </Select>
                </Box>

                <Box>
                  <Typography sx={labelSx}>Email Address</Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={inputSx}
                  />
                </Box>

                <Box>
                  <Typography sx={labelSx}>Phone Number</Typography>
                  <TextField
                    fullWidth
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ pr: 0 }}>
                            <Select
                              value={countryCode}
                              onChange={handleCountryCodeChange}
                              variant="standard"
                              size="small"
                              sx={{
                                width: 85,
                                mr: 1,
                                '& .MuiSelect-select': { py: 0.5, px: 0.5, fontWeight: 500, fontSize: '13px' },
                                '& .MuiSelect-standard': { paddingTop: 0, paddingBottom: 0 }
                              }}
                            >
                              {countryCodes.map((cc) => (
                                <MenuItem key={cc.code} value={cc.code}>
                                  {cc.code}
                                </MenuItem>
                              ))}
                            </Select>
                          </InputAdornment>
                        )
                    }}
                    sx={inputSx}
                  />
               </Box>

               <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' }, display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                 <input
                   type="checkbox"
                   id="currentlyWorking"
                   checked={currentlyWorking}
                   onChange={(e) => setCurrentlyWorking(e.target.checked)}
                   style={{ width: 16, height: 16, cursor: 'pointer' }}
                 />
                 <Typography component="label" htmlFor="currentlyWorking" sx={{ fontSize: 14, color: '#333', cursor: 'pointer' }}>
                   Currently working here
                 </Typography>
               </Box>

               <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <Typography sx={labelSx}>LinkedIn Profile</Typography>
                  <TextField
                    fullWidth
                    placeholder="username"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{
                              fontSize: '14px',
                              color: '#6b7280',
                              fontFamily: 'Satoshi, sans-serif',
                              borderRight: '1px solid #e5e7eb',
                              pr: 1,
                              mr: 0.5,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            linkedin.com/in/
                          </Typography>
                        </InputAdornment>
                      )
                    }}
                    sx={inputSx}
                  />
                </Box>
              </Box>
            </>
          )}

          {activeTab === 2 && <EducationSection />}
          {activeTab === 3 && <CertificationsSection />}

          {activeTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: { xs: '16px', sm: '18px' },
                      fontWeight: 700,
                      color: '#0f172a',
                      mb: '4px'
                    }}
                  >
                    Experience
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: { xs: '13px', sm: '14px' },
                      color: '#374151'
                    }}
                  >
                    Review your experience history.
                  </Typography>
                </Box>

                <Box
                  onClick={openExperienceModalForCreate}
                  sx={{
                    ...pillButtonSx,
                    border: '1.5px solid #DABF67',
                    color: '#1a1a1a',
                    bgcolor: '#fff',
                    '&:hover': { bgcolor: '#fffaf0' }
                  }}
                >
                  Add
                </Box>
              </Box>

              {experienceItems.length === 0 ? (
                <Box
                  sx={{
                    borderRadius: '12px',
                    border: '1px solid #eef2f7',
                    bgcolor: '#fafafa',
                    p: { xs: 2, sm: 2.5 }
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'Satoshi, sans-serif',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}
                  >
                    No work experience added yet. Click “Add” to create one.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {experienceItems.map((item) => {
                    const bullets = experienceBullets(item);
                    const expanded = !!experienceExpanded[item.id];
                    const visibleBullets = expanded ? bullets : bullets.slice(0, 2);

                    return (
                      <Box
                        key={item.id}
                        sx={{
                          borderRadius: '12px',
                          bgcolor: '#fafafa',
                          border: '1px solid #f1f5f9',
                          p: { xs: 2, sm: 2.5 },
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
                          gap: 1.5
                        }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontFamily: 'Satoshi, sans-serif',
                              fontSize: { xs: '14px', sm: '15px' },
                              fontWeight: 700,
                              color: '#0f172a',
                              mb: '4px'
                            }}
                          >
                            {item.jobTitle}, {item.companyName}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: 'Satoshi, sans-serif',
                              fontSize: { xs: '12px', sm: '13px' },
                              color: '#6b7280',
                              mb: 1
                            }}
                          >
                            {item.companyLocation}
                            {(item.startDate || item.endDate) && (
                              <>
                                {' '}
                                - ({item.startDate || 'Start'} - {item.endDate || 'Present'})
                              </>
                            )}
                          </Typography>

                          {visibleBullets.length > 0 && (
                            <Box component="ul" sx={{ m: 0, pl: 2, display: 'grid', gap: '6px' }}>
                              {visibleBullets.map((b, idx) => (
                                <Box
                                  key={`${item.id}_${idx}`}
                                  component="li"
                                  sx={{
                                    fontFamily: 'Satoshi, sans-serif',
                                    fontSize: { xs: '13px', sm: '14px' },
                                    color: '#111827',
                                    lineHeight: 1.5
                                  }}
                                >
                                  {b}
                                </Box>
                              ))}
                            </Box>
                          )}

                          {bullets.length > 2 && (
                            <Typography
                              onClick={() => toggleExperienceExpanded(item.id)}
                              sx={{
                                mt: 1,
                                fontFamily: 'Satoshi, sans-serif',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#b47a00',
                                cursor: 'pointer',
                                width: 'fit-content'
                              }}
                            >
                              {expanded ? 'Show less' : 'Read more'}
                            </Typography>
                          )}
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            justifyContent: { xs: 'flex-start', sm: 'flex-end' }
                          }}
                        >
                          <IconButton
                            onClick={() => openExperienceModalForEdit(item)}
                            sx={{
                              width: 36,
                              height: 36,
                              border: '1.5px solid #DABF67',
                              bgcolor: '#fff'
                            }}
                          >
                            <EditOutlinedIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />
                          </IconButton>
                          <IconButton
                            onClick={() => deleteExperience(item.id)}
                            sx={{
                              width: 36,
                              height: 36,
                              border: '1.5px solid #DABF67',
                              bgcolor: '#fff'
                            }}
                          >
                            <DeleteOutlineRoundedIcon sx={{ fontSize: 19, color: '#1a1a1a' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          )}
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
              onClick={handleContinue}
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

      {/* Work Experience Right Panel */}
      <Drawer
        anchor="right"
        open={isExperienceModalOpen}
        onClose={closeExperienceModal}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 612 },
            borderTopLeftRadius: { xs: 0, sm: '12px' },
            borderBottomLeftRadius: { xs: 0, sm: '12px' },
            borderLeft: { xs: 'none', sm: '1px solid #DFDFDF' }
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 80,
              px: 3,
              borderBottom: '1px solid #DFDFDF'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Satoshi, sans-serif',
                fontSize: { xs: '16px', sm: '18px' },
                fontWeight: 700,
                color: '#04040E'
              }}
            >
              {editingExperienceId ? 'Edit Experience' : 'Add New Experience'}
            </Typography>
            <IconButton
              onClick={closeExperienceModal}
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#F4F4F4',
                borderRadius: '8px',
                '&:hover': { bgcolor: '#ededed' }
              }}
            >
              <CloseRoundedIcon sx={{ color: '#000', fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
              }}
            >
              <Box>
                <Typography sx={labelSx}>Job Title</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter designation"
                  value={experienceDraft.jobTitle}
                  onChange={(e) => setExperienceDraft((p) => ({ ...p, jobTitle: e.target.value }))}
                  sx={inputSx}
                />
              </Box>

              <Box>
                <Typography sx={labelSx}>Company Name</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter company name"
                  value={experienceDraft.companyName}
                  onChange={(e) =>
                    setExperienceDraft((p) => ({ ...p, companyName: e.target.value }))
                  }
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <Typography sx={labelSx}>Company Location</Typography>
                <TextField
                  fullWidth
                  placeholder="Enter the location where you were primarily based out of"
                  value={experienceDraft.companyLocation}
                  onChange={(e) =>
                    setExperienceDraft((p) => ({ ...p, companyLocation: e.target.value }))
                  }
                  sx={inputSx}
                />
              </Box>

              <Box>
                <Typography sx={labelSx}>Start Date</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Jan 2022"
                  value={experienceDraft.startDate}
                  onChange={(e) => setExperienceDraft((p) => ({ ...p, startDate: e.target.value }))}
                  sx={inputSx}
                />
              </Box>

              <Box>
                <Typography sx={labelSx}>End Date</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Present / Mar 2025"
                  value={experienceDraft.endDate}
                  onChange={(e) => setExperienceDraft((p) => ({ ...p, endDate: e.target.value }))}
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <Typography sx={labelSx}>Achievements</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder="Mention measurable achievements"
                  value={experienceDraft.achievements}
                  onChange={(e) =>
                    setExperienceDraft((p) => ({ ...p, achievements: e.target.value }))
                  }
                  sx={inputSx}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <Typography sx={labelSx}>Key Responsibilities</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder="Describe your work responsibilities"
                  value={experienceDraft.keyResponsibilities}
                  onChange={(e) =>
                    setExperienceDraft((p) => ({ ...p, keyResponsibilities: e.target.value }))
                  }
                  sx={inputSx}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: '#DFDFDF' }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, px: 3, py: 2.5 }}>
            {editingExperienceId ? (
              <>
                <Box
                  onClick={() => {
                    deleteExperience(editingExperienceId);
                    closeExperienceModal();
                  }}
                  sx={{
                    ...pillButtonSx,
                    border: '1.5px solid #DABF67',
                    color: '#04040E',
                    bgcolor: '#fff',
                    '&:hover': { bgcolor: '#fffaf0' }
                  }}
                >
                  Delete
                </Box>
                <Box
                  onClick={saveExperienceDraft}
                  sx={{
                    ...pillButtonSx,
                    bgcolor: '#DABF67',
                    color: '#04040E',
                    '&:hover': { bgcolor: '#c9ae56' },
                    opacity:
                      experienceDraft.jobTitle.trim() && experienceDraft.companyName.trim()
                        ? 1
                        : 0.6,
                    pointerEvents:
                      experienceDraft.jobTitle.trim() && experienceDraft.companyName.trim()
                        ? 'auto'
                        : 'none'
                  }}
                >
                  Update
                </Box>
              </>
            ) : (
              <>
                <Box
                  onClick={closeExperienceModal}
                  sx={{
                    ...pillButtonSx,
                    border: '1.5px solid #DABF67',
                    color: '#04040E',
                    bgcolor: '#fff',
                    '&:hover': { bgcolor: '#fffaf0' }
                  }}
                >
                  Cancel
                </Box>
                <Box
                  onClick={saveExperienceDraft}
                  sx={{
                    ...pillButtonSx,
                    bgcolor: '#DABF67',
                    color: '#04040E',
                    '&:hover': { bgcolor: '#c9ae56' },
                    opacity:
                      experienceDraft.jobTitle.trim() && experienceDraft.companyName.trim()
                        ? 1
                        : 0.6,
                    pointerEvents:
                      experienceDraft.jobTitle.trim() && experienceDraft.companyName.trim()
                        ? 'auto'
                        : 'none'
                  }}
                >
                  Add
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default PersonalDetailsForm;
