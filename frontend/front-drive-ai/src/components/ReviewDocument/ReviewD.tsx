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
  StyledButton,
  TextSixA,
  StyledReviewEmail,
 } from './styles'

 import { OptionReviewProps } from './types'
 import RectangleReview from './assets/rectangle278641633-p8ci-800w.png'
 import Button from '@mui/material/Button';

 const ReviewD: React.FC<OptionReviewProps> = ({
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
  colorReview='#383434',
 }) => {
  return (
    <FrameContainerA>
      <FrameFrameA bgcolor={bgcolor}>
        <TextmainA colorOne={colorOne}>{textOne}</TextmainA>
        <RectangleA src={RectangleReview}></RectangleA>
        <TextTwoA colorTwo={colorTwo}>{textTwo}</TextTwoA>
        <TextFourA colorFour={colorFour}>{textFour}</TextFourA>
        <TextSixA colorSix={colorSix}>{textSix}</TextSixA>
        <StyledReviewEmail style={{fontSize: 200}} colorReview={colorReview}>
        </StyledReviewEmail>
        <StyledButton variant="contained">
            {textEight}
        </StyledButton>
      </FrameFrameA>
    </FrameContainerA>
  
  );
 };

 export default ReviewD;