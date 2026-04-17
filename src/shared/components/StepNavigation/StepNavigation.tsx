import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { Box, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useStyles } from './StepNavigationStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import { AIPromptData } from '~/modules/Onboarding/Utils/OnboardingUtils';
interface StepNavigationProps {
  backButtonText: string;
  continueButtonText: string;
  onBackButtonClick: () => void;
  onContinueButtonClick: () => void;
  isContinueButtonDisable?: boolean;
  isBackButtonDisable?: boolean;
  skipBtnName?: string;
  onSkipButtonClick: () => void;
  showSkipButton?: boolean;
  aiPromptData?: AIPromptData; // Added prop
  currentSteps?: number;
  skipAllBtnName?: string;
  onSkipAllButtonClick?: () => void;
  showSkipAllButton?: boolean;
}

const StepNavigation = (props: StepNavigationProps) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const {
    backButtonText,
    continueButtonText,
    onBackButtonClick,
    onContinueButtonClick,
    isContinueButtonDisable = false,
    isBackButtonDisable = false,
    skipBtnName,
    showSkipButton = false,
    onSkipButtonClick,
    aiPromptData, // Destructure the new prop
    currentSteps,
    skipAllBtnName,
    onSkipAllButtonClick,
    showSkipAllButton = false
  } = props;
  // Embed AI prompt data into the continueButtonText only if currentSteps is 2
  const formattedContinueText =
    currentSteps === 2 && aiPromptData
      ? `${continueButtonText} (${aiPromptData.currentQuestionIndex + 1} / ${aiPromptData.questionList.length})`
      : continueButtonText;
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      bgcolor="neutral.700"
      width="100%"
      display="flex"
      justifyContent={currentSteps !== 0 ? 'space-between' : 'flex-end'} // Adjust alignment
      alignItems="center"
      px={{ xs: 1, sm: 3 }}
      py="15px"
      borderTop={1}
      borderColor="neutral.10"
      position="fixed"
      bottom={'43px'}
      className={styles.btnStyles}
      gap={{ xs: 1, sm: 0 }}
    >
      {currentSteps !== 0 &&
        (isSmallDevice && skipBtnName ? (
          <IconButton
            onClick={onBackButtonClick}
            disabled={isBackButtonDisable}
            // disabled={
            //   isBackButtonDisable ||
            //   (currentSteps === 2 && aiPromptData?.currentQuestionIndex === 0)
            // }
            className={styles.backButton}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        ) : (
          <Button
            startIcon={<ArrowBackIosNewRoundedIcon />}
            onClick={onBackButtonClick}
            className={styles.backButton}
            disabled={isBackButtonDisable}
            // disabled={
            //   isBackButtonDisable ||
            //   (currentSteps === 2 && aiPromptData?.currentQuestionIndex === 0)
            // }
          >
            {backButtonText}
          </Button>
        ))}

      <Box display="flex" alignItems="center" gap={1}>
        {showSkipButton && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={onSkipButtonClick}
            className={styles.skipButton}
          >
            {skipBtnName}
          </Button>
        )}
        {showSkipAllButton && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={onSkipAllButtonClick}
            className={styles.skipButton}
          >
            {skipAllBtnName || 'Skip All'}
          </Button>
        )}
        <Button
          variant="contained"
          // color="primary"
          className={globalStyles.btnBlackColor}
          endIcon={<EastRoundedIcon />}
          onClick={onContinueButtonClick}
          disabled={isContinueButtonDisable}
        >
          {formattedContinueText}
        </Button>
      </Box>
    </Box>
  );
};
export default StepNavigation;
