
import styled from "styled-components";
import { OptionProp, AttributeProps } from "./types";

export const FrameContainer = styled.div`
  min-height: 100vh;
`
export const FrameFrame = styled.div<AttributeProps>`
  width: 866px;
  height: 390px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  border-color: transparent;
  background-color: ${({colorbg}) => colorbg};
`

export const FrameRectangle = styled.img`
  top: 0px;
  left: 0px;
  width: 871px;
  height: 390px;
  position: absolute;
`

export const FrameGroup = styled.div`
  top: 302.6865234375px;
  left: 36.001953125px;
  width: 108.0040054321289px;
  height: 52.388057708740234px;
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

export const FrameText = styled.span<AttributeProps>`
  color: ${({colorname}) => colorname};
  width: 108px;
  height: auto;
  position: absolute;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  align-self: auto;
  font-style: Bold;
  text-align: center;
  font-weight: 700;
  line-height: 20px;
  font-stretch: normal;
  text-decoration: none;
`

export const FrameTextTwo = styled.span<AttributeProps>`
  top: 29.104394912719727px;
  left: 0.00000599118084210204px;
  color: ${({colorposition})=> colorposition};
  width: 34px;
  height: auto;
  position: absolute;
  font-size: 14px;
  align-self: auto;
  font-style: Medium;
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  line-height: 20px;
  font-stretch: normal;
  text-decoration: none;
`

export const FrameElipse = styled.img`
  top: 34.9254150390625px;
  left: 36.001953125px;
  width: 93px;
  height: 93px;
  position: absolute;
  border-color: transparent;
`

export const FrameTextFour = styled.span<AttributeProps>`
  top: 174.626953125px;
  left: 36.001953125px;
  color: ${({colorbody})=> colorbody};
  width: 801px;
  height: auto;
  position: absolute;
  font-size: 16px;
  align-self: auto;
  font-style: Medium;
  text-align: left;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  line-height: 26px;
  font-stretch: normal;
  margin-right: 0;
  margin-bottom: 0;
  text-decoration: none;
`