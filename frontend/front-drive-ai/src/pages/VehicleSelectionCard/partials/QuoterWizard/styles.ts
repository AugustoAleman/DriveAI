import styled from "styled-components";

// horizontal card holder for general use
export const HorizontalCardHolder = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 1vw;
`;


// wrapper for the button at the bottom of the stepper
export const ButtonHolder = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
    margin-top: -5%;

    @media screen and (max-width: 1457px) {
        margin-top: 0%;
        width: 95%;
    }
`;

// inner content wrapper for the entire stepper
export const CardWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items:center;
    height: 100%;
    width: 90%;
    position: relative;
    // background-color: green;

`;

// outer content wrapper for the entire stepper
export const GeneralWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin-top: -5%;
    margin-bottom: -5%;

    @media screen and (max-width: 1457px) {
        height: 65em;
    }

    
    // background-color: red;
`;

// content wrapper for the stepper component
export const StepperWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 40%;
    
    @media screen and (max-width: 1000px) {
        width: 100%;
        justify-content: flex-start;
    }
`;

// content wrapper for the current stage of the stepper        
export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: center;
    width: 100%;
    height: auto;

    // background-color: aqua;
    @media screen and (max-width: 1457px) {
        align-items: center;
    }
`;

//Title styles
export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: -5%;
    width: 70%;
    
    @media screen and (max-width: 1457px) {
        width: 100%;
        align-items: center;
        text-align: center;
    }
`;

export const Title = styled.h1`
    margin: 0%;
    padding: 0%;
`;

export const Overlay = styled.div`
  height: 80%;
  width: 100%;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position:absolute;

  @media screen and (max-width: 926px) {
    height: 92%;
    width: 100%;
}
  
`;

export const OverlayCardTitle = styled.h2`
    width: 75%;
    text-align: center;
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
