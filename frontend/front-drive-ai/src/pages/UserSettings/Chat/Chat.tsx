import { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { IconButtonAdmin } from "components/IconButtonAdmin";
import { StepperAdmin } from "components/StepperAdmin";
import { FirstRowContainer } from "pages/Salesman/ModalAssignedSales/ModalPage/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useLocation, useNavigate } from "react-router-dom";
import { Channel } from '@sendbird/uikit-react';
import { useAppContext } from "store/app-context/app-context";
import { getOrCreateUser } from "services/sendbird/getOrCreateUser";
import { createGroupChannel } from "services/sendbird/createGroupChannel";
import { Alert } from "@mui/material";

const ChatClient = () => {
  // here you tell react which is the active tab initially
  const location = useLocation();
  const { user } = useAppContext();
  const [error, setError] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');

  const navigate = useNavigate();
  const handleClick = () => {
    // This function will be called when the icon is clicked
    navigate(-1);
  };

  useEffect(() => {
    console.log(location.state);
  });

  useEffect(() => {
    console.log("User Chat");

    const getEmisorUser = async () => {
      console.log("Emisor", location.state.sellerName);
      return await getOrCreateUser({ id: `${location.state.salesmanId}`, nickname: location.state.sellerName })
    }

    const getReceptorUser = async () => {
      console.log("Receptor", user?.name);
      return await getOrCreateUser({ id: `${user?.id}`, nickname: `${user?.name} ${user?.surname}` });
    }

    const createOrGetGroupChannel = async () => {
      const dataToSend = {
        user: { id: `${user?.id}`, nickname: `${user?.name} ${user?.surname}` },
        // CHECK: Sendbird
        vendor: { id: `${location.state.salesmanId}`, nickname: location.state.sellerName }
      }
      console.log("Data to send user settings",dataToSend);
      return await createGroupChannel(dataToSend);
    }

    const registerUsersInSendbird = async () => {
      await getEmisorUser();
      await getReceptorUser();
    }

    registerUsersInSendbird()
      .then(() => {
        createOrGetGroupChannel()
          .then(data => {
            setError(false)
            setCurrentChannelUrl(data.channel_url)
            console.log(data.channel_url);
          })
          .catch(() => setError(true));
      })
      .catch(() => setError(true))
  }, [user])

  return (
    <>
      <Box>
        {/* El FirstRowContainer es el contenedor de la parte superior de la pagina, donde se encuentra el boton de regresar, el titulo de la pagina y el stepper. */}
        <Box sx={{
          display: "flex", flexDirection: {
            xs: "column",
          }
        }}>

          <FirstRowContainer>
            <IconButtonAdmin width="2rem" height="2rem">
              <KeyboardBackspaceIcon
                style={{
                  fontSize: 40,
                  color: "#18181b",
                  cursor: "pointer",
                }}
                onClick={handleClick} // Add the onClick event handler
              />
            </IconButtonAdmin>
            <h2> {location.state.dealershipName} </h2>
          </FirstRowContainer>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: '100%', gridGap:35 }}>
            <Box
              sx={{
                alignItems: 'right',
                padding: '0px',
                justifyContent: 'right',
                height: 'fit-content',
                width: '40vw',
                maxHeight: '20vh',
                maxWidth:'30vh',
                marginY: '0.5rem',
              }}>
              <img src={location.state.vehicleImages.length === 0
                ? "https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png"
                : location.state.vehicleImages[0].url
              }
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }} />
            </Box>
            <Box sx={{ display: "grid", flexDirection: "column", alignItems: 'center' }}>
              <Typography variant="h4" >
                {location.state.vehicleName} {location.state.vehicleModel} {location.state.vehicleYear}
              </Typography>
              <Typography >
                ${location.state.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} contado
              </Typography>
            </Box>

          </Box>

          <Box sx={{ mt: 2, alignContent: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', fontFamily: "Roboto" }}>
              <StepperAdmin
                // Here endpoint to currentStep has to be called
                currentStep={null}
                steps={[
                  "Primer contacto",
                  "Documentos",
                  "Prueba de manejo",
                  "Pago enganche",
                  "Pago final",
                  "Entregado",
                ]}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ marginX: '2rem', marginTop: '2rem', maxHeight: '80vh', alignContent: 'center', height: '60vh' }}>
          {error ? <Alert severity="warning">Hubo un error, intente de nuevo</Alert> : (
            <>
              <Channel channelUrl={currentChannelUrl} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChatClient;
