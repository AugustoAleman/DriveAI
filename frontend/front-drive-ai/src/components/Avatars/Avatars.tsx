import React from 'react'
import theme from 'theme/theme'
import {
  ContainerAvatarMain, 
  ImageAvatarMain,
  TextAvatarMain,
  TextTwoAvatarMain,
  ContainerEditA,
  FrameEditA,
  TextEditA,
  CustomerEditA,
  MaskEditA,
  ContainerIconA,
  DummyIconA,
  ImageiconA,
  ContainerInfoA,
  CustomerInfoA,
  TextInfoA,
  TextTwoInfoA,
  ImgInfoA,
  ImgInfoTwoA,
  FrameInfoA, 
} from './styles'

import { OptionsAvatarsProps } from './types'
import ImgAvatarMain from './assets/image82132-kyb-200h.png'
import ImgAvatarIcon from './assets/image92133-9u5d-200h.png'
import ImgAvatarInfoOne from './assets/mask2145-21vc-200h.png'
import ImgAvatarInfoTwo from './assets/mask2146-h9h7-200h.png'

const Avatars: React.FC<OptionsAvatarsProps> = ({
    bgColorAvatarMain="#ffffff",
    colorOneAvatarMain="#000000",
    colorTwoAvatarMain="#78787b",
    textOneAvatarMain,
    textTwoAvatarMain,
    textEdit,
    bgColorEdit="#ffffff",
    colorOneEdit="#1a69e0",
    colorImgEdit="#969696",
    bgColorInfo="#ffffff",
    colorOneInfo="#0000ff",
    textOneInfo,
    textTwoInfo,
    colorTwoInfo="#0000ff",
    colorInfoOne="#969696",
    colorInfoTwo="#969696",
    typeOfAvatars,
    imageCar
 }) => {
    //----------MAIN COMPONENT OF THE AVATAR---------
    if(typeOfAvatars === 'main')
    {
        return(
            <ContainerAvatarMain>
                    <ImageAvatarMain src={imageCar}></ImageAvatarMain>
                    <TextAvatarMain colorOneAvatarMain={colorOneAvatarMain}>{textOneAvatarMain}</TextAvatarMain>
                    <TextTwoAvatarMain colorTwoAvatarMain={colorTwoAvatarMain}>{textTwoAvatarMain}</TextTwoAvatarMain>
            </ContainerAvatarMain>
        );
    }
    //----------EDIT COMPONENT OF THE AVATAR---------
    else if(typeOfAvatars === 'edit')
    {
        return(
            <ContainerEditA>
                <FrameEditA bgColorEdit={bgColorEdit}>
                    <TextEditA colorOneEdit={colorOneEdit}>{textEdit}</TextEditA>
                    <CustomerEditA>
                        <MaskEditA src={ImgAvatarInfoOne} colorImgEdit={colorImgEdit}></MaskEditA>
                    </CustomerEditA>
                </FrameEditA>
            </ContainerEditA>
        );
    }
    //----------ICON COMPONENT OF THE AVATAR---------
    else if(typeOfAvatars === 'icon')
    {
        return(
            <ContainerIconA>
                <DummyIconA >
                    <ImageiconA src={ImgAvatarIcon}></ImageiconA>
                </DummyIconA>
            </ContainerIconA>
        );
    }
    else
    {
        //----------INFORMATION COMPONENT OF THE AVATAR---------
        return(
            <ContainerInfoA>
                <FrameInfoA bgColorInfo={bgColorInfo}>
                    <TextInfoA colorOneInfo={colorOneInfo}>{textOneInfo}</TextInfoA>
                    <TextTwoInfoA colorTwoInfo={colorTwoInfo}>{textTwoInfo}</TextTwoInfoA>
                    <CustomerInfoA>
                        <ImgInfoA colorInfoOne={colorInfoOne} src={ImgAvatarInfoOne}></ImgInfoA>
                        <ImgInfoTwoA colorInfoTwo={colorInfoTwo} src={ImgAvatarInfoTwo}></ImgInfoTwoA>
                    </CustomerInfoA>
                </FrameInfoA>
            </ContainerInfoA>
        );

    }
 };

export default Avatars