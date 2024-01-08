// Importing components
import { BigInfo } from "components/BigInfo";
import { Card } from "components/Card";
import React, { useState, useEffect } from "react";
import { Container, InnerContainer, Row, linkStyle } from "./styles";
import { TextField } from "@material-ui/core";
import { Checkbox, Modal, Box, Typography } from "@mui/material";

// Import styles
import logo from "./../../assets/LogoColored.png";
// Importing services
import { login } from "services/login/login";
import { getUserData } from "services/User-ms/getUserData";
import { isEnabled } from "services";
import { getCredentials } from "services";
import { verify2FAcode } from "services";

// Importing react context
import { useAppContext } from "store/app-context/app-context";

// Import navigation
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { Button as MuiButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { IconButton } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import theme from "theme/theme";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Button } from "components/Button";

const Login = () => {
  let alertTimer: NodeJS.Timeout;
  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // HANDLE VARIABLES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(false);
  const [emailMsgError, setEmailMsgError] = useState(<></>);
  const [passwordMsgError, setPasswordMsgError] = useState(<></>);
  const [credsMsgError, setCredsMsgError] = useState(<></>);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isVerificationLoading, setIsVerificationLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = React.useState(true);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showAlert = (
    message: string,
    severity: AlertColor,
    duration: number = 2500
  ) => {
    clearTimeout(alertTimer); // clear existing timer
    setAlert({ open: true, message, severity });

    alertTimer = setTimeout(() => {
      setAlert((prevAlert) => ({ ...prevAlert, open: false }));
    }, duration);
  };

  useEffect(() => {
    return () => {
      clearTimeout(alertTimer);
    };
  }, []);

  function Alert(props: AlertProps) {
    return (
      <MuiAlert
        elevation={6}
        variant="filled"
        {...props}
        style={{ display: "flex", alignItems: "center" }}
      />
    );
  }

  const errorMsg = (errorMsg: string): JSX.Element => {
    return (
      <Box
        sx={{
          color: "#DF4F4A",
          fontSize: "0.8rem",
          fontWeight: "normal",
          marginBottom: "5px",
        }}
      >
        * {errorMsg}
      </Box>
    );
  };

  const centered = (child: JSX.Element) => {
    return (
      <Container>
        <InnerContainer>{child}</InnerContainer>
      </Container>
    );
  };

  const appContext = useAppContext();
  const navigate = useNavigate();

  const verifyUser = async () => {
    setLoading(true);
    try {
      const response = await getCredentials(email, password);

      if (response.status >= 200 && response.status < 300) {
        showAlert("Inicio de sesión exitoso", "success");
        const is2FAEnabled = await checkIf2FA();
        if (is2FAEnabled) {
          setIsModalOpen(true);
        } else {
          onSubmit();
        }
      } else {
        showAlert("Credenciales o contraseña incorrectas", "error");
      }
    } catch (error) {
      showAlert("Credenciales o contraseña incorrectas", "error");
    } finally {
      setLoading(false);
    }
  };

  const checkIf2FA = async () => {
    try {
      const response = await isEnabled(email);

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        return false;
      }
    } catch (error) {
      showAlert("Error al comprobar 2FA", "error");
      return false;
    }
  };

  const verifyCode = async () => {
    setIsVerificationLoading(true);
    try {
      const response = await verify2FAcode(email, code);

      if (response.status >= 200 && response.status < 300) {
        setIsModalOpen(false);
        setIsSuccess(true);
        setIsError(false);
        await onSubmit();
      } else {
        setIsError(true);
        setIsSuccess(false);
      }
    } catch (error) {
      setIsError(true);
      setIsSuccess(false);
    }
    setIsVerificationLoading(false);
  };

  const onSubmit = async () => {
    // REGEX for email
    setCredsMsgError(<></>);

    setLoading(true);

    const re = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");

    !re.exec(email)
      ? setEmailMsgError(
          errorMsg("El correo electrónico ingresado no es válido.")
        )
      : setEmailMsgError(<></>);
    password.length === 0
      ? setPasswordMsgError(errorMsg("Ingresa una contraseña."))
      : setPasswordMsgError(<></>);

    let error: boolean = !re.exec(email) || password.length === 0;

    if (error) return;

    // Call service login and saves to context
    let result = await login(email, password);

    if (typeof result === "boolean" && !result) {
      showAlert("Credenciales o contraseña incorrectas", "error");
      setLoading(false);
    } else if (typeof result === "object") {
      // Result was successful and the user is auth. Now running logic for sessions

      // If session is set to true then all the data to load up at any given point the user data has to be saved in the localStorage
      if (session) {
        // Set jwtToken for this app
        localStorage.setItem("jwtToken", result.jwtToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        localStorage.setItem("email", result.email);
      }

      // Setting the session storage data
      sessionStorage.setItem("jwtToken", result.jwtToken);
      sessionStorage.setItem("refreshToken", result.refreshToken);
      sessionStorage.setItem("email", result.email);

      // Save if the session has to persist or not
      localStorage.setItem("keepLogged", session.toString()); // will save whatever the session is

      // TODO: use jwtToken to get user data in backend
      const data = await getUserData(result.email);

      if (data !== null && typeof data === "object") {
        setLoading(false);

        // Get data from object and add it to appContext
        appContext.setUser(data);
        appContext.setLoggedIn(true);

        // Check if the user is an admin or a clientS
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
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      verifyUser();
    }
  };

  const content = (
    width: string,
    height: string,
    titleSize: number,
    textSize: number,
    buttonSize: string,
    tertiarySize: string
  ) => {
    return (
      <>
        <Card width={width} height={height} cursor="default">
          <Modal
            open={isModalOpen}
            onClose={() => setLoading(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: "10px",
                boxShadow: 24,
                p: 4,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "25%",
                height: "35%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: isSuccess
                  ? "4px solid green"
                  : isError
                  ? "4px solid red"
                  : "none",
              }}
            >
              <IconButton
                aria-label="close"
                style={{
                  position: "absolute",
                  top: "2%",
                  right: "3%",
                }}
                onClick={() => setIsModalOpen(false)}
              >
                <CloseIcon
                  sx={{
                    fontSize: "1rem",
                    color: "#000000",
                  }}
                />
              </IconButton>

              <Box>
                <PhoneIphoneIcon
                  sx={{
                    fontSize: "2.5rem",
                    color: "#000000",
                  }}
                />
              </Box>
              <Typography
                id="modal-modal-title"
                sx={{ fontWeight: "bold", fontSize: "1.2rem", mb: 4 }}
              >
                Introdce el codigo de verificación
              </Typography>

              <TextField
                required
                id="code"
                label="Código"
                variant="outlined"
                color="primary"
                fullWidth
                onChange={(event) => {
                  setCode(event.target.value);
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  verifyCode();
                }}
              >
                {isVerificationLoading ? (
                  <CircularProgress size={buttonSize} color="inherit" />
                ) : (
                  "Verificar"
                )}
              </Button>
            </Box>
          </Modal>

          {centered(
            <>
              <Row>
                <Box
                  sx={{
                    color: "text.primary",
                    fontSize: titleSize,
                    fontWeight: "bold",
                  }}
                >
                  Iniciar Sesión
                </Box>
                <Box
                  sx={{
                    fontSize: textSize,
                    fontWeight: "normal",
                  }}
                >
                  Ingrese sus datos para iniciar sesión.
                </Box>
              </Row>
              <Row>
                <TextField
                  required
                  id="email"
                  label="Correo electrónico"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailMsgError(<></>);
                  }}
                  onKeyDown={handleKeyDown} // Handle Enter key press
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
                  type={showPassword ? "password" : "text"}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  onKeyDown={handleKeyDown} // Handle Enter key press
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Row>

              <Row style={{ width: "70%" }}>
                <Collapse in={alert.open && alert.severity !== ""}>
                  {alert.severity !== "" && (
                    <Alert
                      severity={alert.severity as AlertColor}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
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
              </Row>

              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    fontSize: "0.8rem",
                    fontWeight: "normal",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  Recuérdame
                  <Checkbox
                    style={{ color: "#111D4E" }}
                    checked={session}
                    size="small"
                    onClick={() => setSession(!session)}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link to="/password-recover" style={linkStyle}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </Row>

              <Button
                variant="contained"
                onClick={() => {
                  const re = new RegExp(
                    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
                  );

                  if (!re.exec(email)) {
                    showAlert("Ingresa un correo válido", "error");
                    setLoading(false);
                    return;
                  }
                  if (password.length === 0) {
                    showAlert("Ingresa una contraseña", "error");
                    setLoading(false);
                    return;
                  }

                  verifyUser();
                }}
              >
                {""}
                {loading ? (
                  <CircularProgress size={buttonSize} />
                ) : (
                  "Iniciar Sesión"
                )}
                {""}
              </Button>
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
          height="calc(100vh - 200px)"
          image="https://cdn.discordapp.com/attachments/912434458479689788/1100612227888848906/image.png"
          imageAlign="center"
          imageHeight="100%"
          imagePosition="left"
          imageWidth="100%"
          padding="0px"
          children={centered(content("50vw", "70vh", 34, 18, "1rem", "10px"))}
        />
      )}
      {screenWidth <= 1200 && screenWidth > 768 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
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
              src="https://cdn.discordapp.com/attachments/912434458479689788/1100612227888848906/image.png"
              alt="login"
              style={{
                height: "80vh",
                width: "auto",
                objectFit: "cover",
                objectPosition: "right",
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
            {centered(content("55vw", "70vh", 34, 18, "1rem", "10px"))}
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
            height: "100%",
            mt: 2,
          }}
        >
          <img
            src={logo}
            alt="drive-ai logo"
            style={{ height: "10vh", width: "auto" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {centered(content("85vw", "60vh", 27, 17, "0.9rem", "14px"))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Login;
