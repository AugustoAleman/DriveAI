import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 220px;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  box-shadow: 0px 20px 60px 0px rgba(0, 0, 0, 0.25);
  position: "fixed",
  top: 0,
  left: 70,
  right: 0,
  zIndex: 20, 
  background: "white",
`;

export const Client = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  width: 100%;
  height: 100vh;
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