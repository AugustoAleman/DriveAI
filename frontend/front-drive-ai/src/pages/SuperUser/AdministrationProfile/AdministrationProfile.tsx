import { Compositor } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { useStyles } from "./styles";
import { AdminConfigurationPage } from "components/AdminConfigurationPage";
import { AdminSecurityPage } from "components/AdminSecurityPage";

const AdministrationProfile = () => {
  const [activeTab, setActiveTab] = useState("General");
  const classes = useStyles();
  const tabs = ["General", "Seguridad"];

  const handleTabClick = (tab: string) => {
    console.log("Clicked on", tab);

    if (tab === activeTab) {
      return;
    } else {
      console.log("Tab has changed!");
      setActiveTab(tab);
    }
  };

  return (
    <>
      <Compositor>
        <div className={classes.StaticHeader}>
          <HeaderAdminCards
            tabs={tabs}
            activeTab={activeTab}
            about="Cuenta"
            title="Administración de cuenta"
            onTabClick={handleTabClick}
          />
        </div>
        {activeTab === "General" && <AdminConfigurationPage />}
        {activeTab === "Seguridad" && <AdminSecurityPage />}
      </Compositor>
    </>
  );
};

export default AdministrationProfile;
