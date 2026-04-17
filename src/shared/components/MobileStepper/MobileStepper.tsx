import { Box, Typography } from '@mui/material';
import { useStyles } from './MobileStepperStyles';

interface MobileStepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
  onStepClick?: (value: number) => void;
}

const MobileStepper = (props: MobileStepperProps) => {
  const styles = useStyles();
  const { steps, activeStep, className = '' } = props;

  return (
    <Box display="flex" flexDirection="column" gap={2} className={className}>
      {steps.map((step, index) =>
        index === activeStep ? (
          <Box key={`${step}-${index}`} display="flex" alignItems="center">
            <Typography component="span" className={styles.stepTitle}>
              {index + 1}. {step}
            </Typography>
          </Box>
        ) : null
      )}
      <Box display="flex" alignItems="center" gap={1}>
        {steps.map((step, index) => (
          <Box
            key={`${step}-${index}`}
            className={`${index === activeStep ? `${styles.stepsPrimaryStyle}` : `${styles.stepsGreyStyle}`} ${styles.stepsStyle}`}
          ></Box>
        ))}
      </Box>
    </Box>
  );
};
export default MobileStepper;
