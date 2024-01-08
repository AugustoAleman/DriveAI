import styled from "styled-components";
import { ColSettingsProp, ComponentSize } from "./types";

export const LCarCard = styled.div<ComponentSize>`
    display: flex;
    flex-direction: ${({direction}) => direction};
    align-items: center;
    justify-content: left;
    width: {
        xs: 100%;
        sm: 80%;
        md: 80%;
        lg: 80%;
    };
    height: ${({height}) => height};
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    margin-vertical: 10px;
    padding: 10px;
    transition: all 0.3s ease-in-out;
`;

export const CardCol = styled.div<ColSettingsProp>`
    display: flex;
    flex-direction: 'column';
    align-items: ${({allignment}) => allignment};
    padding: ${({padding}) => padding};
    justify-content: center;
    width: ${({width}) => width};
    background: #fff;
    border-radius: 10px;
    // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;