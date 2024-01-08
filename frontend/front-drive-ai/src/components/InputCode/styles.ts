import styled from "styled-components";
import { InputCodeProp } from "./types";
import { makeStyles } from "@material-ui/core/styles";

export const Email = styled.span<InputCodeProp>`
    font-weight: bold; 
    //font-family: 'Roboto';
`; 

export const StaticTextTitle = styled.p`
    text-align-last: center;
    font-weight: 900;
    //font-family: 'Roboto';
    font-size: 4vh;
    padding-top: 6%
`;

export const StaticText = styled.p`
    text-align: center;
    //font-family: 'Roboto';
    font-size: 3vh;
`;

export const FlexCode = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1%;
    justify-content: space-around;
    padding-top: 5%
`;

export const InputCodeBox = styled.input`
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }  

    -moz-appearance: textfield;

    padding-top: 3%;
    padding-bottom: 3%;
    width: 9%;
    font-size: 95%;
    text-align: center;
    border-radius: 18%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.4);
`;

export const ButtonInputCode = styled.div`
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 11rem;
`

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