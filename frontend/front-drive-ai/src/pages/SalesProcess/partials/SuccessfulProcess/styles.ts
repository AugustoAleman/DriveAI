import Paper from '@mui/material/Paper';
import styled from "styled-components";

export const TittleSucces = styled.h1`
	font-family: 'Roboto', sans-serif;
    font-weight:900;
    font-size:90px;
    margin-left: -70px;
    top:-190px;
    text-align:center;
    font-size:40px;
    z-index:9999;
    @media (max-width:769px){
        font-size:30px;
    }
`

export const TextSucces = styled.p`
    color:#78787b;
    @media (max-width:769px){

    }
`

export const ContainerSuccesful = styled(Paper)`
    font-family: 'Roboto', sans-serif;
    text-align:center;
    padding:20px;
    font-size:30px;
    margin-left:430px;
    margin-top:200px;
    position:fixed;
    @media (max-width:769px){
        margin-left:260px;
        margin-top:210px;
        padding:1px;
        font-size:20px;
        width:460px;
    }
`

export const BoxButton = styled.div`
    right:10px;
    top:30px;
    /* width:40px; */
    position:relative;
    align-self: auto;
    text-align: center;
    line-height: 20px;
    display:none;
`