import React, { ReactNode, useEffect, useState } from "react";
import { Container, InnerContainer, Row } from "./styles";
import { Box, InputLabelProps, TextField } from "@material-ui/core";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { InputCredential } from "components/InputCustom";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import logo from "./../../assets/LogoColored.png";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { Collapse, IconButton, CircularProgress } from "@mui/material";
import { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { registerAutomotiveGroup, registerBody } from "services/User-ms/registerAutomotiveGroup";
import { createUser } from "services/Signup/CreateUser";

const RegisterFormulaireGroup = () => {
    // HANDLE RESIZING
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Page states group info
    const [groupName, setGroupName] = React.useState<string>("");
    const [groupPhone, setGroupPhone] = React.useState<string>("");
    const [groupCity, setGroupCity] = React.useState<string>("");
    const [groupState, setGroupState] = React.useState<string>("");
    const [groupZipCode, setGroupZipCode] = React.useState<string>("");
    const [groupConstitutiveAct, setGroupConstitutiveAct] = React.useState<string>("");
    const [groupCIF, setGroupCIF] = React.useState<string>("");
    const [groupProveOfAddress, setGroupProveOfAddress] = React.useState<string>("");
    const [groupAddress, setGroupAddress] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const [groupNameMsgError, setGroupNameMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupPhoneMsgError, setGroupPhoneMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupCityMsgError, setGroupCityMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupStateMsgError, setGroupStateMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupZipCodeMsgError, setGroupZipCodeMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupConstitutiveActMsgError, setGroupConstitutiveActMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupCIFMsgError, setGroupCIFMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupProveOfAddressMsgError, setGroupProveOfAddressMsgError] = React.useState<React.ReactNode>(<></>)
    const [groupAddressMsgError, setGroupAddressMsgError] = React.useState<React.ReactNode>(<></>)

    // Page state personal info
    const [name, setName] = React.useState<string>("");
    const [surname, setSurname] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>("");
    const [INE, setINE] = React.useState<string>("hola");
    const [dateOfBirth, setDateOfBirth] = React.useState<string>("");
    const regex = /^[0-9]{10}$/;

    const [nameMsgError, setNameMsgError] = React.useState<React.ReactNode>(<></>)
    const [surnameMsgError, setSurnameMsgError] = React.useState<React.ReactNode>(<></>)
    const [phoneMsgError, setPhoneMsgError] = React.useState<React.ReactNode>(<></>)
    const [emailMsgError, setEmailMsgError] = React.useState<React.ReactNode>(<></>)
    const [passwordMsgError, setPasswordMsgError] = React.useState<React.ReactNode>(<></>)
    const [passwordConfirmationMsgError, setPasswordConfirmationMsgError] = React.useState<React.ReactNode>(<></>)
    const [INEMsgError, setINEMsgError] = React.useState<React.ReactNode>(<></>)
    const [dateOfBirthMsgError, setDateOfBirthMsgError] = React.useState<React.ReactNode>(<></>)


    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "",
    });

    const showAlert = (message: string, severity: AlertColor) => {
        setAlert({ open: true, message, severity });
    };

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    // HELPER STRUCTURES
    const inputChecker = (label: string, setVariable: React.Dispatch<React.SetStateAction<any>>, variableMsgError: any, setVariableMsgError: React.Dispatch<React.SetStateAction<any>>, type: string = "", inputLabelProps?: InputLabelProps,): ReactNode => {
        return <Row>
            {variableMsgError}
            <TextField label={label} variant="outlined" color="primary" fullWidth type={type}
                onChange={(event) => {
                    setVariable(event.target.value)
                    setVariableMsgError(<></>)
                }}
                InputLabelProps={inputLabelProps}
            />
        </Row>;
    };
    const errorMsg = (errorMsg: string): JSX.Element => {
        return <Box sx={{ color: '#DF4F4A', fontSize: '0.8rem', fontWeight: 'normal', marginBottom: '5px' }}>* {errorMsg}</Box>
    };
    const centered = (child: JSX.Element) => {
        return (
            <Container><InnerContainer>
                {child}
            </InnerContainer></Container>
        );
    };

    // Content to be displayed at the side of the image
    const middleContent = (width: string, height: string, titleSize: number, textSize: number, buttonSize: string, tertiarySize: number) => {
        return <>
            <Card width={width} height={height} cursor="default" margin="0rem 0rem 0rem -1rem" >
                {centered(<>
                    <Row>
                        <Box sx={{ color: 'text.primary', fontSize: titleSize, fontWeight: 'bold' }}>Grupo Automotriz</Box>
                        <Box sx={{ fontSize: textSize, fontWeight: 'normal' }}>Datos de grupo automotriz.</Box>
                    </Row>

                    {/* INPUT FIELDS */}
                    {inputChecker("Nombre de Grupo", setGroupName, groupNameMsgError, setGroupNameMsgError)}
                    {inputChecker("Telefono de Grupo", setGroupPhone, groupPhoneMsgError, setGroupPhoneMsgError)}
                    {inputChecker("Direccion", setGroupAddress, groupAddressMsgError, setGroupAddressMsgError)}
                    {inputChecker("Ciudad", setGroupCity, groupCityMsgError, setGroupCityMsgError)}
                    {inputChecker("Estado", setGroupState, groupStateMsgError, setGroupStateMsgError)}
                    {inputChecker("Codigo Postal", setGroupZipCode, groupZipCodeMsgError, setGroupZipCodeMsgError)}

                    {/* TODO - MAKE IT SO THAT THE DOCUMENTS DEPEND ON THE DOCUMENTS REQUIRED BY THE SUPERADMIN */}
                    {inputChecker("Acta Constitutiva", setGroupConstitutiveAct, groupConstitutiveActMsgError, setGroupConstitutiveActMsgError)}
                    {inputChecker("CIF", setGroupCIF, groupCIFMsgError, setGroupCIFMsgError)}
                    {inputChecker("Comprobante de domicilio", setGroupProveOfAddress, groupProveOfAddressMsgError, setGroupProveOfAddressMsgError)}

                </>)}
            </Card>
        </>
    }

    const rightContent = (width: string, height: string, titleSize: number, textSize: number, buttonSize: string, tertiarySize: number) => {
        return <>
            <Card width={width} height={height} cursor="default" margin="0rem 0rem 0rem -1rem" >
                {centered(<>
                    <Row>
                        <Box sx={{ color: 'text.primary', fontSize: titleSize, fontWeight: 'bold' }}>Solicitante</Box>
                        <Box sx={{ fontSize: textSize, fontWeight: 'normal' }}>Datos del Solicitante.</Box>
                    </Row>

                    {/* INPUT FIELDS */}
                    {inputChecker("Nombre", setName, nameMsgError, setNameMsgError)}
                    {inputChecker("Apellido", setSurname, surnameMsgError, setSurnameMsgError)}
                    {inputChecker("Telefono", setPhone, phoneMsgError, setPhoneMsgError)}
                    {inputChecker("Fecha de Nacimiento", setDateOfBirth, dateOfBirthMsgError, setDateOfBirthMsgError, "date", { shrink: true })}
                    {inputChecker("Correo Electronico", setEmail, emailMsgError, setEmailMsgError)}

                    <Row>
                        <Box sx={{ color: 'text.primary', fontSize: textSize + 5, fontWeight: 'bold', display: 'flex' }}>
                            INE
                        </Box>
                        {INEMsgError}
                        <Box sx={{ display: 'flex' }}>
                            <InputCredential /> <UploadFileOutlinedIcon />
                        </Box>
                    </Row>
                    <Row>
                        <Button width="100%" onClick={async () => {
                            setLoading(true);
                            var date = new Date(dateOfBirth);
                            var today = new Date();
                            var age = today.getFullYear() - date.getFullYear();
                            var error = false;
                            if (groupName === "") {
                                setGroupNameMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El nombre es requerido</Box>)
                            }
                            if (groupPhone === "") {
                                setGroupPhoneMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El telefono es requerido</Box>)
                            }
                            if (groupCity === "") {
                                setGroupCityMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>La ciudad es requerida</Box>)
                            }
                            if (groupState === "") {
                                setGroupStateMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El estado es requerido</Box>)
                            }
                            if (groupZipCode === "") {
                                setGroupZipCodeMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El codigo postal es requerido</Box>)
                            }
                            if (groupConstitutiveAct === "") {
                                setGroupConstitutiveActMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El acta constitutiva es requerida</Box>)
                            }
                            if (groupCIF === "") {
                                setGroupCIFMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El CIF es requerido</Box>)
                            }
                            if (groupProveOfAddress === "") {
                                setGroupProveOfAddressMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El comprobante de domicilio es requerido</Box>)
                            }
                            if (name === "") {
                                setNameMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El nombre es requerido</Box>)
                            }
                            if (surname === "") {
                                setSurnameMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El apellido es requerido</Box>)
                            }
                            if (phone === "" || !regex.test(phone)) {
                                setPhoneMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El telefono es requerido</Box>)
                            }
                            if (email === "") {
                                setEmailMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>El correo es requerido</Box>)
                            }
                            if (dateOfBirth === "" || age < 18) {
                                setDateOfBirthMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>La fecha de nacimiento es requerida</Box>)
                            }
                            if (INE === "") {
                                setINEMsgError(<Box sx={{ color: 'red', fontSize: tertiarySize, fontWeight: 'normal', mb: 0.5 }}>La INE es requerida</Box>)
                            }
                            error = (groupName === "" || groupPhone === "" || groupCity === "" || groupState === "" || groupZipCode === "" || groupConstitutiveAct === "" || groupCIF === "" || groupProveOfAddress === "" || name === "" || surname === "" || phone === "" || email === "" || dateOfBirth === "" || !regex.test(phone) || age < 18)
                            if (!error) {

                                const contactName = name + " " + surname;
                                const direction= groupCity + ", " + groupState + ", " + groupZipCode;
                                const date = new Date().toString();
                                const status = "pending";
                                const contactEmail = email;
                                

                                const body: registerBody = {
                                    createdAt: "2023-05-17T20:51:49.413+00:00",
                                    updatedAt: "2023-05-17T20:51:49.413+00:00",
                                    deletedAt: null,
                                    status: "PENDING",
                                    is_deleted: false,
                                    contactName: contactName,
                                    direction:  groupCity + ", " + groupState + ", " + groupZipCode,
                                    date: "2023-05-17T20:51:49.413+00:00",
                                    groupName: groupName,
                                    contactEmail: email,
                                    proveOfAddressUrl: "proveOfAddressUrl",
                                    fiscalUrl: "fiscalUrl",
                                    legalDocUrl: "legalDocUrl",
                                    description: "Solicitd de registro"
                                }                                

                                console.log(
                                    body
                                )

                                const response = await registerAutomotiveGroup(body);
                                if (response.status >= 200 && response.status < 300) {
                                    showAlert("Solicitud enviada con exito.", "success");

                                    try{
                                        const response = await createUser(
                                            "AGA",
                                            body.contactName.split(" ")[0],
                                            body.contactName.split(" ")[1],
                                            body.contactEmail,
                                            phone,
                                            phone,
                                            dateOfBirth,
                                            "Password1",
                                            true
                                        )
    
                                        if(response.status >= 200 && response.status < 300){
                                            console.log(response.data)
                                        }else{
                                            showAlert("Fallo al crear el usuario.", "error");
                                        }
                                    } catch (error) {
                                        console.log(error)
                                        showAlert("Algo falló al crear el usuario.", "error");
                                    }

                                } else {
                                    showAlert("Fallo al enviar la solicitud.", "error");
                                }
                            }
                            else {
                                showAlert("Faltan datos", "error");
                            }
                            setLoading(false);
                        }}>
                            {loading ? <CircularProgress size={24} /> : "Enviar"
                            }
                        </Button>
                        <Box width="100%" marginTop={2}>
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
                    </Row>
                </>
                )}
            </Card>
        </>
    }

    return <>
        {screenWidth > 1200 && (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', overflow: 'hidden' }}>
                    <img src="https://cdn.discordapp.com/attachments/912434458479689788/1100612227888848906/image.png" style={{ height: '80vh', width: 'auto', objectFit: 'cover', objectPosition: 'right' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40%' }}>
                    {centered(middleContent('38vw', 'fit-content', 34, 18, '18px', 10))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '40%' }}>
                    {centered(rightContent('38vw', 'fit-content', 34, 18, '18px', 10))}
                </Box>
            </Box>
        )}
        {screenWidth <= 1200 && screenWidth > 768 && (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                    {centered(middleContent('47vw', 'fit-content', 34, 18, '18px', 10))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                    {centered(rightContent('47vw', 'fit-content', 34, 18, '18px', 10))}
                </Box>
            </Box>
        )}
        {screenWidth <= 768 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', mt: 2 }}>
                <img src={logo} style={{ height: '10vh', width: 'auto' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                    {centered(middleContent('80vw', 'fit-content', 24, 14, '10px', 10))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                    {centered(rightContent('80vw', 'fit-content', 24, 14, '10px', 10))}
                </Box>
            </Box>
        )}
    </>
};

export default RegisterFormulaireGroup;