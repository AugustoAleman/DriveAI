import React, { useEffect, useState } from 'react';
import { VendorSendbirdChatProps } from "./types";
import { useAppContext } from "../../../store/app-context/app-context";
import { Channel, ChannelList } from '@sendbird/uikit-react';
import "@sendbird/uikit-react/dist/index.css";
import { createGroupChannel } from "../../../services/sendbird/createGroupChannel";
import { getOrCreateUser } from "../../../services/sendbird/getOrCreateUser";
import { SendbirdBox, SendbirdHeader } from "./styles";
import { Alert } from "@mui/material";
import { Box } from '@material-ui/core';

const SendbirdVendorChat: React.FC<VendorSendbirdChatProps> = props => {
  const { client } = props;
  const { user } = useAppContext();
  const [error, setError] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState('');

  useEffect(() => {
    console.log("Sendbird vendor chat");

    const getEmisorUser = async () => {
      console.log("Get client user");
      return client && await getOrCreateUser({ id: `${client.id}`, nickname: client.nickname })
    }

    const getReceptorUser = async () => {
      return await getOrCreateUser({ id: `${user?.id}`, nickname: `${user?.name} ${user?.surname}` });
    }

    const createOrGetGroupChannel = async () => {
      if (client) {
        const dataToSend = {
          user: { id: `${client.id}`, nickname: client.nickname },
          // CHECK: Sendbird
          vendor: { id: `${user?.id}`, nickname: `${user?.name} ${user?.surname}`  },
        }
        return await createGroupChannel(dataToSend);
      }
    }

    const registerUsersInSendbird = async () => {
      await getReceptorUser();
      await getEmisorUser();
    }

    registerUsersInSendbird()
      .then(() => {
        createOrGetGroupChannel()
          .then(data => {
            setError(false)
            setCurrentChannelUrl(data.channel_url)
          })
          .catch(() => setError(true));
      })
      .catch(() => setError(true))
  }, [client, user])

  const onSelectChannel = (channel: { url: React.SetStateAction<string>; }) => {
    channel?.url && setCurrentChannelUrl(channel.url)
  }

  const ChatHeader = () => (
    <SendbirdHeader>
      <p>{user?.name} {user?.surname}</p>
    </SendbirdHeader>
  )

  return (
    <Box sx={{ height: '50vh' }}>
    <SendbirdBox>
      {error ? <Alert severity="warning">Hubo un error, intente de nuevo</Alert> : (
        <>
          {/* <ChannelList renderHeader={ChatHeader} allowProfileEdit={false} onChannelSelect={onSelectChannel} /> */}
          <Channel channelUrl={currentChannelUrl} />
        </>
      )}
    </SendbirdBox>
    </Box>
  )
}

export default SendbirdVendorChat;