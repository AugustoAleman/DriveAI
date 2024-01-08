import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LargeCarCard } from "components/LargeCarCard";
import { useAppContext } from "store/app-context/app-context";
import { getDriveTest } from "services";
import { Container, ContainerLoading, EmptyContainer, Title } from "./styles";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function a11yPropsTestDrives(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingsTestDrive = () => {
  const navigate = useNavigate();
  // READY STATE
  const [ready, setReady] = useState(false);

  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // STYLES
  const [subtitleSize, setSubtitleSize] = React.useState(20);
  const [contentSize, setContentSize] = React.useState(18);

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

  const [valueTestDrives, setValueTestDrives] = React.useState(0);
  const [requestTestDrives, setRequestTestDrives] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const appContext = useAppContext();
  // console.log("Este es el contexto dentro de esta pagina", appContext.user);
  // {
  //   appContext &&
  //     appContext.user &&
  //     appContext.user.id &&
  //     console.log("Este es el id del usuario", appContext.user.id);
  // }

  const DriveTestData = async () => {
    if (appContext && appContext.user && appContext.user.id) {
      await getDriveTest(appContext.user.id)
        .then((response) => {
          if (response && response.data) {
            // console.log("Esta es la respuesta de la API", response.data);
            setRequestTestDrives(response.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Este es el error de la API", error);
        });
    } else {
      console.log("No hay usuario logueado");
    }
  };

  useEffect(() => {
    DriveTestData();
  }, []);

  useEffect(() => {
    // console.log("Este es el valor de valueTestDrives", requestTestDrives);
  }, [requestTestDrives]);

  const handleChangeTestDrives = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTestDrives(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueTestDrives}
            onChange={handleChangeTestDrives}
            aria-label="basic tabs TestDrives"
            variant="scrollable"
          >
            <Tab
              label="Solicitudes de pruebas de manejo"
              {...a11yPropsTestDrives(0)}
            />
            <Tab
              label="Pruebas de manejo anteriores"
              {...a11yPropsTestDrives(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={valueTestDrives} index={0}>
          <Container>
            {loading ? (
              <ContainerLoading>
                <CircularProgress />
              </ContainerLoading>
            ) : (
              <>
                {requestTestDrives.length > 0 ? (
                  requestTestDrives
                    .filter(
                      (requestTestDrive: any) =>
                        requestTestDrive.status === "En proceso"
                    )
                    .map((requestTestDrive: any) => (
                      <LargeCarCard
                        key={requestTestDrive.id} // Add a unique key for each item in the array
                        variant={0}
                        size="small"
                        image={requestTestDrive.vehicleImage === null ? undefined : requestTestDrive.vehicleImage}

                        brand={requestTestDrive.vehicleName.split(", ")[0]} // Access brand property from requestTestDrive
                        year={requestTestDrive.vehicleName.split(", ")[1]} // Access year property from requestTestDrive
                        seller={requestTestDrive.salesmanName}
                        location={requestTestDrive.address}
                        purchaseDate={"prueba de manejo: " + requestTestDrive.day}
                        time={requestTestDrive.hour}
                        driveTestStatus="En espera"
                        onCardClick={() => {
                          // console.log("Este es el request", requestTestDrive)
                          navigate(`/sell-chat/${appContext.user?.id}`, {
                            state: {
                              dealershipName: "Prueba de manejo para " + requestTestDrive.vehicleName ,
                              price: requestTestDrive.price,
                              vehicleName: requestTestDrive.vehicleName,
                              sellerName: requestTestDrive.salesmanName.split(" ")[0],
                              vehicleImages: [{"url":requestTestDrive.vehicleImage}],
                              salesmanId: requestTestDrive.salesmanId,
                            }
                          });
                        }}
                      />
                    ))
                ) : (
                  <EmptyContainer>
                    <Title>
                      Aun no existen solicitudes de pruebas de manejo
                      <Alert
                        severity="info"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        Para ingresar solicitudes de manejo ingresa a los
                        vehiculos{" "}
                      </Alert>
                    </Title>
                  </EmptyContainer>
                )}
              </>
            )}
          </Container>
        </TabPanel>
        <TabPanel value={valueTestDrives} index={1}>
          <Container>
            {loading ? (
              <ContainerLoading>
                <CircularProgress />
              </ContainerLoading>
            ) : (
              <>
                {requestTestDrives.length > 0 ? (
                  requestTestDrives.map((requestTestDrive: any) => {
                    console.log("Esta es la solicitud de manejo", requestTestDrive);
                    // console.log("Este es el nombre del vehiculo", requestTestDrive.vehicleName);
                    return (
                      <LargeCarCard
                        key={requestTestDrive.id} // Add a unique key for each item in the array
                        variant={0}
                        size="small"
                        image={requestTestDrive.vehicleImage} // Access image property from requestTestDrive
                        brand={requestTestDrive.vehicleName.split(", ")[0]} // Access brand property from requestTestDrive
                        year={requestTestDrive.vehicleName.split(", ")[1]} // Access year property from requestTestDrive
                        price={requestTestDrive.price} // Access price property from requestTestDrive
                        purchaseDate={"prueba de manejo: " + requestTestDrive.day} // Access purchaseDate property from requestTestDrive
                        seller={requestTestDrive.seller} // Access seller property from requestTestDrive
                        location={requestTestDrive.address} // Access location property from requestTestDrive
                        driveTestStatus="Completado"
                        onCardClick={() => {
                          // // console.log("Este es el request", requestSellsActual);
                          navigate(`/sell-chat/${appContext.user?.id}`, {
                            state: {
                              dealershipName: "Prueba de manejo para " + requestTestDrive.vehicleName ,
                              price: requestTestDrive.price,
                              vehicleName: requestTestDrive.vehicleName,
                              sellerName: requestTestDrive.salesmanName.split(" ")[0],
                              vehicleImages: [{"url":requestTestDrive.vehicleImage}],
                              salesmanId: requestTestDrive.salesmanId,
                            }
                          });
                        }}
                      />
                    )
                  })
                ) : (
                  <EmptyContainer>
                    <Title>
                      Aun no existen solicitudes de pruebas de manejo
                      <Alert
                        severity="info"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        Para ingresar solicitudes de manejo ingresa a los
                        vehiculos{" "}
                      </Alert>
                    </Title>
                  </EmptyContainer>
                )}
              </>
            )}
          </Container>
        </TabPanel>
      </Box>
    </>
  );
};

export default SettingsTestDrive;
