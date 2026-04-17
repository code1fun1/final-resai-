import React, { useState, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
  Link,
  Slide,
  Fade
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface DetailsPanelProps {
  open: boolean;
  onClose: () => void;
  skill: SkillType | null;
  parentRef: React.RefObject<HTMLDivElement>;
}
interface SkillDetails {
  current: number;
  target: number;
  away: number;
  tips: string[];
  path: { label: string; pts: number }[];
  reason: string;
}
interface SkillType {
  score: number;
  text: string;
  points: string;
  points_gap_status: string;
  link: string;
  color: string;
  type: 'missing' | 'matches';
  details: SkillDetails;
}

const DetailsPanel = ({ open, onClose, skill, parentRef }: DetailsPanelProps) => {
  const { t: i18n } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  if (!skill) return null;
  const { text, details } = skill;
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit container={parentRef?.current}>
      <Box
        sx={{
          position: { xs: 'fixed', md: 'absolute' },
          top: 0,
          right: 0,
          width: { xs: '100vw', md: 480 },
          height: { xs: '100vh', md: '100%' },
          bgcolor: '#fff',
          boxShadow: '-8px 0 32px 0 rgba(5, 5, 6, 0.80)',
          borderRadius: { xs: 0, md: '0 16px 16px 0' },
          zIndex: 1400,
          display: 'flex',
          flexDirection: 'column',
          px: { xs: '5px', md: 4 },
          py: { xs: 2, md: 4 },
          overflow: 'visible'
        }}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        {isMobile ? (
          <Button
            onClick={onClose}
            aria-label={i18n('skillAnalysisModal.close')}
            variant="contained"
            sx={{
              position: 'absolute',
              right: 15,
              top: 12,
              zIndex: 1401,
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: 16,
              color: '#fff',
              bgcolor: '#424246',
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px rgba(1,71,253,0.08)',
              textTransform: 'none',
              minWidth: 0,
              '&:hover': { bgcolor: '#232323' }
            }}
          >
            {i18n('skillAnalysisModal.close')}
          </Button>
        ) : (
          <IconButton
            aria-label={i18n('skillAnalysisModal.close')}
            onClick={onClose}
            sx={{
              position: 'absolute',
              left: { xs: '-12px', md: '-20px' },
              top: { xs: 12, md: 32 },
              bgcolor: '#F7F8FB',
              borderRadius: '50%',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
              width: { xs: 44, md: 40 },
              height: { xs: 44, md: 40 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              zIndex: 1401
            }}
          >
            <Image
              src="/image/figma/arrow-right.svg"
              alt={i18n('skillAnalysisModal.close')}
              width={32}
              height={32}
              style={{ display: 'block' }}
              unoptimized
            />
          </IconButton>
        )}
        <Box sx={{ overflow: 'scroll' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, pl: 3 }}>
            <Typography sx={{ fontFamily: 'Afacad', fontWeight: 700, fontSize: 20 }}>
              {text}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: '#F7F8FB', borderRadius: 2, p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircleMeter
                  value={details.current}
                  size={isMobile ? 36 : 36}
                  fontSize={isMobile ? 13 : 16}
                  target={details.target}
                />
                <Typography
                  sx={{
                    fontFamily: 'Afacad',
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#232323',
                    ml: 1
                  }}
                >
                  {i18n('skillAnalysisModal.currentScore', { ns: 'common' })}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircleMeter
                  value={details.target}
                  size={isMobile ? 36 : 36}
                  fontSize={isMobile ? 13 : 16}
                  color={'#01D392'}
                />
                <Typography
                  sx={{
                    fontFamily: 'Afacad',
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#232323',
                    ml: 1
                  }}
                >
                  {i18n('skillAnalysisModal.targetScore')}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ borderBottom: '1px solid var(--Neutrals-N10, #E2E2E3)', my: 2, width: '100%' }}
            />
            <Typography
              sx={{ fontFamily: 'Afacad', fontWeight: 400, fontSize: 15, color: '#424246' }}
            >
              {i18n('skillAnalysisModal.pointsSummary', {
                away: Math.abs(details.away),
                direction:
                  details.away > 0
                    ? i18n('skillAnalysisModal.awayFrom')
                    : i18n('skillAnalysisModal.above'),
                text
              })}
            </Typography>
          </Box>
          {details.tips && details.tips.length > 0 && (
            <>
              <Typography sx={{ fontFamily: 'Afacad', fontWeight: 700, fontSize: 16, mb: 1 }}>
                {i18n('skillAnalysisModal.developmentTips')}
              </Typography>
              <Box
                component="ul"
                sx={{ pl: 3, mb: 3, color: '#424246', fontFamily: 'Afacad', fontSize: 15 }}
              >
                {details.tips.map((tip: string, i: number) => (
                  <li key={i} style={{ marginBottom: 4 }}>
                    {tip}
                  </li>
                ))}
              </Box>
            </>
          )}
          {details.path && details.path.length > 0 && (
            <>
              <Typography sx={{ fontFamily: 'Afacad', fontWeight: 700, fontSize: 16, mb: 1 }}>
                {i18n('skillAnalysisModal.pathToScore', { target: details.target })}{' '}
                {details.target}
              </Typography>
              <Box
                sx={{
                  mb: 3,
                  mt: 1,
                  borderRadius: 2,
                  py: 0.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                {details.path.map((item: { label: string; pts: number }, i: number) => (
                  <Box
                    key={i}
                    sx={{
                      padding: '8px 16px',
                      gap: '22px',
                      display: 'flex',
                      bgcolor: '#F7F8FB',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: 'Afacad', fontWeight: 400, fontSize: { xs: 14, md: 15 } }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Afacad',
                        fontWeight: 700,
                        fontSize: { xs: 14, md: 15 },
                        color: '#232323'
                      }}
                    >
                      +{item.pts} {i18n('skillAnalysisModal.pts')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
          {details.reason && details.reason.length > 0 && (
            <>
              <Typography sx={{ fontFamily: 'Afacad', fontWeight: 700, fontSize: 16, mb: 1 }}>
                {i18n('skillAnalysisModal.reasonForLowScore')}
              </Typography>
              <Typography
                sx={{ fontFamily: 'Afacad', fontWeight: 400, fontSize: 15, color: '#424246' }}
              >
                {details.reason}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Slide>
  );
};

const getMeterColor = (score: number, target: number = 100): string => {
  if (score >= target) return '#01D392'; // Green
  if (score >= 50 && score < target) return '#FFC107'; // Yellow
  return '#FF422D'; // Red
};

interface CircleMeterProps {
  value: number;
  max?: number;
  color?: string;
  size?: number;
  stroke?: number;
  fontSize?: number;
  target?: number;
}

const CircleMeter = ({
  value,
  max = 100,
  color,
  size = 44,
  stroke = 3,
  fontSize = 16,
  target = 100
}: CircleMeterProps) => {
  const meterColor = color || getMeterColor(value, target);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - progress);
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="#fff"
        stroke="#E2E2E3"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={meterColor}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".35em"
        fontFamily="Afacad"
        fontWeight="700"
        fontSize={fontSize}
        fill={meterColor}
      >
        {value}
      </text>
    </svg>
  );
};

interface SkillAnalysisSummaryModalProps {
  open?: boolean;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
  data?: unknown;
  loading?: boolean;
  error?: string | null;
}

// Add type for API response
interface SkillAnalysisApiResponse {
  skill_analysis_details: {
    skill_summary: {
      matches: number;
      missing: number;
      match_percentage: number;
    };
    matched_skills: {
      technical_skills: Array<{
        score: number;
        skill: string;
        points_needed?: number;
        points_gap_status?: string;
        development_tips?: string[];
        path_to_target_score?: Array<{ step: string; points: number }>;
        reason_for_low_score?: string;
        reason?: string;
        target_score?: number;
      }>;
      soft_skills: Array<{
        score: number;
        skill: string;
        points_needed?: number;
        points_gap_status?: string;
        development_tips?: string[];
        path_to_target_score?: Array<{ step: string; points: number }>;
        reason_for_low_score?: string;
        reason?: string;
        target_score?: number;
      }>;
    };
    missing_skills: {
      technical_skills: Array<{
        score: number;
        skill: string;
        points_needed?: number;
        points_gap_status?: string;
        development_tips?: string[];
        path_to_target_score?: Array<{ step: string; points: number }>;
        reason_for_low_score?: string;
        reason?: string;
        target_score?: number;
      }>;
      soft_skills: Array<{
        score: number;
        skill: string;
        points_needed?: number;
        points_gap_status?: string;
        development_tips?: string[];
        path_to_target_score?: Array<{ step: string; points: number }>;
        reason_for_low_score?: string;
        reason?: string;
        target_score?: number;
      }>;
    };
  };
}

const SkillAnalysisSummaryModal: React.FC<SkillAnalysisSummaryModalProps> = ({
  open = true,
  onClose,
  closeOnBackdropClick = true,
  data,
  loading,
  error
}) => {
  const { t: i18n } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tab, setTab] = useState(1); // Default to 'Missing'
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillType | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleViewDetails = (skill: SkillType) => {
    setSelectedSkill(skill);
    setDetailsOpen(true);
  };
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };
  const handleModalClose = () => {
    if (onClose) onClose();
  };

  if (!open) return null;
  if (loading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(30, 28, 28, 0.95)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 2, minWidth: 300, textAlign: 'center' }}>
          {i18n('common:loading', 'Loading...')}
        </Paper>
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(30, 28, 28, 0.95)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 2, minWidth: 300, textAlign: 'center', color: 'red' }}>
          {error}
        </Paper>
      </Box>
    );
  }

  // Defensive: If data is not present or not in expected format, show nothing
  if (!data || typeof data !== 'object' || !('skill_analysis_details' in data)) return null;
  const detailsData = (data as SkillAnalysisApiResponse).skill_analysis_details;

  // Map API/dummy data to SkillType[] for technical and soft skills
  let technicalSkillsMapped: SkillType[] = [];
  let softSkillsMapped: SkillType[] = [];
  let matchCount = 0;
  let missingCount = 0;
  let matchPercentage = 0;
  matchCount = detailsData.skill_summary?.matches || 0;
  missingCount = detailsData.skill_summary?.missing || 0;
  matchPercentage = detailsData.skill_summary?.match_percentage || 0;
  if (tab === 1) {
    technicalSkillsMapped = (detailsData.missing_skills?.technical_skills || []).map((s) => ({
      score: s.score,
      text: s.skill.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
      points: s.points_needed ? s.points_needed.toString() : '0',
      points_gap_status: s.points_gap_status || '',
      link: i18n('skillAnalysisModal.viewDetails'),
      color: '#FF422D',
      type: 'missing',
      details: {
        current: s.score,
        target: s.target_score || 100,
        away: (s.target_score || 100) - s.score,
        tips: s.development_tips || [],
        path: (s.path_to_target_score || []).map((p) => ({ label: p.step, pts: p.points })),
        reason: s.reason_for_low_score || ''
      }
    }));
    softSkillsMapped = (detailsData.missing_skills?.soft_skills || []).map((s) => ({
      score: s.score,
      text: s.skill.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
      points: s.points_needed ? s.points_needed.toString() : '0',
      points_gap_status: s.points_gap_status || '',
      link: i18n('skillAnalysisModal.viewDetails'),
      color: '#FF422D',
      type: 'missing',
      details: {
        current: s.score,
        target: s.target_score || 100,
        away: (s.target_score || 100) - s.score,
        tips: s.development_tips || [],
        path: (s.path_to_target_score || []).map((p) => ({ label: p.step, pts: p.points })),
        reason: s.reason_for_low_score || ''
      }
    }));
  } else {
    technicalSkillsMapped = (detailsData.matched_skills?.technical_skills || []).map((s) => ({
      score: s.score,
      text: s.skill.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
      points: s.points_needed ? s.points_needed.toString() : '0',
      points_gap_status: s.points_gap_status || '',
      link: i18n('skillAnalysisModal.viewDetails'),
      color: '#01D392',
      type: 'matches',
      details: {
        current: s.score,
        target: s.target_score || 100,
        away: (s.target_score || 100) - s.score,
        tips: s.development_tips || [],
        path: (s.path_to_target_score || []).map((p) => ({ label: p.step, pts: p.points })),
        reason: s.reason_for_low_score || ''
      }
    }));
    softSkillsMapped = (detailsData.matched_skills?.soft_skills || []).map((s) => ({
      score: s.score,
      text: s.skill.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
      points: s.points_needed ? s.points_needed.toString() : '0',
      points_gap_status: s.points_gap_status || '',
      link: i18n('skillAnalysisModal.viewDetails'),
      color: '#01D392',
      type: 'matches',
      details: {
        current: s.score,
        target: s.target_score || 100,
        away: (s.target_score || 100) - s.score,
        tips: s.development_tips || [],
        path: (s.path_to_target_score || []).map((p) => ({ label: p.step, pts: p.points })),
        reason: s.reason_for_low_score || ''
      }
    }));
  }

  const filteredTechnical = technicalSkillsMapped;
  const filteredSoft = softSkillsMapped;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(30, 28, 28, 0.95)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-modal="true"
      role="dialog"
      onClick={closeOnBackdropClick ? handleModalClose : undefined}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: '12px',
          minWidth: { md: 900 },
          maxWidth: 1000,
          bgcolor: 'transparent',
          boxShadow: 'none',
          my: { xs: 1.5, md: 0 }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          ref={popupRef}
          sx={{
            borderRadius: '12px',
            overflow: 'visible',
            bgcolor: '#fff',
            boxShadow: '0px 24px 48px 0px rgba(0,0,0,0.05)',
            minWidth: { xs: 360, md: 969 },
            maxWidth: { xs: 360, md: 969 },
            maxHeight: { xs: 'calc(100vh - 24px)', md: 'none' },
            position: 'relative',
            overflowY: { xs: 'auto', md: 'visible' }
          }}
        >
          <Fade in={detailsOpen}>
            <Box
              onClick={closeOnBackdropClick ? handleModalClose : undefined}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(30, 28, 28, 0.55)',
                zIndex: 1399,
                display: detailsOpen ? 'block' : 'none'
              }}
            />
          </Fade>
          <Box
            sx={{
              bgcolor: '#5C5D61',
              color: '#fff',
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 3 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <Typography sx={{ fontFamily: 'Afacad', fontWeight: 600, fontSize: 20 }}>
              {i18n('skillAnalysisModal.skillAnalysisSummary', { ns: 'common' })}
            </Typography>
            <IconButton
              aria-label={i18n('skillAnalysisModal.close')}
              onClick={handleModalClose}
              sx={{ color: '#fff', position: 'absolute', right: 5, top: 5 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 48 },
              right: { xs: 8, md: 48 },
              top: { md: 55 },
              zIndex: 2,
              bgcolor: '#fff',
              borderRadius: { xs: '6px', md: '8px' },
              boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.08)',
              p: { xs: 1, md: 3 },
              minHeight: { xs: 0, md: 80 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              gap: { xs: 1, md: 3 }
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Afacad',
                  fontWeight: 400,
                  fontSize: { xs: 13, md: 14 },
                  color: '#424246'
                }}
              >
                {i18n('skillAnalysisModal.yourSkillMatchRate')}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Afacad',
                  fontWeight: 700,
                  fontSize: { xs: 28, md: 36 },
                  color: '#1D1E22',
                  mt: 1
                }}
              >
                {matchPercentage}%
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                gap: { xs: 1, md: 2 },
                mt: { xs: 1, md: 0 }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row' } }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#E4F9F2',
                    borderRadius: '6px',
                    px: { xs: 1, md: 2 },
                    py: 1,
                    mr: 2
                  }}
                >
                  <Image
                    src="/image/figma/copy_success.svg"
                    alt={i18n('skillAnalysisModal.matches')}
                    width={14}
                    height={14}
                    style={{ marginRight: 6 }}
                    unoptimized
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontFamily: 'Afacad',
                      fontSize: 16,
                      color: '#1A3B30',
                      mr: 1
                    }}
                  >
                    {i18n('skillAnalysisModal.matches')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: '#1A3B30',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      fontWeight: 700,
                      fontSize: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      ml: 1
                    }}
                  >
                    {matchCount}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#FFF9E3',
                    borderRadius: '6px',
                    px: 2,
                    py: 1,
                    mr: 2,
                    width: { xs: '50%', md: 'auto' }
                  }}
                >
                  <Image
                    src="/image/figma/missing_icon.svg"
                    alt={i18n('skillAnalysisModal.missing')}
                    width={10}
                    height={10}
                    style={{ marginRight: 6 }}
                    unoptimized
                  />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontFamily: 'Afacad',
                      fontSize: 16,
                      color: '#6C5811',
                      mr: 1
                    }}
                  >
                    {i18n('skillAnalysisModal.missing')}
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: '#6C5811',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      fontWeight: 700,
                      fontSize: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      ml: 1
                    }}
                  >
                    {missingCount}
                  </Box>
                </Box>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#424246',
                  color: '#fff',
                  borderRadius: { xs: '6px', md: '6px' },
                  px: 4,
                  py: 1.5,
                  fontFamily: 'Afacad',
                  fontWeight: 700,
                  fontSize: { xs: 16, md: 18 },
                  textTransform: 'none',
                  boxShadow: 'none',
                  width: { xs: '100%', md: 'auto' },
                  minHeight: 48,
                  mt: { xs: 1, md: 0 },
                  '&:hover': { bgcolor: '#232323' }
                }}
                aria-label={i18n('skillAnalysisModal.letsProceed')}
                onClick={handleModalClose}
              >
                {i18n('skillAnalysisModal.letsProceed')}
              </Button>
            </Box>
          </Box>
          <Box sx={{ pt: { xs: '200px', md: '120px' }, px: { xs: 1, md: 4 }, pb: 4 }}>
            <Box sx={{ mt: 2, mb: 3, ml: { xs: '20px' } }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                aria-label={i18n('skillTabs')}
                TabIndicatorProps={{ style: { display: 'none' } }}
                sx={{
                  minHeight: { xs: '22px', md: '44px' },
                  '& .MuiTabs-flexContainer': { gap: 2 },
                  '& .MuiButtonBase-root-MuiTab-root': { py: { xs: '5px', md: 1.5 } },
                  '& .MuiTab-root': {
                    minHeight: { xs: 30, md: 44 },
                    height: { xs: 30, md: 44 },
                    py: { xs: '12px', md: 1.5 },
                    borderRadius: '6px',
                    fontFamily: 'Afacad',
                    fontWeight: 500,
                    fontSize: { xs: 16, md: 18 },
                    color: '#232323',
                    px: { xs: '35px', md: 4 },
                    textTransform: 'none',
                    border: '1.5px solid #E2E2E3',
                    bgcolor: '#fff',
                    boxShadow: 'none',
                    transition: 'all 0.2s'
                  },
                  '& .Mui-selected': {
                    bgcolor: 'background: var(--Primary-16x-P0, #FCFDFF)',
                    color: '#232323  !important',
                    fontWeight: 600,
                    border: '2px solid #171717'
                  }
                }}
              >
                <Tab
                  label={i18n('skillAnalysisModal.matches')}
                  aria-label={i18n('skillAnalysisModal.matches')}
                />
                <Tab
                  label={i18n('skillAnalysisModal.missing')}
                  aria-label={i18n('skillAnalysisModal.missing')}
                />
              </Tabs>
            </Box>
            <Typography
              sx={{ fontFamily: 'Afacad', fontWeight: 400, fontSize: 15, color: '#424246', mb: 3 }}
            >
              {tab === 0
                ? i18n('skillAnalysisModal.skillAnalysisDescriptionMatches')
                : i18n('skillAnalysisModal.skillAnalysisDescription')}
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                overflow: { xs: 'visible', md: 'scroll' },
                height: { xs: 'auto', md: '265px' }
              }}
            >
              {filteredTechnical.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontFamily: 'Afacad', fontWeight: 700, fontSize: 18, mb: 2 }}>
                    {i18n('skillAnalysisModal.technicalSkills')}
                  </Typography>
                  {filteredTechnical.map((skill) => (
                    <Box
                      key={skill.text}
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        justifyContent: { md: 'space-between' },
                        border: '1.5px solid #E2E2E3',
                        borderRadius: '8px',
                        p: 2,
                        mb: 2,
                        bgcolor: '#fff',
                        gap: { xs: 0.5, md: 2 }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'row', md: 'row' },
                          alignItems: { xs: 'flex-start', md: 'center' },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 36, md: 44 },
                            height: { xs: 36, md: 44 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: { xs: 1, md: 1 },
                            fontFamily: 'Afacad',
                            fontWeight: 700,
                            fontSize: 16
                          }}
                        >
                          <CircleMeter
                            value={skill.score}
                            target={skill.details.target}
                            size={isMobile ? 36 : 36}
                            fontSize={isMobile ? 13 : 16}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { xs: '100%', md: 'auto' }
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Afacad',
                              fontWeight: 600,
                              fontSize: 16,
                              color: '#232323',
                              mb: { xs: 0.5, md: 0 }
                            }}
                          >
                            {skill.text}
                          </Typography>
                          <Box
                            sx={{
                              display: { xs: 'flex', md: 'none' },
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              mt: 0.5
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Afacad',
                                fontWeight: 400,
                                fontSize: 14,
                                color: '#232323',
                                display: 'inline'
                              }}
                            >
                              {skill.points_gap_status}
                            </Typography>
                            <Box sx={{ flex: 1 }} />
                            <Link
                              href="#"
                              underline="always"
                              sx={{
                                color: '#0066FF',
                                fontWeight: 600,
                                fontFamily: 'Afacad',
                                fontSize: 14,
                                minWidth: 68,
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleViewDetails(skill);
                              }}
                            >
                              {skill.link}
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          alignItems: 'center',
                          gap: 1,
                          ml: { md: 'auto' }
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Afacad',
                            fontWeight: 400,
                            fontSize: 14,
                            color: '#232323',
                            display: 'inline'
                          }}
                        >
                          {skill.points_gap_status}
                        </Typography>
                        <Link
                          href="#"
                          underline="always"
                          sx={{
                            color: '#0066FF',
                            fontWeight: 600,
                            fontFamily: 'Afacad',
                            fontSize: 14,
                            minWidth: { md: 68 }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewDetails(skill);
                          }}
                        >
                          {skill.link}
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Grid>
              )}
              {filteredSoft.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontFamily: 'Afacad', fontWeight: 700, fontSize: 18, mb: 2 }}>
                    {i18n('skillAnalysisModal.softSkills')}
                  </Typography>
                  {filteredSoft.map((skill) => (
                    <Box
                      key={skill.text}
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        justifyContent: { md: 'space-between' },
                        border: '1.5px solid #E2E2E3',
                        borderRadius: '8px',
                        p: 2,
                        mb: 2,
                        bgcolor: '#fff',
                        gap: { xs: 0.5, md: 2 }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'row', md: 'row' },
                          alignItems: { xs: 'flex-start', md: 'center' },
                          width: { xs: '100%', md: 'auto' }
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 36, md: 44 },
                            height: { xs: 36, md: 44 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: { xs: 1, md: 1 },
                            fontFamily: 'Afacad',
                            fontWeight: 700,
                            fontSize: 16
                          }}
                        >
                          <CircleMeter
                            value={skill.score}
                            target={skill.details.target}
                            size={isMobile ? 36 : 36}
                            fontSize={isMobile ? 13 : 16}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { xs: '100%', md: 'auto' }
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: 'Afacad',
                              fontWeight: 600,
                              fontSize: 16,
                              color: '#232323',
                              mb: { xs: 0.5, md: 0 }
                            }}
                          >
                            {skill.text}
                          </Typography>
                          <Box
                            sx={{
                              display: { xs: 'flex', md: 'none' },
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              mt: 0.5
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Afacad',
                                fontWeight: 400,
                                fontSize: 14,
                                color: '#232323',
                                display: 'inline'
                              }}
                            >
                              {skill.points_gap_status}
                            </Typography>
                            <Box sx={{ flex: 1 }} />
                            <Link
                              href="#"
                              underline="always"
                              sx={{
                                color: '#0066FF',
                                fontWeight: 600,
                                fontFamily: 'Afacad',
                                fontSize: 14,
                                minWidth: 68,
                                textAlign: 'right',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleViewDetails(skill);
                              }}
                            >
                              {skill.link}
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: { xs: 'none', md: 'flex' },
                          alignItems: 'center',
                          gap: 1,
                          ml: { md: 'auto' }
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Afacad',
                            fontWeight: 400,
                            fontSize: 14,
                            color: '#232323',
                            display: 'inline'
                          }}
                        >
                          {skill.points_gap_status}
                        </Typography>
                        <Link
                          href="#"
                          underline="always"
                          sx={{
                            color: '#0066FF',
                            fontWeight: 600,
                            fontFamily: 'Afacad',
                            fontSize: 14,
                            minWidth: { md: 68 }
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleViewDetails(skill);
                          }}
                        >
                          {skill.link}
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Grid>
              )}
            </Grid>
          </Box>
          <DetailsPanel
            open={detailsOpen}
            onClose={handleCloseDetails}
            skill={selectedSkill}
            parentRef={popupRef}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default SkillAnalysisSummaryModal;
