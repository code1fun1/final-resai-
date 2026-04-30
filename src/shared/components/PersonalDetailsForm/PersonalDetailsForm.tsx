import { FC, useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Divider
} from '@mui/material';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { OnboardingData, AdditionalData } from '~/modules/Onboarding/Utils/OnboardingUtils';
import { EducationSection } from './EducationSection';
import { CertificationsSection } from './CertificationsSection';
import { getPersonal } from '~/modules/Onboarding/AdditionalDetails/Utils/ProfileTabsUtils';

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

const PersonalDetailsForm: FC<PersonalDetailsFormProps> = ({
  onSave,
  onBack,
  onCancel,
  onContinue
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasFetchedPersonal = useRef(false);

  const [fullName, setFullName] = useState('');
  const [language, setLanguage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

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
        const d = res.data;
        if (d.first_name || d.last_name) {
          setFullName(`${d.first_name ?? ''} ${d.last_name ?? ''}`.trim());
        }
        if (d.email) setEmail(d.email);
        if (d.phone) setPhone(d.phone);
        if (d.linkedin) setLinkedIn(d.linkedin);
        if (d.language) setLanguage(d.language);
        if (d.profile_pic) setProfileImage(d.profile_pic);
      }
    };
    fetchPersonalDetails();
  }, [activeTab]);

  const handleContinue = () => {
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
            isCompleted: !!phone
          }
        }
      }
    }));
    onContinue?.();
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
                    onClick={() => fileInputRef.current?.click()}
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
                    +
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
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              pr: 1,
                              mr: 0.5,
                              borderRight: '1px solid #e5e7eb'
                            }}
                          >
                            <span style={{ fontSize: '16px' }}>🇺🇸</span>
                            <Typography
                              sx={{
                                fontSize: '13px',
                                color: '#374151',
                                fontFamily: 'Satoshi, sans-serif'
                              }}
                            >
                              US
                            </Typography>
                            <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>▼</Typography>
                          </Box>
                        </InputAdornment>
                      )
                    }}
                    sx={inputSx}
                  />
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200
              }}
            >
              <Typography
                sx={{ fontFamily: 'Satoshi, sans-serif', fontSize: '15px', color: '#9ca3af' }}
              >
                Coming soon
              </Typography>
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
    </>
  );
};

export default PersonalDetailsForm;
