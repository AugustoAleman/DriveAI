import styled from "styled-components";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

export const ButtonPlans = styled(Button)`
    background-color:#ffffff;
    left:20px;
    @media (max-width:769px){
        left:1px;
    }
`

export const Items = styled(CheckIcon)`
    display:grid;
    padding-left:-10px;
    margin-left:30px;
`

export const ContainerItem = styled.div`
    display:grid;
    grid-template-columns:repeat(2,1fr);
    padding-left:20px;
    padding-top:20px;
    @media (max-width:769px){
        padding-top:1px;
    }
`

export const TitleSubs = styled.h1`
    margin:1vw 20vw;
    font-size:40px;
    position: absolute;
    display:flex;
    width: 75vh;
    top: 50px;
    @media (max-width:1440px){
        right: -100px;
`

export const HeadingPlans = styled.h1`
    text-align:center;
    margin-top:-10px;
`

export const TextPlans = styled.p`
    text-align:center;
`

export const ContainerPlans = styled.div`
    display:grid;
    position: absolute;
    grid-template-columns:repeat(3,1fr);
    gap:3rem;
    margin-left:90px;
    margin-top:190px;
    left: 300px ;
    top:0px;
    @media (max-width:769px){
        display:grid;
        grid-template-columns:repeat(3,1fr);
        margin-left:-50px;
        gap:1rem;
        margin-top:-40px;
    }
`

export const BoxFree = styled.div`
    background-color:#ffffff;
    border:20px solid #ffffff;
    border-radius:20px;
    padding:20px;
    outline: 3px solid #000000;
    @media (max-width:769px){
        padding:4px;
        border:1px solid #ffffff;
        margin-bottom:120px;
    }
`

export const BoxStandard = styled.div`
    background-color:#4251F5;
    border:20px solid #4251F5;
    border-radius:20px;
    padding:20px;
    color:#ffffff;
    @media (max-width:769px){
        padding:10px;
        border:10px solid #ffffff;
        margin-bottom:120px;
    }
`

export const BoxPlus = styled.div`
    background-color:#111D4E;
    border:20px solid #111D4E;
    border-radius:20px;
    padding:20px;
    color:#ffffff;
    @media (max-width:769px){
        padding:10px;
        border:10px solid #ffffff;
        margin-bottom:120px;
    }
`