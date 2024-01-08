import React from "react";
import { ChatContainer, Compositor, useStyles } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { SendbirdVendorChatList } from "components/SendbirdChat";
import { useState } from "react";
import { useWindowDimensions } from "hooks";

const Chat = () => {
  const [activeTab, setActiveTab] = useState(""); // here you tell react which is the active tab initially
  const { height } = useWindowDimensions();

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) {
      return;
    } else {
      setActiveTab(tab);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Compositor>
        <div className={classes.StaticHeader}>
          <HeaderAdminCards
            about="Chat con clientes"
            title="Chat con clientes"
            description="Aquí puedes hablar con los clientes asignados a tu cargo"
            tabs={[]}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          />
        </div>
        <ChatContainer height={height}>
          <SendbirdVendorChatList />
        </ChatContainer>
      </Compositor>
    </>
  );
};

export default Chat;
