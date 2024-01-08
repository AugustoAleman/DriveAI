
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const PaperCard = styled(Paper)`
    width: 190px;
    height: 70px;
    margin-top: 20px;
    margin-left: 20px;
`

export const TextNamePrice = styled.p`
	font-family: 'Roboto', sans-serif;
    bottom:15px;
    left:50px;
    position:relative;
    font-size: 17px;
    color: #78787b;
    font-size: 20px;
  font-weight: 540;
  line-height: 20px;
  margin-right: 0;
  margin-bottom: 0;
`

export const TextPrice = styled.p`
	font-family: 'Roboto', sans-serif;
    font-weight:760;
    font-size:20px;
    position: relative;
    bottom: 35px;
    left: 50px;
`

export const IconPrice = styled(ShoppingCartOutlinedIcon)`
    position: relative;
    bottom:95px;
    left:10px;   
`