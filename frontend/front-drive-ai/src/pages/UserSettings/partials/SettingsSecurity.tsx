import React, { useEffect, useState } from 'react'
import { Box, Checkbox, TextField, Switch} from '@mui/material'
import { Button } from 'components/Button';
import { changePassword } from 'services/ChangePassword/ChangePassword';
import { useAppContext } from 'store/app-context/app-context';
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse, IconButton, CircularProgress } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import theme from "theme/theme";
import TwoFAmodal from "./TwoFAmodal/TwoFAmodal"
import { preActivate2FA } from "../../../services";
import { isEnabled } from "../../../services";
import { disable2FA } from "../../../services";

const SettingsSecurity = () => {
  let alertTimer: NodeJS.Timeout;
  // READY STATE
  const [ready, setReady] = useState(false);

  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // STYLES
  const [subtitleSize, setSubtitleSize] = React.useState(20);
  const [contentSize, setContentSize] = React.useState(18);
  const [loading, setLoading] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(true);
  const [showNewPassword, setShowNewPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);
  
  const [passwordR1Color, setPasswordR1Color] = React.useState<string>("#000000");
  const [passwordR2Color, setPasswordR2Color] = React.useState<string>("#000000");
  const [passwordR3Color, setPasswordR3Color] = React.useState<string>("#000000");
  const [passwordR4Color, setPasswordR4Color] = React.useState<string>("#000000");

  const [open, setOpen] = React.useState(false);
  const [loading2FA, setLoading2FA] = React.useState(false);
  const [qrCode, setQrCode] = React.useState("");
  const [is2FAEnabled, setIs2FAEnabled] = React.useState(false);

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

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const changeFonts = (width: number) => {
    if (width < 400) {
      setSubtitleSize(18);
      setContentSize(14);
    }
    else if (width < 600) {
      setSubtitleSize(18);
      setContentSize(14);
    }
    else {
      setSubtitleSize(20);
      setContentSize(18);
    }
  }

  // On Effect function that gets the size of the sceen and sets it to the state
  useEffect(() => {
    changeFonts(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      changeFonts(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setReady(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [errorMessages, setErrorMessages] = React.useState('');

  const validatePassword = (pwd: string) => {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!regExp.test(pwd)) {
      setErrorMessages('Your password should be at least 8 characters long, contain at least 1 digit, 1 uppercase and 1 lowercase letter');
    } else if (newPassword !== confirmPassword) {
      setErrorMessages('New password and confirmation password do not match');
    } else {
      setErrorMessages('');
    }
  }

  React.useEffect(() => {
    validatePassword(newPassword);
  }, [newPassword, confirmPassword])


  // get email through context

  const appContext = useAppContext();
  
  const email = appContext.user?.email;


  const passwordValidation =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handlePasswordChange = async () => {
    setLoading(true);

    if (!email) {
      setErrorMessages('User not logged in');
      return;
    }

    if (!passwordValidation.test(newPassword)) {
      showAlert(
        "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número.",
        "error"
      );
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("La nueva contraseña y la contraseña de confirmación no coinciden.", "error");
      setLoading(false);
      return;
    }

    if (!email) {
      showAlert("Se ha producido un error al recibir el correo electrónico.", "error");
      setLoading(false);
      return;
    }

    // Assuming `changePassword` is a promise based function
    const response = await changePassword(email, password, newPassword);
    if (response.status >= 200 && response.status < 300) {
      showAlert("La contraseña se cambió correctamente", "success");
    } else {
      showAlert("Ocurrió un error", "error");
    }

    setLoading(false);
  };

  const handle2FA = async () => {
    setLoading2FA(true);
    if(appContext.user?.id){
        const response = await preActivate2FA(appContext.user?.id);
        if (response.status >= 200 && response.status < 300) {
            setOpen(true);
            setQrCode(response.data);
        } else {
            showAlert(response.data.message, "error");
        }
    }

    setLoading2FA(false);
}

const handleDisable2FA = async () => {
    setLoading2FA(true);
    if(appContext.user?.id){
        const response = await disable2FA((appContext.user?.id).toString());
        if (response.status >= 200 && response.status < 300) {
            setIs2FAEnabled(false);
            showAlert("La autenticación en dos pasos se ha desactivado.", "success");
        } else {
            showAlert(response.data.message, "error");
        }
    }

    setLoading2FA(false);
}

useEffect(() => {
    const get2FAStatus = async () => {
        if (appContext.user?.email) {
            const response = await isEnabled(appContext.user?.email);
            console.log(response)
            if(response.data === false){
                setIs2FAEnabled(false);
            }else {
                setIs2FAEnabled(true);
            }
        }
    };
    get2FAStatus();
}, [appContext.user?.id]);


  return (
    !ready ? <></> :
    <Box sx={{ 
      width: (screenWidth < 400 ? "110%" : "100%"), 
      minWidth:'fit-content',
      pl: (screenWidth < 400 ? "-1rem" : "0rem"),
      mx:(screenWidth < 400 ? "-1rem" : "0rem")}} >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: screenWidth < 400 ? '110%' : '100%',
          minWidth: 'fit-content',
          pl: screenWidth < 400 ? '-1rem' : '0rem',
          mx: screenWidth < 400 ? '-1rem' : '0rem',
        }}
      >
        <Box sx={{ fontSize: subtitleSize, fontWeight: 'bold', mr: 2 }}>
          Cambiar contraseña
        </Box>
        <Box width="50%" marginLeft={2}>
          <Collapse in={alert.open && alert.severity !== ''}>
            {alert.severity !== '' && (
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
        <Box sx={{ flexGrow: 1 }} /> {/* Add a flexible spacer */}
      </Box>
      <Box sx={{ fontSize: subtitleSize, fontWeight: 'bold', mt: 2 }}>
        <TextField 
        label="Contraseña Actual" 
        value={password} 
        type={showPassword ? 'password' : 'text'}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        />
      </Box>
      <Box sx={{ fontSize: contentSize, fontWeight: 'normal', mt: 2 }}>
        <TextField 
        label="Nueva Contraseña" 
        value={newPassword} 
        type={showNewPassword ? 'password' : 'text'}
        onChange={(event) => {
          setNewPassword(event.target.value)
          
                    
          if (event.target.value.length === 0) {
            setPasswordR1Color("#000000");
            setPasswordR2Color("#000000");
            setPasswordR3Color("#000000");
            setPasswordR4Color("#000000");
          } else {
            event.target.value.length >= 8
              ? setPasswordR1Color(theme.status.correct)
              : setPasswordR1Color(theme.status.wrong);
            // Match if there is at least one number
            event.target.value.match(/[0-9]/)
              ? setPasswordR2Color(theme.status.correct)
              : setPasswordR2Color(theme.status.wrong);
            // Match if there is at least one special character (no blank space, no letter, no number)
            event.target.value.match(/[^A-Za-z0-9\s]/)
              ? setPasswordR3Color(theme.status.correct)
              : setPasswordR3Color(theme.status.wrong);
            // Match if there is at least one uppercase letter
            event.target.value.match(/[A-Z]/)
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
      </Box>
      <Box sx={{ fontSize: contentSize, fontWeight: 'normal', mt: 2}}>
        <TextField 
        label="Repetir Contraseña" 
        value={confirmPassword} 
        type={showConfirmPassword ? 'password' : 'text'}
        onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        // onBeforeInput={() => {
        //   if (newPassword !== confirmPassword) {
        //     setErrorMessages(<div>Las contraseñas no coinciden</div>)
        //   }
        //   else {
        //     setErrorMessages(<></>)
        //   }
        // }}
        />
      </Box>

      <Box sx={{ display: 'column', marginTop:2 }} >
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
    
      <Box sx={{ fontSize: subtitleSize, fontWeight: 'bold', mb: 2, mt: 4 }}>Configurar Autenticacion de Dos Pasos</Box>
      <Box sx={{ display:'flex', fontSize: contentSize, fontWeight: 'normal', mt: (screenWidth < 700 ? 1 : 2), maxWidth:'500px', justifyContent:'space-between' }}>
        <div>Activar autenticacion de dos pasos</div>
        <Switch
              checked={is2FAEnabled}
              onChange={async () => {
                  if (is2FAEnabled) {
                      await handleDisable2FA();
                  } else {
                      await handle2FA();
                  }
                  setIs2FAEnabled(!is2FAEnabled);
              }}
              disabled={loading2FA}
          />
      </Box>
    
      <Box sx={{ display: 'row', width: '90%', right: '10px', mt: 2 }}>
        <Button variant="contained" onClick={() => {
          handlePasswordChange();
         }}>
          {loading ? (
            <CircularProgress color="inherit" size={30} />
          ) : (
            "Actualizar"
          )}
        </Button>
      </Box>
      <TwoFAmodal
            open={open}
            handleClose={() => {
                setOpen(false);
                setIs2FAEnabled(false);
            }}
            handleConfirm={() => {
                setOpen(false);
                setIs2FAEnabled(true);
            }}
            image={qrCode}
        />
    </Box>
    
  )
}

export default SettingsSecurity