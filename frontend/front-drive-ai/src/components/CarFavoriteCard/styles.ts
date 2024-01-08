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
  width: 15rem;
  height: 15rem;

  @media (max-width: 600px) {
    width: 250px;
    height: 250px;
  }
`;

export const CarImage = styled.div`
  height: 57%;
`;
export const ImageContainer = styled.img`
  border-radius: 10px;
  height: 100%;
  width: 100%; 
  display: block; 
  margin: 0 auto;
  object-fit: cover; 
`
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
export const MonthlyFee = styled(GeneralPurposeText)`
    font-weight: bold;
    font-size: 0.6em;
    color: silver;
`;
export const Features = styled(GeneralPurposeText)`
    font-weight: bold;
    font-size: 0.6em;
    color: silver;
`;
export const RightInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding-right: 0.5em;
`;