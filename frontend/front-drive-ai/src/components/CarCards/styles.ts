import styled from "styled-components";
import { CarCardsProps } from "./types";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
//==================VARIANT ONE================
export const ContainerCarCard = styled.div`
  min-height: 100vh;
`

export const FrameCarCard = styled.div<CarCardsProps>`
  width: 371px;
  height: 490px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  background-color: ${({bgColor})=>bgColor};
` 

export const VehiclecarCard = styled.div<CarCardsProps>`
  top: 18px;
  left: 0px;
  width: 368px;
  height: 372px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  border-radius: 0px 0px 0px 0px;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({colorCarcard})=>colorCarcard};
`

export const TextCarCard = styled.span<CarCardsProps>`
  top: 214px;
  left: 9px;
  color: ${({colorCarOne})=>colorCarOne};
  width: 168px;
  height: auto;
  position: absolute;
  font-size: 32px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  text-decoration: none;
`

export const ArrowCarCard = styled(CompareArrowsIcon)`
  top: 340px;
  left: 320px;
  width: 41px;
  height: 40px;
  position: absolute;
`

export const FavoriteCarCard = styled(FavoriteBorderIcon)`
  top: 226px;
  left: 317px;
  width: 34px;
  height: 36px;
  position: absolute;
  background-color: '#000000';
  color: '#000000';
`

export const ImgCarCard = styled.img`
  top: 18px;
  left: 0px;
  width: 368px;
  height: 214px;
  position: absolute;
  border-color: transparent;
  border-radius: 20px;
`

export const TextTwoCarCard = styled.span<CarCardsProps>`
  top: 268px;
  left: 9px;
  color: ${({colorCarTwo})=>colorCarTwo};
  width: 287px;
  height: auto;
  position: absolute;
  font-size: 20px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const GroupCarCard = styled.div`
  top: 342px;
  left: 22px;
  width: 150px;
  height: 30px;
  display: flex;
  padding: 0;
  position: absolute;
  align-self: auto;
  box-sizing: border-box;
  align-items: flex-start;
  flex-shrink: 1;
  border-color: transparent;
  border-style: none;
  border-width: 0;
  margin-right: 0;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
`

export const TextThreeCarCard = styled.span<CarCardsProps>`
  top: 297px;
  left: -38px;
  color: ${({colorCarThree})=>colorCarThree};
  width: 243px;
  height: auto;
  position: absolute;
  font-size: 16px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const ButtonCard = styled(Button)`
  font-family: "Roboto", sans-serif;
  background-color: #fcfdfd00;
  border: none;
  color: #0f0f0f;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;

  &:hover{
    background-color: #fcfeff00;
  }
`


//=========================VARIANT 2====================

export const ContainerCardVTwo = styled.div`
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
`

export const FrameCardVTwo = styled.div<CarCardsProps>`
  width: 512px;
  height: 430px;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  flex-shrink: 0;
  background-color: ${({bgColorVTwo})=>bgColorVTwo};
`

export const VehicleVTwo = styled.div<CarCardsProps>`
  top: 13px;
  left: 15px;
  width: 368px;
  height: 410px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 1;
  background-color: ${({cardColorVTwo})=>cardColorVTwo};
`

export const ImgOneVTwo = styled.img`
  top: 0px;
  left: 0px;
  width: 368px;
  height: 214px;
  position: absolute;
  border-radius: 20px;
`

export const TextOneVTwo = styled.span<CarCardsProps>`
  top: 214px;
  left: 9px;
  color: ${({colorTextOneVtwo})=>colorTextOneVtwo};
  width: 168px;
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Bold;
  text-align: center;
  font-family: Raleway;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  text-decoration: none;
`

export const TextTwoVTwo = styled(Button)<CarCardsProps>`
  top: 20px;
  left: 15px;
  color: ${({colorTextTwoVtwo})=>colorTextTwoVtwo};
  width: 52px;
  height: auto;
  position: absolute;
  font-size: 16px;
  font-style: Bold;
  text-align: left;
  font-family: Raleway;
  font-weight: 700;
  line-height: 20px;
  font-stretch: normal;
  text-decoration: none;
`

export const ImgTwoVTwo = styled(IconButton)`
  top: 320px;
  left: 300px;
  width: 38px;
  height: 38px;
  position: absolute;
`

export const ImgFiveVTwo = styled(IconButton)`
  top:10px;
  left: 280px;
  width: 40px;
  height: 32px;
  position: absolute;
`

export const TextThreeVTwo = styled.span<CarCardsProps>`
  top: 263px;
  left: 15px;
  color: ${({colorTextThreeVtwo})=>colorTextThreeVtwo};
  width: 287px;
  height: auto;
  position: absolute;
  font-size: 20px;
  font-style: Bold;
  text-align: center;
  font-family: Raleway;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  text-decoration: none;
`

export const GroupVTwo = styled.div`
  top: 350px;
  left: 20px;
  width: 400px;
  height: 3px;
  display: flex;
  position: absolute;
  align-items: flex-start;
`
export const TextFourVTwo = styled.span<CarCardsProps>`
  top: 372px;
  left: 326px;
  color: ${({colorTextFourVtwo})=>colorTextFourVtwo};
  width: 243px;
  height: auto;
  position: absolute;
  font-size: 16px;
  font-style: Bold;
  text-align: left;
  font-family: Raleway;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  text-decoration: none;
`

export const TextFiveVTwo = styled.span<CarCardsProps>`
  top: -14px;
  color: ${({colorTextFiveVtwo})=>colorTextFiveVtwo};
  right: 2px;
  width: 25px;
  height: auto;
  position: absolute;
  font-size: 40px;
  font-style: Bold;
  text-align: center;
  font-family: Raleway;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  text-decoration: none;
  z-index: 9999;
`

export const TextSixVTwo = styled.span<CarCardsProps>`
  top: 290px;
  left: -30px;
  color: ${({colorTextSixVtwo})=>colorTextSixVtwo};
  width: 243px;
  height: auto;
  position: absolute;
  font-size: 16px;
  font-style: Bold;
  text-align: center;
  font-family: Raleway;
  font-weight: 700;
  line-height: 58px;
  font-stretch: normal;
  text-decoration: none;
`

export const CheckBoxOneVTwo = styled.div`
  top: 237px;
  left: 324px;
  width: 36px;
  display: flex;
  position: absolute;
  align-items: center;
`


