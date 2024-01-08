import styled from "styled-components";
import { Card } from "components/Card";
import { Popover } from '@mui/material';

export const CardSummary = styled(Card)`
    width:900px !important;
    display: none;
    margin-top: 2rem;
    margin-left: 1rem;
`

export const BoxOffer = styled.div`
    margin-top: 2rem;
    margin-left: 1rem;
        
    @media (max-width:769px){
        left:250px;
        bottom:160px;
    }

    @media (max-width: 1440px) {
        top: 80px;
    }
`

export const TableSumarry = styled.table`
    border-collapse: separate;   
    margin-bottom: 5rem;
    margin-left: 9rem;
    z-index: 9999;
    font-size:24px;
    font-family: 'Roboto', sans-serif;

    @media (max-width: 769px) {
        /* Estilos para pantallas con ancho menor a 600px */
        top:170px;
        left:250px;
        font-size:20px;
    }
    
`
export const TDSummary = styled.td`
    padding-left: 9em;
    margin-top: 4rem;
    margin-left: 1rem;
    font-family: 'Roboto', sans-serif;
    @media (max-width: 769px) {
        /* Estilos para pantallas con ancho menor a 600px */
        border-collapse: separate;   
        font-size:20px; 
        padding-top:14px; 
        padding-left:5em;
    }
`
export const THSummary = styled.th`
    text-align:left;
    margin-top: 4rem;
    margin-left: 1rem;
    
    font-family: 'Roboto', sans-serif;
    @media (max-width: 769px) {
        /* Estilos para pantallas con ancho menor a 600px */
        padding-left:1em;
        font-size:20px;  
    }
`

export const ButtonPay = styled.div`
   
    align-self: auto;
    text-align: center;
    line-height: 20px;
    @media (max-width: 769px) {
       
    }
`
export const ButtonContainer = styled.div`

`

export const PaymentConatiner = styled.div`
margin-left: 6rem;


`

