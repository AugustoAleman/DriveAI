import styled from "styled-components";
import { OptionReviewProps, ReviewProps } from "./types";
import Button from '@mui/material/Button';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import ReviewD from "./ReviewD";

export const FrameContainerA = styled.div`
  min-height: 100vh;
`

export const FrameFrameA = styled.div<ReviewProps>`
  width: 100%;
  height: 737px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  background-color: ${({bgcolor}) => bgcolor};
`

export const TextmainA = styled.span<ReviewProps>`
  top: 33px;
  left: 150px;
  color: ${({colorOne}) => colorOne};
  width: 464px;
  height: auto;
  position: absolute;
  font-size: 32px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 20px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const RectangleA = styled.img`
  top: 80px;
  left: 0px;
  width: 741px;
  height: 657px;
  position: absolute;
  border-color: transparent;
  border-radius: 10px;
`

export const TextTwoA = styled.span<ReviewProps>`
  top: 150px;
  left: 149px;
  color: ${({colorTwo}) => colorTwo};
  height: auto;
  position: absolute;
  font-size: 30px;
  align-self: center;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 30px;
`

export const TextFourA = styled.span<ReviewProps>`
  top: 505px;
  left: 153px;
  color: ${({colorFour}) => colorFour};
  width: 452px;
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 20px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const TextSixA = styled.span<ReviewProps>`
  top: 471px;
  left: 139px;
  color: ${({colorSix}) => colorSix};
  width: 485px;
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 20px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const StyledReviewEmail = styled(AttachEmailIcon)<ReviewProps>`
  top: 243px;
  left: 285px;
  position: absolute;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  color: ${({colorReview}) => colorReview};
`

export const GroupA = styled.div`
  top: 0px;
  left: 0px;
  width: 180px;
  height: 180px;
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
  background-color: transparent;
`

export const StyledButton = styled(Button)`
  top: 610px;
  left: 325px;
  width: 127px;
  height: 61px;
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
`

export const TextoEightA = styled.span<ReviewProps>`
  top: 626px;
  left: 371px;
  color: #ffffff;
  width: 55px;
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: normal;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`