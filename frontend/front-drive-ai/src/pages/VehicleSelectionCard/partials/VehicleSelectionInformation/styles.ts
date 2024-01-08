import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import theme from "theme/theme";

/**
 * General component wrapper
 */
export const VehicleSelectionInformationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    // background-color: red;
`;
/*
 * General Purposes styles
 */
export  const SectionTitle = styled.p`
    margin: 0;
    font-weight: bold;
    padding: 0%;
`;
export const GeneralPurposeTitle = styled.p`
    font-weight: bold;
    width: fit-content;
    margin: 0%;
    padding: 0%;
`;


/*
 * Vehicle Title div styles
 */
export const VehicleSelectionTitleWrapper = styled.div`
    width: 90%;
    // background-color: blue;
`;
export const VehicleSelectionTitle = styled.p`
    font-weight: bold;
    color: ${theme.palette.primary.main};
`;
/*
 * Carousel and General info Styles
 */
export const CarouselAndInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    // background-color: green;

    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`;
export const CarouselWrapper = styled.div`
    width: 50%;
    // background-color: aqua;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;
interface ImageSelectionProps{
    type?: string;
    imageSrc?: string;
}
export const ImageSelection = styled.div<ImageSelectionProps>`
    width: 100%;
    height: 0;
    padding-bottom: 60%;
    background-image: url(${(props) => props.imageSrc});
    background-size: cover;
    background-position: center;
    position: relative;
`;

export const FunctionalCarouselWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 0.5rem;
`;
export const CarouselButton = styled.button`
  // background-color: greenyellow;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${theme.palette.background.default};
`;
export const LeftButon = styled(CarouselButton)`
`;

export const RightButon = styled(CarouselButton)`
`;
export const ImageCarousel = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  height: 5rem;
  scrollbar-width: none;
  width: 100%;
  // background-color: yellow;
  /* Hide scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Image = styled.img`
  //width: 100%;
  height: 100%;
  object-fit: cover;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`;

export const GeneralInfoVehicleWrapper = styled.div`
    width: 50%;
    // background-color: brown;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;
export const VehicleInformationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    height: 100%;
    padding-left: 1rem;
    
    @media screen and (max-width: 768px){
        height: 50vh;
    }
`;
export const MainSelectionTitle = styled(GeneralPurposeTitle)`
    font-size: 1.5rem;
    color: ${theme.palette.primary.main}
`;
export const ModelAndTranmissionTitle = styled(GeneralPurposeTitle)`
    color : ${theme.palette.grey[600]};
    font-size: 1.3rem;
`;
export const PriceTitle = styled(GeneralPurposeTitle)`
    color: ${theme.palette.secondary.main};
    font-size: 1.5rem;
`;
export const MonthlyPaymenTitle = styled(GeneralPurposeTitle)`
    color: ${theme.palette.grey[600]};
    font-size: 1.2rem;
`;

export const RowIconAndText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
export const IconDescription = styled(GeneralPurposeTitle)`
    padding-left: 0.7rem;
    color: ${theme.palette.grey[600]};
`;
export const VehicleInformationButtonsWrapper = styled.div`
    width: 30%;
    height: 100%;
    // background-color: blanchedalmond;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
`;
/*
 * Technical Specs styles
 */
export const TechnicalSpecsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    // background-color: beige;
`;
export const TechnicalSpecsTitleWrapper = styled.div`
    width: 100%;
    // background-color: azure;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid #CBD0D0;
    height: 8vh;
`;
export const ElementsTST = styled.div`
    padding-bottom: 0.3rem;
`;
export const ListOfCharacteristicsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`;
export const ColTST = styled.div`
    width: 33%;
    @media screen and (max-width: 768px){
        width: 100%;
    }
`;
export const RowTST = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
`;
export const CellTST = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    width: 50%;
`;
export const MapIframe = styled.iframe`
    width: 310px;
    height: 310px;
    border-radius: 4px;
    border: 1px solid black;
`;
export const CirclePicker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 5px;
  cursor: pointer;
`;
export const CirclePickerActivated = styled(CirclePicker)`
    border: 2px solid #3E51FF;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
`;

const useStyles = makeStyles({
    directionsCar: {
        color: theme.palette.grey[600]
    },
    locationCity: {
        color: theme.palette.grey[600],
    },
});
export default useStyles;