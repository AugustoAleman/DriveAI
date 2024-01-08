import { BigInfo } from "components/BigInfo";
import { Card } from "components/Card";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { Container, InnerContainer, Row } from "./styles";
import { Box, TextField } from "@material-ui/core";
import logo from "./../../assets/LogoColored.png";
import { requestNewPassword } from "../../services";
import { AlertProps } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Collapse } from "@mui/material";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "components/Button";

import { useNavigate } from "react-router-dom";

const PasswordRecover = () => {
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
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailMsgError, setEmailMsgError] = useState(<></>);
  const [credsMsgError, setCredsMsgError] = useState(null);
  const [credsMsgOpen, setCredsMsgOpen] = useState(false);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (
    event: React.SyntheticEvent<any> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setCredsMsgOpen(false);
  };

  // HELPER STRUCTURES
  const centered = (child: JSX.Element) => {
    return (
      <Container>
        <InnerContainer>{child}</InnerContainer>
      </Container>
    );
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
          {centered(
            <>
              {isEmailSent ? (
                <Row>
                  <Box
                    sx={{
                      color: "text.primary",
                      fontSize: titleSize,
                      fontWeight: "bold",
                    }}
                  >
                    Correo Enviado
                  </Box>
                  <Box
                    sx={{
                      fontSize: textSize,
                      fontWeight: "normal",
                      paddingBottom: "20px",
                    }}
                  >
                    Se ha enviado un correo para reestablecer tu contraseña. Por
                    favor revisa tu bandeja de entrada.
                  </Box>

                  <Alert
                    severity={isEmailSent ? "success" : "info"}
                    sx={{ width: "100%" }}
                  >
                    {isEmailSent ? "Correo enviado con éxito" : ""}
                  </Alert>
                </Row>
              ) : (
                <>
                  <Row>
                    <Box
                      sx={{
                        color: "text.primary",
                        fontSize: titleSize,
                        fontWeight: "bold",
                      }}
                    >
                      Recupera tu contraseña
                    </Box>
                    <Box sx={{ fontSize: textSize, fontWeight: "normal" }}>
                      Ingrese el correo asociado a su cuenta
                    </Box>
                    <Box sx={{ fontSize: textSize, fontWeight: "normal" }}>
                      Se enviará una liga que te permitirá realizar el cambio de
                      contraseña.
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
                    {credsMsgError && (
                      <Collapse in={credsMsgOpen}>
                        <Alert
                          variant="outlined"
                          severity="error"
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={handleClose}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ width: "100%" }}
                        >
                          {credsMsgError}
                        </Alert>
                      </Collapse>
                    )}
                  </Row>
                  <Button
                    fontSize={buttonSize}
                    onClick={async () => {
                      //setCredsMsgError(<></>)
                      let error: boolean = false;
                      setLoading(true);

                      const regex = new RegExp(
                        "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                      );
                      if (!regex.exec(email)) {
                        setEmailMsgError(
                          <Box
                            sx={{
                              color: "red",
                              fontSize: "0.7rem",
                              fontWeight: "normal",
                              paddingBottom: "10px",
                            }}
                          >
                            Correo inválido
                          </Box>
                        );
                        error = true;
                      }

                      if (!error) {
                        const response = await requestNewPassword(email);
                        if (response.status >= 200 && response.status < 300) {
                          setIsEmailSent(true);
                        } else {
                          setCredsMsgOpen(true);
                          setCredsMsgError(response.data.message);
                        }
                      }

                      setLoading(false);
                    }}
                  >
                    {" "}
                    {loading ? "Cargando..." : "Mandar correo"}{" "}
                  </Button>

                  <Button
                    backgroundColor="#FFFFFF"
                    color="#000"
                    fontSize={tertiarySize}
                    onClick={() => navigate(-1)}
                    width="auto"
                  >
                    Regresar a inicio de sesion.
                  </Button>
                </>
              )}
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
          <img src={logo} style={{ height: "10vh", width: "auto" }} />
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

export default PasswordRecover;
