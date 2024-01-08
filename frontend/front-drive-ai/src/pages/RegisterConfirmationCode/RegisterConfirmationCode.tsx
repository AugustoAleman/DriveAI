import { BigInfo } from "components/BigInfo";
import React, { useEffect, useState } from "react";
import { Container, InnerContainer } from "./styles";
import { Box } from "@material-ui/core";
import { Button } from "components/Button";
import { LOGIC } from "./constants";
import { InputCode } from "components/InputCode";
import logo from "./../../assets/LogoColored.png";
import { useLocation, useNavigate} from "react-router-dom";

const RegisterConfirmationCode = () => {
  const location = useLocation();
  const email = location.state ? location.state.email : "{...}";

  const navigate = useNavigate();

  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // HANDLE VARIABLES
  const [codeAvailable, setCodeAvailable] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);

  // Countdown Effect
  React.useEffect(() => {
    if (countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setCodeAvailable(true);
    }
  }, [countdown, setCodeAvailable]);

  // Message to resend code
  const resendCodeMessage = (textSize: number, buttonSize: string) => {
    if (codeAvailable === true) {
      return (
        <div>
          <Box
            sx={{ fontSize: textSize, fontWeight: "normal", display: "inline" }}
          >
            ¿No has recibido el código?
          </Box>
          <Button
            backgroundColor="#FFFFFF"
            color="#00F"
            fontSize={buttonSize}
            onClick={() => {
              LOGIC.RESEND_CODE();
              setCodeAvailable(false);
              setCountdown(15);
            }}
          >
            Reenviar código
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Box
            sx={{ fontSize: textSize, fontWeight: "normal", display: "inline" }}
          >
            Se ha enviado el código, espera {countdown} segundos para
            reenviarlo.
          </Box>
        </div>
      );
    }
  };

  const centered = (child: JSX.Element) => {
    return (
      <Container>
        <InnerContainer>{child}</InnerContainer>
      </Container>
    );
  };

  // Content to be displayed at the side of the image
  const content = (textSize: number, buttonSize: string) => {
    return (
      <>
        <InputCode
          email={email || ""}
          OnButtonClick={(verificationResult: string): boolean => {
            if (verificationResult === "verified") {
                setTimeout(() => {
                    navigate("/register-formulaire", {state: {email: email}});
                  }, 3000);
              return true;
            } else {
              return false;
            }
          }}
        />

        {resendCodeMessage(textSize, buttonSize)}
      </>
    );
  };

  return (
    <>
      {screenWidth > 1200 && (
        <BigInfo
          backgroundColor="#ffffff"
          height="calc(100vh - 200px)"
          image="https://media.discordapp.net/attachments/912434458479689788/1101924235951218708/image.png"
          imageAlign="center"
          imageHeight="100%"
          imagePosition="left"
          imageWidth="100%"
          padding="0px"
          children={centered(content(18, "18px"))}
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
            {centered(content(18, "18px"))}
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
          <img src={logo} style={{ height: "8vh", width: "auto" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {centered(content(10, "10px"))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default RegisterConfirmationCode;
