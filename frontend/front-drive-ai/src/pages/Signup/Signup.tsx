import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";
import { Button as MuiButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode } from "services/Signup/SendVerificationCode";

import logo from "./../../assets/LogoColored.png";

import { BigInfo } from "components/BigInfo";
import { Card } from "components/Card";
import {
  Container,
  InnerContainer,
  Row,
  CustomButton,
  linkStyle,
} from "./styles";

import { Link } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // HANDLE VARIABLES
  const [email, setEmail] = useState("");
  const [emailMsgError, setEmailMsgError] = useState(<></>);
  const [checkMsgError, setCheckMsgError] = React.useState(<></>);
  const [loading, setLoading] = useState(false);

  // const handleKeyDown = (event: React.KeyboardEvent) => {
  // 	if (event.key === "Enter") {
  // 		onSubmit(email);
  // 	}
  // };

  // HANDLE ERROR MESSAGES
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showAlert = (message: string, severity: AlertColor) => {
    setAlert({ open: true, message, severity });
  };

  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setCheckboxColor("#000000");
    setCheckMsgError(<></>);
  };

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // HELPER STRUCTURES
  const centered = (child: JSX.Element) => {
    return (
      <Container>
        <InnerContainer>{child}</InnerContainer>
      </Container>
    );
  };

  const [checkboxColor, setCheckboxColor] = useState<string>("#000000");
  const privacyCheckBox = (fontSize: number, color: string = "#000000") => {
    const normalLabel = (
      <span>
        He leído y acepto los <a href={"/terms-and-conditions"}>Términos y Condiciones</a> y la{" "}
        <a href={"/privacy-policy"}>Política de Privacidad</a>
      </span>
    );

    const shortLabel = (
      <span>
        Acepto los <a href={"/"}>Términos</a> y <a href={"/"}>Política</a>
      </span>
    );

    return (
      <Box sx={{ fontSize: fontSize, color: color }}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          }
          label={screenWidth > 768 ? normalLabel : shortLabel}
        />
      </Box>
    );
  };

  // Content to be displayed at the side of the image
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
        <Card
          width={width}
          height={screenWidth > 768 ? height : "auto"}
          cursor="default"
        >
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
                  Registrate o inicia sesión
                </Box>
                <Box
                  sx={{
                    fontSize: textSize,
                    fontWeight: "normal",
                  }}
                >
                  Introduce to correo y recibirás un código de verificación.
                </Box>
              </Row>
              <Row>
                {emailMsgError}
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
                />
              </Row>
              <Row>
                {checkMsgError}
                {privacyCheckBox(textSize, checkboxColor)}
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
              </Row>

              <Row>
                <Box display="flex" justifyContent="center">
                  <MuiButton
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={async () => {
                      if (isChecked) {
                        let error: boolean = false;
                        setLoading(true);

                        const regex = new RegExp(
                          "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                        );
                        if (!regex.exec(email)) {
                          showAlert("Correo inválido", "error");
                          error = true;
                        }

                        if (!error) {
                          const response = await sendVerificationCode(email);
                          if (response.status >= 200 && response.status < 300) {
                            showAlert("Se ejecutó con exito", "success");
                            setTimeout(() => {
                              navigate("/registration-code", {
                                state: {
                                  email: email,
                                },
                              });
                            }, 3000);
                          } else {
                            showAlert("Ocurrió un error", "error");
                          }
                        }

                        setLoading(false);
                      } else {
                        showAlert(
                          "Debes aceptar los términos y condiciones",
                          "error"
                        );
                      }

                      setLoading(false);
                    }}
                  >
                    {loading ? (
                      <CircularProgress color="inherit" size={30} />
                    ) : (
                      "Registrarse"
                    )}
                  </MuiButton>
                </Box>
              </Row>
              <Box
                sx={{
                  fontSize: buttonSize,
                  fontWeight: "normal",
                }}
              >
                {" "}
                ó{" "}
              </Box>
              <CustomButton
                onClick={() => navigate("/login")}
                variant="contained"
              >
                Iniciar sesión
              </CustomButton>
            </>
          )}
        </Card>
        <div>
          <Box
            sx={{
              fontSize: tertiarySize,
              fontWeight: "normal",
              display: "inline",
              paddingRight: "10px",
            }}
          >
            ¿Eres un grupo automotriz?
          </Box>
          <Link to="/register-formulaire-group" style={linkStyle}>
            Haz click aquí.
          </Link>
        </div>
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
          children={centered(content("50vw", "70vh", 34, 18, "18px", "10px"))}
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
                height: "fit-content",
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
            {centered(content("55vw", "70vh", 34, 18, "18px", "10px"))}
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
          <img
            alt="some-alt"
            src={logo}
            style={{ height: "8vh", width: "auto" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {centered(content("90vw", "70vh", 20, 16, "10px", "10px"))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Signup;
