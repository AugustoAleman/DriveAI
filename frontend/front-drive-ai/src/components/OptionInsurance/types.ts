export interface OptionInsuranceProp {
    /**
     * The index of the card in the list of OptionInsurance components, 
     * which is used to identify the card and add functionality to it when it is selected.
     * The defualt value is -1, this will let you check how it chages if you click it.
     */
    index?: number;
    /**
     * The name of the insurance company that will be displayed on the card.
     */
    text?: string;
    /**
     * The URL of the image that will be displayed on the card. The image should be square.
     * The image can also be a base64 image, setting it with the following format.
     * `data:image/jpeg;base64,${base64}`.
     */
    imageUrl?: string;
    /**
     * Controls the width of the button using "rem" units.
     */
    width: number;
    /**
     * Determines whether the component should be active or disabled. 
     */
    active: boolean;
    /**
     * A function that sets the useState hook setter of the parent component when the card is clicked. 
     * This causes the parent component to re-render, allowing the selected card to be changed in the useEffect hook.
     */
    onClick: () => void;
}

// This is an interface used by the Button tag component
// To define if the Button is selected or not, and if to
// set the widht of the button
export interface ButtonProps{
    isSelected: boolean;
    width: number;
}