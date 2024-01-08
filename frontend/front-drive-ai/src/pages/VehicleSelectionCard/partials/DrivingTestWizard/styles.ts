import styled from "styled-components";

export const DrivingTestWizardContainer = styled.div`
    height:95%;
    width:80%;
    display: flex;
    flex-direction: column;
    align-items:center;
`

export const Header = styled.h1`
    margin: 2.5vh 0px 2.5vh 0px;
    font-size: 2vw;
    text-align: center;
    @media screen and (max-width: 768px){
        font-size: 1rem;
    }
`

export const StepContainer = styled.div`
    width: 100%;
    margin: 2% 0px 0px 0px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const MissingFieldsWrapper = styled.div`
    width: 100%;
    height: 8%;
`;
export const MissingFields = styled.p`
    margin: 0%;
    padding: 0%;
    text-align: center;
`;
export const NextStepFooter = styled.div`
    width: 100%;
    height: 45px;
    min-height: 36.5px;
    margin: 2% 0px 0px;
    flex: 0 1 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;