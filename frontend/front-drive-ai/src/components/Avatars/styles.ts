import styled from "styled-components";
import { AvatarsProps } from "./types";

import Button from '@mui/material/Button';

//----------MAIN COMPONENT OF THE AVATAR---------
export const ContainerAvatarMain =styled.div`
  min-height: 100vh;
  position:relative;
`

export const FrameAvatarMain = styled.div<AvatarsProps>`
  width: 490px;
  height: 203px;
  display: flex;
  overflow: hidden;
  position: relative;
  background-color: ${({bgColorAvatarMain})=>bgColorAvatarMain};
`

export const ImageAvatarMain = styled.img`
  top: 21px;
  left: 1px;
  width: 100px;
  height: 100px;
  position: relative;
  border-color: transparent;
  border-radius: 180px;
`

export const TextAvatarMain = styled.span<AvatarsProps>`
  color: ${({colorOneAvatarMain})=> colorOneAvatarMain};
  display: flex;
  margin-top:-80px;
  margin-left:120px;
  font-size: 24px;
  font-style: Bold;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
`

export const TextTwoAvatarMain = styled.span<AvatarsProps>`
  color: ${({colorTwoAvatarMain})=> colorTwoAvatarMain};
  font-size: 20px;
  font-style: Bold;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  margin-top:20px;
  margin-left:120px;
  // margin-left:-4px
  display: flex;
`

//---------EDIT Avatar component-----------------
export const ContainerEditA = styled.div`
  min-height: 100vh;
`

export const FrameEditA = styled.div<AvatarsProps>`
  width: 354px;
  height: 328px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  background-color: ${({bgColorEdit})=>bgColorEdit};
`

export const TextEditA = styled(Button)<AvatarsProps>`
  top: 286px;
  left: 153px;
  color: ${({colorOneEdit})=>colorOneEdit};
  width: 57px;
  height: auto;
  position: absolute;
  font-size: 20px;
  align-self: auto;
  font-style: Bold;
  text-align: left;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  line-height: 20px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
  font-weight: 800;
`

export const CustomerEditA = styled.div`
  top: 83px;
  left: 95px;
  width: 173px;
  height: 177px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
`
export const MaskEditA = styled.img<AvatarsProps>`
  top: 0px;
  left: 0px;
  width: 173px;
  height: 177px;
  position: absolute;
  border-color: ${({colorImgEdit})=>colorImgEdit};
`

export const MaskTwoEditA = styled.img<AvatarsProps>`
  top: 0px;
  left: 0px;
  width: 173px;
  height: 177px;
  position: absolute;
  border-color: ${({colorImgTwoEdit})=>colorImgTwoEdit};
`

export const FillEditA = styled.div`
  top: 0px;
  left: 0px;
  width: 173px;
  height: 177px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
`

export const ImageEditA = styled.img<AvatarsProps>`
  top: 0px;
  left: 0px;
  width: 173px;
  height: 177px;
  z-index: 100;
  position: absolute;
  box-shadow: 5px 5px 10px 0px ${({colorImgThreeEdit})=>colorImgThreeEdit};
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: var(--dl-radius-radius-radius4);
`

//-------Icon Avatar component----------
export const ContainerIconA = styled.div`
  min-height: 100vh;
`
export const DummyIconA = styled.div<AvatarsProps>`
  width:120px;
  height:120px;
`
export const ImageiconA = styled.img<AvatarsProps>`
  width: 120px;
  height: 120px;
  position: relative;
  border-color: transparent;
  border-radius: 180px;
`

//--------Information Avatar component---------------
export const ContainerInfoA = styled.div`
  min-height: 100vh;
`

export const FrameInfoA = styled.div<AvatarsProps>`
  width: 315px;
  height: 88px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  background-color: ${({bgColorInfo})=>bgColorInfo};
`

export const TextInfoA = styled.span<AvatarsProps>`
  top: 25px;
  left: 85px;
  color: ${({colorOneInfo})=>colorOneInfo};
  width: 192px;
  height: auto;
  position: absolute;
  font-size: 24px;
  align-self: auto;
  font-style: SemiBold;
  text-align: left;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  line-height: 20px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const TextTwoInfoA = styled.span<AvatarsProps>`
  top: 51px;
  left: 85px;
  color: ${({colorTwoInfo})=>colorTwoInfo};
  width: 173px;
  height: auto;
  position: absolute;
  font-size: 12px;
  align-self: auto;
  font-style: SemiBold;
  text-align: left;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  line-height: 20px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`

export const CustomerInfoA = styled.div`
  top: 17px;
  left: 18px;
  width: 59px;
  height: 54px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
`

export const ImgInfoA = styled.img<AvatarsProps>`
  top: 0px;
  left: 0px;
  width: 59px;
  height: 54px;
  position: absolute;
  border-color: ${({colorInfoOne})=>colorInfoOne};
`

export const ImgInfoTwoA = styled.img<AvatarsProps>`
  top: 0px;
  left: 0px;
  width: 59px;
  height: 54px;
  position: absolute;
  border-color: ${({colorInfoTwo})=>colorInfoTwo};
`