import styled from "styled-components";
import {TextField, RadioGroup } from '@mui/material';

export const TitleDelivery = styled.h1`
    bottom:20px;
    left:30px;
    position:relative;
    font-size:40px;
    @media (max-width: 769px) {
        bottom:470px;
        left:260px;
        font-size:22px;
        position:fixed;
        text-align:justify;
    }
`

export const TextTypes = styled.p`
    position: relative;
    top: -30px;
    font-size:24px;
    font-weight:540;
    left:160px;
    width:350px;
`

export const RadioDelivery = styled(RadioGroup)`
    bottom:370px;
    left:50px;
`

export const TextOther = styled.p`
    position: relative;
    font-size:20px;
    color: #5f5f5f;;
`

export const TextFieldAddressOne = styled(TextField)`
 
    @media (max-width: 769px){
        bottom: -120px;
        left:-20px;
        width:410px;
    }
`

export const TextFieldCity = styled(TextField)`

    @media (max-width: 769px){
        bottom: -140px;
        left:-20px;
        width:190px;
    }
`

export const TextFieldState = styled(TextField)`

    @media (max-width: 769px){
        bottom: -140px;
        left:-10px;
        width:210px;
    }
`

export const TextFieldZipCode = styled(TextField)`

    @media (max-width: 769px){
        bottom: -160px;
        left:-20px;
        width:190px;
    }
`

export const TextFieldCountry = styled(TextField)`

    @media (max-width: 769px){
        bottom: -160px;
        left:-10px;
        width:210px;
    }
`
export const ContainerDelivery = styled.div`
    position: fixed;
    bottom: 300px;
    left: 400px;

`