// Import components
import { StepperProps } from "./types";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const StepperAdmin: React.FC<StepperProps> = ({
	steps = [],
	currentStep = null,
}) => {

	if (currentStep === null) {
		currentStep = 0;
	}

	return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label:string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
	);
};

export default StepperAdmin;
