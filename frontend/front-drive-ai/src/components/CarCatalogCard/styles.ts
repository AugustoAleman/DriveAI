import styled from "styled-components";

export const GeneralPurposeText = styled.p`
    margin: 0%;
    padding: 0%;
`;

export const MainCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 90%;
    height: 90%;
    cursor: pointer;
`;
export const CarImage = styled.img`
    border-radius: 10px;
    width: 100%;
    height: 55%;
    object-fit: cover;
`;
export const CarInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;
export const LeftInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    padding-left: 0.5em;
`;
export const PriceText = styled(GeneralPurposeText)`
    font-weight: bold;
    font-size: 1.2em;
`;
export const BrandNModelText = styled(GeneralPurposeText)`
    font-weight: bold;
    font-size: 0.8em;
`;
export const DealershipText = styled(GeneralPurposeText)`
    font-weight: bold;
    font-size: 0.6em;
`;
export const RightInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding-right: 0.5em;
`;
export const ColorsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;
export const ColorCircle = styled.div`
    border-radius: 20px;
    border-width: 1px;
    height: 18px;
    width: 18px;
    margin-right: 10px;
`;