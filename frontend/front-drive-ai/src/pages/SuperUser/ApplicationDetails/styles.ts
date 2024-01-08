import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: 70px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10rem;
  width: 100%;
  height: min-content;
  background-color: #ffffff;
  background: linear-gradient(to bottom, #bcbcbc, white);
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
  align-items: center;
  gap: 20px;
  justify-content: left;

  @media (max-width: 850px) {
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;
  }
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

export const ContainerCardsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;

  @media (max-width: 1231px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0px;
    margin-bottom: 0px;
  }
`;

export const Client = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  width: 100%;
  margin-top: 10.5rem;
  height: min-content;
  background-color: #ffffff;
`;

export const useStyles = makeStyles((theme) => ({
  StaticHeader: {
    position: "fixed",
    top: 0,
    left: 70,
    right: 0,
    zIndex: 20, // To make sure it stays on top of other elements
    background: "white",
  },
}));
