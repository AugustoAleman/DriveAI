import React from "react";
import { Card } from "components/Card";
import Button from '@mui/material/Button';
import { FouthCardContent, Description, SuscriptionContainer, Price, Mounthly } from "./styles";
import { FourthPlanProps } from "./types";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const FourthPlan: React.FC<FourthPlanProps> = ({ highlighted, setSelectedPlan, hasChanged, price })=> {

    const changeHandler = () => {
        setSelectedPlan("Enterprise");
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
                <FouthCardContent style={{color: highlighted ? 'white' : 'black'}}>
                    <h2 style={{color: highlighted ? 'white' : 'black'}}> Enterprise </h2>
                    <Description> Arrasa con la competencia con nuestro plan Enterprise
                        a la medida </Description>
                    <SuscriptionContainer>
                        <Price style={{color: highlighted ? 'white' : 'black'}}> ${ price.subscriptionPriceEnterprise} </Price>
                        <Mounthly> Al mes </Mounthly>
                        <AutoAwesomeIcon style={{color: highlighted ? 'white' : 'black', height:'38px', width: '38px'}}></AutoAwesomeIcon>
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
                        <li>Visibilidad total</li>
                        <li>Servico tecnico ilimitado</li>
                        <li>Personalizacion de anuncios</li>
                    </ul> 
                </FouthCardContent>
            }
        />
    );
}

export default FourthPlan;