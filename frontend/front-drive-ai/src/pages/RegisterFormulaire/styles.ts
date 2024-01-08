import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
`;

export const Row = styled.div`
    width: 70%;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 15px;
    padding: 20px;
`;

export const useStyles = makeStyles((theme) => ({
    submitButton: {
      height: '6vh',
      width: '20vh',
      fontSize: '2vh',
      backgroundColor: '#111D4E', 
      color: '#fff',
      '&:hover': {
        backgroundColor: '#303f9f', // Change the color for the hover state
      },
      '&[disabled]': {
        backgroundColor: '#ccc', // Change the color for the disabled state
      },
    },
    collapse: {
        paddingLeft: "30px",
        paddingRight: "30px",
      },
  }));