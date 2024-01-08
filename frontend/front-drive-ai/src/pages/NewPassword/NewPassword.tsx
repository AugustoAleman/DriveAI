import { BigInfo } from "components/BigInfo";
import { Card } from "components/Card";
import React, { useState, useEffect } from 'react';
import { Container, InnerContainer, Row } from "./styles";
import { Box, TextField } from "@material-ui/core";
import { Button } from "components/Button";
import logo from "./../../assets/LogoColored.png";
import { LOGIC } from "./constants";
import { useParams, useNavigate } from "react-router-dom";
import {resetPassword} from "../../services";
import {Alert} from "@mui/material";

const NewPassword = () => {

  const navigate = useNavigate();
  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // HANDLE VARIABLES
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailMsgError, setEmailMsgError] = useState(<></>);
  const [passwordMsgError, setPasswordMsgError] = useState(<></>);
  const [credsMsgError, setCredsMsgError] = useState(<></>);

  const { token = '' } = useParams();

  // HELPER STRUCTURES
  const centered = (child:JSX.Element) => {
    return (
      <Container><InnerContainer>{child}</InnerContainer></Container>
    );
  };

  const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  const content = (width:string, height:string, titleSize:number, textSize:number, buttonSize:string, tertiarySize:string) => {

    return <>
      <Card width={width} height={height} cursor="default">
        {centered(
          <>
            { isPasswordChanged ? (
                <Row>
                  <Box sx={{ color: 'text.primary', fontSize: titleSize, fontWeight: 'bold' }}>Contraseña actualizada</Box>
                  <Box sx={{ fontSize: textSize, fontWeight: 'normal', paddingBottom: "20px"}}>Tu nueva contraseña está activa, puedes volver a iniciar sesión</Box>

                  <Alert severity="success" variant= "filled" sx={{ width: '100%', marginBottom: '30px'}}>
                    Contraseña actualizada con éxito
                  </Alert>

                    <Button fontSize={buttonSize} onClick={() => {
                        navigate('/login');
                    }
                    }>Iniciar sesión</Button>
                </Row>
            ):(
                <>
                  <Row>
                    <Box sx={{ color: 'text.primary', fontSize: titleSize, fontWeight: 'bold' }}>Recuperacion de contraseña</Box>
                    <Box sx={{ fontSize: textSize, fontWeight: 'normal' }}>Todo listo, ingrese su nueva contraseña</Box>
                  </Row>
                  <Row>
                    {passwordMsgError}
                    <TextField required id="password"  label="Nueva Contraseña" variant="outlined" color="primary" fullWidth type="password" onChange={(event) => {
                      setNewPassword(event.target.value)
                      setPasswordMsgError(<></>)
                    }}/>
                  </Row>
                  <Row>
                    {passwordMsgError}
                    <TextField required id="password"  label="Confirmar Nueva Contraseña" variant="outlined" color="primary" fullWidth type="password" onChange={(event) => {
                      setConfirmNewPassword(event.target.value)
                      setPasswordMsgError(<></>)
                    }}/>
                  </Row>
                  <Row>
                    {credsMsgError}
                  </Row>
                  <Button fontSize={buttonSize} onClick={async () => {
                    setLoading(true);
                    setCredsMsgError(<></>);

                    let error:boolean = false;

                    const regex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                    if (!regex.test(newPassword) && !regex.test(confirmNewPassword)) {
                      error = true;
                      setPasswordMsgError(<Box sx={{ color: 'red', fontSize: '0.8rem', fontWeight: 'normal', paddingBottom: '20px'}}>La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero</Box>)
                    }

                    if (newPassword !== confirmNewPassword) {
                      error = true;
                      setCredsMsgError(
                          <Alert variant="outlined" severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                            Las contraseñas no coinciden
                          </Alert>
                      )
                    }

                    if (!error) {
                      const response = await resetPassword(token, newPassword);

                      if(response.status >= 200 && response.status < 300) {
                        setIsPasswordChanged(true);
                      } else {
                        setCredsMsgError(
                            <Alert variant="outlined" severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                              Ocurrió un error
                            </Alert>
                        )
                      }
                    }
                    setLoading(false);
                  }}>{loading ? 'Cargando...' : 'Confirmar cambio'}</Button>
                  <Button backgroundColor="#FFFFFF" color="#000" fontSize={tertiarySize} onClick={() => LOGIC.FORGOT_PASSWORD('/new-password')} width="auto">
                    Volver a enviar correo
                  </Button>
                </>
            )
            }
          </>
        )}
      </Card>
    </>
  }


  return <>
    {
      screenWidth > 1200 && (
      <BigInfo
      backgroundColor="#ffffff"
      height="calc(100vh - 200px)"
      image="https://cdn.discordapp.com/attachments/912434458479689788/1100612227888848906/image.png"
      imageAlign="center"
      imageHeight="100%"
      imagePosition="left"
      imageWidth="100%"
      padding="0px"
      children={centered(content('50vw', '70vh', 34, 18, '1rem', '10px'))}
      />
    )}
    {screenWidth <= 1200 && screenWidth > 768 && (
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', overflow:'hidden' }}>
        <img src="https://cdn.discordapp.com/attachments/912434458479689788/1100612227888848906/image.png" style={{ height:'80vh', width:'auto', objectFit:'cover', objectPosition:'right' }}/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '60%' }}>
        {centered(content('55vw', '70vh', 34, 18, '1rem', '10px'))}
        </Box>
      </Box>
    )}
    {screenWidth <= 768 && (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', mt:2 }}>
      <img src={logo} style={{ height:'10vh', width:'auto' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {centered(content('85vw', '60vh', 27, 17, '0.9rem', '14px'))}
      </Box>
    </Box>
    )}
  </>
};

export default NewPassword;
