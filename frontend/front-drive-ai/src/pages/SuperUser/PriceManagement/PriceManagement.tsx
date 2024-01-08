import React, { useState } from "react";
import { Container, HaederContainer} from './styles';
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { ActivePrices } from "./Partials/ActivePrices";
import { PricesHistory } from "./Partials/PricesHistory";
import { LastTransactions } from "./Partials/LastTransactions";
import { useStyles } from "./styles";

const PriceManagement = () => {

    const [activeTab, setActiveTab] = useState("Precios activos");
    const tabs = [
      "Precios activos",
      "Historial de precios",
      "Últimas Transacciones",
    ];
    const classes = useStyles();

    const handleTabClick = (tab: string) => {
        console.log("Clicked on", tab);

        if (tab === activeTab) {
          return;
        } else {
          console.log("changing tab");
          setActiveTab(tab);
        }
      };

    return(
        <Container>
            <HaederContainer>
              <div className={classes.StaticHeader}>
                <HeaderAdminCards
                    about="Gestión de precio de servicio"
                    activeTab={activeTab}
                    onTabClick={handleTabClick}
                    tabs={tabs}
                    title="Gestión de precio de servicio"
                />
                </div>
            </HaederContainer>

            {activeTab === "Precios activos" && <ActivePrices/>}
            {activeTab === "Historial de precios" && <PricesHistory/>}
            {activeTab === "Últimas Transacciones" && <LastTransactions/>}


        </Container>
    )
  }

  export default PriceManagement;
