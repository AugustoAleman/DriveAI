import styled from "styled-components";

export const Add = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
`;

export const PageBackground = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  margin-top: 12rem;

  h1 {
    font-family: "Roboto", sans-serif;
    color: #000000;
    margin: 0px;
    padding: 0px;
    font-size: 40 px;
  }
  h3 {
    font-family: "Roboto", sans-serif;
    color: #979797;
    margin-left: 3px;
    margin-bottom: 1px;
    padding: 0px;
    font-size: 14px;
  }
`;

export const Fields = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 2rem;
  gap: 2rem;
  justify-content: center;
  h4 {
    font-family: "Roboto", sans-serif;
    color: #979797;
    margin-left: 3px;
    margin-bottom: 1px;
    padding: 0px;
    font-size: 14px;
  }
  @media (max-width: 1398px) {
    flex-wrap: wrap;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 0;
    align-items: center;
  }
`;
export const Contents = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  color: #000000;
  font-size: 20px;
  margin-left: 2rem;
  margin-bottom: 0px;
`;

export const Cell = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.6rem;
  input {
    width: 15rem;
    height: 30px;
    color: #000000;
  }
  h4 {
    font-family: "Roboto", sans-serif;
    color: #979798;
    margin-left: 0px;
    margin-bottom: 4px;
  }
`;

export const Cell2 = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.6rem;
  input {
    width: 15rem;
    height: 30px;
    color: #000000;
  }
  h4 {
    font-family: "Roboto", sans-serif;
    color: #979798;
    margin-left: 0px;
    margin-bottom: 4px;
  }
`;
