import React from "react";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, IconButton } from "@material-ui/core";
import { Filter, FilterButtons, FiltersContainer } from "./styles";

// Just as debug purpuses
const currencies = [
  {
    value: "GA",
    label: "Grupo automotriz",
  },
  {
    value: "f",
    label: "Agencia",
  },
  {
    value: "V",
    label: "Vendedor",
  },
  {
    value: "G",
    label: "Gerente",
  },

  {
    value: "Seleccionar fecha",
    label: "Fecha de modificacion",
  },

  {
    value: "E",
    label: "Esatus",
  },
];

const Filters = () => {

  const [selectedPlan, setSelectedPlan] = useState(currencies[0]);

  const handlePlanChange = (event:any, newValue:any) => {
    setSelectedPlan(newValue);
  };

  return (
    <FiltersContainer>
      <Filter>
        <Autocomplete
              id="Fist filter"
              options={currencies}
              getOptionLabel={(option) => option.label}
              defaultValue={currencies[0]}
              onChange={handlePlanChange}
              renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                sx={{ width: '198px' }}
              />
              )}
            />
      </Filter>

      <FilterButtons>
        <TextField helperText=" " id="Op 1" label="Numero de cuenta" />

        <TextField helperText=" " id="Op 2" label="Banco" />

        <TextField helperText=" " id="Op 3" label="Clave interbancaria" />

        <Autocomplete
              id="Op 4"
              options={currencies}
              getOptionLabel={(option) => option.label}
              defaultValue={currencies[4]}
              onChange={handlePlanChange}
              renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                sx={{ width: '198px' }}
              />
              )}
            />

        <Autocomplete
              id="Fist filter"
              options={currencies}
              getOptionLabel={(option) => option.label}
              defaultValue={currencies[5]}
              onChange={handlePlanChange}
              renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                sx={{ width: '198px' }}
              />
              )}
            />
      </FilterButtons>
    </FiltersContainer>
  );
};

export default Filters;
