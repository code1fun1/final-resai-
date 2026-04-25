import { Box, Grid, Typography } from '@mui/material';
import { EditorState } from 'draft-js';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import { API_STATUS } from '~/shared/constants/apiConstants';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import { handleToast, removeSpecialChars } from '~/shared/utils/utils';
import ResumeUploadForm from './ResumeUploadForm';
import { useStyles } from './ResumeUploadStyles';
import JDForm from './JDForm';
import {
  FileDetails,
  getFileTypeByExtension,
  handleFileUpload,
  isValidFileType,
  handleSaveFileWithJDForm
} from './Utils/ResumeUploadUtils';

import { useRouter } from 'next/router';
import Toast from '~/shared/components/Toast';
import { ROUTES } from '~/shared/constants/routes';

import useResumeDetector from './Utils/useResumeDetector';
import ProgressOverlay from '~/shared/components/ProgressOverlay/ProgressOverlay';

// MUI icons for step indicators
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface JDFormValue {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  editorState: EditorState;
}
interface ResumeUploadProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

const SIDEBAR_STEPS = [
  { label: 'Resume Upload', state: 'completed' as const },
  { label: 'Target Job Role', state: 'active' as const },
  { label: 'Skills & Strengths', state: 'pending' as const },
  { label: 'Personal Details', state: 'pending' as const }
];

const ResumeUpload: React.FC<ResumeUploadProps> = ({ setLoadWithoutMount }) => {
  useEffect(() => {
    setLoadWithoutMount(false, '');
  }, [setLoadWithoutMount]);

  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_UPLOAD);
  const styles = useStyles();
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;

  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });

  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');

  const PROGRESS_STEPS = [
    { key: 'loaderMessages.uploadingResume', start: 0, end: 25 },
    { key: 'loaderMessages.extractingInformation', start: 25, end: 45 },
    { key: 'loaderMessages.analyzingResume', start: 45, end: 70 },
    { key: 'loaderMessages.processingJobDescription', start: 70, end: 90 },
    { key: 'loaderMessages.almostDonePreparingResults', start: 90, end: 98 }
  ];

  const [fileDetails, setFileDetails] = useState<FileDetails>({
    fileName: '',
    fileSize: '',
    fileType: '',
    showSpinner: false,
    spinTimer: 0,
    fileUploadUrl: '',
    errorMessage: ''
  });

  const initialJDFormValue: JDFormValue = {
    jobTitle: '',
    companyName: '',
    jobDesc: '',
    editorState: EditorState.createEmpty()
  };

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const router = useRouter();
  const [jdFormValue, setJDFormValue] = useState<JDFormValue>(initialJDFormValue);
  const [showJDFormOnly, setShowJDFormOnly] = useState(false);

  const setWizardMode = (value: boolean) => {
    setShowJDFormOnly(value);
  };

  const { detect: detectResumeClient } = useResumeDetector();

  // Hide/show header and footer when entering/leaving wizard step
  useEffect(() => {
    if (showJDFormOnly) {
      document.body.classList.add('jd-wizard-mode');
    } else {
      document.body.classList.remove('jd-wizard-mode');
    }
    return () => {
      document.body.classList.remove('jd-wizard-mode');
    };
  }, [showJDFormOnly]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/resume-upload') {
        setWizardMode(false);
      }
    };
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handleSave = useCallback(async () => {
    setLoadWithoutMount(true, i18n('loaderMessages.thisMayTakeUptoAMinuteOrTwo', { ns: 'common' }));
    const editorText: string = editorState?.getCurrentContent()?.getPlainText()?.trim();
    if (editorText) {
      localStorage.setItem('editorText', editorText);
    }
    if (fileDetails?.fileUploadUrl) {
      localStorage.setItem('fileUploadUrl', fileDetails.fileUploadUrl);
    }
    setWizardMode(true);
    setLoadWithoutMount(false, '');
  }, [fileDetails, editorState]);

  useEffect(() => {
    if (showJDFormOnly) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showJDFormOnly]);

  const handleSaveJDForm = useCallback(async () => {
    let progressInterval: NodeJS.Timeout | null = null;

    try {
      const editorText =
        typeof window !== 'undefined' ? localStorage.getItem('editorText') || '' : '';
      const fileUploadUrl =
        typeof window !== 'undefined' ? localStorage.getItem('fileUploadUrl') || '' : '';

      setShowProgress(true);

      let stepIndex = 0;
      let progress = PROGRESS_STEPS[0].start;

      setProgressMessage(i18n(PROGRESS_STEPS[0].key, { ns: 'common' }));
      setProgressValue(progress);

      progressInterval = setInterval(() => {
        const step = PROGRESS_STEPS[stepIndex];
        progress += 1;

        if (progress >= step.end) {
          stepIndex += 1;

          if (stepIndex < PROGRESS_STEPS.length) {
            const next = PROGRESS_STEPS[stepIndex];
            progress = next.start;
            setProgressMessage(i18n(next.key, { ns: 'common' }));
          } else {
            progress = 98;
            clearInterval(progressInterval!);
          }
        }

        setProgressValue(progress);
      }, 800);

      const res = await handleSaveFileWithJDForm(fileUploadUrl, editorText, jdFormValue);

      if (progressInterval) clearInterval(progressInterval);

      if (res?.status !== SUCCESS) {
        handleToast({ severity: ERROR, message: res.message }, setToastState, toastState);
        setShowProgress(false);
        return;
      }

      const { ...jdFormValueWithoutEditor } = jdFormValue;
      localStorage.setItem('jdFormValue', JSON.stringify(jdFormValueWithoutEditor));

      setProgressMessage(i18n('loaderMessages.preparingResults', { ns: 'common' }));
      setProgressValue(100);

      setTimeout(async () => {
        setShowProgress(false);
        setWizardMode(true);
        await router.push(ROUTES.ONBOARDING);
      }, 400);
    } catch (err) {
      console.error(err);
      if (progressInterval) clearInterval(progressInterval);
      setShowProgress(false);
    }
  }, [jdFormValue]);

  const updateFileDetails = useCallback(
    async (file: File) => {
      const { size, type, name } = file ?? {};
      const fileSizeKb = size ? size / 1024 : 0;

      if (fileSizeKb >= 5120) {
        handleToast(
          { severity: ERROR, message: i18n('invalidFileSize') },
          setToastState,
          toastState
        );
        setFileDetails((prev) => ({ ...prev, fileName: '', errorMessage: '', showSpinner: false }));
        const inputEl = document.getElementById('contained-button-file') as HTMLInputElement | null;
        if (inputEl) inputEl.value = '';
        return;
      }

      const sanitizedFileName = new File(
        [new Blob([file], { type })],
        removeSpecialChars(name, true),
        { type }
      );

      try {
        setFileDetails((prev) => ({ ...prev, showSpinner: true }));

        const detection = await detectResumeClient(file);

        if (!detection.isResume) {
          handleToast(
            {
              severity: ERROR,
              message: 'Uploaded file is not a proper resume, please check uploaded file.'
            },
            setToastState,
            toastState
          );
          setFileDetails((prevState) => ({
            ...prevState,
            fileName: '',
            showSpinner: false,
            errorMessage: ''
          }));
          const inputEl = document.getElementById(
            'contained-button-file'
          ) as HTMLInputElement | null;
          if (inputEl) inputEl.value = '';
          return;
        }
      } catch (e) {
        handleToast(
          {
            severity: ERROR,
            message: 'Resume detection temporarily unavailable. Upload will continue.'
          },
          setToastState,
          toastState
        );
      } finally {
        setFileDetails((prev) => ({ ...prev, showSpinner: true }));
      }

      setFileDetails((prevState) => ({
        ...prevState,
        fileName: name,
        fileSize: `${fileSizeKb} kb`,
        fileType: type,
        showSpinner: true
      }));

      const res = await handleFileUpload(sanitizedFileName);
      if (res.status === API_STATUS.FAILED) {
        handleToast({ severity: ERROR, message: res.message }, setToastState, toastState);
        setFileDetails((prevState) => ({ ...prevState, showSpinner: false, fileName: '' }));
        const inputElement = document.getElementById('contained-button-file') as HTMLInputElement;
        if (inputElement) inputElement.value = '';
        return;
      }

      setFileDetails((prevState) => ({
        ...prevState,
        showSpinner: false,
        spinTimer: res.status === SUCCESS ? 100 : 0,
        fileUploadUrl: res.data,
        errorMessage: ''
      }));
    },
    [
      handleFileUpload,
      setFileDetails,
      handleToast,
      setToastState,
      toastState,
      detectResumeClient,
      i18n
    ]
  );

  const processFile = (file: File | undefined) => {
    if (!file) return;
    const fileTypeByExtension: string | null | undefined = getFileTypeByExtension(file?.name);
    if (typeof fileTypeByExtension === 'string' && isValidFileType(fileTypeByExtension)) {
      updateFileDetails(file);
    } else {
      handleToast({ severity: ERROR, message: i18n('invalidFileType') }, setToastState, toastState);
      setFileDetails((prev) => ({ ...prev, errorMessage: '', fileName: '' }));
      const inputEl = document.getElementById('contained-button-file') as HTMLInputElement | null;
      if (inputEl) inputEl.value = '';
    }
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file: File | undefined = event.target.files?.[0];
      processFile(file);
    },
    [updateFileDetails, setFileDetails]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const file: File | undefined = event.dataTransfer.files?.[0];
      processFile(file);
    },
    [updateFileDetails, isValidFileType, setFileDetails]
  );

  const handleDeleteDocument = useCallback(async () => {
    setLoadWithoutMount(true);
    const severity: SEVERITY = SEVERITY.SUCCESS;
    handleToast(
      { severity, message: 'User uploaded resume deleted successfully.' },
      setToastState,
      toastState
    );
    const inputElement = document.getElementById('contained-button-file') as HTMLInputElement;
    if (inputElement) inputElement.value = '';
    setFileDetails((prevState) => ({
      ...prevState,
      fileName: '',
      fileType: '',
      fileUploadUrl: ''
    }));
    localStorage.setItem('fileUploadUrl', '');
    setLoadWithoutMount(false);
  }, [handleToast, setToastState, setFileDetails]);

  const handleEditorChange = useCallback(
    (value: EditorState) => {
      setEditorState(value);
    },
    [EditorState]
  );

  const handleJDFormEditorChange = (editorState: EditorState) => {
    setJDFormValue((prevState) => ({
      ...prevState,
      editorState,
      jobDesc: editorState.getCurrentContent().getPlainText()
    }));
  };

  useEffect(() => {
    setWizardMode(false);
    localStorage.setItem('editorText', '');
    localStorage.setItem('fileUploadUrl', '');
    localStorage.setItem('userMissingTabs', JSON.stringify(''));

    if (fileDetails.showSpinner) {
      const timer: NodeJS.Timeout = setInterval(() => {
        setFileDetails((prevState) => ({
          ...prevState,
          spinTimer: prevState.spinTimer >= 100 ? 0 : prevState.spinTimer + 25
        }));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, [fileDetails.showSpinner]);

  useEffect(() => {
    setWizardMode(false);
  }, [router.asPath]);

  const renderSidebar = () => (
    <Box
      sx={{
        width: '340px',
        minWidth: '340px',
        minHeight: '100vh',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: '#04040E',
        pl: '24px',
        pr: '24px',
        pt: '40px',
        pb: '40px'
      }}
    >
      {/* ── TOP GROUP ── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Box>
          <Image
            src="/image/ResAi-white-Logo.png"
            alt="ResAI"
            width={90}
            height={32}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#DABF67',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '125%',
              letterSpacing: '-0.36px',
              textTransform: 'capitalize',
              mb: '10px'
            }}
          >
            Your AI Powered Career Engineer
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#ffffff',
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: '100%',
              letterSpacing: 0,
              mb: '10px'
            }}
          >
            Let&apos;s Get Started
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#9CA3AF',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '125%'
            }}
          >
            Create resumes, plan growth, and unlock better opportunities in few simple steps
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {SIDEBAR_STEPS.map((step) => (
            <Box
              key={step.label}
              onClick={() => {
                if (step.label === 'Skills & Strengths') {
                  localStorage.setItem('forceOnboardingStep', '0');
                  router.push(ROUTES.ONBOARDING);
                }
                if (step.label === 'Personal Details') {
                  localStorage.setItem('forceOnboardingStep', '1');
                  router.push(ROUTES.ONBOARDING);
                }
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pt: '10px',
                pb: '10px',
                pr: '8px',
                pl: '8px',
                minHeight: '44px',
                borderRadius: '6px',
                bgcolor: step.state === 'active' ? 'rgba(255,255,255,0.08)' : 'transparent',
                cursor:
                  step.label === 'Skills & Strengths' || step.label === 'Personal Details'
                    ? 'pointer'
                    : 'default',
                '&:hover':
                  step.label === 'Skills & Strengths' || step.label === 'Personal Details'
                    ? { bgcolor: 'rgba(255,255,255,0.05)' }
                    : {}
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {step.state === 'completed' && (
                  <CheckCircleIcon sx={{ color: '#DABF67', fontSize: 22 }} />
                )}
                {step.state === 'active' && (
                  <img
                    src="/image/figma/logo1.png"
                    alt=""
                    style={{ width: 20, height: 20, objectFit: 'contain' }}
                  />
                )}
                {step.state === 'pending' && (
                  <RadioButtonUncheckedIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 22 }} />
                )}
                <Typography
                  sx={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: '14px',
                    fontWeight: step.state === 'active' ? 600 : 400,
                    color:
                      step.state === 'active'
                        ? '#ffffff'
                        : step.state === 'completed'
                          ? 'rgba(255,255,255,0.75)'
                          : 'rgba(255,255,255,0.45)'
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
              {step.state === 'active' && (
                <ChevronRightIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} />
              )}
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            fontFamily: 'Satoshi, sans-serif',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '100%',
            letterSpacing: '0%',
            width: '292px',
            height: '44px',
            mt: '16px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Reengineer your career based on today&apos;s hiring
        </Typography>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#7B7B7B',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '14px',
              letterSpacing: '2%',
              width: '162px',
              height: '14px'
            }}
          >
            Copyright © 2024 ResAI
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: '8px',
              padding: '8px',
              gap: '8px',
              height: '40px',
              width: 'fit-content'
            }}
          >
            <Image
              src="/image/figma/image.png"
              alt="Need help"
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
            <Typography
              sx={{
                fontFamily: 'Satoshi, sans-serif',
                color: '#7B7B7B',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '14px',
                letterSpacing: '2%'
              }}
            >
              Need help?
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {showJDFormOnly ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            minHeight: { xs: 'calc(100vh - 64px)', md: '100vh' },
            overflowX: 'hidden'
          }}
        >
          {renderSidebar()}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#ffffff'
            }}
          >
            <JDForm
              value={jdFormValue}
              onChange={setJDFormValue}
              editorState={jdFormValue.editorState}
              onEditorChange={handleJDFormEditorChange}
              onSubmit={handleSaveJDForm}
              onBack={() => setWizardMode(false)}
              onCancel={() => router.push(ROUTES.MY_RESUMES)}
            />
          </Box>
        </Box>
      ) : (
        <Box bgcolor="primary.light" px={{ xs: 2, sm: 5, lg: 20 }}>
          <Grid container className={styles.resumeUploadWrapper}>
            <Box
              component={Grid}
              item
              xs={12}
              md={4}
              display={{ xs: 'none', md: 'block' }}
              pr={{ xs: 0, md: 3 }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={3}
                justifyContent="center"
                height="100%"
              >
                <Box
                  display="flex"
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  justifyContent="center"
                  flexDirection="column"
                  gap={2}
                  textAlign={{ xs: 'center', md: 'left' }}
                  className={styles.titleWrap}
                >
                  <Typography variant="body2">{i18n('HiResAI')}</Typography>
                  <Typography variant="h2">{i18n('craftingYourResume')}</Typography>
                  <Typography variant="body2">{i18n('helpYouCreateResume')}</Typography>
                </Box>
                <Image
                  src="/image/createResume-gold.png"
                  alt="Create Resume"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  className={styles.createResumeImage}
                />
              </Box>
            </Box>
            <Grid item xs={12} md={8}>
              <ResumeUploadForm
                onSave={handleSave}
                onChange={handleFileChange}
                onDrop={handleDrop}
                spinTimer={fileDetails.spinTimer}
                onDelete={handleDeleteDocument}
                onEditorChange={handleEditorChange}
                editorData={editorState}
                fileDetails={fileDetails}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {toastState.open && <Toast toastState={toastState} />}
      <ProgressOverlay open={showProgress} message={progressMessage} progress={progressValue} />
    </>
  );
};

export default withLoader(ResumeUpload);
