import React from "react";
import { Card } from "components/Card";
import Button from '@mui/material/Button';
import { ThirdCardContent, SuscriptionContainer, Description, Price } from "./style";
import { ThirdPlanProps } from "./types";

const ThirdPlan: React.FC<ThirdPlanProps> = ({ highlighted, setSelectedPlan, hasChanged, price })=> {

    const changeHandler = () => {
        setSelectedPlan("Pro");
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
                <ThirdCardContent style={{color: highlighted ? 'white' : 'black'}}>
                    <h2> Pro </h2>
                    <Description> Ten control total de tu grupo y llevalos hasta la cima </Description>
                    <SuscriptionContainer>
                        <Price style={{color: highlighted ? 'white' : 'black'}}> ${price.subscriptionPricePro} </Price>
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
                        <li>Asientos ilimitados</li>
                        <li>Visibilidad maxima</li>
                        <li>Servicio tecnico entre semana</li>
                    </ul> 
                </ThirdCardContent>
            }
        />
    );
}

export default ThirdPlan;