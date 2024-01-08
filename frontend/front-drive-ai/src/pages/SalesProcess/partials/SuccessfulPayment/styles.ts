import styled from "styled-components";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export const BoxCardSuccess = styled.div`
    margin-left: 5rem;
    @media (max-width:769px){
      left:40px;
    }
`

export const CheckIcon = styled(CheckCircleOutlineOutlinedIcon)`
  margin-left: 4rem;
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
    margin-left: -2rem;
    @media (max-width:769px){
    left:-50px;
  }
`

export const TextSucces = styled.p`
  margin-right: 4rem;
  
  width: 485px;
  
  font-size: 20px;
 
  font-style: Bold;
  
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 20px;
  color:#78787b;
  @media (max-width:769px){
    right:90px;
  }
`

export const TextTwoSucces = styled.p`

  font-size: 20px;
 
  font-style: Bold;
  margin-left: -4rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  line-height: 20px;
  color:#78787b;
  @media (max-width:769px){
    left:-40px;
  }
`

export const BoxButton = styled.div`
    
    /* width:40px; */
   
    line-height: 20px;
    display:none;
`