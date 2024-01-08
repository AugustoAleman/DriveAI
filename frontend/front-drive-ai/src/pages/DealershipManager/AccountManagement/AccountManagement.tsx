import { Container, Client, useStyles } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { useState } from "react";

import { AdminConfigurationPage } from "components/AdminConfigurationPage";
import { AdminSecurityPage } from "components/AdminSecurityPage";

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState("General");
  const tabs = ["General", "Seguridad"];
  const classes = useStyles();

  const handleClick = (tab: string) => {
    if (tab === activeTab) {
      return;
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Container>
        <Client>
          <div className={classes.StaticHeader}>
            <HeaderAdminCards
              tabs={tabs}
              activeTab={activeTab}
              about="Cuenta"
              title="Administración de cuenta"
              onTabClick={handleClick}
            />
          </div>
          {activeTab === "General" && <AdminConfigurationPage />}

          {activeTab === "Seguridad" && <AdminSecurityPage />}
        </Client>
      </Container>
    </>
  );
};
export default AccountManagement;
