import { Client, Compositor } from "../styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { useState } from "react";
import { InsuranceCatalog } from "../InsuranceCatalog";
import VehicleCatalogueAndAssignationCatalogue from "../VehicleCatalogue/VehicleCatalogue";
import { Container } from "../styles";

const VehicleCatalogueAndAssignationPage = () => {
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

	return (
		<>
			<Container>
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 70,
						right: 0,
						zIndex: 20, // To make sure it stays on top of other elements
						background: "white",
					}}
				>
					<HeaderAdminCards
						tabs={tabs}
						activeTab={activeTab}
						about="Catálogo de vehículos por agencia"
						title="Administración de vehículos y seguros"
						onTabClick={handleTabClick}
					/>
				</div>
				{activeTab === "Catálogo" && (
					<VehicleCatalogueAndAssignationCatalogue />
				)}
				{activeTab === "Planes y Seguros" && <InsuranceCatalog />}
			</Container>
		</>
	);
};

export default VehicleCatalogueAndAssignationPage;
