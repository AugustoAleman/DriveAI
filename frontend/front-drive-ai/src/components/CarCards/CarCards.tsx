import React from 'react'
import { 
  ContainerCarCard,
  FrameCarCard,
  VehiclecarCard,
  TextCarCard,
  ButtonCard,
  ArrowCarCard,
  FavoriteCarCard,
  ImgCarCard,
  TextTwoCarCard,
  TextThreeCarCard,

  ContainerCardVTwo,
  FrameCardVTwo,
  VehicleVTwo,
  ImgOneVTwo,
  ImgTwoVTwo,
  TextOneVTwo,
  TextTwoVTwo,
  TextThreeVTwo,
  TextFourVTwo,
  TextFiveVTwo,
  TextSixVTwo,
  ImgFiveVTwo,
  GroupVTwo,
  CheckBoxOneVTwo,
 } from './styles';

 import { OptionsCarCardsProps } from './types';
 import ImageOneCardVOne from './assets/image82922-qjlj-300h.png'
 import ImageOneCardTwo from './assets/image115125-gikuj-300h.png'
 import DeleteIcon from '@mui/icons-material/Delete';
 import Person2Icon from '@mui/icons-material/Person2';
 import Checkbox from '@mui/material/Checkbox';
 import Fab from '@mui/material/Fab';
 import Box from '@mui/material/Box';

 


 const CarCards: React.FC<OptionsCarCardsProps> = ({
  bgColor,
  colorCarcard,
  textCarOne,
  colorCarOne,
  textCarTwo,
  colorCarTwo,
  textCarThree,
  colorCarThree,

  bgColorVTwo,     
  cardColorVTwo,   
  textOneVTwo,     
  colorTextOneVtwo,
  textTwoVTwo,
  colorTextTwoVtwo,
  textThreeVTwo,
  colorTextThreeVtwo,
  textFourVTwo,
  colorTextFourVtwo,
  textFiveVTwo,
  colorTextFiveVtwo,
  textSixVTwo,
  colorTextSixVtwo,
  variantCard,
  colorOptionOne,
  colorOptionTwo
}) => {
  //VARIANT ONE
  if(variantCard === 'one'){
    return(
      <ContainerCarCard>
        <FrameCarCard bgColor={bgColor}>
            <VehiclecarCard colorCarcard={colorCarcard}>
                <TextCarCard colorCarOne={colorCarOne}>{textCarOne}</TextCarCard>
                <ButtonCard>
                    <ArrowCarCard style={{color:'#2a2987', fontSize:"40px"}}></ArrowCarCard>
                    <FavoriteCarCard style={{color: "#000000"}}></FavoriteCarCard>
                </ButtonCard>
            </VehiclecarCard>
            <ImgCarCard src={ImageOneCardVOne}></ImgCarCard>
            <TextTwoCarCard colorCarTwo={colorCarTwo}>{textCarTwo}</TextTwoCarCard>
            <GroupVTwo>
              <Fab style={{ color: colorOptionOne[0], backgroundColor: colorOptionOne[0], fontSize:"small" }}/>
              <Fab style={{ color: colorOptionOne[1], backgroundColor: colorOptionOne[1] }}/>
              <Fab style={{ color: colorOptionOne[2], backgroundColor: colorOptionOne[2] }}/>
              <Fab style={{ color: colorOptionOne[3], backgroundColor: colorOptionOne[3] }}/>
            </GroupVTwo>
            <TextThreeCarCard colorCarThree={colorCarThree}>{textCarThree}</TextThreeCarCard>
        </FrameCarCard>
      </ContainerCarCard>
    );
  }
  else
  {
    //VARIANT TWO
    return(
      <ContainerCardVTwo>
        <FrameCardVTwo bgColorVTwo={bgColorVTwo}>
          <VehicleVTwo cardColorVTwo={cardColorVTwo}>
            <ImgOneVTwo src={ImageOneCardTwo}></ImgOneVTwo>
            <TextOneVTwo colorTextOneVtwo={colorTextOneVtwo}>{textOneVTwo}</TextOneVTwo>
            <TextTwoVTwo colorTextTwoVtwo={colorTextTwoVtwo}>{textTwoVTwo}</TextTwoVTwo>
          </VehicleVTwo>
          <ImgTwoVTwo><Person2Icon style={{color:'#ffffff', fontSize:"40px"}}/></ImgTwoVTwo>
          <ImgFiveVTwo><DeleteIcon style={{fontSize:"40px"}}/></ImgFiveVTwo>
          <TextThreeVTwo colorTextThreeVtwo={colorTextThreeVtwo}>{textThreeVTwo}</TextThreeVTwo>
          <GroupVTwo>
              <Box sx={{ '& > :not(style)': { m: 0.08 } }}>
                <Fab style={{ color: colorOptionTwo[0], backgroundColor: colorOptionTwo[0], fontSize:"small" }}/>
                <Fab style={{ color: colorOptionTwo[1], backgroundColor: colorOptionTwo[1] }}/>
                <Fab style={{ color: colorOptionTwo[2], backgroundColor: colorOptionTwo[2] }}/>
                <Fab style={{ color: colorOptionTwo[3], backgroundColor: colorOptionTwo[3] }}/>
                <Fab style={{ color: colorOptionTwo[4], backgroundColor: colorOptionTwo[4] }}/>
              </Box>
            <TextFourVTwo colorTextFourVtwo={colorTextFourVtwo}>{textFourVTwo}</TextFourVTwo>
          </GroupVTwo>
          <TextFiveVTwo colorTextFiveVtwo={colorTextFiveVtwo}>{textFiveVTwo}</TextFiveVTwo>
          <TextSixVTwo colorTextSixVtwo={colorTextSixVtwo}>{textSixVTwo}</TextSixVTwo>
          <CheckBoxOneVTwo>
            <Checkbox defaultChecked size='medium' style={{color:'#ffffff', fontSize:"900000px"}}/>
          </CheckBoxOneVTwo>
        </FrameCardVTwo>
      </ContainerCardVTwo>
    );
  }
};

export default CarCards