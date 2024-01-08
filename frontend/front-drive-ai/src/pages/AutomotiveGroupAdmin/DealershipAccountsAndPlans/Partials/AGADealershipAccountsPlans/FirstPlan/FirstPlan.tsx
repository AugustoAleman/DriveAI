import React from "react";
import { Card } from "components/Card";
import { FirstCardContent, Description } from "./styles";
import { FirstPlanProps } from "./types";
import Button from '@mui/material/Button';

const FirstPlan: React.FC<FirstPlanProps> = ({ highlighted, setSelectedPlan, hasChanged }) => {

    const changeHandler = () => {
        setSelectedPlan("Free");
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
                <FirstCardContent style={{color: highlighted ? 'white' : 'black'}}>
                    <h2> Gratis </h2>
                    <Description> Perfecto para grupos pequeños iniciando en la industria </Description>
                    <h1 style={{color: highlighted ? 'white' : 'black'}}> Gratis </h1>
                    <Button
                        style={{
                            color: 'white',
                            fontSize: '0.7rem',
                            width: '240px',
                            borderRadius: '14px',
                            backgroundColor: highlighted ? '#DE4D5A' : '#4251f5'
                        }}
                        onClick={changeHandler}
                        variant="contained"
                        >
                        Seleccionar
                    </Button>
                    <p> Incluye: </p>
                    <ul>
                        <li>Asientos limitados</li>
                        <li>Personalizacion limitada</li>
                        <li>Visibilidad estandar</li>
                    </ul> 
                </FirstCardContent>
            }
        />
    );
}

export default FirstPlan;