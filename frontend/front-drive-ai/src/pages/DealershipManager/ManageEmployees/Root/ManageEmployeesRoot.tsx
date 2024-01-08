import { Compositor } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { useStyles } from "./styles";

// Import component
import { ManageEmployeesList } from "pages/DealershipManager/ManageEmployees/ManageEmployeesList";

// Import hooks
import { useState } from "react";

const ManageEmployeesRoot = () => {
  const classes = useStyles();

  const [activeTab] = useState(""); // here you tell react which is the active tab initially

  return (
    <>
          <div className={classes.StaticHeader}>
            <HeaderAdminCards
              tabs={null}
              activeTab={null}
              about="Administración de empleados"
              title="Administración de empleados"
              onTabClick={() => console.log("Clicked on tab")}
            />
          </div>
          {activeTab === "" && <ManageEmployeesList />}
    </>
  );
};

export default ManageEmployeesRoot;
