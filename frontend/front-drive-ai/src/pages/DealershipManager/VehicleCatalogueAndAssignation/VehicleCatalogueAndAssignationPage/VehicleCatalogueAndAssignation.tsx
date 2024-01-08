import { Compositor, Client } from "./styles";
import { useState } from "react";
import VehicleCatalogueAndAssignationCatalogue from "../VehicleCatalogue/VehicleCatalogue";
import { InsuranceCatalog } from "../InsuranceCatalog";

const VehicleCatalogueAndAssignation = () => {

  const [activeTab, setActiveTab] = useState("General");

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
			<Client>
					{activeTab === 'General' && <VehicleCatalogueAndAssignationCatalogue />}
					{activeTab === 'Seguridad' && <InsuranceCatalog />}
			</Client>
			</Compositor>
		</>
		
	);
};

export default VehicleCatalogueAndAssignation;
