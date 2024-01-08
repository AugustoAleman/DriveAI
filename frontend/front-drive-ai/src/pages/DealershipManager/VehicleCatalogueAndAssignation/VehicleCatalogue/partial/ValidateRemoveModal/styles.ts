import styled, { css } from "styled-components";

export const MainWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ModalContent = styled.div`
    width: 40%;
    height: 40%;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const MainContent = styled.div`
    width: 96%;
    height: 96%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const InputVerification = styled.input`
    padding-top: 1%;
    padding-bottom: 1%;
    width: 50%;
    height: 2rem;
    font-size: 95%;
    text-align: center;
    border-radius: 5%;
    margin-bottom: 1em; 
`;

export const TitleAndExit = styled.div`
    // background-color: blue;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 8%;
    width: 93%;
`;

export  const ModalTitle = styled.p`
`;