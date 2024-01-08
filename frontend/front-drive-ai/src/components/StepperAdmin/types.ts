export interface StepperProps {
    /**
     * This property is an array which contains the Steps that will be shown.
     * Each element inside the array will be the title for each Step.
     * The size of the array will determine the number of steps.
     */
    steps: string[];

    /**
     * Number of the current step in which the component is at. Cannot click on next steps.
     */
	currentStep?: number | undefined | null;
}
