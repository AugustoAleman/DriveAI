import styled from "styled-components";
import { CardProp } from "./types";

//Creation of the styled component ShowCard with the props of the interface CardProp
const getBorderRadius = (size: string | undefined) => {
  if (size === "XLarge") {
    return "50px";
  }
  if (size === "Large") {
    return "35px";
  }
  if (size === "Medium") {
    return "25px";
  }
  if (size === "Small") {
    return "18px";
  }
  if (size === "XSmall") {
    return "8px";
  }

  if (size === undefined) {

    return "25px";
  }
  return "0px";
};

export const ShowCard = styled.div<CardProp>`
  background: ${({ color }) => color};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => getBorderRadius(borderRadius)};
  box-shadow: ${({ shadow }) => shadow};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  &:hover {
    background: ${({ hoverColor, hasHoverColor }) =>
      hasHoverColor && hoverColor};
  }
  cursor: ${({ cursor }) => cursor};
`;
