import styled from "styled-components";
import { LabelProps } from "./types";

const getFontSize = (size: string) => {
  if (size === "Large") {
    return "24px";
  }
  if (size === "Medium") {
    return "18px";
  }
  return "12px";
};

const getPadding = (size: string) => {
  if (size === "Large") {
    return "18px";
  }
  if (size === "Medium") {
    return "12px";
  }
  return "6px";
};

export const ShowLabel = styled.div<LabelProps>`
  background: ${({color}) => color};
  color: #fff;
  padding: ${({size}) => getPadding(size)};;
  font-size: ${({size}) => getFontSize(size)};
  font-weight: 500;
  line-height: 13px;
  margin: 0 0 5px 0;
  display: table;
  border-radius: 5px;
`;
