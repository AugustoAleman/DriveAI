import { FieldContainer, PageBackground, Title } from "./styles";
import { Button } from "@material-ui/core";
import { Card } from "components/Card";
import { useAppContext } from "store/app-context/app-context";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import { putUserData } from "services/User-ms/putUserData";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import { Autocomplete, TextField } from "@mui/material";
import { Grid, Box } from "@material-ui/core";
import { Collapse } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

import { sendVerificationCodeToChange } from "services/ChangeEmail/SendVerificationCodeToChange";
import { changeEmail } from "services/ChangeEmail/ChangeEmail";
import { verifyCode } from "services/Signup/VerifyCode";

const states = [
  "",
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Ciudad de México",
  "Estado de México",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

const AdminConfigurationPage = () => {
  const appContext = useAppContext();

  // Use state for name, surname, cellphone, email, address, city, state, postal, telephone
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [cellphone, setCellphone] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  let [city, setCity] = useState("");
  let [postal, setPostal] = useState("");
  let [telephone, setTelephone] = useState("");
  const [state, setState] = useState<string>(states[0]);
  const [latitud, setLatitud] = useState<String>("");
  const [longitud, setLongitud] = useState<String>("");

  const [open, setOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeDisabled, setIsVerificationCodeDisabled] =
    useState(true);

  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const options = {
      componentRestrictions: { country: "mx" },
      fields: ["address_components", "geometry", "icon", "name"],
    };

    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );

      autoCompleteRef.current.addListener("place_changed", () => {
        const selectedPlace = autoCompleteRef.current?.getPlace();

        if (selectedPlace) {
          const addressComponents = selectedPlace.address_components;
          const street = addressComponents?.find((component) =>
            component.types.includes("route")
          )?.long_name;
          const number = addressComponents?.find((component) =>
            component.types.includes("street_number")
          )?.long_name;
          const city = addressComponents?.find((component) =>
            component.types.includes("locality")
          )?.long_name;
          const postalCode = addressComponents?.find((component) =>
            component.types.includes("postal_code")
          )?.long_name;
          const state = addressComponents?.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name;

          // coordenadas
          const geometry = selectedPlace.geometry;
          const lat = geometry?.location?.lat();
          const lng = geometry?.location?.lng();

          setLatitud(lat?.toString() || "");
          setLongitud(lng?.toString() || "");

          const address = `${street || ""} ${number || ""}`;

          setAddress(address.trim());
          setCity(city || "");
          setPostal(postalCode || "");
          setState(state || "");
        }
      });
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      updateUser();
    }
  };

  const showAlert = (message: string, severity: AlertColor) => {
    setAlert({ open: true, severity, message });
  };

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const updateUser = () => {
    // Create user object with the new setValuesInput
    const user = {
      name,
      surname,
      cellphone,
      email,
      address,
      city,
      state,
      postal,
      telephone,
    };

    console.log(user);

    putUserData(appContext.user?.email, user);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const setValuesInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    switch (
      field // Set name
    ) {
      case "name":
        name = e.target.value;
        setName(name);
        break;

      case "surname":
        surname = e.target.value;
        setSurname(surname);
        break;

      case "cellphone":
        cellphone = e.target.value;
        setCellphone(cellphone);
        break;

      case "email":
        email = e.target.value;
        setEmail(email);
        break;

      case "address":
        address = e.target.value;
        setAddress(address);
        break;

      case "city":
        city = e.target.value;
        setCity(city);
        break;

      case "postal":
        postal = e.target.value;
        setPostal(postal);
        break;

      case "telephone":
        telephone = e.target.value;
        setTelephone(telephone);
        break;
    }
  };

  return (
    <>
      <PageBackground>
        <Card
          width="90%"
          height="auto"
          margin="1.2rem"
          padding="0 2rem 1rem 0"
          borderRadius="None"
          cursor="default"
        >
          <Title>Configuración de perfil</Title>
          <FieldContainer>
            <TextField
              id="name"
              label="Nombre"
              size="small"
              margin="normal"
              style={{ width: "20rem" }}
              placeholder={appContext.user?.name}
              onChange={(e: any) => setValuesInput(e, "name")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />

            <TextField
              id="surname"
              label="Apellido"
              size="small"
              style={{ width: "20rem" }}
              margin="normal"
              placeholder={appContext.user?.surname}
              onChange={(e: any) => setValuesInput(e, "surname")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />

            <TextField
              id="cellphone"
              label="Celular"
              size="small"
              style={{ width: "20rem" }}
              margin="normal"
              placeholder={appContext.user?.cellphone}
              onChange={(e: any) => setValuesInput(e, "cellphone")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />

            <Button
              style={{
                height: "2rem",
                marginTop: "0.5rem",
                width: "10.8rem",
              }}
              size="small"
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Cambiar correo
            </Button>
          </FieldContainer>
          <Box
            sx={{
              marginLeft: "2rem",
            }}
          >
            <Button variant="contained" color="primary" onClick={updateUser}>
              Cambiar
            </Button>
          </Box>
        </Card>

        <Card
          width="90%"
          height="auto"
          margin="1.2rem"
          padding="0 0 1rem 0"
          borderRadius="None"
          cursor="default"
        >
          <Title>Configuración de direcciones</Title>
          <FieldContainer>
            <TextField
              inputRef={inputRef}
              id="address"
              label="Dirección"
              size="small"
              margin="normal"
              style={{ width: "30rem" }}
              value={address}
              placeholder={appContext.user?.address}
              onChange={(e: any) => setValuesInput(e, "address")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />
          </FieldContainer>
          <FieldContainer>
            <TextField
              id="city"
              label="Ciudad"
              size="small"
              margin="normal"
              style={{ width: "30rem" }}
              value={city}
              placeholder={appContext.user?.city}
              onChange={(e: any) => setValuesInput(e, "city")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />
          </FieldContainer>

          <FieldContainer>
            <TextField
              id="postal"
              label="Código postal"
              size="small"
              margin="normal"
              placeholder={appContext.user?.postal}
              value={postal}
              onChange={(e: any) => setValuesInput(e, "postal")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />
            <TextField
              id="telephone"
              label="Teléfono"
              size="small"
              margin="normal"
              placeholder={appContext.user?.telephone}
              onChange={(e: any) => setValuesInput(e, "telephone")}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onKeyDown={handleKeyDown} // Handle Enter key press
            />
            <Autocomplete
              id="states"
              disableClearable
              sx={{
                width: 250,
                padding: 0,
                margin: 0,
                "& .MuiIconButton-root": {
                  padding: 0,
                },
              }}
              size="small"
              value={state}
              onChange={(event, newValue) => {
                setState(newValue);
              }}
              options={states}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Estado"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder={appContext.user?.state}
                  margin="normal"
                  size="small"
                  onKeyDown={handleKeyDown} // Handle Enter key press
                />
              )}
            />
          </FieldContainer>

          <Box
            sx={{
              marginLeft: "2rem",
            }}
          >
            <Button variant="contained" color="primary" onClick={updateUser}>
              Cambiar
            </Button>
          </Box>
        </Card>
      </PageBackground>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          <Grid container alignItems="center">
            <Grid item xs={true}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>Cambiar Correo</Grid>
                <Grid item>
                  <Collapse in={alert.open && alert.severity !== ""}>
                    {alert.severity !== "" && (
                      <Alert
                        severity="success"
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() =>
                              setAlert({
                                ...alert,
                                open: false,
                              })
                            }
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {alert.message}
                      </Alert>
                    )}
                  </Collapse>
                </Grid>
              </Grid>
            </Grid>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} direction="column">
            <Grid
              container
              item
              spacing={1}
              direction="row"
              alignItems="flex-end"
            >
              <Grid item xs={8}>
                <TextField
                  type="email"
                  label="Nuevo Correo"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ width: "120px" }}
                  onClick={async () => {
                    setSendLoading(true);
                    const response = await sendVerificationCodeToChange(
                      newEmail
                    );

                    if (response.status >= 200 && response.status < 300) {
                      showAlert(
                        "Se ha enviado el código de verificación",
                        "success"
                      );
                      setIsVerificationCodeDisabled(false);
                    } else {
                      showAlert(response.data.message, "error");
                    }

                    setSendLoading(false);
                  }}
                >
                  {""}
                  {sendLoading ? <CircularProgress size={24} /> : "Enviar"}
                  {""}
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={1}
              direction="row"
              alignItems="flex-end"
            >
              <Grid item xs={8}>
                <TextField
                  type="text"
                  label="Codigo de Verificacion"
                  disabled={isVerificationCodeDisabled}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <Button
                  style={{ width: "120px" }}
                  variant="contained"
                  onClick={async () => {
                    setVerifyLoading(true);
                    const response = await verifyCode(
                      newEmail,
                      verificationCode
                    );

                    if (response.status >= 200 && response.status < 300) {
                      showAlert("Código verificado", "success");
                      setIsVerified(true);
                    } else {
                      showAlert(response.data.message, "error");
                      setIsVerified(false);
                    }

                    setVerifyLoading(false);
                  }}
                >
                  {""}
                  {verifyLoading ? <CircularProgress size={24} /> : "Verificar"}
                  {""}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginTop: "20px" }}>
          <Grid container style={{ marginLeft: "20px", paddingBottom: "20px" }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ maxWidth: "90%" }}
                disabled={!isVerified}
                onClick={async () => {
                  setChangeLoading(true);
                  const userEmmail = appContext.user?.email || "";
                  const response = await changeEmail(userEmmail, newEmail);

                  if (response.status >= 200 && response.status < 300) {
                    showAlert("Correo cambiado", "success");
                  } else {
                    showAlert(response.data.message, "error");
                  }

                  setChangeLoading(false);

                  setTimeout(() => {
                    window.location.href = "/login";
                  }, 2000);
                }}
              >
                {""}
                {changeLoading ? <CircularProgress size={24} /> : "Cambiar"}
                {""}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminConfigurationPage;
