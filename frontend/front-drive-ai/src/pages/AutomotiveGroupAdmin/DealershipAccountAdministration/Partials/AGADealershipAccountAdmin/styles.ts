import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const PageBackground = styled.div`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(to bottom, #bcbcbc, white);
  display: flex;
  flex-direction: column;
  padding-left: 10rem;
  padding-top: 240px;
  width: 100%;
  height: 100vh;
  h1 {
    font-family: "Roboto", sans-serif;
    color: #000000;
    margin: 0px;
    padding: 0px;
    font-size: 40px;
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

export const useStyles = makeStyles((theme) => ({

  actionContainer: {
    marginRight: theme.spacing(5),
	backgroundColor: "transparent",
  },

  filterContainer: {
    width: "60%",
	backgroundColor: "transparent",
  },

  addButtonContainer: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(5),
	backgroundColor: "transparent",
  },

}));
