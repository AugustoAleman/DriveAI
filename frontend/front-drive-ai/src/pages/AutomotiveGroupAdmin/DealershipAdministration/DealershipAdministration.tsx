import { Container } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { AGADealershipAdminManagers } from "./Partials/AGADealershipAdminManagers";
import { AGADealershipManagment } from "./Partials/AGADealershipManagment";
import { AutomotiveGroupAdminDealershipManagmentRetailer } from "./Partials/AGADealershipAdminRetailer";

const DealershipAdministration = () => {
	const [activeTab, setActiveTab] = useState("Agencias");
	const tabs = ["Agencias", "Gerentes", "Vendedores"];

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
						about="Administración"
						title="Administración general de agencias"
						onTabClick={handleClick}
					/>
				</div>
				{activeTab === "Gerentes" && <AGADealershipAdminManagers />}

				{activeTab === "Agencias" && <AGADealershipManagment />}

				{activeTab === "Vendedores" && (
					<AutomotiveGroupAdminDealershipManagmentRetailer />
				)}
			</Container>
		</>
	);
};

export default DealershipAdministration;
