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
// import { useStylesGoldTheme } from '~/modules/globalStyles';
import {
  FileDetails,
  // deleteDocument,
  getFileTypeByExtension,
  handleFileUpload,
  isValidFileType,
  handleSaveFileWithJDForm
} from './Utils/ResumeUploadUtils';

// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';
import Toast from '~/shared/components/Toast';
import { ROUTES } from '~/shared/constants/routes';
// import * as Sentry from '@sentry/nextjs';
//import sentryCaptureError from '~/sentryCaptureError';

// For Doc/Pdf validation
import useResumeDetector from './Utils/useResumeDetector';
// Define the type for JDForm value
interface JDFormValue {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  editorState: EditorState;
}
interface ResumeUploadProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

import ProgressOverlay from '~/shared/components/ProgressOverlay/ProgressOverlay';

const ResumeUpload: React.FC<ResumeUploadProps> = ({ setLoadWithoutMount }) => {
  // ✅ reset loader each time this page mounts
  useEffect(() => {
    setLoadWithoutMount(false, '');
  }, [setLoadWithoutMount]);
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_UPLOAD);
  const styles = useStyles();
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  // const globalStyles = useStylesGoldTheme();
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });

  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');

  const PROGRESS_STEPS = [
    {
      key: 'loaderMessages.uploadingResume',
      start: 0,
      end: 25
    },
    {
      key: 'loaderMessages.extractingInformation',
      start: 25,
      end: 45
    },
    {
      key: 'loaderMessages.analyzingResume',
      start: 45,
      end: 70
    },
    {
      key: 'loaderMessages.processingJobDescription',
      start: 70,
      end: 90
    },
    {
      key: 'loaderMessages.almostDonePreparingResults',
      start: 90,
      end: 98
    }
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

  //
  // resume detector hook (client-side quick check)
  const { detect: detectResumeClient } = useResumeDetector();

  // Reset showJDFormOnly if navigating to /resume-upload (even if already there)
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/resume-upload') {
        setShowJDFormOnly(false);
      }
    };
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handleSave = useCallback(async () => {
    // const { asPath } = router;
    setLoadWithoutMount(true, i18n('loaderMessages.thisMayTakeUptoAMinuteOrTwo', { ns: 'common' }));
    const editorText: string = editorState?.getCurrentContent()?.getPlainText()?.trim();
    // Save editorText and fileUploadUrl to localStorage
    if (editorText) {
      localStorage.setItem('editorText', editorText);
    }
    if (fileDetails?.fileUploadUrl) {
      localStorage.setItem('fileUploadUrl', fileDetails.fileUploadUrl);
    }

    setShowJDFormOnly(true);
    setLoadWithoutMount(false, '');
  }, [fileDetails, editorState]);

  // Scroll to top when showJDFormOnly becomes true
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

      // 🔹 START LOCAL PROGRESS OVERLAY
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

      // 🔹 API CALL (UNCHANGED)
      const res = await handleSaveFileWithJDForm(fileUploadUrl, editorText, jdFormValue);

      if (progressInterval) clearInterval(progressInterval);

      if (res?.status !== SUCCESS) {
        handleToast({ severity: ERROR, message: res.message }, setToastState, toastState);
        setShowProgress(false);
        return;
      }

      // ✅ STORE JD ON SUCCESS (EXACTLY LIKE BEFORE)
      const { ...jdFormValueWithoutEditor } = jdFormValue;
      localStorage.setItem('jdFormValue', JSON.stringify(jdFormValueWithoutEditor));

      // 🔹 FINISH TO 100%
      setProgressMessage(i18n('loaderMessages.preparingResults', { ns: 'common' }));
      setProgressValue(100);

      setTimeout(async () => {
        setShowProgress(false);
        setShowJDFormOnly(true);
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
          {
            severity: ERROR,
            message: i18n('invalidFileSize')
          },
          setToastState,
          toastState
        );

        setFileDetails((prev) => ({
          ...prev,
          fileName: '',
          errorMessage: '',
          showSpinner: false
        }));

        const inputEl = document.getElementById('contained-button-file') as HTMLInputElement | null;
        if (inputEl) inputEl.value = '';

        return;
      }

      const sanitizedFileName = new File(
        [new Blob([file], { type })],
        removeSpecialChars(name, true),
        { type }
      );

      // ---- RUN CLIENT-SIDE DETECTION BEFORE UPLOAD ----
      try {
        // optional: show spinner while detecting
        setFileDetails((prev) => ({ ...prev, showSpinner: true }));

        const detection = await detectResumeClient(file);
        // detection shape: { isResume, extractedText, matches, error }

        if (!detection.isResume) {
          // show red toast error using your existing toast helper
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
        // detection failed — allow upload but show a warning toast (non-blocking)
        handleToast(
          {
            severity: ERROR,
            message: 'Resume detection temporarily unavailable. Upload will continue.'
          },
          setToastState,
          toastState
        );
        // continue to upload
      } finally {
        setFileDetails((prev) => ({ ...prev, showSpinner: true }));
      }

      // --- Existing upload flow ---
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
        setFileDetails((prevState) => ({
          ...prevState,
          showSpinner: false,
          fileName: ''
        }));
        const inputElement = document.getElementById('contained-button-file') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = '';
        }
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
    if (!file) {
      return;
    }
    const fileTypeByExtension: string | null | undefined = getFileTypeByExtension(file?.name);
    if (typeof fileTypeByExtension === 'string' && isValidFileType(fileTypeByExtension)) {
      updateFileDetails(file);
    } else {
      handleToast(
        {
          severity: ERROR,
          message: i18n('invalidFileType')
        },
        setToastState,
        toastState
      );

      setFileDetails((prev) => ({
        ...prev,
        errorMessage: '',
        fileName: ''
      }));

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

  // const handleDeleteDocument = useCallback(async () => {
  //   setLoadWithoutMount(true);
  //   const res = await deleteDocument();
  //   const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
  //   handleToast({ severity, message: res.message }, setToastState, toastState);
  //   if (res?.status === SUCCESS) {
  //     const inputElement = document.getElementById('contained-button-file') as HTMLInputElement;
  //     if (inputElement) {
  //       inputElement.value = '';
  //     }
  //     setFileDetails((prevState) => ({
  //       ...prevState,
  //       fileName: '',
  //       fileType: '',
  //       fileUploadUrl: ''
  //     }));
  //   }
  //   setLoadWithoutMount(false);
  // }, [handleToast, setToastState, setFileDetails]);

  const handleDeleteDocument = useCallback(async () => {
    setLoadWithoutMount(true);
    const severity: SEVERITY = SEVERITY.SUCCESS;
    handleToast(
      { severity, message: 'User uploaded resume deleted successfully.' },
      setToastState,
      toastState
    );
    const inputElement = document.getElementById('contained-button-file') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
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
  // Handler for the Draft.js editor in JDForm
  const handleJDFormEditorChange = (editorState: EditorState) => {
    setJDFormValue((prevState) => ({
      ...prevState,
      editorState,
      jobDesc: editorState.getCurrentContent().getPlainText()
    }));
  };
  useEffect(() => {
    // Reset showJDFormOnly to false when component mounts (user navigates to resume-upload)
    setShowJDFormOnly(false);
    // localStorage.setItem('editorText',  JSON.stringify(''));
    // localStorage.setItem('fileUploadUrl',  JSON.stringify(''));
    localStorage.setItem('editorText', '');
    localStorage.setItem('fileUploadUrl', '');
    localStorage.setItem('userMissingTabs', JSON.stringify(''));
    //localStorage.setItem('jdFormValue', JSON.stringify(''));

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

  // Reset showJDFormOnly when route changes to resume-upload
  useEffect(() => {
    setShowJDFormOnly(false);
  }, [router.asPath]);
  // console.log('fileDetails', fileDetails);
  return (
    <>
      <Box bgcolor="primary.light" px={{ xs: 2, sm: 5, lg: 20 }}>
        {showJDFormOnly === true ? (
          <JDForm
            value={jdFormValue}
            onChange={setJDFormValue}
            editorState={jdFormValue.editorState}
            onEditorChange={handleJDFormEditorChange}
            onSubmit={handleSaveJDForm}
          />
        ) : (
          <>
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
          </>
        )}

        {toastState.open && <Toast toastState={toastState} />}
      </Box>

      {/* ✅ Local Progress Overlay (outside Box, inside Fragment) */}
      <ProgressOverlay open={showProgress} message={progressMessage} progress={progressValue} />
    </>
  );
};

export default withLoader(ResumeUpload);
