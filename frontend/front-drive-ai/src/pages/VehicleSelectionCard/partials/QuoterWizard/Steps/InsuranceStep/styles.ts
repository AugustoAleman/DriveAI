import styled from "styled-components";

// content wrapper for the second step
export const InsuranceStepCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;

    @media screen and (max-width: 1457px) {
        width: 100%;
        
    }
`;
export const GridItem = styled.div`
    margin-bottom: 2%;
    padding: 1%;
`;

export const GridRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    
    @media screen and (max-width: 1457px) {
        width: 100%;
    }

`;
