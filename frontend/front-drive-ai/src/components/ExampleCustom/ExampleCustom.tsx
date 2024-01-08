import React from "react";
import { ShowLabel } from "./styles";
import { ExampleCustomProp } from "./types";
import theme from "theme/theme";

/**
 * Example component used to show text with background in different sizes
 */
const ExampleCustom: React.FC<ExampleCustomProp> = ({
  color = theme.palette.error.main,
  label,
  size = "Small",
}) => {
  return (
    <ShowLabel color={color} size={size}>
      {label}
    </ShowLabel>
  );
};

export default ExampleCustom;
