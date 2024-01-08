import React, { useState, useEffect } from 'react';
import {useAppContext} from "../../../../store/app-context/app-context";
import {Alert, Box, Button, Grid, IconButton, Input, Modal} from "@mui/material";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import {TextField} from "@material-ui/core";
import { verify2FAcode} from "../../../../services";
import { activate2FA} from "../../../../services";
import Snackbar from '@mui/material/Snackbar';
import { StyledButton, ImageContainer} from "./styles";


interface TwoFAmodalProps {
    open: boolean;
    handleClose: () => void;
    image: string;
    handleConfirm: () => void;
}

type SnackbarPosition = {
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' | 'right';
};

type SnackbarState = SnackbarPosition & {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning" | undefined;
};

const TwoFAmodal: React.FC<TwoFAmodalProps> = props => {
    const { open = false, handleClose, image} = props;
    const { user: loggedUser } = useAppContext();
    const [code, setCode] = useState("")
    const [codeVerification, setCodeVerification] = useState(false)
    const [activateLoading, setActivateLoading] = useState(false)

    const [snackbarState, setSnackbarState] = useState<SnackbarState>({
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
        message: "",
        severity: "success"
    });

    const handleSnackbarClose = () => {
        setSnackbarState(oldState => ({...oldState, open: false }));
    }


    const handleVerify = async () => {
        setActivateLoading(true)
        if(loggedUser){
            try {
                const response = await verify2FAcode(loggedUser.email, code);
                if(response.status >= 200 && response.status < 300){
                    setCodeVerification(true)
                    setSnackbarState(oldState => ({...oldState, open: true, message: "Código verificado correctamente", severity: "success" }));

                    const activateResponse = await activate2FA((loggedUser?.id).toString());

                    if(activateResponse.status >= 200 && activateResponse.status < 300){
                        setSnackbarState(oldState => ({...oldState, open: true, message: "2FA activado correctamente", severity: "success" }));
                        setTimeout(() => {
                            handleClose()
                        }, 2000);
                    }else{
                        setSnackbarState(oldState => ({...oldState, open: true, message: "No se pudo activar el 2FA", severity: "error" }));
                    }

                }else{
                    setSnackbarState(oldState => ({...oldState, open: true, message: "No se pudo validar el código", severity: "error" }));
                }
            } catch (e) {
                setSnackbarState(oldState => ({...oldState, open: true, message: "No se pudo validar el código", severity: "error" }));
            }
        }
        setActivateLoading(false)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{
                    borderRadius: '16px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    width: 'fit-content',
                    height: 'fit-content',
                }}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '20%',
                            width: '100%',
                            fontSize: '19px',
                            fontWeight: 'bold',
                            color: 'black',
                            marginTop: '1.2rem',
                            }}
                    >Activar la verificación por dos pasos</Grid>
                    <Grid item
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            height: '20%',
                            width: '100%',
                            fontSize: '17px',
                            fontWeight: 'bold',
                            color: 'black',
                            marginTop: '1.2rem',
                            marginLeft: '2rem',
                            marginRight: '4rem',
                            overflowWrap: 'break-word',
                            }}>

                        <IconButton size="medium"
                            sx={{
                                color: 'black',
                                }}
                        >
                            <LooksOneIcon />
                        </IconButton>
                        Para activar la verificación por dos pasos, necesitas un dispositivo móvil.
                    </Grid>

                    <Grid item
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            height: '20%',
                            width: '100%',
                            fontSize: { xs: '10px', sm: '12px', md: '15px' },
                            fontWeight: 'semibold',
                            color: 'black',
                            marginLeft: '4.5rem',
                            overflowWrap: 'break-word',
                            marginRight: '4rem',
                            }}>
                        Descarga e instala la aplicación de autenticación de &nbsp;
                        <a href="https://support.google.com/accounts/answer/1066447?hl=en&co=GENIE.Platform%3DiOS&oco=0"> Google </a> &nbsp;
                        o &nbsp;
                        <a href="https://support.microsoft.com/es-es/account-billing/descargar-e-instalar-la-aplicaci%C3%B3n-microsoft-authenticator-351498fc-850a-45da-b7b6-27e523b8702a"> Microsoft </a> &nbsp;
                        en tu dispositivo.
                    </Grid>

                    <Grid item
                          sx={{
                              display: 'flex',
                              justifyContent: 'left',
                              alignItems: 'center',
                              height: '20%',
                              width: '100%',
                              fontSize: '17px',
                              fontWeight: 'bold',
                              color: 'black',
                              marginTop: '1.2rem',
                              marginLeft: '2rem',
                              marginRight: '4rem',
                          }}>

                        <IconButton size="medium"
                                    sx={{
                                        color: 'black',
                                    }}
                        >
                            <LooksTwoIcon />
                        </IconButton>
                        Escanea el código QR
                    </Grid>

                    <Grid item
                          sx={{
                              display: 'flex',
                              justifyContent: 'left',
                              alignItems: 'center',
                              height: '20%',
                              width: '100%',
                              fontSize: { xs: '10px', sm: '12px', md: '15px' },
                              fontWeight: 'semibold',
                              color: 'black',
                              marginLeft: '4.5rem',
                              marginRight: '4rem',
                          }}>
                        Abre la aplicación de autenticación y escanea el código QR con tu cámara.
                    </Grid>


                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                            height: '20%',
                            width: '100%',
                            marginLeft: '3.5rem',
                            marginRight: '4rem',
                        }}
                    >
                        <ImageContainer src={image} alt="QR code" />
                    </Grid>

                    <Grid item
                          sx={{
                              display: 'flex',
                              justifyContent: 'left',
                              alignItems: 'center',
                              height: '20%',
                              width: '100%',
                              fontSize: '17px',
                              fontWeight: 'bold',
                              color: 'black',
                              marginTop: '1.2rem',
                              marginLeft: '2rem',
                              marginRight: '4rem',
                          }}>

                        <IconButton size="medium"
                                    sx={{
                                        color: 'black',
                                    }}
                        >
                            <Looks3Icon />
                        </IconButton>
                        Introduce el código de verificación
                    </Grid>

                    <Grid item
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                                height: '20%',
                                width: '100%',
                                fontSize: '15px',
                                fontWeight: 'semibold',
                                color: 'black',
                                marginLeft: '4.5rem',
                            }}>

                        <TextField
                            id="outlined-basic"
                            label="Código de verificación"
                            variant="outlined"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item
                          sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              width: '100%',
                              margin: '1rem',
                              paddingRight: '3rem',
                              paddingBottom: '1rem',
                              marginRight: '4rem',
                          }}
                    >
                        <Button variant="outlined" color="secondary" onClick={handleClose}>Cancelar</Button>
                        <Button
                            disabled={code.length !== 6}
                                variant="contained"
                                color="primary"
                                style={{marginLeft: '1rem'}}
                                onClick={
                                    () => {
                                        //console.log("Current user: ", loggedUser?.id);
                                        handleVerify();
                                }}>
                        Activar</Button>
                    </Grid>


                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: snackbarState.vertical, horizontal: snackbarState.horizontal }}
                    open={snackbarState.open}
                    onClose={handleSnackbarClose}
                    key={snackbarState.vertical + snackbarState.horizontal}
                    autoHideDuration={3000}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarState.severity}
                           sx={{
                               width: 'fit-content',
                               backgroundColor: snackbarState.severity === 'success' ? '#4caf50' : '#f44336',
                    }}>
                        {snackbarState.message}
                    </Alert>
                </Snackbar>
            </Box>

        </Modal>

    );
}

export default TwoFAmodal;
