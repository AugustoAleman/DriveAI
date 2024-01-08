export interface StepperProps {
    /**
     * This property is an array which contains the Steps that will be shown. 
     * Each element inside the array will be the title for each Step. 
     * The size of the array will determine the number of steps.
     */
    steps: string[];
    activeStep: number;
    setActiveStep: (value: number) => void;

    enableCLickStep?: boolean;
}

export interface CustomIconProps {
    index: number;
}

export interface CircleIconRootProps {
    ownerState: { completed?: boolean; active?: boolean };
  }