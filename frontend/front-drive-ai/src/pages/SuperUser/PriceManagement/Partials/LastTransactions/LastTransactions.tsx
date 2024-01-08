import React from "react";
import { useState } from "react";
import { PageBody, IntialText, ActionsContainer } from "./styles";
import { LastTransactionsTable } from "../LastTransactionsTable";
//import { Button } from "components/Button";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

const plans = [
    {
      value: 1,
      label: 'Mas acciones',
    },
    {
      value: 2,
      label: 'Descargar',
    },
    {
      value: 3,
      label: 'Enviar por correo',
    },
    {
      value: 4,
      label: 'Captura de pantalla',
    },

  ];

const LastTransactions = () => {

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  const handlePlanChange = (event:any, newValue:any) => {
    setSelectedPlan(newValue);
  };

    return(
        <PageBody>
            <IntialText>
                <p> Ultimas Transacciones </p>
            </IntialText>
            <LastTransactionsTable/>
            <ActionsContainer>
            <Button
              variant="text"
              color="inherit"
              startIcon={<LocalPrintshopOutlinedIcon></LocalPrintshopOutlinedIcon>}
            >
                Imprimir
            </Button>
            <Autocomplete
              id="Fist filter"
              options={plans}
              getOptionLabel={(option) => option.label}
              defaultValue={plans[0]}
              onChange={handlePlanChange}
              renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                sx={{ width: '185px' }}
              />
              )}
            />
            </ActionsContainer>
        </PageBody>
    )
  }
  
  export default LastTransactions;