import styled from "styled-components";
import theme from "theme/theme";

// content wrapper for the final step
export const BreakdownStepCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const CarTitle = styled.h2`
    margin: 2%;
    padding: 0%;
`;

export const CheckHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2%;
    
`;


export const CardComponentWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 2%;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    
    

    @media screen and (max-width: 1457px) {
        width: 30em;
    }

    @media screen and (max-width: 495px){
        width: 20.5em;
    }
`;

export const QuoterCardRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 1457px) {
        padding: 1%;
    }
`;

export const CardTitle = styled.h2`
    margin: 0%;
    padding: 0%;
    width: 50%;
`;

export const CardSubtext = styled.h4`
    margin: 0%;
    padding: 0%;

    @media screen and (max-width: 1457px) {
        padding-left: 2%;
    }

`;

export const CardBody = styled.div`
    margin: 0%;
    padding: 0%;
    width: 50%;
`;

// horizontal card holder for the last stage of the stepper
export const QuoterCardHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;

    @media screen and (max-width: 964px) {
        width: 30em;
        justify-content: space-around;
        gap: 1vw;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 495px) {
        width: 20.5em;
        flex-wrap: wrap;

    }
`;

export const DropdownRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
`;

export const DropdownItem = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1%;
    padding: 1%;
    width: 50%;
    
`;

export const StyledSelect = styled.select`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.palette.grey[200]};
  color: ${theme.palette.grey[900]};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
  
  &:hover {
    background-color: ${theme.palette.grey[200]};
  }
`;

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 30%;
    
    @media screen and (max-width: 1457px) {
        width: 100%;
        align-items: center;
        text-align: center;
    }
`;
