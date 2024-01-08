import styled, { keyframes } from "styled-components";
import { HTMLAttributes } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    width: 70%;
    height: 85%;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const MainContent = styled.div`
    width: 96%;
    height: 96%;
    // background-color: red;
`;
export const TitleAndExit = styled.div`
    // background-color: blue;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 8%;
`;
export  const ModalTitle = styled.p`
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const CarouselAndInputWrapper = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    // background-color: aquamarine;
    &.fadeOut {
        opacity: 0;
        animation: ${fadeOut} 0.5s ease-out;
    }
    &.fadeIn {
        opacity: 1;
        animation: ${fadeIn} 0.5s ease-in; 
    }
`;
export const CarouselWrapper = styled.div`
    width: 27%;
    // background-color: beige;
`;
export const ImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px; /* add vertical separation between rows */
    height: 70%;
    overflow: auto;
`;
interface ImageProps extends HTMLAttributes<HTMLDivElement> {
    url: string;
  }
export const UploadedImage = styled.div<ImageProps>`
    background-image: url(${props => props.url});
    background-size: cover;
    background-position: center;
    overflow: hidden;
    width: 6em;
    height: 6em;
    box-sizing: border-box;
    border-radius: 4px;

    &:hover .inner {
        display: flex;
    }

`;
export const InnerUploadImage = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
export const InputSpecsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 67%;
    // background-color: blueviolet;
    justify-content: space-evenly;
`;
export const RowInputs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    // background-color: green;
`;
export const RowInputsInfo = styled.div`
    display: flex;
    
    width:100%;
    // background-color: green;
`;
export const CellInputs = styled.div`
    // background-color: red;
    width: 27%;
`;
export const CellInputsInfo = styled.div`
    padding-left: 5%;
    width: 95%;
`;
export const CellInputsTwice = styled.div`
    padding-left: 5%;
    width: 32%;
`;
export const CellIntoCell = styled.div`
    padding-top: 0.7em;
`;
export const NextInputButtonWrapper = styled.div`
    width: 5%;
    // background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const SecondStageWrapper = styled.div`
    // background-color: red;
    height: 80%;
    display: flex;
    flex-direction: row;
    &.fadeOut {
        opacity: 0;
        animation: ${fadeOut} 0.5s ease-out;
    }
    &.fadeIn {
        opacity: 1;
        animation: ${fadeIn} 0.5s ease-in; 
    }
`;
export const BackInputButtonWrapper = styled.div`
    width: 5%;
    height: 100%;
    // background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const SecondStageContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    // background-color: aqua;
`;
export const TitleAndButtonsSSWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    // background-color: blueviolet;
`;
export const SSTitle = styled.p`
    padding: 0%;
    margin: 0%;
`;
export const FinancingPlansTable = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    flex: 1;
`;
export const FPTColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;
export const FPTColumnTitle = styled.p`
    font-weight: bold;
    margin: 0%;
    padding: 0%;
`;
export const FPTColumnCellText = styled.p`
    margin: 0%;
    padding: 0%;
`;
export const FPTCellWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;
export const FPTColumnCellInput = styled.input`
    background-color: #EBEBEB;
    width: 4em;
    border: none;
    border-radius: 0;
`;
export const PercentageCellInput = styled.p`
    margin: 0%;
    padding: 0%;
    background-color: #EBEBEB;
`;
export const SaveButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;
`;
export const LastRowInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;
export const SheetInputUpload = styled.input`
    display: none;
`;
export const ActivateParagraph = styled.p`
    margin: 0%;
    padding: 0%;
`;

const useStyles = makeStyles({
    LastRowTextFields: {
        paddingTop: "1em",
    },
});
export default useStyles;