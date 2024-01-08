import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import styled from "styled-components";

//TITLE OF STEPPER
export const TitleStepper = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight:700;
  font-size:13px;
    /*position:fixed;
    top:180px;
    margin-left:-1px; */
`
//SPAN OF TITLE
export const SpanStepper = styled.span`
    font-size:14px;
    font-weight:normal;
`
//Description of Stepper
export const Description = styled.div`
  position:fixed;
  /* display:flex; */
  margin:-9vw 30vw;
  width:90vh;
  height:60vh;
`

export const NextButton = styled.div`
  width: 90px;
  height: 60px;
  right:90px;
  bottom:70px;
  position:fixed;
  @media (max-width:768px){
    right:100px;
    bottom:20px;
  }

`

export const PaymentContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: white;
  overflow-y: auto;
  padding: 20px;
`;

export const BackButton = styled.div`
  display:flex;
  position: fixed;
  width: 90px;
  height: 60px;
  left:390px;
  bottom:70px;
`

export const ContainerStepper = styled.div`
 media (max-width:768px){
    display:none;
  }
  media (max-width:425px){
    display:none;
  }
`

export const ContainerButton = styled.div`
  position: fixed;
`