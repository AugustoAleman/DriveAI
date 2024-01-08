import React from "react";
import { OptionInsuranceProp, ButtonProps } from "./types";
import styled from "styled-components";


// This is the styled component for the button that holds the image
// the text
export const Button = styled.button<ButtonProps>`
    border: ${(props) =>
    props.isSelected ? "2px solid #4251F5" : "1px solid white"};
    background: transparent;
    height: ${(props) => 2 * props.width + "rem"};
    width: ${(props) => 1.5 * props.width + "rem"};
    border-radius: 5%;
`;

// This is the styled component for the Image
// its style depend on the props width
export const Image = styled.img<{ width: number }>`
    height: ${(props) => props.width + "rem"};
    width: ${(props) => props.width + "rem"};
`;

// This is the styled component for the Text tag
// the Width is used to calculate the top padding
// To separate the image from the text
export const Text = styled.div<{ width: number }>`
    text-align: center;
    padding-top: ${(props) => props.width * 0.2 + "rem"};
`;
