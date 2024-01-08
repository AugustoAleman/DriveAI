export interface IconButtonProp {
    /**
     * Child component. Icon from MUI.
     */
    children?: React.ReactNode;
    /**
     * Color of the button.
     */
    backgroundColor?: string;
    /**
     * Color of the button text.
     */
    color?: string;
    /**
     * Color of the hover effect.
     */
    hoverColor?: string;
    /**
     * If true, the button will have a shadow.
     */
    shadow?: boolean;
    /**
     * If true, the button will have a shadow when hovering over it.
     */
    hoverShadow?: boolean;
    /**
     * Width of the button.
     */
    width?: string;
    /**
     * Height of the button.
     */
    height?: string;
    /**
     * Border radius of the button.
     */
    borderRadius?: string;
    /**
     * Hypertext reference of the button.
     */
    href?: string;
    /**
     * Padding
     */
    padding?: string;
    /**
     * OnClick event handler. The sent function will be called when the button is clicked.
     */
    onClick?: () => void;
}
