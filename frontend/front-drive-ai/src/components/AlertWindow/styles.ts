import { Alert } from "@mui/material";
import styled from "styled-components"

export const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  ${({ severity }) => {
    switch (severity) {
      case "success":
        return `
          background-color: green;
          color: white;
        `;
      case "error":
        return `
          background-color: red;
          color: white;
        `;
      case "warning":
        return `
          background-color: yellow;
          color: black;
        `;
      default:
        return `
          background-color: gray;
          color: white;
        `;
    }
  }}
`;