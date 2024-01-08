export interface ExampleCustomProp {
  /**
   * Pill color as string
   */
  color?: string;
  /**
   * Pill content for movie genres
   */
  label: string;
  /**
   * Size of the container
   */
  size?: 'Large' | 'Medium' | 'Small';
}

export interface LabelProps {
  color: string;
  size: 'Large' | 'Medium' | 'Small';
}
