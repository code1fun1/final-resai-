import { Box } from '@mui/material';
import { ContentState, EditorState } from 'draft-js';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import withLoader from '~/shared/components/HOC/withLoader';
import StepNavigation from '~/shared/components/StepNavigation';
// import Toast from '~/shared/components/Toast';
import { API_STATUS, APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import { handleToast } from '~/shared/utils/utils';
import AIQuestionPanel from './AIQuestionPanel';
import { Sidebar } from '~/shared/components/Sidebar/Sidebar';
import {
  getAIQuestions,
  saveAnswer,
  saveAIQuestions
} from './AIQuestionPanel/Utils/AIQuestionPanelUtils';
import AdditionalDetails from './AdditionalDetails';
import { getMissingTabs, saveMissingData } from './AdditionalDetails/Utils/AdditionalDetailsUtils';
import JobProfile from './JobProfile';
import SkillSetProfile from './SkillSetProfile';
import {
  DEFAULT_ADDITIONAL_DATA,
  DEFAULT_AI_PROMPT_DATA,
  DEFAULT_SIMILARITY_DATA,
  DEFAULT_USER_JOB_DATA,
  DEFAULT_USER_PROFILE_DATA,
  OnboardingData,
  Question,
  RESPONSE_TYPE,
  SaveSkillsRequest,
  SimilarityScoreRequest,
  StepData,
  getSimilarityScore,
  getUserData,
  isCurrentStepValid,
  saveUserSkillsData,
  updateProfileData
  // AIPromptData
} from './Utils/OnboardingUtils';
import { createUserCv } from './JobProfile/Utils/JobProfileUtils';
import httpRequest from '~/shared/utils/axios';
import { setStorageItem } from '~/shared/utils/storage';
import { STORAGE_TYPES } from '~/shared/utils/storage';
// import * as Sentry from '@sentry/nextjs';
import sentryCaptureError from '~/sentryCaptureError';
import { getStorageItem } from '~/shared/utils/storage';
interface OnboardingProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

const initialValue: OnboardingData = {
  profileData: DEFAULT_USER_PROFILE_DATA,
  additionalData: DEFAULT_ADDITIONAL_DATA,
  jobData: DEFAULT_USER_JOB_DATA,
  aiPromptData: DEFAULT_AI_PROMPT_DATA,
  similarityScoreData: DEFAULT_SIMILARITY_DATA
};

const DEFAULT_STEP: number = -1;
const NEVER_DONE_THAT: string = 'Never done that';

const SKILLS_SIDEBAR_STEPS: { label: string; state: 'completed' | 'active' | 'pending' }[] = [
  { label: 'Resume Upload', state: 'completed' },
  { label: 'Target Job Role', state: 'completed' },
  { label: 'Skills & Strengths', state: 'active' },
  { label: 'Personal Details', state: 'pending' }
];

const PERSONAL_DETAILS_SIDEBAR_STEPS: {
  label: string;
  state: 'completed' | 'active' | 'pending';
}[] = [
  { label: 'Resume Upload', state: 'completed' },
  { label: 'Target Job Role', state: 'completed' },
  { label: 'Skills & Strengths', state: 'completed' },
  { label: 'Personal Details', state: 'active' }
];

const Onboarding: React.FC<OnboardingProps> = ({ setLoadWithoutMount }) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [localskillData, setLocaluserSkillData] = useState<any[]>(
    []
  ); /* eslint-enable @typescript-eslint/no-explicit-any */
  const userSkillsLocal = getStorageItem({ key: 'userSkills', useCombineStorage: true });
  const [IsDataLoading, setIsDataLoading] = useState<number>(0);

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

  const router = useRouter();
  //const pathname = usePathname();
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const [activeSteps, setActiveSteps] = useState<number>(DEFAULT_STEP);
  const skipAutoAdvance = useRef(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialValue);
  const [isQuestionFetched, setIsQuestionFetched] = useState<boolean>(false);

  const [localJobTitle, setLocalJobTitle] = useState<{
    title: string;
    company: string;
    role: string;
    job_description: string;
    id: string;
  }>({
    title: '',
    company: '',
    role: '',
    job_description: '',
    id: ''
  });

  const {
    aiPromptData: { currentQuestionIndex, questionList }
  } = onboardingData;
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const { ERROR } = SEVERITY;
  const { RAPID_API } = APIS;
  const fetchMissingTabs = async () => {
    setLoadWithoutMount(true);
    let res: any = await getMissingTabs(); // eslint-disable-line @typescript-eslint/no-explicit-any
    let missingTabs = localStorage.getItem('userMissingTabs');
    missingTabs = missingTabs ? JSON.parse(missingTabs) : null;

    if (!missingTabs) {
      localStorage.setItem('userMissingTabs', JSON.stringify(res));
    } else {
      res = missingTabs;
    }

    if (res?.data && Object.keys(res?.data).length > 0) {
      if (res.data.contact_info) {
        onboardingData.additionalData.contactInfoData = res.data.contact_info;
        if (onboardingData.additionalData.contactInfoData != undefined) {
          onboardingData.additionalData.contactInfoData.isCompleted = false;
          delete res.data.contact_info;
        }
      } else {
        delete onboardingData.additionalData.contactInfoData;
      }
      setOnboardingData((prevState) => ({
        ...prevState,
        additionalData: {
          ...prevState.additionalData,
          stepData: {
            ...res?.data
          }
        }
      }));
      setLoadWithoutMount(false);
      return true;
    } else {
      setLoadWithoutMount(false);
      return false;
    }
  };

  const fetchAIQuestion = async () => {
    setLoadWithoutMount(true, i18n('loaderMessages.generatingSmartQuestions', { ns: 'common' }));
    setIsDataLoading(1);
    const jd_id: string = // eslint-disable-line @typescript-eslint/naming-convention
      onboardingData?.jobData?.jobForm?.id !== undefined
        ? String(onboardingData.jobData.jobForm.id)
        : '';
    const jobDescription: string = onboardingData?.jobData?.editorState
      ?.getCurrentContent()
      ?.getPlainText()
      ?.trim();
    const res = await getAIQuestions(jobDescription, jd_id);
    if (res?.data?.questions.length > 0) {
      setOnboardingData((prevState) => ({
        ...prevState,
        aiPromptData: {
          ...prevState.aiPromptData,
          questionList: res?.data?.questions,
          currentQuestionIndex: 0,
          editorData: EditorState.createEmpty()
        }
      }));
      setLoadWithoutMount(false, '');
      setIsDataLoading(2);
      return true;
    } else {
      setLoadWithoutMount(false, '');
      setIsDataLoading(3);
      sentryCaptureError(
        'AI questions suggestions API Response Failed',
        'user/ai-questions-suggestions'
      ); //capture error (only pass error message and Api inside this function)
      return false;
    }
  };
  const handleBack = async () => {
    switch (activeSteps) {
      case 0:
        router.push(ROUTES.RESUME_UPLOAD);
        break;
      case 1:
        if (onboardingData.additionalData.currentStep > 0) {
          const additionalData: StepData = onboardingData.additionalData.stepData;
          // Object.keys(additionalData).forEach((key) => delete additionalData[key]?.editorState);
          /* eslint-disable */
          Object.keys(additionalData).forEach((key) => {
            const data = additionalData[key] as any;
            if (data) {
              delete data.editorState;
            }
          });
          /* eslint-enable */
          setOnboardingData((prevState) => ({
            ...prevState,
            additionalData: {
              ...prevState.additionalData,
              currentStep: prevState.additionalData.currentStep - 1
            }
          }));
        } else {
          setActiveSteps((prevState) => prevState - 1);
        }
        break;
      case 2:
        if (currentQuestionIndex > 0) {
          const prevQuestion = questionList[currentQuestionIndex - 1];
          setOnboardingData((prevState) => ({
            ...prevState,
            aiPromptData: {
              ...prevState.aiPromptData,
              currentQuestionIndex: prevState.aiPromptData.currentQuestionIndex - 1,
              editorData: EditorState.createWithContent(
                ContentState.createFromText(prevQuestion.answer ?? '')
              )
            }
          }));
        } else {
          const isMissingData = await fetchMissingTabs();
          setActiveSteps((prevState) => prevState - (isMissingData ? 1 : 2));
        }
        break;
      default:
        const isAnyQuestion: boolean = await fetchAIQuestion();
        const stepsToSubtract: number = isAnyQuestion ? 1 : (await fetchMissingTabs()) ? 2 : 3;
        setActiveSteps((prevState: number) => prevState - stepsToSubtract);
        setIsQuestionFetched(true);
        break;
    }
  };
  //save Rapid Data start
  const savedRapidData = async (targetJobTitle: string) => {
    const request = {
      url: RAPID_API,
      method: API_METHOD.POST,
      body: {
        req_param: {
          title: targetJobTitle
        }
      }
    };
    const response = await httpRequest(request);
    if (response[0] !== null) {
      return {
        status: API_STATUS.SUCCESS,
        data: response[0]?.res_data?.data,
        message: response[0]?.res_data?.message
      };
    } else {
      const errorMessage = response[1]?.err?.response?.responseMessage;
      const senTryMessage = errorMessage ? errorMessage?.error?.message : response[1]?.err?.message;
      sentryCaptureError(senTryMessage, RAPID_API); //capture error (only pass error message and Api inside this function)
      return {
        status: API_STATUS.FAILED,
        data: null,
        message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
      };
    }
  };
  //end
  const handleSaveUserSkills = async () => {
    setLoadWithoutMount(true);
    const { currentJob, targetJob, userSkills, userStrengths, userSkillsGaps, userDomains } =
      onboardingData?.profileData;
    // -----------------------New Code for Handle resume extracted skill--------------------
    const seletectedSkill = userSkills; // userskill, skill gap and new added skill both data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resumeExtractedSkill: any[] = localskillData;
    // Step 1: Filter out the skills from selectedSkill that are not in resumeExtractedSkill
    const filterSkill = seletectedSkill.filter(
      (skill) => !resumeExtractedSkill.some((extractedSkill) => extractedSkill.id === skill.id)
    );
    // Step 2: Add the filtered skills to localskillData
    const updatedLocalSkills = [...resumeExtractedSkill, ...filterSkill]; // eslint-disable-line @typescript-eslint/no-unused-vars

    // -----------------------New Code for Handle resume extracted skill--------------------
    const currentSelectedJob = { id: currentJob?.id, name: currentJob?.name };

    // below code is to add is_skill_gap flag
    const userSkillsWithGapFlag = userSkills.map((skill) => {
      let found = false; // Declare 'found' as 'let' because it will be reassigned
      // Check if the skill name exists in userSkillsGaps
      userSkillsGaps.some((gap) => {
        if (gap.name === skill.name) {
          found = true;
          return true; // If a match is found, stop the loop early
        }
        return false;
      });
      // Create a new skill object with the is_skill_gap property set to 'found'
      const newSkills = {
        ...skill, // Copy the existing properties of the skill
        is_skill_gap: found // Add the new property
      };
      return newSkills; // Return the modified skill object
    });

    // userSkillsWithGapFlag in cache
    localStorage.setItem('userSkillsWithGap', JSON.stringify(userSkillsWithGapFlag));

    const data: SaveSkillsRequest = {
      current_job: currentSelectedJob,
      user_jobs:
        localJobTitle?.title != ''
          ? {
              id: '',
              name: localJobTitle?.title
            }
          : targetJob,
      user_skills: userSkillsWithGapFlag, //change if we want to use resumeExtractedSkill else use userSkill or userSkillsWithGapFlag
      user_strengths: userStrengths,
      user_domains: userDomains
    };

    const res = await saveUserSkillsData(data);
    const severity: SEVERITY = res?.status === SEVERITY.SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    setLoadWithoutMount(false);
    if (res.status === SEVERITY.SUCCESS) {
      // Call savedRapidData with the target job
      savedRapidData(targetJob?.name);
      const isMissingData = await fetchMissingTabs();
      const stepsToAdd = isMissingData ? 1 : (await fetchAIQuestion()) ? 2 : 3;
      setActiveSteps((prevState) => prevState + stepsToAdd);
      setIsQuestionFetched(true);
    }
  };

  const showNextQuestion = () => {
    const nextQuestion: Question | undefined =
      onboardingData.aiPromptData.questionList[currentQuestionIndex + 1];

    if (nextQuestion) {
      setOnboardingData((prevState) => ({
        ...prevState,
        aiPromptData: {
          ...prevState.aiPromptData,
          currentQuestionIndex: prevState.aiPromptData.currentQuestionIndex + 1,
          editorData: EditorState.createWithContent(
            ContentState.createFromText(nextQuestion.answer ?? '')
          )
        }
      }));
    }
  };
  const attemptValue = localStorage.getItem('lastAttempt'); //attempt change
  const handleQuestion = async (answer: string | undefined, updateStep: boolean) => {
    showNextQuestion();
    const currentQuestion: Question = questionList[currentQuestionIndex];
    const reqData = {
      question: currentQuestion.question,
      answer,
      update_user_step: updateStep,
      attempt: Number(attemptValue) //set via localStorage //attempt change
    };
    setLoadWithoutMount(true);
    const res = await saveAnswer(reqData);
    setLoadWithoutMount(false);
    const severity: SEVERITY = res?.status === SEVERITY.SUCCESS ? SEVERITY.SUCCESS : ERROR;
    if (res?.status !== SEVERITY.SUCCESS) {
      handleToast({ severity, message: res.message }, setToastState, toastState);
    }
  };

  const handleQuestionFromAI = async () => {
    const hasNextQuestion: boolean = currentQuestionIndex < questionList.length - 1;
    const currentQuestion: Question = questionList[currentQuestionIndex];
    await handleQuestion(currentQuestion.answer, !hasNextQuestion);
    if (!hasNextQuestion) {
      setActiveSteps((prevState: number) => prevState + 1);
      setOnboardingData((prevState) => ({
        ...prevState,
        aiPromptData: {
          ...prevState.aiPromptData,
          currentQuestionIndex: 0,
          editorData: EditorState.createEmpty()
        }
      }));
      setIsQuestionFetched(false);
    }
  };

  const handleSaveJobDetails = async () => {
    setLoadWithoutMount(true);
    const {
      company,
      title,
      role,
      employment_type: employmentType,
      location,
      notice_period: noticePeriod,
      work_site: workSite
    } = onboardingData?.jobData?.jobForm;
    const editorText: string = onboardingData?.jobData?.editorState
      ?.getCurrentContent()
      ?.getPlainText()
      ?.trim();

    const data: SimilarityScoreRequest = {
      title: title,
      role: role,
      company: company,
      job_description: editorText,
      location: location || '',
      employment_type: employmentType ? employmentType : null,
      notice_period: noticePeriod ? noticePeriod : null,
      work_site: workSite ? workSite : null
    };
    const res = await getSimilarityScore(data);
    const severity: SEVERITY = res?.status === SEVERITY.SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res.status === SEVERITY.SUCCESS) {
      setOnboardingData((prevState: OnboardingData) => ({
        ...prevState,
        similarityScoreData: {
          scorePercent: res?.data?.similarity_score,
          isModalOpen: true,
          last_attempt: res?.data?.last_attempt
        } //attempt change
      }));
    }
    setLoadWithoutMount(false);
    localStorage.setItem('lastAttempt', res?.data?.last_attempt ? res?.data?.last_attempt : 1); //attempt change(Step 1)
  };

  const handleSkip = async () => {
    const hasNextNextQuestion: boolean = currentQuestionIndex < questionList.length - 1; //chnage -2 to -1
    //Modified code for 75 point -start
    // Clear the current answer if it exists
    if (questionList[currentQuestionIndex]?.answer) {
      const currentQuestion: Question = questionList[currentQuestionIndex]; // eslint-disable-line @typescript-eslint/no-unused-vars

      // Reset the current question's answer by clearing its editor state
      setOnboardingData((prevState) => ({
        ...prevState,
        aiPromptData: {
          ...prevState.aiPromptData,
          questionList: prevState.aiPromptData.questionList.map((question, index) => {
            if (index === currentQuestionIndex) {
              return {
                ...question,
                answer: '' // Clear the answer for the current question
              };
            }
            return question;
          }),
          editorData: EditorState.createEmpty() // Reset editor data to empty state
        }
      }));
    }
    //Modified code for 75 point - end
    await handleQuestion(NEVER_DONE_THAT, !hasNextNextQuestion);
    if (!hasNextNextQuestion) {
      setActiveSteps((prevState: number) => prevState + 1);
      setIsQuestionFetched(false);
    }
  };

  const handleSaveMissingDetails = async () => {
    setLoadWithoutMount(true);
    const additionalData: StepData = onboardingData.additionalData.stepData;
    const editorDataObject: { [key: string]: string | Object } = {};
    // let cInfo = false;
    // if (onboardingData.additionalData.contactInfoData) {
    //   onboardingData.additionalData.currentStep = -1;

    //   if (
    //     onboardingData.additionalData &&
    //     onboardingData.additionalData.contactInfoData &&
    //     onboardingData.additionalData.contactInfoData.isCompleted !== undefined
    //   ) {
    //     delete onboardingData.additionalData.contactInfoData.isCompleted;
    //   }

    //   editorDataObject.contact_info = onboardingData.additionalData.contactInfoData;
    //   cInfo = true;
    // }
    if (additionalData && Object.keys(additionalData).length > 0) {
      const keys: string[] = Object.keys(additionalData);
      // 🧹 Clear all keys before extracting fresh data
      // Object.keys(additionalData).forEach((key) => delete additionalData[key]?.editorState);

      keys.forEach((key) => {
        const editorState: EditorState = additionalData[key]?.editorState;
        if (editorState) {
          const contentState: ContentState = editorState.getCurrentContent();
          const editorText: string = contentState.getPlainText();
          // if(editorText.length > 0){
          editorDataObject[key] = editorText;
          // }
        }
      });
    }
    // if (cInfo === true && onboardingData.additionalData.currentStep >= 0) {
    //   if (
    //     onboardingData.additionalData.contactInfoData != undefined &&
    //     onboardingData.additionalData.contactInfoData.phone != undefined &&
    //     onboardingData.additionalData.contactInfoData.email != undefined &&
    //     onboardingData.additionalData.contactInfoData.phone != '' &&
    //     onboardingData.additionalData.contactInfoData.email != ''
    //   ) {
    //     cInfo = false;
    //   } else if (
    //     onboardingData.additionalData.contactInfoData != undefined &&
    //     onboardingData.additionalData.contactInfoData.phone != undefined &&
    //     onboardingData.additionalData.contactInfoData.phone != ''
    //   ) {
    //     cInfo = false;
    //   } else if (
    //     onboardingData.additionalData.contactInfoData != undefined &&
    //     onboardingData.additionalData.contactInfoData.email != undefined &&
    //     onboardingData.additionalData.contactInfoData.email != ''
    //   ) {
    //     cInfo = false;
    //   }
    // }

    let isItLastItem: boolean = false;

    isItLastItem =
      Object.keys(additionalData).length - 1 - onboardingData.additionalData.currentStep === 0;
    const res = await saveMissingData(editorDataObject, isItLastItem);

    //a     const res = {};
    setLoadWithoutMount(false);
    const severity: SEVERITY = res?.status === SEVERITY.SUCCESS ? SEVERITY.SUCCESS : ERROR;
    handleToast({ severity, message: res.message }, setToastState, toastState);
    // const updatedStep: number = isItLastItem ? 0 : onboardingData.additionalData.currentStep + 1;//old code
    const updatedStep: number = isItLastItem
      ? onboardingData.additionalData.currentStep // Do not reset, stay on the last step
      : onboardingData.additionalData.currentStep + 1; //new code
    if (res?.status === API_STATUS.SUCCESS) {
      setOnboardingData((prevState: OnboardingData) => ({
        ...prevState,
        additionalData: {
          ...prevState.additionalData,
          currentStep: updatedStep
        }
      }));
    }
    if (isItLastItem) {
      const aiResponse: boolean = await fetchAIQuestion();
      const stepsToAdd: number = aiResponse ? 1 : 2;
      setActiveSteps((prevState: number) => prevState + stepsToAdd);
    }
  };

  const handleSave = async () => {
    const actions: (() => Promise<void>)[] = [
      handleSaveUserSkills,
      handleSaveMissingDetails,
      handleQuestionFromAI,
      handleSaveJobDetails
    ];
    if (activeSteps < actions.length) {
      await actions[activeSteps]();
    }
  };
  const handleAutoImproveScoreAndCreateResume = async () => {
    let progressInterval: NodeJS.Timeout | null = null;
    try {
      const PROGRESS_MESSAGE_KEYS = [
        'loaderMessages.calculatingSimilarityScore', // New message for similarity score
        'loaderMessages.preparingResumeData', // New message for data preparation
        'loaderMessages.creatingOptimizedResume' // New message for CV creation
      ];

      // You can reuse or define a specific final message key if needed
      const FINAL_MESSAGE_KEY = 'loaderMessages.almostDonePreparingResults';

      // Start loader with the first message
      let messageIndex = 0;
      setLoadWithoutMount(true, i18n(PROGRESS_MESSAGE_KEYS[messageIndex], { ns: 'common' }));

      // Set up the interval to cycle through messages
      progressInterval = setInterval(() => {
        messageIndex += 1;

        if (messageIndex < PROGRESS_MESSAGE_KEYS.length) {
          setLoadWithoutMount(true, i18n(PROGRESS_MESSAGE_KEYS[messageIndex], { ns: 'common' }));
        } else {
          // All progress messages shown, switch to the final message
          setLoadWithoutMount(true, i18n(FINAL_MESSAGE_KEY, { ns: 'common' }));
          // The interval will be cleared later upon success/failure of the main logic,
          // but you can clear it here too if you want the final message to persist without change.
          // For a short process, letting it run might be fine, but to be safe:
          if (progressInterval) {
            clearInterval(progressInterval);
            progressInterval = null;
          }
        }
      }, 5000); // Set an appropriate time (e.g., 15 seconds) per message

      // 1. Get similarity score
      const similarityRes = await getSimilarityScore(localJobTitle as any); // eslint-disable-line @typescript-eslint/no-explicit-any

      // Stop interval if API completes early
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }

      // Only proceed if getSimilarityScore gets data successfully
      if (similarityRes && similarityRes.status === SEVERITY.SUCCESS) {
        // Restart the interval for the CV creation phase if needed, or rely on the final message
        // Since CV creation is a promise, let's keep the loader active manually
        // and re-set the loader to the final message key before the promise.
        setLoadWithoutMount(true, i18n(FINAL_MESSAGE_KEY, { ns: 'common' }));

        const data = {
          ...localJobTitle
        };

        /* eslint-disable */
        createUserCv(data as any)
          .then((res) => {
            /* eslint-enable */
            if (res?.data?.company) {
              setStorageItem('lastResumeId', res.data.id, STORAGE_TYPES.LOCAL);
              // Stop loader BEFORE navigation
              setLoadWithoutMount(false, '');

              // Navigate
              router.push(ROUTES.RESUME_DOWNLOAD);

              // Exit immediately
              return;
            } else {
              sentryCaptureError('Create resume anyway API Response Failed', 'user/cv');
              setLoadWithoutMount(false);
            }
          })
          .catch((error) => {
            console.error('Error creating CV:', error);
            sentryCaptureError('Create resume anyway API Response Failed', 'user/cv');
            setLoadWithoutMount(false);
          });
      } else {
        // Handle case when similarity score is not available
        const severity = SEVERITY.ERROR;
        handleToast(
          { severity, message: 'Similarity score not available' },
          setToastState,
          toastState
        );
        // Since the interval was cleared, just hide the loader
        setLoadWithoutMount(false);
      }
    } catch (error) {
      setLoadWithoutMount(false);
      if (progressInterval) clearInterval(progressInterval); // Ensure interval is cleared on main error
    }
  };

  const handleSkipAllQuestions = async () => {
    try {
      // Start loader
      setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
      setIsDataLoading(1);

      const skippedAnswers =
        onboardingData?.aiPromptData?.questionList?.map((q) => ({
          question: q.question,
          answer: 'Never done that'
        })) || [];

      const totalQuestions = skippedAnswers.length;

      if (totalQuestions === 0) {
        setLoadWithoutMount(false);
        setIsDataLoading(0);

        // If no questions, still move to the next step (Step 3)
        setActiveSteps((prevState: number) => prevState + 1);

        return;
      }

      // Sequentially save all skipped answers
      for (let index = 0; index < skippedAnswers.length; index++) {
        const skipped = skippedAnswers[index];
        const isLastQuestion = index === totalQuestions - 1; // CHECK IF IT'S THE LAST ITEM

        await saveAIQuestions({
          question: skipped.question,
          answer: skipped.answer,
          // Set to TRUE only for the very last question in the loop
          update_user_step: isLastQuestion,
          attempt: Number(attemptValue) || 1
        });
      }

      // Move to the next step (Step 3 - Job Profile)
      // This is safe because the loop has completed and the last API call carried update_user_step: true
      setActiveSteps((prevState: number) => prevState + 1);

      // Stop loader
      setLoadWithoutMount(false);
      setIsDataLoading(0);
    } catch (error) {
      setLoadWithoutMount(false);
      setIsDataLoading(0);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jdFormValue');
      if (stored) {
        try {
          const parsedJdFormValue = JSON.parse(stored);
          if (
            parsedJdFormValue.jobTitle ||
            parsedJdFormValue.companyName ||
            parsedJdFormValue.jobDesc
          ) {
            setLocalJobTitle(parsedJdFormValue.jobTitle || '');
            setLocalJobTitle({
              title: parsedJdFormValue.jobTitle || '',
              company: parsedJdFormValue.companyName || '',
              role: parsedJdFormValue.jobDesc || '',
              job_description: parsedJdFormValue.jobDesc || '',
              id: parsedJdFormValue.id || ''
              // location:null,
              // employment_type: null,
              // notice_period: null,
              // work_site:  null
            });
          }
        } catch {}
      }
    }

    if (activeSteps === 3 && localJobTitle?.title != '') {
      handleAutoImproveScoreAndCreateResume();
    }

    async function handleUserStep() {
      const isMissingData = await fetchMissingTabs();
      try {
        if (!isMissingData) {
          const aiResponse = await fetchAIQuestion();
          const stepsToAdd = aiResponse ? 1 : 2;
          setActiveSteps((prevState) => prevState + stepsToAdd);
        }
      } catch (error) {
        console.error('Error fetching AI question:', error);
        const stepsToAdd = 2;
        setActiveSteps((prevState) => prevState + stepsToAdd);
      }
    }

    async function handleAIQuestion() {
      const isAnyQuestion = await fetchAIQuestion();
      if (!isAnyQuestion) {
        setActiveSteps((prevState) => prevState + 1);
      }
    }

    if (activeSteps === 0) {
      // Clear skip guard so it doesn't bleed into step 1 when user clicks Continue
      skipAutoAdvance.current = false;
    } else if (activeSteps === 1) {
      if (skipAutoAdvance.current) {
        skipAutoAdvance.current = false;
        return;
      }
      handleUserStep();
    } else if (activeSteps === 2 && !isQuestionFetched) {
      handleAIQuestion();
    }
  }, [activeSteps]);

  useEffect(() => {
    if (activeSteps === 0 || activeSteps === 1) {
      document.body.classList.add('jd-wizard-mode');
    } else {
      document.body.classList.remove('jd-wizard-mode');
    }
    return () => {
      document.body.classList.remove('jd-wizard-mode');
    };
  }, [activeSteps]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoadWithoutMount(true);
      try {
        const forcedStep = localStorage.getItem('forceOnboardingStep');
        if (forcedStep !== null) {
          localStorage.removeItem('forceOnboardingStep');
          skipAutoAdvance.current = true;
          setActiveSteps(parseInt(forcedStep, 10));
          setLoadWithoutMount(false);
          return;
        }
        const res = await getUserData();
        const userJobDetailStep: number = 3;
        if (res.status === API_STATUS.SUCCESS) {
          updateProfileData(res.data, RESPONSE_TYPE.PROFILE, setOnboardingData);
          setActiveSteps(
           res?.data?.user?.user_step > 5 ? userJobDetailStep : res?.data?.user?.user_step - 2
          );
        }
      } catch (e) {
      } finally {
        setLoadWithoutMount(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Helper: check if any field in jdFormValue from localStorage is filled
  let isJDFormValueFilled = false;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('jdFormValue');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        isJDFormValueFilled = !!(parsed.jobTitle || parsed.companyName || parsed.jobDesc);
      } catch {
        isJDFormValueFilled = false;
      }
    }
  }

  return (
    <>
      {activeSteps === 0 || activeSteps === 1 ? (
        /* ── Skills & Personal Details: full-page sidebar layout ── */
        <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          <Sidebar
            steps={activeSteps === 0 ? SKILLS_SIDEBAR_STEPS : PERSONAL_DETAILS_SIDEBAR_STEPS}
          />

          {/* Main content */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#f3f4f6',
              px: { xs: 0, sm: 3 },
              py: { xs: 0, sm: 3 },
              minHeight: '100vh'
            }}
          >
            {activeSteps === 0 && (
              <SkillSetProfile
                userProfileData={onboardingData.profileData}
                onSave={setOnboardingData}
                onBack={handleBack}
                onCancel={() => router.push(ROUTES.RESUME_UPLOAD)}
                onContinue={handleSave}
              />
            )}
            {activeSteps === 1 && (
              <AdditionalDetails
                onSave={setOnboardingData}
                additionalData={onboardingData.additionalData}
                onBack={handleBack}
                onCancel={() => router.push(ROUTES.RESUME_UPLOAD)}
                onContinue={handleSave}
              />
            )}
          </Box>
        </Box>
      ) : (
        /* ── All other steps ── */
        <Box bgcolor="primary.light">
          {activeSteps === 2 && onboardingData?.aiPromptData?.questionList?.length > 0 && (
            <AIQuestionPanel
              aiPromptData={onboardingData.aiPromptData}
              userProfileData={onboardingData.profileData}
              onSave={setOnboardingData}
              IsDataLoading={IsDataLoading}
            />
          )}
          {activeSteps === 3 && localJobTitle?.title === '' && (
            <JobProfile
              userJobData={onboardingData?.jobData}
              targetJob={onboardingData?.profileData?.targetJob?.name}
              similarityData={onboardingData?.similarityScoreData}
              onSave={setOnboardingData}
              setActiveSteps={setActiveSteps}
            />
          )}
        </Box>
      )}

      {activeSteps !== 0 && activeSteps !== 1 && (
        <StepNavigation
          backButtonText={i18n('buttonTexts.back', { ns: 'common' })}
          continueButtonText={i18n('buttonTexts.continue', { ns: 'common' })}
          onBackButtonClick={handleBack}
          onContinueButtonClick={handleSave}
          isContinueButtonDisable={
            activeSteps === 3
              ? !(isJDFormValueFilled || isCurrentStepValid(onboardingData, activeSteps))
              : !isCurrentStepValid(onboardingData, activeSteps)
          }
          showSkipButton={activeSteps === 2 ? true : false}
          skipBtnName={i18n('buttonTexts.neverDoneThat', { ns: 'common' })}
          onSkipButtonClick={handleSkip}
          showSkipAllButton={activeSteps === 2 ? true : false}
          skipAllBtnName={i18n('buttonTexts.skipAll', { ns: 'common' })}
          onSkipAllButtonClick={handleSkipAllQuestions}
          aiPromptData={onboardingData.aiPromptData}
          currentSteps={activeSteps}
        />
      )}
    </>
  );
};
export default withLoader(Onboarding);
