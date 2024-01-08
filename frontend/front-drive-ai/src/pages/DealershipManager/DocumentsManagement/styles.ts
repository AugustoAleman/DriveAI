import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Client = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  width: 100%;
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
