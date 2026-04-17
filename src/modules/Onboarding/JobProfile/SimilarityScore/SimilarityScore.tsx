import { Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import CircularProgressBar from '~/shared/components/CircularProgressBar';
import {
  STROKE_LINE_CAP,
  TEXT_FONT_SIZE
} from '~/shared/components/CircularProgressBar/CircularProgressBar';
import withLoader from '~/shared/components/HOC/withLoader';
import Heading from '~/shared/components/Heading';
import Modal from '~/shared/components/Modal';
// import Toast from '~/shared/components/Toast';
import { API_STATUS, LOCALE_PAGE } from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import { STORAGE_TYPES, setStorageItem } from '~/shared/utils/storage';
// import { handleToast } from '~/shared/utils/utils';
import { JobData, SimilarityScoreData } from '../../Utils/OnboardingUtils';
import { CreateCvRequest, createUserCv } from '../Utils/JobProfileUtils';
import { useStyles } from './SimilarityScoreStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import sentryCaptureError from '~/sentryCaptureError';
interface SimilarityScoreProp {
  userJobData: JobData;
  similarityData: SimilarityScoreData;
  setActiveSteps: Dispatch<SetStateAction<number>>;
  setLoadWithoutMount: (value: boolean, message?: string) => void;
  onSimilarityModalClose: () => void;
}

const SimilarityScore: React.FC<SimilarityScoreProp> = ({
  userJobData,
  similarityData,
  setActiveSteps,
  onSimilarityModalClose,
  setLoadWithoutMount
}) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  // const { ERROR } = SEVERITY;
  const router = useRouter();
  const { asPath } = router; // Get the current URL
  // const [toastState, setToastState] = useState<ToastMessage>({
  //   open: false,
  //   severity: SEVERITY.SUCCESS,
  //   message: ''
  // });
  const handleImproveScore = () => {
    setActiveSteps((prevState: number) => prevState - 1);
    onSimilarityModalClose();
    //get and update +1 attempt value using local storage
    localStorage.setItem('IsImprovedScoreClick', JSON.stringify(1));
    const attemptValue = localStorage.getItem('lastAttempt');
    if (attemptValue != null) {
      const newValueAttempt = Number(attemptValue) + 1;
      localStorage.setItem('lastAttempt', newValueAttempt.toString()); //attempt change
    }
  };

  const handleCreateResume = async () => {
    onSimilarityModalClose();
    // setLoadWithoutMount(true);
    setLoadWithoutMount(true, i18n('loaderMessages.enhancingResumeContent', { ns: 'common' }));
    const editorText: string = userJobData?.editorState
      ?.getCurrentContent()
      ?.getPlainText()
      ?.trim();
    const data: CreateCvRequest = {
      ...userJobData?.jobForm,
      job_description: editorText
    };
    const res = await createUserCv(data);

    // const severity: SEVERITY = res?.status === API_STATUS.SUCCESS ? SEVERITY.SUCCESS : ERROR;
    // handleToast({ severity, message: res.message }, setToastState, toastState);
    if (res?.status === API_STATUS.SUCCESS) {
      setStorageItem('lastResumeId', res.data.id, STORAGE_TYPES.LOCAL);
      router.push(ROUTES.RESUME_DOWNLOAD);
      if (asPath === ROUTES.RESUME_DOWNLOAD) {
        // Stop the loader when the URL matches
        setLoadWithoutMount(false, '');
      }
    } else {
      sentryCaptureError('Create resume anyway API Response Failed', 'user/cv'); //capture error (only pass error message and Api inside this function)
      setLoadWithoutMount(false);
    }
  };
  return (
    <>
      <Modal open={similarityData?.isModalOpen} onClose={onSimilarityModalClose} maxWidth="xs">
        <Box display="flex" flexDirection="column" gap={2} textAlign="center">
          <Heading title={i18n('scopeToImprove')} />
          <Box display="flex" flexDirection="column">
            <Box margin="0 auto">
              <CircularProgressBar
                strokeWidth={10}
                percentage={similarityData?.scorePercent}
                strokeLinecap={STROKE_LINE_CAP.ROUND}
                semiCircular={true}
                width="100%"
                height="100%"
                subTitle={i18n('similarityScore')}
                textFontSize={TEXT_FONT_SIZE.LARGE}
              />
            </Box>
            <Heading subTitle={i18n('MakeYourResume')} />
          </Box>
          <Button variant="outlined" className={styles.outlinedButton} onClick={handleImproveScore}>
            {i18n('improveYourScore')}
          </Button>
          <Button
            variant="contained"
            className={globalStyles.btnBlackColor}
            onClick={handleCreateResume}
          >
            {i18n('CreateResumeAnyway')}
          </Button>
        </Box>
      </Modal>
      {/* {toastState.open && <Toast toastState={toastState} />} */}
    </>
  );
};
export default withLoader(SimilarityScore);
