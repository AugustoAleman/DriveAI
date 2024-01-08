import { Compositor } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";

import { InsuranceFinance } from "pages/Salesman/InsuranceFinancePlans/InsuranceFinancePage";

import { useStyles } from "./styles";
import { useState } from "react";
import { InsuranceFinanceCatalog } from "../InsuranceFinanceCatalog";

const InsuranceFinanceRoot = () => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Catálogo");

  const tabs = ["Catálogo", "Planes y Seguros"];

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
              tabs={tabs}
              activeTab={activeTab}
              about="Catálogo de vehículos, planes y seguros"
              title="Administración de vehículos y seguros"
              onTabClick={handleTabClick}
            />
          </div>

          {activeTab === "Catálogo" && <InsuranceFinanceCatalog />}
          {activeTab === "Planes y Seguros" && <InsuranceFinance />}
        </Compositor>
    </>
  );

};

export default InsuranceFinanceRoot;
