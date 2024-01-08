import React from "react";
import { SecondCardContent, SuscriptionContainer, Description, Price } from "./style";
import { SecondPlanProps } from "./types";
import { Card } from "components/Card";
import Button from '@mui/material/Button';

const SecondPlan: React.FC<SecondPlanProps> = ({ highlighted, setSelectedPlan, hasChanged, price })=> {

    const changeHandler = () => {
        setSelectedPlan("Plus");
        hasChanged(true);
    };

    return (
        <Card
            margin="0px 14px 0px 0px"
            borderRadius="Medium"
            color={highlighted ? "#111D4E" : "#FFFFFF"}
            height="444px"
            width="278px"
            children={
                <SecondCardContent style={{color: highlighted ? 'white' : 'black'}}>
                    <h2> Plus </h2>
                    <Description> Lleva tus ventas al siguiente nivel con el plan plus de Drive AI </Description>
                    <SuscriptionContainer>
                        <Price style={{color: highlighted ? 'white' : 'black'}}> ${ price.subscriptionPricePlus} </Price>
                        <h4> Al mes </h4>
                    </SuscriptionContainer>
                    <Button
                        style={{
                            color: "white",
                            fontSize: "0.7rem",
                            width: "240px",
                            borderRadius: "14px",
                            backgroundColor: highlighted ? "#DE4D5A" : "#4251f5",
                        }}
                        onClick={changeHandler}
                        variant="contained"
                        >
                        Seleccionar
                    </Button>
                    <p> Incluye: </p>
                    <ul>
                        <li>Visibilidad expandida</li>
                        <li>Anuncios frecuentes</li>
                        <li>45 asientos</li>
                    </ul> 
                </SecondCardContent>
            }
        />
    );
}

export default SecondPlan;