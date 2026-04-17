import { Box, Paper, Typography, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CircularProgressbar from '~/shared/components/CircularProgressBar';
import { TEXT_FONT_SIZE } from '~/shared/components/CircularProgressBar/CircularProgressBar';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './ScoreCardStyles';
import { useState, useEffect } from 'react';
import SkillAnalysisSummaryModal from '~/shared/components/SkillAnalysisSummaryModal/SkillAnalysisSummaryModal';
import httpRequest from '~/shared/utils/axios';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { getStorageItem } from '~/shared/utils/storage';
import { useRouter } from 'next/router';

interface ScoreCardProps {
  scorePercent: number;
  targetJob: string;
}

const ScoreCard = (props: ScoreCardProps) => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const { scorePercent, targetJob } = props;

  // Modal and API state
  const [modalOpen, setModalOpen] = useState(false);
  const [skillAnalysisData, setSkillAnalysisData] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [skillAnalysisError, setSkillAnalysisError] = useState<string | null>(null);
  const [skillAnalysisLoading, setSkillAnalysisLoading] = useState<boolean>(false);

  // Upskilling plan background generation
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [planError, setPlanError] = useState<boolean>(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const router = useRouter();

  const handleRecommendedJobsClick = () => {
    if (typeof window === 'undefined') return;

    // Store targetJob without exposing in URL
    sessionStorage.setItem('recommendedTargetJob', targetJob);

    router.push('/recommended-jobs');
  };

  const handleDownloadUpskillingPlan = async () => {
    if (!generatedPdfUrl) return;

    try {
      const response = await fetch(generatedPdfUrl);
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Technical-Upskilling-Plan.pdf';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('PDF download failed:', error);
    }
  };

  const handleRetryUpskillingPlan = async () => {
    setPlanError(false);
    setGeneratedPdfUrl(null);
    await generateTrainingPlanOnLoad();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // if (!lastResumeId) return;

    const fetchSkillAnalysis = async () => {
      const lastResumeId = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
      if (!lastResumeId) {
        setSkillAnalysisError('No resume ID found.');
        return;
      }

      setSkillAnalysisLoading(true);
      setSkillAnalysisError(null);

      try {
        const request = {
          url: `${APIS.USER_SKILL_ANALYSIS}/${lastResumeId}`,
          method: API_METHOD.GET
        };
        const [response] = await httpRequest(request);

        if (response && response?.res_data?.data?.[0]?.skill_analysis_content) {
          const data = response.res_data.data[0].skill_analysis_content;
          // console.log('Setting skill analysis data:', data);
          setSkillAnalysisData(data);
        } else {
          setSkillAnalysisError('No skill analysis data available.');
          setSkillAnalysisData(null);
        }
      } catch (err) {
        // console.error('Error fetching skill analysis:', err);
        setSkillAnalysisError('Failed to load skill analysis data.');
        setSkillAnalysisData(null);
      } finally {
        setSkillAnalysisLoading(false);
      }
    };
    fetchSkillAnalysis();
  }, []);

const generateTrainingPlanOnLoad = async () => {
  if (isRequestInProgress) {
    // eslint-disable-next-line no-console
    console.log('⛔ Skipping call - request already running');
    return;
  }

  const lastResumeId = getStorageItem({
    key: 'lastResumeId',
    useCombineStorage: true
  });

  if (!lastResumeId) return;

  try {
    setIsRequestInProgress(true);
    setIsGeneratingPlan(true);

    // ✅ ADD THIS BLOCK (missing)
    const request = {
      url: APIS.TRAINING_PLAN_GENERATOR,
      method: API_METHOD.POST,
      body: {
        req_param: {
          resume_id: lastResumeId
        }
      }
    };

    const [apiResponse] = await httpRequest(request);

    const resData = apiResponse?.res_data?.data;

    if (resData.status === 'IN_PROGRESS') {
      return;
    }

    if (resData.status === 'COMPLETED') {
      setGeneratedPdfUrl(resData.pdf_url);
      setIsGeneratingPlan(false);
      return;
    }

    if (resData.status === 'FAILED') {
      setPlanError(true);
      setIsGeneratingPlan(false);
      return;
    }

  } catch (error) {
    setPlanError(true);
    setIsGeneratingPlan(false);
  } finally {
    // eslint-disable-next-line no-console
    console.log('✅ Request finished → unlocking');
    setIsRequestInProgress(false);
  }
};

  useEffect(() => {
    generateTrainingPlanOnLoad();
  }, []);

  useEffect(() => {
    if (!isGeneratingPlan || generatedPdfUrl || planError) return;

    const interval = setInterval(() => {
      // eslint-disable-next-line no-console
      console.log('🔁 Polling triggered', {
        isGeneratingPlan,
        isRequestInProgress
      });
      generateTrainingPlanOnLoad();
    }, 5000);

    return () => clearInterval(interval);
  }, [isGeneratingPlan, generatedPdfUrl, planError, isRequestInProgress]);

  return (
    <Box
      component={Paper}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={2}
      // height={180}
      // minHeight={180}
      position="relative"
      sx={{ gap: 2 }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box className={styles.circularBarWrapper}>
          <CircularProgressbar
            strokeWidth={8}
            percentage={scorePercent}
            width="80px"
            height="80px"
            textFontSize={TEXT_FONT_SIZE.MIDDLE}
          />
        </Box>
        <Box display="flex" flexDirection={'column'} gap={1}>
          <Typography className={styles.heading}>{i18n('similarityScore')}</Typography>
          <Typography variant="body1" className={styles.subtitle}>
            {i18n('yourResumeJobAlignmentScore')}
          </Typography>
        </Box>
      </Box>
      {skillAnalysisData && (
        <Box display="flex" justifyContent="center" alignItems="flex-end" flex={1} width="100%">
          <button
            type="button"
            style={{
              background: '#424246',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '4px 12px',
              fontFamily: 'Afacad',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              minWidth: 100
            }}
            onClick={handleOpenModal}
          >
            {i18n('viewSkillAnalysis', 'View Skill Analysis')}
          </button>
        </Box>
      )}

      {skillAnalysisData && (
        <SkillAnalysisSummaryModal
          open={modalOpen}
          onClose={handleCloseModal}
          closeOnBackdropClick={true}
          data={skillAnalysisData}
          loading={skillAnalysisLoading}
          error={skillAnalysisError}
        />
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <Tooltip
          title={
            isGeneratingPlan
              ? 'We’re preparing your personalized upskilling plan. This may take a few moments.'
              : ''
          }
          disableFocusListener={!isGeneratingPlan}
          arrow
          placement="top"
          disableHoverListener={!isGeneratingPlan}
        >
          <span>
            <button
              type="button"
              onClick={planError ? handleRetryUpskillingPlan : handleDownloadUpskillingPlan}
              className={styles.animatedButton}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 10px',
                minWidth: '100px',
                fontFamily: 'Afacad',
                fontWeight: 600,
                fontSize: '14px',
                color: '#fff',
                background:
                  'linear-gradient(90deg, rgba(77,54,208,1) 0%, rgba(132,116,254,1) 100%)',
                border: 'none',
                borderRadius: '6px',
                cursor: isGeneratingPlan ? 'not-allowed' : 'pointer',
                opacity: isGeneratingPlan ? 0.85 : 1,
                boxShadow: '0 0.7em 1.5em -0.5em hsla(249, 62%, 51%, 0.45)'
              }}
              disabled={isGeneratingPlan || (!generatedPdfUrl && !planError)}
            >
              {isGeneratingPlan
                ? 'Generating Upskilling Plan'
                : planError
                  ? 'Retry Upskilling Plan'
                  : 'Technical Upskilling Plan'}

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className={styles.downloadIcon}
              >
                <path d="M12 3V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 21H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        </Tooltip>

        <button
          type="button"
          onClick={handleRecommendedJobsClick}
          className={styles.animatedButton}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 10px',
            minWidth: '100px',
            fontFamily: 'Afacad',
            fontWeight: 600,
            fontSize: '14px',
            color: '#fff',
            background: 'linear-gradient(90deg, rgba(77,54,208,1) 0%, rgba(132,116,254,1) 100%)',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 0.7em 1.5em -0.5em hsla(249, 62%, 51%, 0.45)'
          }}
        >
          Recommended Jobs
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.recommendedIcon}
          >
            <path d="M7 16L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 7H16V13" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </Box>
    </Box>
  );
};
export default ScoreCard;
