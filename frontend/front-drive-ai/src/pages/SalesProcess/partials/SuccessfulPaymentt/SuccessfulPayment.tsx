import React from "react";
import { Card } from "components/Card";
import { Button } from "components/Button";
import { BoxCardSuccess, CheckIcon, TittleSucces, TextSucces, TextTwoSucces, BoxButton } from "./styles";
import { ButtonSuccesProps } from "./types";


/**
 *  
 */
const SuccesfulPayment: React.FC<ButtonSuccesProps> = ({
    onButtonClick = () => {},
    
}) => {
    return (
        <>
      <BoxCardSuccess style={{ marginLeft: 200 }}>
        <CheckIcon style={{ fontSize: 100 }} />
                <TittleSucces>El pago ha sido exitoso</TittleSucces>
                <TextSucces>Gracias por usar Drive AI</TextSucces>
               
                <BoxButton>
                    <Button height = "50px" width="12vw" onClick={onButtonClick}>Ver mis ordenes</Button>
                </BoxButton>
        </BoxCardSuccess>    
        </>
    );
}

export default SuccesfulPayment;