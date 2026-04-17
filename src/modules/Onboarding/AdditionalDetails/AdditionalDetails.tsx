import { Box, Divider, Paper, Typography } from '@mui/material';
import { EditorState } from 'draft-js';
import { useTranslation } from 'next-i18next';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState, useMemo } from 'react';
import MobileStepper from '~/shared/components/MobileStepper';
import Stepper from '~/shared/components/Stepper';
import { KeyValuePair, LOCALE_PAGE } from '~/shared/constants/constants';
import {
  StepData,
  AdditionalData,
  OnboardingData,
  enableStepKeyContinueButton
} from '../Utils/OnboardingUtils';
import AdditionalDetailsEditor from './AdditionalDetailsEditor';
import { useStyles } from './AdditionalDetailsStyles';
import { Step } from './Utils/AdditionalDetailsUtils';
// import { useStylesGoldTheme } from '~/modules/globalStyles';
import { ContentState } from 'draft-js';
interface AdditionalDetailsProps {
  onSave: Dispatch<SetStateAction<OnboardingData>>;
  additionalData: AdditionalData;
}

// interface ContactInfo {
//   phone: string | null;
//   email: string | null;
//   isCompleted: boolean;
// }

const AdditionalDetails: FC<AdditionalDetailsProps> = ({ onSave, additionalData }) => {
  const { t: i18n, i18n: i18nextInstance } = useTranslation(LOCALE_PAGE.ONBOARDING);
  // const globalStyles = useStylesGoldTheme();
  const keyMapping: KeyValuePair = {
    user_education: i18n('education'),
    total_experience: i18n('totalExperience'),
    contact_info: i18n('contactInfo'),
    user_achievements: i18n('achievements'),
    user_language: i18n('language'),
    user_professional_experience: i18n('user_professional_experience'),
    user_projects: i18n('user_projects'),
    professional_development: i18n('professional_development'), //RG TEST
    first_name: i18n('first_name'), //RG TEST
    last_name: i18n('last_name'), //RG TEST
    phone: i18n('phone'), //RG TEST
    email: i18n('email') //RG TEST
  };

  const styles = useStyles();
  const [activeStep, setActiveStep] = useState<number>(additionalData?.currentStep);
  useEffect(() => {
    setEmailError(false); // Clear any previous error
    setPhoneError(false);
    setActiveStep(additionalData.currentStep);
  }, [additionalData.currentStep]);
  // const steps: { key: string; title: string; contact_info?: Object | undefined }[] =
  //   additionalData && additionalData
  //     ? Object.keys(additionalData.stepData).map((key: string) => ({
  //         key,
  //         title: keyMapping[key] || key
  //         // Start of Selection
  //         // Start of Selection
  //       }))
  //     : [];
  // const [stepStates, setStepStates] = useState<StepData>(
  //   steps.reduce<StepData>(
  //     (acc: StepData, step: Step) => ({
  //       ...acc,
  //       [step.key]: {
  //         editorState: EditorState.createEmpty(),
  //         isCompleted: false
  //       }
  //     }),
  //     {}
  //   )
  // );

  const userMissingTabs = JSON.parse(localStorage.getItem('userMissingTabs') || '{}');
  const steps: { key: string; title: string }[] =
    additionalData && additionalData
      ? Object.keys(additionalData.stepData).map((key: string) => ({
          key,
          title: keyMapping[key] || key
        }))
      : [];
  const [stepStates, setStepStates] = useState<StepData>(
    steps.reduce<StepData>(
      (acc: StepData, step: Step) => ({
        ...acc,
        [step.key]: {
          editorState: EditorState.createWithContent(
            ContentState.createFromText(userMissingTabs.data[step.key] || '')
          ),
          isCompleted: false
        }
      }),
      {}
    )
  );
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setEmailError(false);
    onSave((prevState: OnboardingData) => ({
      ...prevState,
      additionalData: {
        ...prevState.additionalData,
        currentStep: index
      }
    }));
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [phoneErrorMsg, setPhoneErrorMsg] = useState<string>('');
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

  const [phoneCurrentValue, setPhoneCurrentValue] = useState<string | null>(null);
  const [emailCurrentValue, setEmailCurrentValue] = useState<string | null>(null);

  const handleEditorChange = useCallback(
    (value: EditorState, key: string) => {
      const contentState = value.getCurrentContent();
      const contentText = contentState.getPlainText();
      const contentLength = contentText.length;

      let isCompleted = false;

      // Phone validation
      if (key === 'phone') {
        setPhoneCurrentValue(contentText);
        const isNumeric = /^\d+$/.test(contentText); // Check if the content contains only numbers
        if (isNumeric && contentLength === 10) {
          isCompleted = true;
          setPhoneError(false); // Clear any previous error
          setPhoneErrorMsg('');
        } else {
          isCompleted = false;
          setPhoneError(true); // Set error for phone
          if (contentLength < 10) {
            setPhoneErrorMsg(i18n('validationMessages.minimum10', { ns: 'common' }));
          } else {
            setPhoneErrorMsg(i18n('validationMessages.invalidPhoneNumber', { ns: 'common' }));
          }
        }
      }
      // Email validation
      else if (key === 'email') {
        setEmailCurrentValue(contentText);
        const isValidEmail = emailRegex.test(contentText); // Check if it's a valid email format
        if (isValidEmail) {
          isCompleted = true;
          setEmailError(false); // Clear any previous error
          setEmailErrorMsg('');
        } else {
          isCompleted = false;
          setEmailError(true); // Set error for email
          setEmailErrorMsg(i18n('validationMessages.invalidEmail', { ns: 'common' }));
        }
      }
      // For other steps
      else {
        isCompleted = contentState.hasText();
      }
      const updatedState: { [key: string]: { editorState: EditorState; isCompleted: boolean } } = {
        [key]: { editorState: value, isCompleted }
      };

      // const updatedState: { [key: string]: { editorState: EditorState; isCompleted: boolean } } = {
      //   [key]: { editorState: value, isCompleted: value.getCurrentContent().hasText() }
      // };
      setStepStates((prev: StepData) => ({
        ...prev,
        [key]: {
          editorState: updatedState[key].editorState,
          isCompleted: updatedState[key].isCompleted
        }
      }));

      // Store the editorState in local storage
      // localStorage.setItem(`editorState_${key}`, JSON.stringify(updatedState[key].editorState));

      // Retrieve the current userMissingTabs from local storage
      const userMissingTabs = JSON.parse(localStorage.getItem('userMissingTabs') || '{}');
      userMissingTabs.data[key] = updatedState[key].editorState.getCurrentContent().getPlainText(); // Assign plain text value

      // Save the updated userMissingTabs back to local storage
      localStorage.setItem('userMissingTabs', JSON.stringify(userMissingTabs));

      onSave((prevState: OnboardingData) => ({
        ...prevState,
        additionalData: {
          ...prevState.additionalData,
          stepData: {
            ...prevState.additionalData.stepData,
            ...updatedState
          }
        }
      }));
    },
    [onSave]
  );

  // const defaultContactInfo: ContactInfo = {
  //   phone: null,
  //   email: null,
  //   isCompleted: false
  // };
  // /* eslint-disable @typescript-eslint/no-unused-vars */
  // const [updatedStateC, setUpdatedStateC] = useState<{ contact_info: ContactInfo }>({
  //   contact_info: defaultContactInfo
  // });

  // const phoneValidation = (phoneInputValue: string | null) => {
  //   /* start check phone validations */
  //   if (phoneInputValue != null && /^\d*$/g.test(phoneInputValue)) {
  //     if (phoneInputValue.length == 10) {
  //       setPhoneError(false);
  //       return false;
  //     } else if (phoneInputValue.length < 10) {
  //       setUpdatedStateC((updatedStateC) => ({
  //         ...updatedStateC,
  //         // contact_info: {
  //         //   ...updatedStateC.contact_info,
  //         //   isCompleted: false
  //         // }
  //       }));
  //       setPhoneErrorMsg(i18n('validationMessages.minimum10', { ns: 'common' }));
  //       setPhoneError(true);
  //       return true;
  //     } else {
  //       setUpdatedStateC((updatedStateC) => ({
  //         ...updatedStateC,
  //         // contact_info: {
  //         //   ...updatedStateC.contact_info,
  //         //   isCompleted: false
  //         // }
  //       }));
  //       setPhoneErrorMsg(i18n('validationMessages.invalidPhoneNumber', { ns: 'common' }));
  //       setPhoneError(true);
  //       return true;
  //     }
  //   } else {
  //     setUpdatedStateC((updatedStateC) => ({
  //       ...updatedStateC,
  //       // contact_info: {
  //       //   ...updatedStateC.contact_info,
  //       //   isCompleted: false
  //       // }
  //     }));
  //     setPhoneErrorMsg(i18n('validationMessages.invalidPhoneNumber', { ns: 'common' }));
  //     setPhoneError(true);
  //     return true;
  //   }
  //   /* end check phone validations */
  // };

  // const emailValidation = (emailInputValue: string | null) => {
  //   /* start check email validations */
  //   if (emailInputValue != null && emailRegex.test(emailInputValue)) {
  //     setEmailError(false);
  //     return false;
  //   } else {
  //     setUpdatedStateC((updatedStateC) => ({
  //       ...updatedStateC,
  //       // contact_info: {
  //       //   ...updatedStateC.contact_info,
  //       //   isCompleted: false
  //       // }
  //     })),
  //       setEmailErrorMsg(i18n('validationMessages.invalidEmail', { ns: 'common' })),
  //       setEmailError(true);
  //     return true;
  //   }

  //   /* end check email validations */
  // };

  const editorKey = useMemo(() => i18nextInstance.language, [i18nextInstance.language]);
  //  ------------------------------------ New Code Start contact Info ---------------------------------------
  //Check steps Title -Start
  // let labelSteps: string[] = [];
  // let mobileLabelSteps: string[] = [];
  // labelSteps = steps.map((step: Step) => step.title);
  // mobileLabelSteps = steps.map((step: Step) => step.title);
  // // ---------------------------- Completed Steps-------------------------------
  let completedLabelSteps: boolean[] = [];
  completedLabelSteps = steps.map((step: Step) => {
    return stepStates[step.key]?.isCompleted || false; // Check completion for other step
  });
  //End
  //  ------------------------------------ New Code END contact Info ---------------------------------------
  // const enableStepKeyContinueButton =['professional_development','last_name','total_experience','user_achievements','user_education','user_professional_experience']
  // Continueutton enable -Start
  //end
  // let count = Object.keys(additionalData.stepData).length;
  // console.log('additionalData',count-1)
  // count=count-1;
  // if(activeStep!=count){
  //   setActiveStep(count)
  // }
  // localStorage.setItem('userMissingTabs', JSON.stringify(additionalData.stepData));
  // const userMissingTabs = JSON.parse(localStorage.getItem('userMissingTabs') || '{}');
  // console.log('userMissingTabs999',userMissingTabs)
  // console.log('LocalMissingTabs==',LocalMissingTabs)
  return (
    <Box className={styles.detailsWrapper}>
      <Box component={Paper} display="flex" flexDirection="column">
        <Box p={3}>
          <Typography variant="h5" className={styles.textHeadingStyle}>
            {i18n('additionalDetail')}
          </Typography>
        </Box>
        <Divider className={styles.divider} />
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          <Box p={3} display={{ xs: 'none', md: 'block' }} className={styles.stepStyle}>
            <Stepper
              steps={steps.map((step: Step) => step.title)} //old code
              // steps={labelSteps} //new code -contactInfo
              activeStep={activeStep} //chnage activeSteps to testActiveSteps
              rightArrowShow={false}
              onStepClick={handleStepClick}
              nonLinear
              completedSteps={completedLabelSteps} //new code contactInfo
              // completedSteps={steps.map((step: Step) => {//old code
              //   if (step.key == 'contact_info') {
              //     return (
              //       (additionalData.contactInfoData != undefined &&
              //         additionalData.contactInfoData.isCompleted) ||
              //       false
              //     );
              //   } else {
              //     return stepStates[step.key]?.isCompleted || false;
              //   }
              // })}
            />
          </Box>
          <Box p={3} display={{ xs: 'block', md: 'none' }} className={styles.stepStyle}>
            {/* --------------Old Code contact Info start------- */}
            <MobileStepper steps={steps.map((step: Step) => step.title)} activeStep={activeStep} />
            {/* --------------Old Code contact Info end------- */}

            {/* --------------New Code contact Info Start------- */}
            {/* <MobileStepper steps={mobileLabelSteps} activeStep={activeStep} /> */}
            {/* --------------New Code contact Info end------- */}
          </Box>
          <Divider orientation="vertical" flexItem className={styles.divider} />
          {/* --------------Old Code contact Info------- */}
          {/* {calculatedActiveStep >= -1 && (
          <Box p={3} pt={{ xs: 0, md: 3 }} width="100%">
            {steps.map(
              (step, index) =>
                index === activeStep &&
                step.title != 'Contact Info.' && (
                  <AdditionalDetailsEditor
                    title={step.title}
                    placeholder={`${i18n('enterYour')} ${step.title}`}
                    onEditorChange={(value) => handleEditorChange(value, step.key)}
                    editorData={stepStates[step.key]?.editorState || EditorState.createEmpty()}
                    keyName={step.key}
                    key={step.key && editorKey}
                  />
                )
            )}
          </Box>
        )} */}
          {/* --------------Old Code contact Info------- */}

          {/* --------------New Code contact Info------- */}

          <Box p={3} pt={{ xs: 0, md: 3 }} width="100%">
            {steps.map(
              (step, index) =>
                index === activeStep && (
                  <AdditionalDetailsEditor
                    title={step.title}
                    placeholder={`${i18n('enterYour')} ${
                      enableStepKeyContinueButton.includes(step.key)
                        ? step.title + i18n('optionalData')
                        : step.title
                    }`}
                    onEditorChange={(value) => handleEditorChange(value, step.key)}
                    editorData={
                      stepStates[step.key]?.editorState ||
                      EditorState.createWithContent(
                        ContentState.createFromText(userMissingTabs.data[step.key] || '')
                      )
                    }
                    keyName={step.key}
                    key={`${step.key}_${activeStep}_${editorKey}`}
                    autoFocus={index === activeStep}
                  />
                )
            )}
            {phoneError && phoneCurrentValue !== null && phoneCurrentValue !== '' && (
              <p style={{ color: 'red', fontSize: '15px' }}>{phoneErrorMsg}</p>
            )}
            {emailError && emailCurrentValue !== null && emailCurrentValue !== '' && (
              <p style={{ color: 'red', fontSize: '15px' }}>{emailErrorMsg}</p>
            )}
          </Box>
          {/* -------------New code End contact Info ------------- */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdditionalDetails;
