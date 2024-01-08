import styled from "styled-components";

export const BigCard = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 53px; 
    margin-left: 40px; 

    @media screen and (max-width: 768px) {
        flex-direction: row;
        margin-top: 20px;
        margin-left: 20px;
    }
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 11px;
    margin-left: 64px;

    @media screen and (max-width: 768px) {
        margin-top: 0;
        margin-left: 20px;
    }
`;

export const TextFieldContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 260px;
    padding-left: 484px;

    @media screen and (max-width: 768px) {
        margin-top: 64px;
        padding-left: 20px;
    }
`;

export const SecondButtonContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 228px;
    padding-left: 484px;

    @media screen and (max-width: 768px) {
        margin-top: 32px;
        padding-left: 20px;
    }
`;

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 34px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const PropertiesContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 64px;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Title = styled.p`
    font-weight: bold; 
    font-size: 34px; 
    margin: 0px;
`;

export const Grey = styled.p`
    color: grey;
`;

export const TextFieldItem1 = styled.p`
    font-weight: 200; 
    font-size: 27px; 
    margin-right: 17px;
`;

export const TextFieldItem2 = styled.p`
    margin-right: 17px;
`;

export const TextFieldItem3 = styled.p`
    font.weight: 200; 
    font-size: 27px;

`;

export const PropertiesItem = styled.p`
    margin-right: 64px;
`;


