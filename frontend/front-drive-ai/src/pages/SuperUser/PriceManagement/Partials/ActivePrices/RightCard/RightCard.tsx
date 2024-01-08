import React, { useState } from "react";
import {
  BigCard,
  CardContent,
  TextFieldContainer,
  ButtonContainer,
  SelectContainer,
  PropertiesContainer,
  SecondButtonContainer,
  Title,
  Grey,
  TextFieldItem1,
  TextFieldItem2,
  TextFieldItem3,
  PropertiesItem,
} from "./style";
import { Card } from "components/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "components/Button";
import { RightCardProps } from "./types";
import {
  putUpdateCarComission,
  putUpdateRegisterComission,
  putUpdateSaleComission,
  putUpdatePlanFree,
  putUpdatePlanPlus,
  putUpdatePlanPro,
  putUpdatePlanEnterprise,
} from "services";

const plans = [
  { value: 1, label: "Plan Gratis" },
  { value: 2, label: "Plan Plus" },
  { value: 3, label: "Plan Pro" },
  { value: 4, label: "Plan Enterpise" },
];

const RightCard: React.FC<RightCardProps> = ({ activeCardIndex, change }) => {
  const [newCarComissionPrice, setNewCarComissionPrice] = useState(0);
  const [newRegisterComissionPrice, setNewRegisterComissionPrice] = useState(0);
  const [newSalesComissionPrice, setnewSalesComissionPrice] = useState(0);

  const handlePriceChange = (event: any) => {
    const newPrice = event.target.value;
    setNewCarComissionPrice(newPrice);
  };

  const handleApplyChanges = async () => {
    // Crear el objeto de body con el nuevo precio
    const body = newCarComissionPrice;

    try {
      // Llamar a la función de servicio para actualizar la comisión
      const response = await putUpdateCarComission(body);
      change(prev => !prev);

      // Aquí puedes manejar la respuesta de la solicitud HTTP
      // por ejemplo, mostrar un mensaje de éxito o error

      console.log(response); // Mostrar la respuesta en la consola
    } catch (error) {
      console.error(error); // Manejar el error de la solicitud HTTP
    }
  };

  const handlePriceChangeRegisterComission = (event: any) => {
    const newPrice = event.target.value;
    setNewRegisterComissionPrice(newPrice);
  };

  const handleApplyChangesRegisterComission = async () => {
    // Crear el objeto de body con el nuevo precio
    const body = newRegisterComissionPrice;

    try {
      // Llamar a la función de servicio para actualizar la comisión
      const response = await putUpdateRegisterComission(body);

      // Aquí puedes manejar la respuesta de la solicitud HTTP
      // por ejemplo, mostrar un mensaje de éxito o error
      change(prev => !prev);
      console.log(response); // Mostrar la respuesta en la consola
    } catch (error) {
      console.error(error); // Manejar el error de la solicitud HTTP
    }
  };

  const handlePriceChangeSalesComission = (event: any) => {
    const newPrice = event.target.value;
    setnewSalesComissionPrice(newPrice);
  };

  const handleApplyChangesSalesComission = async () => {
    // Crear el objeto de body con el nuevo precio
    const body = newSalesComissionPrice;

    try {
      // Llamar a la función de servicio para actualizar la comisión
      const response = await putUpdateSaleComission(body);

      // Aquí puedes manejar la respuesta de la solicitud HTTP
      // por ejemplo, mostrar un mensaje de éxito o error
      change(prev => !prev);
      console.log(response); // Mostrar la respuesta en la consola
    } catch (error) {
      console.error(error); // Manejar el error de la solicitud HTTP
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [newPrice, setNewPrice] = useState(0);

  const handlePlanChange = (event: any, newValue: any) => {
    setSelectedPlan(newValue);
  };

  const handlePricePlanChange = (event: any) => {
    const newPrice = event.target.value;
    setNewPrice(newPrice);
  };

  const handleApplyPalnChanges = async () => {
    let updateFunction;

    switch (selectedPlan.value) {
      case 1:
        updateFunction = putUpdatePlanFree;
        break;
      case 2:
        updateFunction = putUpdatePlanPlus;
        break;
      case 3:
        updateFunction = putUpdatePlanPro;
        break;
      case 4:
        updateFunction = putUpdatePlanEnterprise;
        break;
      default:
        return;
    }

    try {
      const response = await updateFunction(newPrice);
      console.log(response);
      change(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const RightCardsList = [
    <Card
      borderRadius="None"
      color="#FFFFFF"
      height="666px"
      width="700px"
      children={
        <CardContent>
          <Title> Editar datos de cobro </Title>
          <Grey> Comisión por auto en plataforma </Grey>
          <Grey> Nuevo monto </Grey>
          <TextFieldContainer>
            <TextFieldItem1> $ </TextFieldItem1>
            <TextField
              id="price"
              variant="outlined"
              sx={{ marginRight: "17px" }}
              value={newCarComissionPrice}
              onChange={handlePriceChange}
            />
            <TextFieldItem3> MXN </TextFieldItem3>
          </TextFieldContainer>
          <Grey>
            {" "}
            Tus clientes pagaran esta cantidad al dar de alta un aúutomovil en
            su catalogo{" "}
          </Grey>

          <ButtonContainer>
            <Button
              onClick={handleApplyChanges}
              width="114px"
              height="54px"
              fontSize="13px"
            >
              Aplicar changes
            </Button>
          </ButtonContainer>
        </CardContent>
      }
    />,

    <Card
      borderRadius="None"
      color="#FFFFFF"
      height="666px"
      width="700px"
      children={
        <CardContent>
          <Title> Editar planes de suscripción</Title>
          <SelectContainer>
            <TextFieldItem2> Suscripcion: </TextFieldItem2>
            <Autocomplete
              id="Fist filter"
              options={plans}
              getOptionLabel={(option) => option.label}
              defaultValue={plans[0]}
              value={selectedPlan}
              onChange={handlePlanChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  color="primary"
                  sx={{ width: "202px" }}
                  size="medium"
                />
              )}
            />
          </SelectContainer>
          <Grey> Nuevo monto </Grey>
          <TextFieldContainer>
            <TextFieldItem1> $ </TextFieldItem1>
            <TextField
              id="price"
              variant="outlined"
              sx={{ marginRight: "17px" }}
              value={newPrice}
              onChange={handlePricePlanChange}
            />
            <TextFieldItem3> MXN </TextFieldItem3>
          </TextFieldContainer>
          <Grey>
            {" "}
            Este sera el nuevo precio para el plan de suscripcion seleccionado{" "}
          </Grey>
          <SecondButtonContainer>
            <Button
              onClick={handleApplyPalnChanges}
              width="114px"
              height="54px"
              fontSize="13px"
            >
              Aplicar changes
            </Button>
          </SecondButtonContainer>
        </CardContent>
      }
    />,

    <Card
      borderRadius="None"
      color="#FFFFFF"
      height="666px"
      width="700px"
      children={
        <CardContent>
          <Title> Comisión por registro de agencia </Title>
          <Grey> Comisión por agencia en plataforma </Grey>
          <Grey> Nuevo monto </Grey>
          <TextFieldContainer>
            <TextFieldItem1> $ </TextFieldItem1>
            <TextField
              id="price"
              variant="outlined"
              sx={{ marginRight: "17px" }}
              value={newRegisterComissionPrice}
              onChange={handlePriceChangeRegisterComission}
            />
            <TextFieldItem3> MXN </TextFieldItem3>
          </TextFieldContainer>
          <Grey>
            {" "}
            Tus clientes pagaran esta cantidad al dar de alta una agencia en la
            plataforma{" "}
          </Grey>

          <ButtonContainer>
            <Button
              onClick={handleApplyChangesRegisterComission}
              width="114px"
              height="54px"
              fontSize="13px"
            >
              Aplicar changes
            </Button>
          </ButtonContainer>
        </CardContent>
      }
    />,

    <Card
      borderRadius="None"
      color="#FFFFFF"
      height="666px"
      width="700px"
      children={
        <CardContent>
          <Title> Comisión por venta </Title>
          <Grey> Comisión por venta en plataforma </Grey>
          <Grey> Nuevo monto </Grey>
          <TextFieldContainer>
            <TextFieldItem1> $ </TextFieldItem1>
            <TextField
              id="price"
              variant="outlined"
              sx={{ marginRight: "17px" }}
              value={newSalesComissionPrice}
              onChange={handlePriceChangeSalesComission}
            />
            <TextFieldItem3> MXN </TextFieldItem3>
          </TextFieldContainer>
          <Grey>
            {" "}
            Tus clientes pagaran esta cantidad al vender un aúutomovil en la
            plataforma{" "}
          </Grey>

          <ButtonContainer>
            <Button
              onClick={handleApplyChangesSalesComission}
              width="114px"
              height="54px"
              fontSize="13px"
            >
              Aplicar changes
            </Button>
          </ButtonContainer>
        </CardContent>
      }
    />,
  ];
  return <BigCard>{RightCardsList[activeCardIndex]}</BigCard>;
};

export default RightCard;
