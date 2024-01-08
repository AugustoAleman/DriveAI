import React from "react";
import { ComparisonColProps } from "./types";
import { Card } from "components/Card";
import  theme  from "theme/theme";
import { Button } from "components/Button";
import { 
    HeaderInfo, 
    ImageContainer, 
    InfoContainer, 
    CarPrice, 
    InfoRow,  
    ColumnContainer } from "./styles";


/**
 *  
 */
const ComparisonColumn: React.FC<ComparisonColProps> = ({
    path, 
    name, 
    dealership, 
    price, 
    model, 
    transmissionType, 
    paymentPlan, 
    testDriveAvailable, 
    fuelType, 
    deliveryTime,
    onButtonClick = () => {},
}) => {
    return (
        <>
            <ColumnContainer>
                <Card color = {theme.palette.tertiary.main} height = "250px" width = "250px" shadow = "false" hasHoverColor = {false} cursor = "default" borderRadius="XSmall">
                    <ImageContainer src = {path}/>
                    <HeaderInfo>
                        {name}
                    </HeaderInfo>
                    <HeaderInfo>
                        {dealership}
                    </HeaderInfo>
                    <CarPrice>
                        ${price}
                    </CarPrice>

                </Card>
                <Card height="275px" width="250px" hasHoverColor = {false} cursor = "default" borderRadius="XSmall">
                    
                    <InfoContainer>
                        <InfoRow>{model}</InfoRow>
                        <hr/>
                        <InfoRow>{transmissionType}</InfoRow>
                        <hr/>
                        <InfoRow>{paymentPlan}</InfoRow>
                        <hr/>
                        <InfoRow>{testDriveAvailable}</InfoRow>
                        <hr/>
                        <InfoRow>{fuelType}</InfoRow>
                        <hr/>
                        <InfoRow>{deliveryTime}</InfoRow>
                    </InfoContainer>
                
                </Card>
                <Button height = "40px" width="10rem" onClick={onButtonClick}>Ver Auto</Button>

            </ColumnContainer>
            
        </>
    );
}

export default ComparisonColumn;