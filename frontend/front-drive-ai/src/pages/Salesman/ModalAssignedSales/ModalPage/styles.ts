import styled from "styled-components";

export const Column = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-top: 0.5rem;

  h2 {
    font-family: "Roboto", sans-serif;
    color: black;
    font-weight: 400;
    margin: 0;
    font-size: 1.3rem;
  }

  h5 {
    font-family: "Roboto", sans-serif;
    color: black;
    font-weight: 400;
    margin: 0;
  }
`;

export const FirstRowContainer = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 4rem;

  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-family: "Roboto", sans-serif;
    width: 20rem;
    margin-left: 1rem;
  }
`;

export const StepperDiv = styled.div`
  font-family: "Roboto", sans-serif;
  margin-left: auto;
  margin-right: 12rem;
  width: 80%;
`;

export const CardContainer = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
`;

export const Context = styled.div`
  font-family: "Roboto", sans-serif;
  color: #000000;
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  gap: 1rem;
`;

export const Additive = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3rem;

  h4 {
    font-weight: bold;
    font-size: 0.8rem;
    margin: 0;
  }
`;

export const PageBackground = styled.div`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(to bottom, #bcbcbc, white);
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-top: 3rem;
	width: 100%;
	height: 100%;
	margin-top: 10rem;

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

export const CardsHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  gap: 15rem;
  margin: auto;
`;

export const CardLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  h2 {
    font-family: "Roboto", sans-serif;
    color: #000000;
    margin: 0px;
    padding: 0px;
    font-size: 20px;
    font-weight: 100;
  }
`;

export const ContentRightCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  h2 {
    font-family: "Roboto", sans-serif;
    color: #000000;
    margin: 0px;
    padding-bottom: 0;
    font-size: 20px;
    font-weight: 100;
  }
`;

export const CardRightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  h2 {
    font-family: "Roboto", sans-serif;
    color: #000000;
    margin: 0px;
    padding-bottom: 0;
    font-size: 20px;
    font-weight: 100;
  }
  p {
	font-family: "Roboto", sans-serif;
	color: #000000;
	margin: 0px;
	padding: 3px 3px 3px 10px;
	font-size: 15px;
  }
`;

export const CardRightContentInside = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  gap: 0.5rem;
  h2 {
    font-family: "Roboto", sans-serif;
    color: #000000;
    margin: 0px;
	margin-top: 0.5rem;
    padding-bottom: 0;
    font-size: 20px;
    font-weight: 100;
  }
  p {
	font-family: "Roboto", sans-serif;
	color: #000000;
	margin: 0px;
	padding: 3px 3px 3px 10px;
	font-size: 15px;
  }
`;
