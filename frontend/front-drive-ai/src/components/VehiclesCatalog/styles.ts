import styled, { css } from "styled-components";

export const VehiclesCatalogList = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  width: 90%;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  
`;

export const GeneralContent = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 100%;

`;

export const CarCatalogCardContainer = styled.div`
  display: flex;
  aspect-ratio: 1 / 1;
  height: 100%;

  @media screen and (max-width: 600px) {
    height: auto;
    width: 100%;
  }

  justify-content: center;
  align-items: center;
`

export const PropmtText = styled.div`
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 4vh;
    font-weight: 700;
    font-style: italic;
    padding-top: 1%;
`