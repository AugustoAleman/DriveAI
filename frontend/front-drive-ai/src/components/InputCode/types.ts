export interface InputCodeProp {
    /**
     * Email from the user
     */
    email: string;
    /**
     * OnButtonClick event for the button component, it send a text and recive a boolean
     */
    OnButtonClick?: (text: string) => boolean;
    /**
     * 
     */
}