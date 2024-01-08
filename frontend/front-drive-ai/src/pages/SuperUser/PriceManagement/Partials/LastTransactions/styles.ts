import styled from "styled-components";

export const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IntialText = styled.div`
  width: 100%;
  padding-left: 60px;
  margin-top: 14px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    padding-left: 30px;
  }

  @media screen and (min-width: 1440px) {
    font-size: 24px;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 14px;
  padding-left: 60px;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (min-width: 1440px) {
    margin-top: 30px;
  }
`;