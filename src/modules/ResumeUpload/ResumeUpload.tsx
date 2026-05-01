import { Box, Typography } from '@mui/material';
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
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import SpinnerIcon from '~/shared/components/SpinnerIcon/SpinnerIcon';

interface JDFormValue {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  editorState: EditorState;
}

interface ResumeUploadProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

type SidebarStepId = 'resume_upload' | 'target_job_role' | 'skills_strengths' | 'personal_details';

const STEPS = [
  { id: 'resume_upload' as const, label: 'Resume Upload' },
  { id: 'target_job_role' as const, label: 'Target Job Role' },
  { id: 'skills_strengths' as const, label: 'Skills & Strengths' },
  { id: 'personal_details' as const, label: 'Personal Details' }
] satisfies Array<{ id: SidebarStepId; label: string }>;

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

  const router = useRouter();
  const [jdFormValue, setJDFormValue] = useState<JDFormValue>(initialJDFormValue);
  const [showJDFormOnly, setShowJDFormOnly] = useState(false);
  const [uploadedResumeText, setUploadedResumeText] = useState('');
  const { detect: detectResumeClient } = useResumeDetector();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === '/resume-upload') setShowJDFormOnly(false);
    };
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handleSave = useCallback(
    async (additionalLinksText: string) => {
      setLoadWithoutMount(
        true,
        i18n('loaderMessages.thisMayTakeUptoAMinuteOrTwo', { ns: 'common' })
      );
      const resumeText = additionalLinksText?.trim() || uploadedResumeText.trim();
      if (!resumeText) {
        handleToast(
          {
            severity: ERROR,
            message: 'Resume text could not be extracted. Please paste resume details to continue.'
          },
          setToastState,
          toastState
        );
        setLoadWithoutMount(false, '');
        return;
      }

      localStorage.setItem('editorText', resumeText);
      if (fileDetails?.fileUploadUrl) {
        localStorage.setItem('fileUploadUrl', fileDetails.fileUploadUrl);
      }
      setShowJDFormOnly(true);
      setLoadWithoutMount(false, '');
    },
    [ERROR, fileDetails, i18n, setLoadWithoutMount, toastState, uploadedResumeText]
  );

  useEffect(() => {
    if (showJDFormOnly) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showJDFormOnly]);

  const handleSaveJDForm = useCallback(async () => {
    let progressInterval: NodeJS.Timeout | null = null;
    try {
      const editorText =
        (typeof window !== 'undefined' ? localStorage.getItem('editorText') || '' : '') ||
        uploadedResumeText.trim();
      const fileUploadUrl =
        typeof window !== 'undefined' ? localStorage.getItem('fileUploadUrl') || '' : '';

      if (!editorText.trim()) {
        handleToast(
          {
            severity: ERROR,
            message:
              'Resume text could not be extracted. Please upload another file or paste resume details.'
          },
          setToastState,
          toastState
        );
        setShowProgress(false);
        return;
      }

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

      const jdFormValueWithoutEditor = {
        jobTitle: jdFormValue.jobTitle,
        companyName: jdFormValue.companyName,
        jobDesc: jdFormValue.jobDesc
      };
      localStorage.setItem('jdFormValue', JSON.stringify(jdFormValueWithoutEditor));
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
  }, [jdFormValue, i18n, ERROR, SUCCESS, toastState, router, uploadedResumeText]);

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
        setUploadedResumeText('');
        localStorage.setItem('editorText', '');
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
          localStorage.setItem('editorText', '');
          return;
        }

        if (detection.extractedText?.trim()) {
          setUploadedResumeText(detection.extractedText);
          localStorage.setItem('editorText', detection.extractedText);
        }
      } catch {
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
        setUploadedResumeText('');
        localStorage.setItem('editorText', '');
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
      i18n,
      ERROR,
      SUCCESS
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
    handleToast(
      { severity: SEVERITY.SUCCESS, message: 'User uploaded resume deleted successfully.' },
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
    setUploadedResumeText('');
    localStorage.setItem('editorText', '');
    localStorage.setItem('fileUploadUrl', '');
    setLoadWithoutMount(false);
  }, [handleToast, setToastState, setFileDetails, setLoadWithoutMount, toastState]);

  const handleJDFormEditorChange = (editorState: EditorState) => {
    setJDFormValue((prevState) => ({
      ...prevState,
      editorState,
      jobDesc: editorState.getCurrentContent().getPlainText()
    }));
  };

  // ✅ FIX: Split into two separate effects.
  // Previously both were combined in one effect with [fileDetails.showSpinner] dependency,
  // which caused localStorage to be cleared every time the spinner toggled — wiping resume_content.

  // 1. Runs ONCE on mount only — initializes state and clears stale localStorage
  useEffect(() => {
    setShowJDFormOnly(false);
    localStorage.setItem('editorText', '');
    localStorage.setItem('fileUploadUrl', '');
    localStorage.setItem('userMissingTabs', JSON.stringify(''));
    setUploadedResumeText('');
  }, []);

  // 2. Runs only to manage the spinner progress timer — does NOT touch localStorage
  useEffect(() => {
    if (fileDetails.showSpinner) {
      const timer: NodeJS.Timeout = setInterval(() => {
        setFileDetails((prevState) => ({
          ...prevState,
          spinTimer: prevState.spinTimer >= 100 ? 0 : prevState.spinTimer + 25
        }));
      }, 800);
      return () => clearInterval(timer);
    }
  }, [fileDetails.showSpinner]);

  useEffect(() => {
    setShowJDFormOnly(false);
  }, [router.asPath]);

  const handleCancel = useCallback(() => {
    router.push(ROUTES.MY_RESUMES);
  }, [router]);

  const handleSidebarStepClick = useCallback(
    async (stepId: SidebarStepId) => {
      if (typeof window === 'undefined') return;

      if (stepId === 'resume_upload') {
        setShowJDFormOnly(false);
        return;
      }

      if (stepId === 'target_job_role') {
        if (fileDetails.showSpinner) {
          handleToast(
            { severity: ERROR, message: 'Please wait until resume upload completes.' },
            setToastState,
            toastState
          );
          return;
        }

        const hasUploadedResume = !!fileDetails.fileUploadUrl;
        const hasStartFromScratchText = !!localStorage.getItem('editorText')?.trim();

        if (!hasUploadedResume && !hasStartFromScratchText) {
          handleToast(
            {
              severity: ERROR,
              message:
                'Please upload your resume (or paste resume details) and click "Get started" to continue.'
            },
            setToastState,
            toastState
          );
          return;
        }

        if (fileDetails.fileUploadUrl) {
          localStorage.setItem('fileUploadUrl', fileDetails.fileUploadUrl);
        }
        setShowJDFormOnly(true);
        return;
      }

      const jdFormValueStr = localStorage.getItem('jdFormValue');
      if (!jdFormValueStr) {
        handleToast(
          { severity: ERROR, message: 'Please complete Target Job Role first.' },
          setToastState,
          toastState
        );
        return;
      }

      localStorage.setItem('forceOnboardingStep', stepId === 'skills_strengths' ? '0' : '1');
      await router.push(ROUTES.ONBOARDING);
    },
    [ERROR, fileDetails.fileUploadUrl, fileDetails.showSpinner, router, setToastState, toastState]
  );

  const handleSidebarStepKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, stepId: SidebarStepId) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleSidebarStepClick(stepId);
      }
    },
    [handleSidebarStepClick]
  );

  return (
    <>
      <Box className={styles.pageWrapper}>
        {/* ── Dark Sidebar ── */}
        <Box className={styles.sidebar}>
          <Box className={styles.logoWrap}>
            <Image
              src="/image/ResAi-white-Logo.png"
              alt="ResAI"
              width={90}
              height={30}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </Box>

          <Box>
            <Typography className={styles.heroBadge}>Your AI Powered Career Engineer</Typography>
            <Typography className={styles.sidebarTitle}>Let&apos;s Get Started</Typography>
            <Box sx={{ lineHeight: 0 }}>
              <svg
                width="100%"
                viewBox="0 0 287 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                style={{ display: 'none' }}
              >
                <path
                  d="M5.376 11.8401C2.176 11.8401 -3.51667e-06 9.45606 -3.51667e-06 5.93606C-3.51667e-06 2.41606 2.208 0.0160618 5.44 0.0160618C7.904 0.0160618 9.84 1.50406 10.304 3.77606H9.072C8.592 2.12806 7.184 1.12006 5.392 1.12006C2.88 1.12006 1.2 3.04006 1.2 5.93606C1.2 8.81606 2.88 10.7361 5.392 10.7361C7.2 10.7361 8.64 9.76006 9.136 8.22406H10.368C9.84 10.3841 7.84 11.8401 5.376 11.8401ZM16.1682 3.82406V4.81606H15.5602C14.1362 4.81606 13.2242 5.77606 13.2242 7.24806V11.6641H12.1202V3.92006H13.1602L13.2402 5.12006C13.5442 4.28806 14.3602 3.74406 15.4482 3.74406C15.6882 3.74406 15.8962 3.76006 16.1682 3.82406ZM20.587 11.8561C18.315 11.8561 16.795 10.2241 16.795 7.79206C16.795 5.37606 18.299 3.71206 20.507 3.71206C22.603 3.71206 24.027 5.20006 24.027 7.39206V7.93606H17.867C17.947 9.82406 18.939 10.9121 20.603 10.9121C21.867 10.9121 22.683 10.3681 22.971 9.34406H24.027C23.611 10.9761 22.411 11.8561 20.587 11.8561ZM20.507 4.65606C19.051 4.65606 18.091 5.61606 17.899 7.13606H22.923C22.923 5.64806 21.963 4.65606 20.507 4.65606ZM27.938 11.8561C26.29 11.8561 25.314 10.9281 25.314 9.56806C25.314 8.14406 26.402 7.24806 28.21 7.10406L30.77 6.89606V6.64006C30.77 5.12006 29.858 4.64006 28.722 4.64006C27.378 4.64006 26.578 5.24806 26.578 6.28806H25.57C25.57 4.72006 26.85 3.71206 28.754 3.71206C30.546 3.71206 31.858 4.60806 31.858 6.65606V11.6641H30.93L30.786 10.3041C30.306 11.2801 29.25 11.8561 27.938 11.8561ZM28.194 10.9601C29.826 10.9601 30.77 9.82406 30.77 8.14406V7.72806L28.482 7.90406C27.026 8.03206 26.434 8.67206 26.434 9.53606C26.434 10.4801 27.138 10.9601 28.194 10.9601ZM35.7087 11.6641H34.6207V4.84806H33.0687V3.92006H34.6207V1.47206H35.7087V3.92006H37.2607V4.84806H35.7087V11.6641ZM41.8682 11.8561C39.5962 11.8561 38.0762 10.2241 38.0762 7.79206C38.0762 5.37606 39.5802 3.71206 41.7882 3.71206C43.8842 3.71206 45.3082 5.20006 45.3082 7.39206V7.93606H39.1482C39.2282 9.82406 40.2202 10.9121 41.8842 10.9121C43.1482 10.9121 43.9642 10.3681 44.2522 9.34406H45.3082C44.8922 10.9761 43.6922 11.8561 41.8682 11.8561ZM41.7882 4.65606C40.3322 4.65606 39.3722 5.61606 39.1802 7.13606H44.2042C44.2042 5.64806 43.2442 4.65606 41.7882 4.65606ZM55.5589 3.82406V4.81606H54.9509C53.5269 4.81606 52.6149 5.77606 52.6149 7.24806V11.6641H51.5109V3.92006H52.5509L52.6309 5.12006C52.9349 4.28806 53.7509 3.74406 54.8389 3.74406C55.0789 3.74406 55.2869 3.76006 55.5589 3.82406ZM59.9776 11.8561C57.7056 11.8561 56.1856 10.2241 56.1856 7.79206C56.1856 5.37606 57.6896 3.71206 59.8976 3.71206C61.9936 3.71206 63.4176 5.20006 63.4176 7.39206V7.93606H57.2576C57.3376 9.82406 58.3296 10.9121 59.9936 10.9121C61.2576 10.9121 62.0736 10.3681 62.3616 9.34406H63.4176C63.0016 10.9761 61.8016 11.8561 59.9776 11.8561ZM59.8976 4.65606C58.4416 4.65606 57.4816 5.61606 57.2896 7.13606H62.3136C62.3136 5.64806 61.3536 4.65606 59.8976 4.65606ZM64.5267 9.48806H65.5827C65.5827 10.3841 66.2547 10.9441 67.3427 10.9441C68.5427 10.9441 69.2467 10.4321 69.2467 9.60006C69.2467 8.96006 68.9267 8.59206 68.0147 8.36806L66.6867 8.03206C65.3427 7.69606 64.6867 6.99206 64.6867 5.93606C64.6867 4.57606 65.8227 3.71206 67.4867 3.71206C69.1187 3.71206 70.1747 4.60806 70.2227 6.04806H69.1507C69.1187 5.15206 68.4947 4.62406 67.4547 4.62406C66.3667 4.62406 65.7587 5.08806 65.7587 5.92006C65.7587 6.51206 66.1747 6.92806 67.0227 7.13606L68.3507 7.47206C69.6947 7.80806 70.3027 8.43206 70.3027 9.55206C70.3027 10.9441 69.1187 11.8561 67.3587 11.8561C65.6147 11.8561 64.5267 10.9281 64.5267 9.48806ZM77.5602 3.92006H78.6642V11.6641H77.7042L77.5602 10.3521C77.1282 11.2481 76.0562 11.8561 74.8402 11.8561C73.0162 11.8561 72.0242 10.6081 72.0242 8.72006V3.90406H73.1442V8.36806C73.1442 10.2081 73.9602 10.8641 75.1922 10.8641C76.6802 10.8641 77.5602 9.87206 77.5602 8.03206V3.92006ZM82.068 11.6641H80.964V3.92006H81.924L82.052 5.02406C82.436 4.20806 83.3 3.71206 84.388 3.71206C85.604 3.71206 86.516 4.35206 86.884 5.36006C87.236 4.35206 88.18 3.71206 89.428 3.71206C91.108 3.71206 92.212 4.80006 92.212 6.59206V11.6641H91.14V6.81606C91.14 5.48806 90.404 4.70406 89.22 4.70406C87.924 4.70406 87.156 5.68006 87.156 6.88006V11.6641H86.068V6.80006C86.068 5.48806 85.316 4.72006 84.148 4.72006C82.852 4.72006 82.068 5.68006 82.068 6.86406V11.6641ZM97.6807 11.8561C95.4087 11.8561 93.8887 10.2241 93.8887 7.79206C93.8887 5.37606 95.3927 3.71206 97.6007 3.71206C99.6967 3.71206 101.121 5.20006 101.121 7.39206V7.93606H94.9607C95.0407 9.82406 96.0327 10.9121 97.6967 10.9121C98.9607 10.9121 99.7767 10.3681 100.065 9.34406H101.121C100.705 10.9761 99.5047 11.8561 97.6807 11.8561ZM97.6007 4.65606C96.1447 4.65606 95.1847 5.61606 94.9927 7.13606H100.017C100.017 5.64806 99.0567 4.65606 97.6007 4.65606ZM102.23 9.48806H103.286C103.286 10.3841 103.958 10.9441 105.046 10.9441C106.246 10.9441 106.95 10.4321 106.95 9.60006C106.95 8.96006 106.63 8.59206 105.718 8.36806L104.39 8.03206C103.046 7.69606 102.39 6.99206 102.39 5.93606C102.39 4.57606 103.526 3.71206 105.19 3.71206C106.822 3.71206 107.878 4.60806 107.926 6.04806H106.854C106.822 5.15206 106.198 4.62406 105.158 4.62406C104.07 4.62406 103.462 5.08806 103.462 5.92006C103.462 6.51206 103.878 6.92806 104.726 7.13606L106.054 7.47206C107.398 7.80806 108.006 8.43206 108.006 9.55206C108.006 10.9441 106.822 11.8561 105.062 11.8561C103.318 11.8561 102.23 10.9281 102.23 9.48806ZM111.65 11.1201C111.65 12.1121 110.882 12.9761 109.89 13.1201V12.5281C110.466 12.4321 110.882 12.0161 110.882 11.5681C110.786 11.6321 110.658 11.6801 110.466 11.6801C110.018 11.6801 109.634 11.3601 109.634 10.8161C109.634 10.2561 110.018 9.85606 110.578 9.85606C111.154 9.85606 111.65 10.3201 111.65 11.1201ZM118.323 15.0401V3.92006H119.283L119.395 5.48806C119.939 4.28806 121.027 3.71206 122.323 3.71206C124.563 3.71206 125.907 5.42406 125.907 7.76006C125.907 10.0961 124.611 11.8561 122.323 11.8561C121.011 11.8561 119.971 11.2961 119.427 10.1761V15.0401H118.323ZM119.443 7.79206C119.443 9.56806 120.435 10.8641 122.131 10.8641C123.811 10.8641 124.787 9.56806 124.787 7.79206C124.787 6.00006 123.811 4.72006 122.131 4.72006C120.435 4.72006 119.443 6.00006 119.443 7.79206ZM128.819 11.6641H127.715V6.19888e-05H128.819V11.6641ZM133.391 11.8561C131.743 11.8561 130.767 10.9281 130.767 9.56806C130.767 8.14406 131.855 7.24806 133.663 7.10406L136.223 6.89606V6.64006C136.223 5.12006 135.311 4.64006 134.175 4.64006C132.831 4.64006 132.031 5.24806 132.031 6.28806H131.023C131.023 4.72006 132.303 3.71206 134.207 3.71206C135.999 3.71206 137.311 4.60806 137.311 6.65606V11.6641H136.383L136.239 10.3041C135.759 11.2801 134.703 11.8561 133.391 11.8561ZM133.647 10.9601C135.279 10.9601 136.223 9.82406 136.223 8.14406V7.72806L133.935 7.90406C132.479 8.03206 131.887 8.67206 131.887 9.53606C131.887 10.4801 132.591 10.9601 133.647 10.9601ZM140.63 11.6641H139.526V3.92006H140.486L140.646 5.26406C141.158 4.27206 142.182 3.71206 143.302 3.71206C145.43 3.71206 146.31 4.97606 146.31 6.92806V11.6641H145.206V7.16806C145.206 5.36006 144.39 4.72006 143.11 4.72006C141.526 4.72006 140.63 5.87206 140.63 7.61606V11.6641ZM152.42 7.56806C152.42 5.45606 153.78 3.71206 156.052 3.71206C157.396 3.71206 158.42 4.33606 158.916 5.47206L159.028 3.92006H159.988V11.4241C159.988 13.7281 158.516 15.2321 156.244 15.2321C154.26 15.2321 152.868 14.1121 152.564 12.2401H153.668C153.908 13.4881 154.868 14.2241 156.26 14.2241C157.844 14.2241 158.9 13.1521 158.9 11.5361V9.69606C158.372 10.7841 157.3 11.4241 155.972 11.4241C153.764 11.4241 152.42 9.68006 152.42 7.56806ZM153.524 7.55206C153.524 9.13606 154.5 10.4321 156.132 10.4321C157.812 10.4321 158.804 9.21606 158.804 7.55206C158.804 5.90406 157.844 4.68806 156.148 4.68806C154.484 4.68806 153.524 5.98406 153.524 7.55206ZM166.34 3.82406V4.81606H165.732C164.308 4.81606 163.396 5.77606 163.396 7.24806V11.6641H162.292V3.92006H163.332L163.412 5.12006C163.716 4.28806 164.532 3.74406 165.62 3.74406C165.86 3.74406 166.068 3.76006 166.34 3.82406ZM166.967 7.79206C166.967 5.42406 168.631 3.71206 170.903 3.71206C173.175 3.71206 174.839 5.42406 174.839 7.79206C174.839 10.1441 173.175 11.8561 170.903 11.8561C168.631 11.8561 166.967 10.1441 166.967 7.79206ZM168.087 7.77606C168.087 9.60006 169.239 10.8641 170.903 10.8641C172.551 10.8641 173.719 9.60006 173.719 7.77606C173.719 5.98406 172.551 4.70406 170.903 4.70406C169.239 4.70406 168.087 5.98406 168.087 7.77606ZM177.893 11.6641L175.333 3.92006H176.469L177.989 8.59206C178.165 9.10406 178.309 9.63206 178.469 10.2561C178.597 9.63206 178.853 8.84806 178.933 8.59206L180.469 3.92006H181.605L183.125 8.59206C183.269 9.00806 183.461 9.68006 183.605 10.2561C183.765 9.61606 183.797 9.42406 184.069 8.59206L185.605 3.92006H186.757L184.133 11.6641H183.061L181.461 6.80006C181.269 6.22406 181.141 5.74406 181.045 5.28006C180.933 5.69606 180.805 6.16006 180.597 6.80006L178.997 11.6641H177.893ZM189.912 11.6641H188.824V4.84806H187.272V3.92006H188.824V1.47206H189.912V3.92006H191.464V4.84806H189.912V11.6641ZM194.005 11.6481H192.901V6.19888e-05H194.005V5.26406C194.501 4.33606 195.445 3.71206 196.741 3.71206C198.773 3.71206 199.685 4.97606 199.685 6.92806V11.6641H198.581V7.16806C198.581 5.36006 197.733 4.72006 196.533 4.72006C194.869 4.72006 194.005 5.95206 194.005 7.44006V11.6481ZM203.838 11.1201C203.838 12.1121 203.07 12.9761 202.078 13.1201V12.5281C202.654 12.4321 203.07 12.0161 203.07 11.5681C202.974 11.6321 202.846 11.6801 202.654 11.6801C202.206 11.6801 201.822 11.3601 201.822 10.8161C201.822 10.2561 202.206 9.85606 202.766 9.85606C203.342 9.85606 203.838 10.3201 203.838 11.1201ZM212.735 11.8561C211.087 11.8561 210.111 10.9281 210.111 9.56806C210.111 8.14406 211.199 7.24806 213.007 7.10406L215.567 6.89606V6.64006C215.567 5.12006 214.655 4.64006 213.519 4.64006C212.175 4.64006 211.375 5.24806 211.375 6.28806H210.367C210.367 4.72006 211.647 3.71206 213.551 3.71206C215.343 3.71206 216.655 4.60806 216.655 6.65606V11.6641H215.727L215.583 10.3041C215.103 11.2801 214.047 11.8561 212.735 11.8561ZM212.991 10.9601C214.623 10.9601 215.567 9.82406 215.567 8.14406V7.72806L213.279 7.90406C211.823 8.03206 211.231 8.67206 211.231 9.53606C211.231 10.4801 211.935 10.9601 212.991 10.9601ZM219.974 11.6641H218.87V3.92006H219.83L219.99 5.26406C220.502 4.27206 221.526 3.71206 222.646 3.71206C224.774 3.71206 225.654 4.97606 225.654 6.92806V11.6641H224.55V7.16806C224.55 5.36006 223.734 4.72006 222.454 4.72006C220.87 4.72006 219.974 5.87206 219.974 7.61606V11.6641ZM230.895 11.8561C228.639 11.8561 227.311 10.1281 227.311 7.80806C227.311 5.47206 228.639 3.71206 230.943 3.71206C232.223 3.71206 233.247 4.27206 233.791 5.39206V6.19888e-05H234.895V11.6641H233.935L233.823 10.0801C233.279 11.2801 232.191 11.8561 230.895 11.8561ZM231.087 10.8481C232.783 10.8481 233.775 9.56806 233.775 7.77606C233.775 6.00006 232.783 4.70406 231.087 4.70406C229.407 4.70406 228.431 6.00006 228.431 7.77606C228.431 9.56806 229.407 10.8481 231.087 10.8481ZM247.076 3.92006H248.18V11.6641H247.22L247.076 10.3521C246.644 11.2481 245.572 11.8561 244.356 11.8561C242.532 11.8561 241.54 10.6081 241.54 8.72006V3.90406H242.66V8.36806C242.66 10.2081 243.476 10.8641 244.708 10.8641C246.196 10.8641 247.076 9.87206 247.076 8.03206V3.92006ZM251.584 11.6641H250.48V3.92006H251.44L251.6 5.26406C252.112 4.27206 253.136 3.71206 254.256 3.71206C256.384 3.71206 257.264 4.97606 257.264 6.92806V11.6641H256.16V7.16806C256.16 5.36006 255.344 4.72006 254.064 4.72006C252.48 4.72006 251.584 5.87206 251.584 7.61606V11.6641ZM260.616 11.6641H259.512V6.19888e-05H260.616V11.6641ZM262.42 7.79206C262.42 5.42406 264.084 3.71206 266.356 3.71206C268.628 3.71206 270.292 5.42406 270.292 7.79206C270.292 10.1441 268.628 11.8561 266.356 11.8561C264.084 11.8561 262.42 10.1441 262.42 7.79206ZM263.54 7.77606C263.54 9.60006 264.692 10.8641 266.356 10.8641C268.004 10.8641 269.172 9.60006 269.172 7.77606C269.172 5.98406 268.004 4.70406 266.356 4.70406C264.692 4.70406 263.54 5.98406 263.54 7.77606ZM271.514 7.80806C271.514 5.37606 273.002 3.71206 275.258 3.71206C277.05 3.71206 278.362 4.75206 278.666 6.35206H277.562C277.274 5.28006 276.346 4.68806 275.274 4.68806C273.706 4.68806 272.602 5.88806 272.602 7.79206C272.602 9.63206 273.626 10.8641 275.194 10.8641C276.346 10.8641 277.274 10.2241 277.578 9.23206H278.698C278.33 10.8161 276.954 11.8561 275.194 11.8561C273.002 11.8561 271.514 10.2401 271.514 7.80806ZM281.522 11.6641H280.418V6.19888e-05H281.522V7.92006L285.362 3.92006H286.754L283.778 7.00806L286.77 11.6641H285.49L283.026 7.79206L281.522 9.34406V11.6641ZM1.424 33.6641H0.463997V22.0001H1.568V27.4241C2.112 26.2881 3.168 25.7121 4.48 25.7121C6.736 25.7121 8.048 27.4721 8.048 29.8081C8.048 32.1281 6.704 33.8561 4.448 33.8561C3.152 33.8561 2.08 33.2801 1.536 32.0801L1.424 33.6641ZM1.584 29.7761C1.584 31.5681 2.576 32.8481 4.272 32.8481C5.952 32.8481 6.928 31.5681 6.928 29.7761C6.928 28.0001 5.952 26.7041 4.272 26.7041C2.576 26.7041 1.584 28.0001 1.584 29.7761Z"
                  fill="white"
                />
              </svg>
            </Box>
            <Typography className={styles.sidebarSubtitle}>
              Create resumes, plan growth, and unlock better opportunities in few simple steps
            </Typography>
          </Box>

          <Box className={styles.stepsSection}>
            {STEPS.map((step) => {
              const isActive = showJDFormOnly
                ? step.id === 'target_job_role'
                : step.id === 'resume_upload';
              const isClickable = !isActive;

              return (
                <Box
                  key={step.id}
                  className={`${styles.stepItem} ${isActive ? styles.stepItemActive : ''}`}
                  onClick={isClickable ? () => handleSidebarStepClick(step.id) : undefined}
                  onKeyDown={isClickable ? (e) => handleSidebarStepKeyDown(e, step.id) : undefined}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  sx={{ cursor: isClickable ? 'pointer' : 'default' }}
                >
                  <Box display="flex" alignItems="center" gap="12px">
                    {isActive ? (
                      <SpinnerIcon size={20} color="#DABF67" animate={true} />
                    ) : (
                      <RadioButtonUncheckedRoundedIcon
                        sx={{ fontSize: 20, color: 'rgba(254,252,232,0.35)', flexShrink: 0 }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontFamily: 'Satoshi, sans-serif',
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: 1.0,
                        letterSpacing: '0em',
                        color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)'
                      }}
                    >
                      {step.label}
                    </Typography>
                  </Box>
                  {isActive && <ChevronRightRoundedIcon sx={{ fontSize: 18, color: '#DABF67' }} />}
                </Box>
              );
            })}
          </Box>

          <Typography className={styles.sidebarBottomText}>
            Reengineer your career based on today&apos;s hiring
          </Typography>

          <Box className={styles.sidebarFooter}>
            <Typography className={styles.copyrightText}>Copyright © 2024 ResAI</Typography>
            <Box component="a" href="#" className={styles.needHelpLink}>
              <HeadsetMicRoundedIcon sx={{ fontSize: 15 }} />
              Need help?
            </Box>
          </Box>
        </Box>

        {/* ── Right Panel ── */}
        <Box className={styles.rightPanel}>
          {showJDFormOnly ? (
            <JDForm
              value={jdFormValue}
              onChange={setJDFormValue}
              editorState={jdFormValue.editorState}
              onEditorChange={handleJDFormEditorChange}
              onSubmit={handleSaveJDForm}
              onBack={() => setShowJDFormOnly(false)}
              onCancel={handleCancel}
            />
          ) : (
            <ResumeUploadForm
              onSave={handleSave}
              onCancel={handleCancel}
              onChange={handleFileChange}
              onDrop={handleDrop}
              spinTimer={fileDetails.spinTimer}
              onDelete={handleDeleteDocument}
              fileDetails={fileDetails}
              hasResumeText={!!uploadedResumeText.trim()}
            />
          )}
        </Box>
      </Box>

      {toastState.open && <Toast toastState={toastState} />}
      <ProgressOverlay open={showProgress} message={progressMessage} progress={progressValue} />
    </>
  );
};

export default withLoader(ResumeUpload);
