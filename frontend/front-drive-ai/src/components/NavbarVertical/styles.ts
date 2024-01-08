import styled from "styled-components";
import { NavbarVerticalProp } from "./types";

export const ShowNavbarVertical = styled.div<NavbarVerticalProp>`
    background-color : ${({ color }) => color};
    height: 100vh;
    width: ${({ width }) => width};
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .iconButton {
        margin: ${({ marginIconButt }) => marginIconButt} 0;
    }
    .divIconUser {
        height: 72vh;
    }
    position: fixed;

    @media only screen and (max-width: 798px) {
        height: 100%;
        .divIconUser {
            height: 80vh;
        }
    }
    
`;