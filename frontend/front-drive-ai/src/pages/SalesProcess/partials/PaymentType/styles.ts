import styled from "styled-components";
import {FormControl, Slider, TextField, RadioGroup } from '@mui/material';

export const TitleType = styled.h1`
    bottom:20px;
    left:60px;
    position:relative;
    @media (max-width: 769px) {
        bottom:515px;
        left:320px;
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

export const TypesOptions = styled.p`
    position: relative;
    bottom: 22px;
    left:70px;
    font-size:23px;
    color: #5f5f5f;
    width:590px;
    @media (max-width:769px){
        bottom: 400px;
        left:450px;
        font-size:20px;  
        text-align:center;
    }
`

export const TypesSpan = styled.span`
    font-weight:700;
`

export const TextTypeOne = styled.p`
    position: relative;
    bottom: 40px;
    left:80px;
    font-weight:500;
    font-size:28px;
    color: #5f5f5f;
    width:540px;
    @media (max-width:769px){
        left:260px;
        bottom: 220px;
        text-align:center;
}
`

export const SpanTypeOne = styled.span`
    font-weight:780;
`

export const TextGeneralType = styled.p`
    /* position: relative; */
    bottom: 40px;
    left:200px;
    font-weight:600;
    font-size:22px;
    @media (max-width:769px){
        left:270px;
        font-size:18px;
        bottom:340px;
}
`

export const TextGeneralTwoType = styled.p`
    position: relative;
    bottom: 160px;
    left:50px;
    font-weight:600;
    font-size:22px;
    width:90px;
    @media (max-width:769px){
        left:300px;
        font-size:18px;
        bottom: 120px;
}
`

export const TextTwoTypeTwo = styled.p`
    /* position: relative; */
    bottom: 50px;
    left:200px;
    font-weight:700;
    font-size:18px;
    color:#78787b;
    @media (max-width:769px){
        left:500px;
        bottom:340px;
}
`

export const HitchInput = styled(FormControl)`
    /* position: relative; */
    left:180px;
    bottom:90px;
    @media (max-width:769px){
        left:40px;
        width:9px;
        bottom:-40px;
}
`

export const TextMonths = styled.p`
    /* position: relative; */
    width:410px;
    left:50px;
    bottom:70px;
    font-weight:800;
    position: relative;
    @media (max-width:769px){
        bottom: 220px;
        left:250px;
}
`

export const SpanMonths = styled.span`
    color: #111D4E;
`

export const TextSliderOne = styled.p`
    position: relative;
    left:70px;
    bottom:70px;
    width:90px;
    @media (max-width:769px){
        left:250px;
        bottom:170px;
}
`

export const SliderMonths = styled(Slider)`
    /* position: relative; */
    left:170px;
    bottom:110px;
    /* width:10px; */
    @media (max-width:769px){
        width:9px;
        left:30px;
        bottom: -80px;
}
`

export const TextSliderTwo = styled.p`
    position: relative;
    left:420px;
    bottom:160px;
    width:90px;
    @media (max-width:769px){
        left:590px;
        bottom:170px;
}
`

export const Insurance = styled(TextField)`
    left:60px;
    position: relative;
    bottom: 170px;
    /* padding-bottom:900px; */
    @media (max-width:769px){
        width:10px;
        left:150px;
        bottom:-130px;
}
`

export const RadioOptions = styled(RadioGroup)`
    bottom:39px;
    /* position: relative; */
    left:190px;
    @media (max-width:769px){
        left:240px;
        bottom:420px;
    }
`

export const ContainerPayment = styled.div`
  margin-left: 10rem;

  @media (max-width: 769px) {
    margin-left: 0;
  }
`