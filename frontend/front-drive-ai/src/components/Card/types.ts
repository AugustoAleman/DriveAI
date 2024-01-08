export interface CardProp {
  /**
   * Children of the card as ReactNode (JSX) or string
   */
  children: React.ReactNode;
  /**
   * Card color as string
   */
  color?: string;
  /**
   * Card height as string
   */
  height?: string;
  /**
   * Card width as string
   */
  width?: string;
  /**
   * Card border as string
   */
  border?: string;
  /**
   * Card border radius as string
   */
  borderRadius?: "None" | "XSmall" |"Small" | "Medium" | "Large" | "XLarge";
  /**
   * Card shadow as string
   */
  shadow?: string;
  /**
   * Card padding as string
   */
  padding?: string;
  /**
   * Card margin as string
   */
  margin?: string;
  /**
   * Card hover color as boolean
   */
  hasHoverColor?: boolean;
  /**
   * Allows the card to have a hover color
   */
  hoverColor?: string;
  /**
   * Card cursor as string (only if hasHoverColor is true)
   */
  cursor?:
  | "pointer"
  | "default"
  | "help"
  | "move"
  | "progress"
  | "wait"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "no-drop"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "all-scroll"
  | "col-resize"
  | "row-resize"
  | "n-resize"
  | "e-resize"
  | "s-resize"
  | "w-resize"
  | "ne-resize"
  | "nw-resize"
  | "se-resize"
  | "sw-resize"
  | "ew-resize"
  | "ns-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "zoom-in"
  | "zoom-out";
}
