import React from "react";
import { Container, Client } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { ManagerBankAccountsManagementPredecessor } from "./Partials/ManagerBankAccountsManagementPredecessor";
import { ManagerBankAccountsManagementHistory } from "./Partials/MBankAccountsHistory";
import { useStyles } from "./styles";

const BankAccounts = () => {
  const [activeTab, setActiveTab] = useState("General");
  const tabs = ["General", "Historial de transacciones"];

  const handleClick = (tab: string) => {
    if (tab === activeTab) {
      return;
    } else {
      setActiveTab(tab);
    }
  };
  const classes = useStyles();

  return (
    <>
      <Container>
        <Client>
        <div className={classes.StaticHeader}>
            <HeaderAdminCards
              tabs={tabs}
              activeTab={activeTab}
              about="Cuentas asignadas"
              title="Administración bancaria"
              onTabClick={handleClick}
            />
          </div>

          {activeTab === "General" && (
            <ManagerBankAccountsManagementPredecessor />
          )}
          {activeTab === "Historial de transacciones" && (
            <ManagerBankAccountsManagementHistory />
          )}
        </Client>
      </Container>
    </>
  );
};

export default BankAccounts;
