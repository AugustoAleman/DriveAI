import { ReactNode } from "react";

export interface ExampleMuiProp {
  /**
   * Background color for button
   */
  bgColor: string;
  /**
   * Color for the text
   */
  color: string;
  /**
   * Color for hover over button
   */
  hoverColor: string;
  /**
   * Children for the button content
   */
  children: ReactNode;
}

