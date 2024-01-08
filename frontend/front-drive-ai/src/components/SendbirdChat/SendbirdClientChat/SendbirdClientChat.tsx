import React, {useEffect, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import {SendbirdChatProps} from "./types";
import {Button, IconButton, Stack} from '@mui/material';
import {Chat} from "@mui/icons-material";
import {useAppContext} from "../../../store/app-context/app-context";
import Alert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import Channel from '@sendbird/uikit-react/Channel';
import {createGroupChannel} from "../../../services/sendbird/createGroupChannel";
import {SendbirdBox, SnackBarContent} from "./styles";
import CircularProgress from "@mui/material/CircularProgress";
import {getOrCreateUser} from "../../../services/sendbird/getOrCreateUser";
import {getUserById} from "../../../services/User-ms/getUserById";

const SendbirdClientChat: React.FC<SendbirdChatProps> = (props) => {
  const { vendorId } = props;
  const appContext = useAppContext();
  const navigate = useNavigate();
  const [ open, setOpen ] = useState(false);
  const [ vendor, setVendor ] = useState({ id: 0, name: "", surname: "" });
  const [ channelUrl, setChannelURL ] = useState("");
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const { loggedIn, user } = appContext;

    const getVendorUser = async () => {
      if (vendorId && !vendor.id) {
        getUserById(vendorId)
          .then(async data => {
              const {name, surname, id} = data;
              setVendor(data);
              return await getOrCreateUser({id: `${id}`, nickname: `${name} ${surname}}`})
          }).catch(() => setError(true));
      } else {
        return await getOrCreateUser({id: `${vendor.id}`, nickname: `${vendor.name} ${vendor.surname}`});
      }
    }

    const getClientUser = async () => {
      return await getOrCreateUser({ id: `${user?.id}`, nickname: `${user?.name} ${user?.surname}`});
    }

    const createOrGetGroupChannel = async () => {
      const dataToSend = {
        user: { id: `${user?.id}`, nickname: `${user?.name} ${user?.surname}`},
        // CHECK: Sendbird
        vendor: { id: `${vendor.id}`, nickname: `${vendor.name} ${vendor.surname}`}
      }
      console.log("Data to send pagina auto", dataToSend);
      return await createGroupChannel(dataToSend);
    }

    const registerUsersInSendbird = async () => {
      await getVendorUser();
      await getClientUser();
    }

    if (open && loggedIn && user && vendorId) {
        setError(false)
        registerUsersInSendbird()
          .then(() => {
            vendor.id && createOrGetGroupChannel()
              .then(data => {
                setError(false)
                setChannelURL(data.channel_url)
              })
              .catch(() => setError(true));
          })
          .catch(() => setError(true));
    }
  }, [vendor, vendorId, open, appContext])

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const redirectLogin = () => navigate("/login");

  const notLoggedUserMessage = () => (
    <Stack spacing={2} justifyContent={"center"}>
      <Alert severity="warning" >Inicia sesión para poder comunicarte con un vendedor</Alert>
      <Button sx={{ backgroundColor: "#191970FF"}} variant="contained" onClick={redirectLogin}>Inicia sesión</Button>
    </Stack>
  );

  const buttonstyles = {
    color: "white",
    backgroundColor: "#191970FF",
    ":hover": {
      backgroundColor: "none"
    }
  }

  return (
    <SendbirdBox>
        <IconButton sx={{...buttonstyles}} onClick={handleOpen}><Chat/></IconButton>
        <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <SnackBarContent>
            {error && <Alert severity="error" >Algo salió mal, intenta de nuevo</Alert>}
            {!appContext.loggedIn && notLoggedUserMessage()}
            {appContext.loggedIn && channelUrl &&
               <Channel channelUrl={channelUrl}
                renderPlaceholderLoader={() => <div><CircularProgress /></div>}
                renderPlaceholderInvalid={() => <div>Canal invalido</div>}
               />
            }
          </SnackBarContent>
        </Snackbar>
    </SendbirdBox>
  )
}

export default SendbirdClientChat;