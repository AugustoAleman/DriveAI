import { Compositor } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";

// Import component
import { AssignedSalesList } from "pages/Salesman/AssignedSales/AssignedSalesList";
import { AssignedTestList } from "pages/Salesman/AssignedSales/AssignedTestList";

import { useState } from "react";
import { useStyles } from "./styles";

const AssignedSalesRoot = () => {
  const [activeTab, setActiveTab] = useState("Ventas"); // here you tell react which is the active tab initially
  const tabs = ["Ventas", "Pruebas"];
  
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
              about="Ventas asignadas"
              title="Ventas asignadas"
              description="Aquí puedes observar tus ventas asignadas."
              tabs={tabs}
              activeTab={activeTab}
              onTabClick={handleTabClick}
            />
          </div>
          {activeTab === "Ventas" && (
            <AssignedSalesList />
          )}
          {activeTab === "Pruebas" && (
            <AssignedTestList />
          )}
          
      </Compositor>
    </>
  );
};

export default AssignedSalesRoot;
