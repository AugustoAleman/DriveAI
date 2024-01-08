import React from 'react'
import theme from 'theme/theme'
import { 
  FrameContainerA,
  FrameFrameA,
  TextmainA,
  RectangleA,
  TextTwoA,
  TextFourA,
  TextSixA,
  StyledIconEmail,
 } from './styles'

 import { OptionAcceptedProps } from './types'
 import RectangleAccepted from './assets/rectangle278641633-p8ci-800w.png'

 const Accepted: React.FC<OptionAcceptedProps> = ({
  textOne,
  textTwo,
  textFour,
  textSix,
  textEight='Hola',
  colorOne,
  colorTwo,
  colorFour,
  colorSix, 
  bgcolor,
  colorAccepted='#48ac8c',
 }) => {
  return (
    <FrameContainerA>
      <FrameFrameA bgcolor={bgcolor}>
        <TextmainA colorOne={colorOne}>{textOne}</TextmainA>
        <RectangleA src={RectangleAccepted}></RectangleA>
        <TextTwoA colorTwo={colorTwo}>{textTwo}</TextTwoA>
        <TextFourA colorFour={colorFour}>{textFour}</TextFourA>
        <TextSixA colorSix={colorSix}>{textSix}</TextSixA>
        <StyledIconEmail style={{fontSize: 200}} colorAccepted={colorAccepted}>
        </StyledIconEmail>
      </FrameFrameA>
    </FrameContainerA>
  
  );
 };

 export default Accepted;



 /*
import * as React from 'react';
import Button from '@mui/material/Button';

export default function DisableElevation() {
  return (
    <Button variant="contained" disableElevation>
      Disable elevation
    </Button>
  );
}


 */