import React, { useState } from 'react';
import { Stepper as StepperUI, Step } from '@material-ui/core';
import { StepperProps } from "./types";
import { useStyles, QontoConnector } from "./styles";

const Stepper: React.FC<StepperProps> = ({
  steps= [],
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  return (
    <StepperUI
      activeStep={activeStep}
      connector={<QontoConnector />}
      className={classes.root}
    >
      {steps.map((label: string, index: number) => {
        const stepProps = {
          onClick: () => handleStepClick(index)
        };

        return (
          <Step key={label} {...stepProps}>
            <div className={classes.circleContainer}>
              <div
                className={`${classes.circle} ${activeStep >= index ? classes.activeCircle : ''} ${activeStep > index ? classes.completedCircle : ''}`}
              >
                {index + 1}
              </div>
              <span className={classes.label}>{label}</span>
            </div>
          </Step>
        );
      })}
    </StepperUI>
  );
};

export default Stepper;
