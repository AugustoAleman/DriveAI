import styled from "styled-components";
import { BigInfoProp } from "./types";

// Creation of the styled component BigInfoContainer with the props of the interface BigInfoProp
export const BigInfoContainer = styled.div<BigInfoProp>`
  display: flex;
  flex-direction: ${({ imagePosition }) =>
    imagePosition === "left" ? "row" : "row-reverse"};
  width: 100%;
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  box-sizing: border-box;
  background-color: ${({ backgroundColor }) => backgroundColor};

  .big-info {
    display: flex;
    width: 100%;
  }

  .big-info-img {
    width: ${({ imageWidth }) => imageWidth};
    height: ${({ imageHeight }) => imageHeight};
    object-fit: cover;
    object-position: ${({ imageAlign }) => imageAlign};
  }
`;
