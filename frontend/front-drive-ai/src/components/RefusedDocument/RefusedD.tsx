import React from 'react'
import theme from 'theme/theme'
import { 
  FrameContainerA,
  FrameFrameA,
  TextmainA,
  RectangleA,
  TextTwoA,
  TextFourA,
  GroupA,
  RefuseButton,
  TextSixA,
  StyledRefusedEmail,
 } from './styles'

 import { OptionRefusedProps } from './types'
 import RectangleRefused from './assets/rectangle278641633-p8ci-800w.png'
 import Button from '@mui/material/Button';

 const RefusedD: React.FC<OptionRefusedProps> = ({
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
  colorRefused='#e04c74',
 }) => {
  return (
    <FrameContainerA>
      <FrameFrameA bgcolor={bgcolor}>
        <TextmainA colorOne={colorOne}>{textOne}</TextmainA>
        <RectangleA src={RectangleRefused}></RectangleA>
        <TextTwoA colorTwo={colorTwo}>{textTwo}</TextTwoA>
        <TextFourA colorFour={colorFour}>{textFour}</TextFourA>
        <TextSixA colorSix={colorSix}>{textSix}</TextSixA>
        <StyledRefusedEmail style={{fontSize: 200}} colorRefused={colorRefused}>
        </StyledRefusedEmail>
        <RefuseButton variant="contained">
            {textEight}
        </RefuseButton>
      </FrameFrameA>
    </FrameContainerA>
  );
 };

 export default RefusedD;