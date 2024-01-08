import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  background: linear-gradient(to bottom, #BCBCBC, white);
  margin-left: 70px;
`;

export const HaederContainer = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 20px 60px 0px rgba(0, 0, 0, 0.25);
  margin-top: 15rem;
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