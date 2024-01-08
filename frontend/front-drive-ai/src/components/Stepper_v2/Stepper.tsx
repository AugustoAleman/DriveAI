import React, { useState } from 'react';
import { Stepper as StepperUI, Step, StepLabel } from '@mui/material';
import { CustomIconProps, StepperProps } from "./types";
import { useStyles, QontoConnector, CircleIconRoot } from "./styles";
import { StepIconProps } from '@mui/material';  

const CustomIcon: React.FC<StepIconProps> = ({
  active,
  completed,
  className,
  icon,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  return (
      <CircleIconRoot ownerState={{ completed, active }}>
        {icon}
      </CircleIconRoot>
  );
}

const Stepper: React.FC<StepperProps> = ({
  steps= [],
  activeStep,
  setActiveStep,
  enableCLickStep
}) => {
  const classes = useStyles();

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  return (
    <StepperUI
      alternativeLabel
      activeStep={activeStep}
      connector={<QontoConnector />}
      classes={{ root: classes.root }}
    >
      {steps.map((label: string, index: number) => {
        const stepProps = {
          onClick: () => {
            if(enableCLickStep){
              handleStepClick(index)
            }
          }
        };
        return (
          <Step 
            key={label} 
            {...stepProps}
            >
            <StepLabel 
              StepIconComponent={CustomIcon}
              sx={{span: {span: {marginTop: '0px !important',
            backgroundColor: '#fff'}}}}
            >
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </StepperUI>
  );
};

export default Stepper;