import { Compositor } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";

// Import component
import { SalesProcessesList } from "pages/DealershipManager/SalesProcesses/SalesProcessesList";

import { useState } from "react";
import { useStyles } from "./styles";

const SalesProcessesRoot = () => {
  const [activeTab] = useState("General"); // here you tell react which is the active tab initially
  const classes = useStyles();

  return (
    <>
          <div className={classes.StaticHeader}>
            <HeaderAdminCards
              tabs={null}
              activeTab={null}
              about="Procesos de venta"
              title="Procesos de venta"
              onTabClick={() => console.log("Clicked on tab")}
            />
          </div>
          {activeTab === "General" && <SalesProcessesList />}
    </>
  );
};

export default SalesProcessesRoot;
