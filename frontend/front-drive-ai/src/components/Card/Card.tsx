import React from "react";
import { CardProp } from "./types";
import theme from "theme/theme";
import { ShowCard } from "./styles";

/**
 * Card component used to show text or react components with background in different sizes and colors
 */
const Card: React.FC<CardProp> = ({
  children,
  color = theme.palette.background.default,
  height = "100px",
  width = "100px",
  border = "none",
  borderRadius = "Medium",
  shadow = " 2px 2px 7px rgba(0, 0, 0, 0.3)",
  padding = "0px",
  margin = "0px",
  hasHoverColor = false,
  hoverColor = theme.palette.tertiary.main,
  cursor = "pointer",
}) => {
  return (
    // ShowCard is a styled component which is used to show the card with different properties like color, height, width, border, border-radius, shadow, padding, margin, hover-color, cursor.
    <ShowCard
      color={color}
      height={height}
      width={width}
      border={border}
      borderRadius={borderRadius}
      shadow={shadow}
      padding={padding}
      margin={margin}
      hasHoverColor={hasHoverColor}
      hoverColor={hoverColor}
      cursor={cursor}
    >
      {children}
    </ShowCard>
  );
};
// Exporting the Card component
export default Card;
