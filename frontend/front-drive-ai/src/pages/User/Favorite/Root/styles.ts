import styled from "styled-components";

export const Compositor = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Client = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const CentralContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (min-width: 481px) and (max-width: 1024px) {
    width: 90%;
  }

  @media (min-width: 1025px) and (max-width: 1350px) {
    width: 85%;
  }
`;

export const ActionsContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 2rem;
  margin-left: 2.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-left: 0rem;
  }
`;

export const ActionsContainer2 = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ActionsContainer3 = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center; /* center vertically */
  width: 100%;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 90%;
  }
`;

export const Arrow = styled.div`
@media (max-width: 768px) {
  margin-left: 2.5rem;
}
`;

export const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  flex: 1; /* take up remaining horizontal space */
  text-align: center; /* center horizontally */
  font-weight: bold;
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 25px;
    flex-wrap: wrap;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const OptionsContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const OptionsDescription = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  margin-right: 1.5rem;
  align-items: center;
`;

export const FailContainer = styled.div`
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const BecauseICanContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;

  & > * {
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    margin-left: 2.5rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;

    & > * {
      margin-bottom: 1rem;
      margin-top: 1rem;
      margin-left: 0;
    }
  }
`;
