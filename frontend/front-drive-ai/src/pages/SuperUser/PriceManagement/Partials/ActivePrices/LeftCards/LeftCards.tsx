import React from "react";
import { CardContainer, CardContent, CardContentLeft, CardContentRight, Price } from "./style";
import { Card } from "components/Card";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LeftCardsProps } from "./types";

const LeftCards: React.FC<LeftCardsProps> = ({ onButtonClick, prices }) => {

    const getAverage=() => {
        const average = (prices.subscriptionPriceEnterprise + prices.subscriptionPriceFree + 
            prices.subscriptionPricePlus + prices.subscriptionPricePro) / 4;
        
            return average;
    }

    return(
        <CardContainer>
            <Card
                borderRadius="None"
                color="#FFFFFF"
                height="144px"
                padding="0px"
                shadow="20px 20px 60px 0px rgba(0, 0, 0, 0.25)"
                width="383px"
                margin="14px"
                children={
                    <CardContent>
                        <CardContentLeft>
                            <p> Comisión por alta de auto en plataforma </p>
                            <Price> $ {prices.carCommission} </Price>
                        </CardContentLeft>
                        <CardContentRight>
                            <Button
                                color="inherit"
                                onClick={() => onButtonClick(0)}
                                startIcon={<ArrowForwardIosIcon sx={{height: '48px', width: '48px'}}></ArrowForwardIosIcon>}
                            >
                            </Button>
                        </CardContentRight>
                    </CardContent>
                }
            />

            <Card
                borderRadius="None"
                color="#FFFFFF"
                height="144px"
                padding="0px"
                shadow="20px 20px 60px 0px rgba(0, 0, 0, 0.25)"
                width="383px"
                margin="14px"
                children={
                    <CardContent>
                        <CardContentLeft>
                            <p> Precio de subscripciónes </p>
                            <Price> $ {getAverage()} </Price>
                        </CardContentLeft>
                        <CardContentRight>
                            <Button
                                color="inherit"
                                onClick={() => onButtonClick(1)}
                                startIcon={<ArrowForwardIosIcon sx={{height: '48px', width: '48px'}}></ArrowForwardIosIcon>}
                            >
                            </Button>
                        </CardContentRight>
                    </CardContent>
                }
            />

            <Card
                borderRadius="None"
                color="#FFFFFF"
                height="144px"
                padding="0px"
                shadow="20px 20px 60px 0px rgba(0, 0, 0, 0.25)"
                width="383px"
                margin="14px"
                children={
                    <CardContent>
                        <CardContentLeft>
                            <p> Comisión por registro de agencia </p>
                            <Price> $ {prices.registerCommission} </Price>
                        </CardContentLeft>
                        <CardContentRight>
                            <Button
                                color="inherit"
                                onClick={() => onButtonClick(2)}
                                startIcon={<ArrowForwardIosIcon sx={{height: '48px', width: '48px'}}></ArrowForwardIosIcon>}
                            >
                            </Button>
                        </CardContentRight>
                    </CardContent>
                }
            />

            <Card
                borderRadius="None"
                color="#FFFFFF"
                height="144px"
                padding="0px"
                shadow="20px 20px 60px 0px rgba(0, 0, 0, 0.25)"
                width="383px"
                margin="14px"
                children={
                    <CardContent>
                        <CardContentLeft>
                            <p> Comisión por venta </p>
                            <Price> $ {prices.saleCommission} </Price>
                        </CardContentLeft>
                        <CardContentRight>
                            <Button
                                color="inherit"
                                onClick={() => onButtonClick(3)}
                                startIcon={<ArrowForwardIosIcon sx={{height: '48px', width: '48px'}}></ArrowForwardIosIcon>}
                            >
                            </Button>
                        </CardContentRight>
                    </CardContent>
                }
            />
        </CardContainer>
    )
  }
  
  export default LeftCards;