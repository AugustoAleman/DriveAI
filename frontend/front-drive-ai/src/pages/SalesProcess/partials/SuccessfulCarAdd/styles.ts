import styled from "styled-components";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export const BoxCardSuccess = styled.div`
    left:90px;
    top:50px;
    position: relative;
    @media (max-width:769px){
      left:40px;
    }
`

export const CheckIcon = styled(CheckCircleOutlineOutlinedIcon)`
  top: 2px;
  left: 170px;
  position: relative;
  z-index: 9999;
  font-size:90;
  color:#48ac8c;
  @media (max-width:769px){
    left:90px;
  }
`

export const TittleSucces = styled.h1`
	font-family: 'Roboto', sans-serif;
    font-weight:760;
    font-size:25px;
    position: relative;
    left: -90px;
    text-align:center;
    @media (max-width:769px){
    left:-50px;
  }
`

export const TextSucces = styled.p`
  top: 94px;
  right:30px;
  width: 485px;
  position: relative;
  font-size: 20px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 20px;
  color:#78787b;
  @media (max-width:769px){
    right:90px;
  }
`

export const TextTwoSucces = styled.p`
  top: 111px;
  left: -100px;
  position: relative;
  font-size: 20px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 20px;
  color:#78787b;
  @media (max-width:769px){
    left:-40px;
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