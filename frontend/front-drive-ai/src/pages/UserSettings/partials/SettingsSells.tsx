import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LargeCarCard } from "components/LargeCarCard";
import { LOGIC } from "../constants";
import { CurrentSellsProps, HistoricSellsProps } from "../partials-types/types";
import { useAppContext } from "store/app-context/app-context";
import { Container, ContainerLoading, EmptyContainer, Title } from "./styles";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { getHistoryPurchase, getActivePurchase } from "services";
import { useNavigate } from "react-router-dom";

function a11yPropsShopping(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingsSells = () => {
  // READY STATE
  const [ready, setReady] = useState(false);

  // HANDLE RESIZING
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // STYLES
  const [subtitleSize, setSubtitleSize] = React.useState(20);
  const [contentSize, setContentSize] = React.useState(18);
  const navigate = useNavigate();

  const changeFonts = (width: number) => {
    if (width < 400) {
      setSubtitleSize(18);
      setContentSize(14);
    } else if (width < 600) {
      setSubtitleSize(18);
      setContentSize(14);
    } else {
      setSubtitleSize(20);
      setContentSize(18);
    }
  };

  // On Effect function that gets the size of the sceen and sets it to the state
  useEffect(() => {
    changeFonts(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      changeFonts(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setReady(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [valueShopping, setValueShopping] = React.useState(0);

  // Page Information
  const id: number = 10;
  const currentSells: Array<CurrentSellsProps> = LOGIC.CURRENT_SELLS(id);
  const historicPurchases: Array<HistoricSellsProps> = LOGIC.HISTORIC_SELLS(id);

  const listHistoricalPurchases = historicPurchases.map((item) => (
    <>
      <LargeCarCard
        variant={0}
        size="small"
        image={item.image}
        brand={item.brand}
        model={item.model}
        year={item.year}
        purchaseDate="2021-10-10"
        seller={item.seller}
        location={item.location}
      />
      <br />
    </>
  ));

  //Purchase History
  const [valuePurchaseHistory, setValuePurchaseHistory] = useState([]);
  const [valueSellsDrives, setvalueSellsDrives] = React.useState(0);
  const [valueSellDrivesActuals, setValueSellDrivesActuals] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const appContext = useAppContext();
  // console.log("Este es el contexto dentro de esta pagina", appContext.user);
  // {
  //   appContext &&
  //     appContext.user &&
  //     appContext.user.id &&
  //     console.log("Este es el id del usuario", appContext.user.id);
  // }

  const HistoricPurchaseData = async () => {
    if (appContext && appContext.user && appContext.user.id) {
      await getHistoryPurchase(appContext.user.id)
        .then((response) => {
          if (response && response.data) {
            setValuePurchaseHistory(response.data.transactions);
            setLoading(false);
          }
        })
        .catch((error) => {
          // console.log("Este es el error de la API", error);
        });
    } else {
      // console.log("No hay usuario logueado");
    }
  };

  const ActivePurchaseData = async () => {
    if (appContext && appContext.user && appContext.user.id) {
      await getActivePurchase(appContext.user.id)
        .then((response) => {
          if (response && response.data) {
            setValueSellDrivesActuals(response.data.transactions);
            setLoading(false);
          }
        })
        .catch((error) => {
          // console.log("Este es el error de la API", error);
        });
    } else {
      // console.log("No hay usuario logueado");
    }
  };

  useEffect(() => {
    HistoricPurchaseData();
    ActivePurchaseData();
  }, [valueSellsDrives]);

  const handleChangeShopping = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setvalueSellsDrives(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueSellsDrives}
            onChange={handleChangeShopping}
            aria-label="basic tabs TestDrives"
            variant="scrollable"
          >
            <Tab label="Compras en proceso" {...a11yPropsShopping(0)} />
            <Tab label="Historal de compras" {...a11yPropsShopping(1)} />
          </Tabs>
        </Box>
        <TabPanel value={valueSellsDrives} index={0}>
          <Container>
            {loading ? (
              <ContainerLoading>
                <CircularProgress />
              </ContainerLoading>
            ) : (
              <>
                {valueSellDrivesActuals.length > 0 ? (
                  valueSellDrivesActuals.map(
                    (requestSellsActual: any, index) => (
                      <LargeCarCard
                        key={requestSellsActual.key} // Add a unique key for each item in the array
                        variant={0}
                        size="small"
                        image={requestSellsActual.vehicleData.images.length === 0
                          ? undefined
                          : requestSellsActual.vehicleData.images[0].url
                        }
                        brand={
                          requestSellsActual.vehicleData.vehicleInfo.name.split(", ")[0]
                        }
                        price={requestSellsActual.vehicleData.vehicleInfo.price}
                        seller={requestSellsActual.sellerName}
                        location={
                          requestSellsActual.dealershipInfo.city +
                          ", " +
                          requestSellsActual.dealershipInfo.address
                        }
                        saleStatus={requestSellsActual.orderStatus}
                        year={
                          requestSellsActual.vehicleData.vehicleInfo.name.split(", ")[1]
                        }
                        onCardClick={() => {
                          // console.log("Este es el request", requestSellsActual);
                          navigate(`/sell-chat/${appContext.user?.id}`, {
                            state: {
                              dealershipName: requestSellsActual.dealershipInfo.name,
                              price: requestSellsActual.vehicleData.vehicleInfo.price,
                              vehicleName: requestSellsActual.vehicleData.vehicleInfo.name,
                              sellerName: requestSellsActual.sellerName,
                              vehicleImages: requestSellsActual.vehicleData.images,
                          }});
                        }}
                      />
                    )
                  )
                ) : (
                  <EmptyContainer>
                    <Title>
                      Aun no existen solicitudes de compra de vehiculos
                      <Alert
                        severity="info"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        Para ingresar solicitudes de compras ingresa a los
                        vehiculos{" "}
                      </Alert>
                    </Title>
                  </EmptyContainer>
                )}
              </>
            )}
          </Container>
        </TabPanel>
        <TabPanel value={valueSellsDrives} index={1}>
          <Container>
            {loading ? (
              <ContainerLoading>
                <CircularProgress />
              </ContainerLoading>
            ) : (
              <>
                {valuePurchaseHistory.length > 0 ? (
                  valuePurchaseHistory.map(
                    (requestSellsActual: any, index) => (
                      // console.log("Este es el requestSellsActual Historial", requestSellsActual),
                      (
                        <LargeCarCard
                        key={requestSellsActual.key} // Add a unique key for each item in the array
                        variant={0}
                        size="small"
                        image={requestSellsActual.vehicleData.vehicleImages.length === 0
                          ? undefined
                          : requestSellsActual.vehicleData.vehicleImages[0].url
                        }
                        brand={
                          requestSellsActual.vehicleData.vehicleInfo.name.split(", ")[0]
                        }
                        price={requestSellsActual.vehicleData.vehicleInfo.price}
                        seller={requestSellsActual.sellerName}
                        location={
                          requestSellsActual.dealershipInfo.city +
                          ", " +
                          requestSellsActual.dealershipInfo.address
                        }
                        saleStatus={requestSellsActual.orderStatus}
                        year={
                          requestSellsActual.vehicleData.vehicleInfo.name.split(", ")[1]
                        }
                        purchaseDate={requestSellsActual.purchaseDate ? requestSellsActual.purchaseDate : ""}
                        onCardClick={() => {
                          // console.log("Este es el request", requestSellsActual);
                          navigate(`/sell-chat/${appContext.user?.id}`, {
                            state: {
                              dealershipName: requestSellsActual.dealershipInfo.name,
                              price: requestSellsActual.vehicleData.vehicleInfo.price,
                              vehicleName: requestSellsActual.vehicleData.vehicleInfo.name,
                              sellerName: requestSellsActual.sellerName,
                              vehicleImages: requestSellsActual.vehicleData.images,
                          }});
                        }}
                        />
                      )
                    )
                  )
                ) : (
                  <EmptyContainer>
                    <Title>
                      Aun no existen solicitudes de compra de vehiculos
                      <Alert
                        severity="info"
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        Para ingresar solicitudes de compra ingresa a los
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

export default SettingsSells;
