import React from "react";
import { ExampleMuiProp } from "./types";
import { Button } from "@mui/material";

const ExampleMui: React.FC<ExampleMuiProp> = ({
  bgColor,
  color,
  hoverColor,
  children,
}) => {
  return (
    <Button
      sx={{
        backgroundColor: bgColor,
        color: color,
        "&:hover": {
            backgroundColor: hoverColor,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default ExampleMui;
