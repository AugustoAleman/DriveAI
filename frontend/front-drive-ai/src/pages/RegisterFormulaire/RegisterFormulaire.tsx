import { BigInfo } from "components/BigInfo";
import React, { useEffect, useState } from "react";
import { Container, InnerContainer, Row, useStyles } from "./styles";
import { Box, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import logo from "./../../assets/LogoColored.png";
import MuiAlert from "@mui/material/Alert";
import { Card } from "components/Card";
import theme from "theme/theme";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser } from "services/Signup/CreateUser";
import { Collapse } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import { IconButton, CircularProgress } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { login } from "services/login/login";
import { getUserData } from "services/User-ms/getUserData";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Importing react context
import { useAppContext } from "store/app-context/app-context";

const RegisterFormulaire = () => {
  // HANDLE RESIZING
  const location = useLocation();
  const navigate = useNavigate();
  const appContext = useAppContext();
  const email = location.state ? location.state.email : "{...}";
  console.log("Current email: " + email);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Page states
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [dateOfBirth, setDateOfBirth] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] =
    React.useState<string>("");
  const regex = /^[0-9]{10}$/;

  const [dateOfBirthMsgError, setDateOfBirthMsgError] =
    React.useState<React.ReactNode>(<></>);

  const [showNewPassword, setShowNewPassword] = React.useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(true);

  const [passwordR1Color, setPasswordR1Color] = React.useState<string>("#000000");
  const [passwordR2Color, setPasswordR2Color] = React.useState<string>("#000000");
  const [passwordR3Color, setPasswordR3Color] = React.useState<string>("#000000");
  const [passwordR4Color, setPasswordR4Color] = React.useState<string>("#000000");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [isUserCreated, setIsUserCreated] = React.useState(false);

  const showAlert = (message: string, severity: string) => {
    setAlert({ open: true, message, severity });
  };

  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const centered = (child: JSX.Element) => {
    return (
      <Container>
        <InnerContainer>{child}</InnerContainer>
      </Container>
    );
  };

  // Content to be displayed at the side of the image
  const content = (
    width: string,
    height: string,
    titleSize: number,
    textSize: number,
    tertiarySize: string
  ) => {
    return (
      <>
        <Card width={width} height={height} cursor="default">
          {isUserCreated
            ? centered(
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Typography variant="h6">Signing in...</Typography>
                <CircularProgress />
              </Box>
            )
            : centered(
              <>
                <Row>
                  <Box
                    sx={{
                      color: "text.primary",
                      fontSize: titleSize,
                      fontWeight: "bold",
                    }}
                  >
                    Empecemos
                  </Box>
                  <Box sx={{ fontSize: textSize, fontWeight: "normal" }}>
                    Ingrese sus datos en la siguiente forma.
                  </Box>
                </Row>
                <Row>
                  <TextField
                    required
                    id="name"
                    label="Nombre"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    value={name}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        document.getElementById("surname")?.focus();
                      }
                    }}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <TextField
                    required
                    id="surname"
                    label="Apellido"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    value={surname}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        document.getElementById("phone")?.focus();
                      }
                    }}
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <TextField
                    required
                    id="phone"
                    label="Telefono"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type="text"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    value={phone}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        document.getElementById("date-of-birth")?.focus();
                      }
                    }}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  {dateOfBirthMsgError}
                  <TextField
                    required
                    id="date-of-birth"
                    label="Fecha de nacimiento"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type="date"
                    value={dateOfBirth}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        document.getElementById("password")?.focus();
                      }
                    }}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                      setDateOfBirthMsgError(<></>);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Row>
                <Row>
                  <TextField
                    required
                    id="password"
                    label="Contraseña"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type={showNewPassword ? "password" : "text"}
                    value={password}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        document.getElementById("password-confirmation")?.focus();
                      }
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);

                      if (e.target.value.length === 0) {
                        setPasswordR1Color("#000000");
                        setPasswordR2Color("#000000");
                        setPasswordR3Color("#000000");
                        setPasswordR4Color("#000000");
                      } else {
                        e.target.value.length >= 8
                          ? setPasswordR1Color(theme.status.correct)
                          : setPasswordR1Color(theme.status.wrong);
                        // Match if there is at least one number
                        e.target.value.match(/[0-9]/)
                          ? setPasswordR2Color(theme.status.correct)
                          : setPasswordR2Color(theme.status.wrong);
                        // Match if there is at least one special character (no blank space, no letter, no number)
                        e.target.value.match(/[^A-Za-z0-9\s]/)
                          ? setPasswordR3Color(theme.status.correct)
                          : setPasswordR3Color(theme.status.wrong);
                        // Match if there is at least one upper case letter
                        e.target.value.match(/[A-Z]/)
                          ? setPasswordR4Color(theme.status.correct)
                          : setPasswordR4Color(theme.status.wrong);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowNewPassword(!showNewPassword)
                            }
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Row>
                <Row>
                  <TextField
                    required
                    id="password-confirmation"
                    label="Confirmar contraseña"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type={showConfirmNewPassword ? "password" : "text"}
                    value={passwordConfirmation}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        document.getElementById("submit")?.click();
                      }
                    }}
                    onChange={(e) => {
                      setPasswordConfirmation(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmNewPassword(!showConfirmNewPassword)
                            }
                          >
                            {showConfirmNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Row>

                <Box sx={{ display: 'column' }} >
                  <Box
                    sx={{
                      color: "black",
                      fontSize: '15px',
                      fontWeight: "normal",
                      mb: 0.5,
                    }}
                  >
                    La contraseña debe:
                  </Box>
                  <Box
                    sx={{
                      color: passwordR4Color,
                      fontSize: '15px',
                      fontWeight: "normal",
                    }}
                  >
                    - Contener al menos un caracter mayúscula
                  </Box>
                  <Box
                    sx={{
                      color: passwordR1Color,
                      fontSize: '15px',
                      fontWeight: "normal",
                    }}
                  >
                    - Tener al menos 8 caracters
                  </Box>
                  <Box
                    sx={{
                      color: passwordR2Color,
                      fontSize: '15px',
                      fontWeight: "normal",
                    }}
                  >
                    - Contener al menos un número
                  </Box>
                  <Box
                    sx={{
                      color: passwordR3Color,
                      fontSize: '15px',
                      fontWeight: "normal",
                    }}
                  >
                    - Contener al menos un caracter
                    especial
                  </Box>
                </Box>

                <Box>
                  <Collapse in={alert.open && alert.severity !== ""}>
                    {alert.severity !== "" && (
                      <Alert
                        severity={alert.severity as AlertColor}
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => setAlert({ ...alert, open: false })}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                      >
                        {alert.message}
                      </Alert>
                    )}
                  </Collapse>
                </Box>

                <Row>
                  <Button
                    id="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={async () => {
                      var date = new Date(dateOfBirth);
                      var today = new Date();
                      var age = today.getFullYear() - date.getFullYear();
                      var error = false;
                      if (name === "") {
                        showAlert("El nombre es requerido", "error");
                        return;
                      }
                      if (surname === "") {
                        showAlert("El apellido es requerido", "error");
                        return;
                      }
                      if (phone === "") {
                        showAlert("El telefono es requerido", "error");
                        return;
                      }
                      if (!regex.test(phone)) {
                        showAlert("El telefono debe tener 10 digitos", "error");
                        return;
                      }
                      if (dateOfBirth === "") {
                        showAlert("La fecha de nacimiento es requerida", "error");
                        return;
                      }
                      if (age < 18) {
                        showAlert("Debes ser mayor de edad", "error");
                        return;
                      }
                      if (password !== passwordConfirmation) {
                        showAlert("Las contraseñas no coinciden", "error");
                        return;
                      }
                      error =
                        name === "" ||
                        surname === "" ||
                        phone === "" ||
                        dateOfBirth === "" ||
                        !regex.test(phone) ||
                        age < 18 ||
                        passwordR1Color === theme.status.wrong ||
                        passwordR2Color === theme.status.wrong ||
                        passwordR3Color === theme.status.wrong ||
                        passwordR4Color === theme.status.wrong ||
                        password !== passwordConfirmation;
                      if (!error) {
                        setLoading(true);
                        try {
                          const response = await createUser(
                            "CLIENT",
                            name,
                            surname,
                            email,
                            phone,
                            phone,
                            dateOfBirth,
                            password
                          );

                          if (
                            response.status >= 200 &&
                            response.status < 300
                          ) {
                            showAlert(
                              "Usuario creado correctamente",
                              "success"
                            );

                            setIsUserCreated(true);

                            // sign in process
                            let result = await login(email, password);


                            if (typeof result === "object") {
                              // TODO: use jwtToken to get user data in backend

                              const data = await getUserData(result.email);

                              console.log("GetUserData")
                              console.log(data);

                              if (data !== null && typeof data === "object") {
                                // Get data from object and add it to appContext
                                const jwtToken =
                                  localStorage.getItem("jwtToken");
                                const refreshToken =
                                  localStorage.getItem("refreshToken");

                                appContext.setUser(data);
                                appContext.setLoggedIn(true);

                                if (jwtToken !== null) {
                                  appContext.setJwtToken(jwtToken);
                                }

                                if (refreshToken !== null) {
                                  appContext.setRefreshToken(refreshToken);
                                }

                                // Check if the user is an admin or a client
                                if (data.userType === "SUPERADMIN") {
                                  navigate("/super-admin");
                                  return;
                                } else if (data.userType === "AGA") {
                                  navigate("/automotive-group-admin");
                                  return;
                                } else if (data.userType === "MANAGER") {
                                  navigate("/manager");
                                  return;
                                } else if (data.userType === "SALESMAN") {
                                  navigate("/salesman");
                                  return;
                                }

                                navigate("/");
                                return null;
                              }
                            } else {
                              showAlert("Ocurrió un error", "error");
                              console.log(response.data.message);
                            }
                          } else {
                            showAlert("Error inesperado", "error");
                            console.log(response.data.message);
                          }
                        } catch (error) {
                          showAlert("Error inesperado", "error");
                        }
                      }

                      setLoading(false);
                    }}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      "Continuar"
                    )}
                  </Button>
                </Row>
              </>
            )}
        </Card>
      </>
    );
  };

  return (
    <>
      {screenWidth > 1200 && (
        <BigInfo
          backgroundColor="#ffffff"
          height="fit-content"
          image="https://media.discordapp.net/attachments/912434458479689788/1101924235951218708/image.png"
          imageAlign="center"
          imageHeight="100%"
          imagePosition="left"
          imageWidth="100%"
          padding="0px"
          children={centered(
            content("50vw", "fit-content", 34, 18, "15px")
          )}
        />
      )}
      {screenWidth <= 1200 && screenWidth > 768 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "fit-content",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              overflow: "hidden",
            }}
          >
            <img
              src="https://media.discordapp.net/attachments/912434458479689788/1101924235951218708/image.png"
              style={{
                height: "80vh",
                width: "auto",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
            }}
          >
            {centered(content("55vw", "fit-content", 34, 18, "15px"))}
          </Box>
        </Box>
      )}
      {screenWidth <= 768 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "fit-content",
            mt: 2,
          }}
        >
          <img src={logo} style={{ height: "8vh", width: "auto" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {centered(content("90vw", "fit-content", 24, 14, "13px"))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RegisterFormulaire;
