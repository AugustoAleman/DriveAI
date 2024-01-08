export interface BigInfoProp {
  /**
   * Children of the card as ReactNode (JSX) or string
   */
  children: React.ReactNode;
  /**
   * Image of the card as string
   * @example "https://placekitten.com/g/200/300"
   * @example "image.png"
   * @example "image.jpg"
   */
  image: string;
  /**
   * Position of the image as string
   */
  imagePosition: "left" | "right";
  /**
   * Height of the card as string
   * @example "100px"
   */
  height?: string;
  /**
   * Padding of the card as string
   * @example "10px"
   */
  padding?: string;
  /**
   * Background color of the card as string
   * @example "red"
   * @example "#000"
   */
  backgroundColor?: string;
  /**
   * Image width of the card as string
   * @example "100px"
   */
  imageWidth?: string;
  /**
   * Image height of the card as string
   * @example "100px"
   */
  imageHeight?: string;
  /**
   * Image alignment of the card as string
   * @example "center"
   */
  imageAlign?: "top" | "center" | "bottom";
}
