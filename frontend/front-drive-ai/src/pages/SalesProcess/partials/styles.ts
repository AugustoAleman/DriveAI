import styled from "styled-components";
import Paper from '@mui/material/Paper';
import { Grid, Container } from "@material-ui/core";

export const ContainerGeneral = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const PaperAvatar = styled(Paper)`
    height:140px;
    width:250px; 
    display: flex;
    position:relative;`

export const PositionedContainer = styled(Container)`
    position: relative;
    top: 80px; /* Ajusta el valor según tu necesidad */
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  `;

export const PaperAvatar2 = styled(Paper)`
height: 600px;
  width: 230px;
  display: flex;
  position: relative;
  background-color: transparent;
`
export const PaperAvatar3 = styled(Paper)`
    height:100rm;
    width:230px; 
    display: flex;
    position:relative;
    `
