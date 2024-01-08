export interface ButtonProp {
    /**
     * Children of the card as ReactNode (JSX) or string
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
     * Font size of the text in the children.
     */
    fontSize?: string;
    /**
     * Font weight (light, normal, bold, etc.) of the text in the children.
     */
    fontWeight?: string;
    /**
     * Border radius of the button.
     */
    borderRadius?: string;
    /**
     * Variant of MUI button. Contained is the default.
     */
    variant?: | "text" | "outlined" | "contained";
    /**
     * If true, the button will be disabled.
     */
    disabled?: boolean;
    /**
     * Hypertext reference of the button.
     */
    href?: string;
    /**
     * Icon component from MUI to be placed at the start of the button. Example: startIcon={<SortIcon />}.
     */
    startIcon?: React.ReactNode;
    /**
     * Icon component from MUI to be placed at the end of the button. Example: endIcon={<SortIcon />}
     */
    endIcon?: React.ReactNode;
    /**
     * OnClick event handler. The sent function will be called when the button is clicked.
     */
    onClick?: (e: any | void) => void;
    // onClick?: () => void;

    type?: string;
}
