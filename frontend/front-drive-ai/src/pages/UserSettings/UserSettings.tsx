import React, { useEffect, useState } from "react"; import { Card } from "components/Card"; import Tabs from "@mui/material/Tabs"; import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SettingsDocuments from "./partials/SettingsDocuments";
import SettingsSells from "./partials/SettingsSells";
import SettingsAccount from "./partials/SettingsAccount";
import TabPanel from "./partials/TabPanel";
import SettingsPayments from "./partials/SettingsPayments";
import SettingsSecurity from "./partials/SettingsSecurity";
import SettingsTestDrive from "./partials/SettingsTestDrive";
import { Typography } from "@mui/material";
import { Contenedor1, Contenedor2, Titulos } from "./styles";
import {useLocation} from "react-router-dom";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const PurchaseHistory = () => {
  const { state } = useLocation();

  // READY STATE
  const [ready, setReady] = useState(false);

  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // CONTENTS
  const [titulo, setTitulo] = React.useState("Ajustes de cuenta");
  const [subtitulo, setSubtitulo] = React.useState("Modifica tu perfil y ajustes de cuenta");
  const [value, setValue] = React.useState(state ? state.tabValue : 0);

  // STYLES
  const [titleSize, setTitleSize] = React.useState(40);
  const [contentSize, setContentSize] = React.useState(18);
  const [buttonSize, setButtonSize] = React.useState(14);

  //Function that changes the titles of the tabs depending on the value of the tab selected
  const changeTitles = (value: number) => {
    switch (value) {
      case 0:
        setTitulo("Ajustes de cuenta");
        setSubtitulo("Modifica tu perfil y ajustes de cuenta");
        break;
      case 1:
        setTitulo("Documentos");
        setSubtitulo("Consulta tus documentos o subelos a la plataforma ");
        break;
      case 2:
        setTitulo("Pagos");
        setSubtitulo("Consulta tus pagos o realiza uno nuevo");
        break;
      case 3:
        setTitulo("Seguridad");
        setSubtitulo(
          "Ten control total de tu cuenta, cambia tu contraseña o activa la autenticacion de dos pasos"
        );
        break;
      case 4:
        setTitulo("Compras");
        setSubtitulo("Revisa tus procesos de compra al momento");
        break;
      case 5:
        setTitulo("Pruebas de manejo");
        setSubtitulo(
          "Observa el estado tus solicitudes de prueba de manejo o consulta una ya existente"
        );
        break;
      case 6:
        setTitulo("Ayuda");
        setSubtitulo(
          "Consulta las preguntas frecuentes o contacta a un asesor"
        );
        break;
    }
  };
  //Function that changes the selected tab depending on the value of the tab selected
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    changeTitles(newValue);
  };

  const changeFonts = (width: number) => {
    if (width < 400) {
      setTitleSize(26);
      setContentSize(0);
      setButtonSize(12);
    }
    else if (width < 600) {
      setTitleSize(26);
      setContentSize(0);
      setButtonSize(12);
    }
    else {
      setTitleSize(40);
      setContentSize(18);
      setButtonSize(14);
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

  return (
    !ready ? <></> :
      <div style={{ marginBottom: '1rem' }} >
        <Titulos>
          <Typography sx={{ fontSize: titleSize, fontWeight: 'bold' }}>{titulo}</Typography>
          <Typography sx={{ fontSize: contentSize }}>{subtitulo}</Typography>
        </Titulos>
        <Card
          border="none"
          borderRadius="Medium"
          color="#FFFFFF"
          cursor="default"
          height="fit-content"
          hoverColor="#CBD0D0"
          margin="auto 1.5rem"
          padding="10px"
          shadow=" 8px 8px 8px rgba(0, 0, 0, 0.3)"
          width="auto"
          children={
            <Contenedor2>
              <Box
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: (screenWidth > 600 ? "flex" : ''),
                  height: "auto",
                  width: "100%",
                }}
              >
                <Tabs
                  orientation={screenWidth > 600 ? "vertical" : "horizontal"}
                  value={value}
                  onChange={handleChange}
                  scrollButtons="auto"
                  variant="scrollable"
                  aria-label="Vertical tabs"
                  sx={{ borderColor: "divider", backgroundColor: "#EEEEEE", borderRadius: '18px', margin: '-0.5rem', p: 0 }}
                >
                  <Tab
                    icon={<PersonOutlineIcon />}
                    iconPosition="start"
                    label="Cuenta"
                    sx={{ fontSize: buttonSize, flexDirection: 'column', p: 0 }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<DescriptionIcon />}
                    iconPosition="start"
                    label="Documentos"
                    sx={{ fontSize: buttonSize, flexDirection: 'column', p: 0 }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Pagos"
                    icon={<PaymentOutlinedIcon />}
                    iconPosition="start"
                    sx={{ fontSize: buttonSize, flexDirection: 'column', p: 0 }}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label="Seguridad"
                    icon={<SecurityOutlinedIcon />}
                    iconPosition="start"
                    sx={{ fontSize: buttonSize, flexDirection: 'column', p: 0 }}
                    {...a11yProps(3)}
                  />
                  <Tab
                    label="Compras"
                    icon={<ShoppingCartOutlinedIcon />}
                    iconPosition="start"
                    sx={{ fontSize: buttonSize, flexDirection: 'column', p: 0 }}
                    {...a11yProps(4)}
                  />
                  <Tab
                    label="Pruebas de manejo"
                    icon={<DriveEtaOutlinedIcon />}
                    iconPosition="start"
                    sx={{ fontSize: buttonSize, flexDirection: 'column', p: 0 }}
                    {...a11yProps(5)}
                  />
                </Tabs>

                <Contenedor1>
                  <TabPanel value={value} index={0}>
                    {/**Aqui va lo que va a dentro de cada tab */}
                    <SettingsAccount />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <SettingsDocuments />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <SettingsPayments />
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <SettingsSecurity />
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <SettingsSells />
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <SettingsTestDrive />
                  </TabPanel>
                </Contenedor1>
              </Box>
            </Contenedor2>
          }
        />
      </div>
  );
};

export default PurchaseHistory;
