import React, { useEffect } from 'react'
import { ContainerPrice } from '../GeneralInfo/styles';
import { CurrentPrice } from '../CurrentPrice';
import { 
    TitleSubs,
    ContainerPlans,
    BoxFree,
    BoxStandard,
    BoxPlus,
    ButtonPlans,
    Items,
    ContainerItem,
    HeadingPlans,
    TextPlans, 
 } from './styles';
 import { useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Subscription = () => {
    const isSmallScreen = useMediaQuery('(max-width:769px)');

  return (
    isSmallScreen? 
    <>
    <TitleSubs>
            Elige tu Plan de Suscripción
        </TitleSubs>
        <ContainerPrice>
            {/* <CurrentPrice/> */}
        </ContainerPrice>
        <ContainerPlans>
            <BoxFree>
                <HeadingPlans>Gratis</HeadingPlans>
                <TextPlans>Lorem Ipsum Generator</TextPlans>
                <ButtonPlans variant='contained' sx={{bgcolor:"background.primary", color:"primary"}}>
                    Suscribirme
                </ButtonPlans>
                <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
                <ContainerItem>
                <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
                <ContainerItem>
                <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
            </BoxFree>
            <BoxStandard>
            <HeadingPlans>Standar</HeadingPlans>
                <TextPlans>Lorem Ipsum Generator</TextPlans>
                <ButtonPlans variant='text' sx={{bgcolor:"background.default", color:"primary"}}>
                    Suscribirme
                </ButtonPlans>
                <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
                <ContainerItem>
                <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
                <ContainerItem>
                <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
            </BoxStandard>
            <BoxPlus>
            <HeadingPlans>Plus</HeadingPlans>
                <TextPlans>Lorem Ipsum Generator</TextPlans>
                <ButtonPlans variant='contained' sx={{bgcolor:"background.primary", color:"primary"}}>
                    Suscribirme
                </ButtonPlans>
                <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
                <ContainerItem>
                <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
                <ContainerItem>
                <Items sx={{height:"50px"}}></Items>
                    <p>Solo</p>
                </ContainerItem>
            </BoxPlus>
        </ContainerPlans>
    </>
    :
    <>
            <ContainerPrice>
          {/* <CurrentPrice/> */}
        </ContainerPrice>
        <TitleSubs>
                Elige tu Plan de Suscripción
        </TitleSubs>
        <ContainerPlans>
                <BoxFree>
                    <HeadingPlans>Gratis</HeadingPlans>
                    <TextPlans>Lorem Ipsum Generator</TextPlans>
                    <ButtonPlans variant='contained' sx={{bgcolor:"background.primary", color:"primary"}}>
                        Suscribirme
                    </ButtonPlans>
                    <ContainerItem>
                        <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                    <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                    <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                </BoxFree>
                <BoxStandard>
                    <HeadingPlans>Standar</HeadingPlans>
                    <TextPlans>Lorem Ipsum Generator</TextPlans>
                    <ButtonPlans variant='text' sx={{bgcolor:"background.default", color:"primary"}}>
                        Suscribirme
                    </ButtonPlans>
                    <ContainerItem>
                        <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                    <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                    <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                </BoxStandard>
                <BoxPlus>
                    <HeadingPlans>Plus</HeadingPlans>
                    <TextPlans>Lorem Ipsum Generator</TextPlans>
                    <ButtonPlans variant='contained' sx={{bgcolor:"background.primary", color:"primary"}}>
                        Suscribirme
                    </ButtonPlans>
                    <ContainerItem>
                        <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                    <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                    <ContainerItem>
                    <Items sx={{height:"50px"}}></Items>
                        <p>Solo</p>
                    </ContainerItem>
                </BoxPlus>
            </ContainerPlans>
    </>
  )
}

export default Subscription