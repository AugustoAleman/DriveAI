import styled from "styled-components";

// content wrapper for the first step 
export const PaymentStepCard = styled.div`
    display: grid;
    place-items: center;
    justify-content: center;
    @media screen and (max-width: 400px) {
        width: 20.5em;
        
    }
    
`;

export const PaymentHorizontalCardHolder = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 1vw;
    @media screen and (max-width: 400px) {
        width: 20.5em;
        
    }
`;