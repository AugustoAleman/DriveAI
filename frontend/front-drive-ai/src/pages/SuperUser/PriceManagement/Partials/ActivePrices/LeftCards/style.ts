import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-top: 40px;

  @media screen and (max-width: 1440px) {
    margin-left: 20px;
    margin-top: 20px;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

export const CardContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 14px;
  padding-right: 90px;
  margin-left: 11px;

  @media screen and (max-width: 1440px) {
    padding-right: 30px;
  }

  @media screen and (max-width: 768px) {
    padding-right: 0;
    margin-left: 0;
    margin-top: 20px;
    align-items: center;
    text-align: center;
  }
`;

export const CardContentRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 4px;
  margin-right: 4px;

  @media screen and (max-width: 1440px) {
    margin-top: 20px;
    margin-right: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
    align-items: center;
    text-align: center;
  }
`;

export const Price = styled.p`
  font-weight: bold;
`;
