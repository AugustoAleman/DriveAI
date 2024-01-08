import React from "react";
import { Container, useStyles, HeaderContainer } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { AutomotiveGroupAdminDealershipAccountsAndPlans } from "./Partials/AGADealershipAccountsPlans";

const DealershipAccountsAndPlans = () => {
  const [activeTab, setActiveTab] = useState("Planes");
  const tabs = ["Planes"];
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
          <HeaderContainer className={classes.StaticHeader} >
            <HeaderAdminCards
              tabs={tabs}
              activeTab={activeTab}
              about="Gestión de cuentas"
              title="Gestión de cuentas por agencia y planes"
              onTabClick={handleClick}
            />
          </HeaderContainer>

          {activeTab === "Planes" && (
            <AutomotiveGroupAdminDealershipAccountsAndPlans />
          )}
      </Container>
    </>
  );
};

export default DealershipAccountsAndPlans;
