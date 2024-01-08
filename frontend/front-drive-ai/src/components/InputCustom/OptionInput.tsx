import React from "react";
import { ExampleMuiProp } from "./types";
import { TextField } from "@mui/material";


const InputField: React.FC<ExampleMuiProp> = ({ 
  InputType,
 }) => {

  const InputSurname = (
    <TextField
      id="outlined-basic"
      label="Apellido"
      variant="outlined"
      sx={{ width: "400px", height: "40px" }}
    />
  );
  
  const InputName = (
    <TextField
      id="outlined-basic"
      label="*Nombre"
      variant="outlined"
      sx={{ width: "400px", height: "40px" }}
    />
  );

  const InputPasswordRepeat = (
    <TextField id="outlined-basic" label="Contraseña anterior" variant="outlined" sx={{
        width: "800px",
        height: "40px"
    }}> </TextField>
  );

  const InputDataSheet = (
    <TextField
          id="outlined-multiline-static"
          label="Ficha Técnica"
          multiline
          rows={4}
          style={{ width: '80%' }}
        />
  );
  
let type;
if (InputType === "Surname") {
  type = InputSurname;
} else if (InputType === "Name") {
  type = InputName;
} else if (InputType === "PasswordRepeat"){
  type = InputPasswordRepeat;
} else if (InputType === "DataSheet"){
  type = InputDataSheet;
} 

return (<div>{type}</div>);
};
export default InputField;

