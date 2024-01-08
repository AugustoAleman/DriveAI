import styled from "styled-components";
import { Button as MuiButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export const Row = styled.div`
  width: 70%;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
  padding: 20px;
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  position: relative;
  top: 3px;

  /* Hide the default checkbox */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Style the custom checkbox */
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  /* Add the checkmark icon when the checkbox is checked */
  &:checked:before {
    content: "\\2714";
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }

  /* Style the custom checkbox when it's checked */
  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #333;
`;

export const CustomButton = withStyles({
  root: {
    backgroundColor: "#FFFFFF",
    color: "#111D4E",
    "&:hover": {
      backgroundColor: "#FFFFFF", 
    },
  },
})(MuiButton);

export const linkStyle = {
  color: "#00F",
  fontSize: "12px",
  fontWeight: 600,
  textDecoration: "none",
};
