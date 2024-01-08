import styled from "styled-components";

export const ContentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const ContentCardTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  width: 100%;
  h3 {
    margin: 0 0 10px 0;
  }
`;
export const ContentCardTitleText = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ContentCardTitleTextLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  width: 50%;
  margin-right: 20px;

  h4 {
    margin-bottom: 3px;
  }
`;

export const TextOfClient = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  max-width: 15rem;
`;
export const ContentCardTitleTextRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 50%;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: flex-start;
  h4 {
    margin-bottom: 3px;
  }
`;
