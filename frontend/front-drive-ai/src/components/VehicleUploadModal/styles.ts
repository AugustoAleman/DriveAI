import { HTMLAttributes } from "react";
import styled from "styled-components";
import theme from "theme/theme";
import Button, { ButtonProps } from '@mui/material/Button';

export const MainWrapper = styled.div`
    position: fixed;
    width: 100vw; 
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 500;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ContentWrapper = styled.div`
    background-color: white;
    width: 85%;
    height: 87%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const UpperWrapper = styled.div`
    width: 90%;
    height: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
export const ListMenu = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: space-evenly;
`;
export const ListMenuOption = styled.div`

`;
interface ListOptionProps {
    type?: string;
    active?: boolean;
    missing?:boolean;
  }
export const ListOptionA = styled.a<ListOptionProps>`
  text-decoration: none;
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: ${(props) => (props.active||props.missing) ? (()=>props.active?("black"):("red")) : (theme.palette.tertiary.main)};
  cursor: pointer;
  &:hover {
    color: black;
  };
`;


export const MiddleWrapper = styled.div`
    width: 90%;
    height: 70%;
    flex-direction: row;
    align-items: center;
    display: flex;
    justify-content: center;
`;
export const StepWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
export const StepOneWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;
export const StepLR = styled.div`
    width: 50%;
    height: 100%;
`;
export const StepOneLeft = styled.div`
    width: 40%;

`;
export const TitleWrapper = styled.div`
    width: 100%;
`;
export const StepTitle = styled.p`
    padding: 0%;
    margin: 0%;
`;
export const Subtitle = styled.p`
    padding: 0%;
    margin: 0%;
    font-size: 0.75rem;
    color: rgb(90, 90, 90);
`;
export const ImageLoaderWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
export const StepOneRight = styled(StepLR)`
    width: 60%;
`;
export const StepOneInputWrapper = styled.div`
   display: flex;
   flex-direction: row;
   height: 94%;
   width: 100%;
`;
export const RightColumn = styled(StepLR)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
export const LeftColumn = styled(StepLR)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
interface AutocompleteMUI {
    missing?:boolean;
  }
export const TextFieldWrapper = styled.div<AutocompleteMUI>`
    border: ${(props) => props.missing ? ('1px solid red') : ('0')};
    border-radius: ${(props) => props.missing ? ('10px') : ('0')};
    height: 10%;
    width: 70%;
`;
export const LowerWrapper = styled.div`
    width: 90%;
    height: 15%;
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StepTwoLeft = styled.div`
    width: 50%;
    height: 100%;
`;
export const StepTwoRight = styled.div`
    width: 50%;
    height: 100%;
`;
export const DescriptionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90%;
`;

export const ContainerListColors = styled.div`
    width: 100%;
    margin-top: -10%;
`;
export const ContainerColors = styled.div`
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;
export const ButtonsColorsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0% -10%;
    justify-content: space-evenly;
`;
interface SingleListCol {
    type?: string;
    backColor?: string;
    selectedShadow?: number;

}
export const SingleColor = styled.div<SingleListCol>`
    border-radius: 15px;
    background-color: ${(props) => props.backColor};
    box-shadow: 0 0 ${(props) => props.selectedShadow}px rgba(0, 0, 0, 0.8);
    width: 12px;
    border: 0.3px solid grey;
    height: 12px;
    cursor: pointer;
`;
export const ChromePickerWrapper = styled.div`
  position: absolute;
  z-index: 700;
`;
export const StepThreeWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;
export const ColumnFPlan = styled.div`
    height: 100%;
    width: 33%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
export const CellFPlan = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-weight: bolder;
`;
export const CarouselWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
export const ImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px; /* add vertical separation between rows */
    height: 70%;
    width: 100%;
    overflow: auto;
    border-radius: 5px;
    border: 0.5px solid grey;
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
export const ButtonWrapper = styled.div`
    width: 20%;
`;