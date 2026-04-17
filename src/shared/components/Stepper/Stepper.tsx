import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Stepper, { StepperProps } from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';
import Icon from '../Icon';
import { useStyles } from './StepperStyles';

enum ORIENTATION {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}
interface VerticalStepperProps extends StepperProps {
  steps: string[];
  activeStep: number;
  orientation?: ORIENTATION;
  className?: string;
  onStepClick?: (value: number) => void;
  rightArrowShow: boolean;
  completedSteps: boolean[];
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  activeStep,
  orientation = ORIENTATION.VERTICAL,
  className = 'vertical',
  onStepClick,
  rightArrowShow = true,
  completedSteps = [],
  ...props
}) => {
  const styles = useStyles();

  const handleStep = (value: number) => {
    if (onStepClick) {
      onStepClick(value);
    }
  };

  return (
    <Box className={`${styles.root} ${className}`}>
      <Stepper
        activeStep={activeStep}
        orientation={orientation!}
        className={`${styles.wrapper} ${className}`}
        {...props}
      >
        {steps.map((step, index) => (
          <Step key={`${step}-${index}`}>
            <StepLabel className="labelWrap">
              <StepButton color="inherit" onClick={() => handleStep(index)} sx={{ width: 'auto' }}>
                <Box
                  component="span"
                  className={`${completedSteps[index] ? `${styles.noBorderStyle}` : `${styles.boxBorderStyle}`} ${styles.boxWrap}`}
                  display="inline-flex"
                >
                  <Typography component="span" className={styles.stepNumber}>
                    {completedSteps[index] ? (
                      <Image
                        src="/image/greenTick.svg"
                        alt="Step Completed"
                        width={34}
                        height={34}
                      />
                    ) : (
                      index + 1
                    )}
                  </Typography>
                </Box>
                <Typography component="span" className={styles.stepTitle}>
                  {step}
                </Typography>
              </StepButton>
              {rightArrowShow && <Icon name="smallRightArrow" className={styles.arrowWrap} />}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default VerticalStepper;
