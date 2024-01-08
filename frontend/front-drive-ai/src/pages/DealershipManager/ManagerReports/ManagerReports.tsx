import React from "react";
import { Container, Client, useStyles } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { Catalog } from "./Partials/Catalog";
import { DrivingTests } from "./Partials/DrivingTests";
import { Sale } from "./Partials/Sale";
import { Salesmen } from "./Partials/Salesmen";

const ManagerReports = () => {
	const [activeTab, setActiveTab] = useState("Pruebas de manejo");
	const tabs = ["Pruebas de manejo", "Catálogo", "Vendedores", "Venta"];

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
				<div className={classes.StaticHeader}>
					<HeaderAdminCards
						tabs={tabs}
						activeTab={activeTab}
						about="Reportes"
						title="Reportes"
						onTabClick={handleClick}
					/>
				</div>

				{activeTab === "Pruebas de manejo" && <DrivingTests />}

				{activeTab === "Catálogo" && <Catalog />}

				{activeTab === "Vendedores" && <Salesmen />}

				{activeTab === "Venta" && <Sale />}
			</Container>
		</>
	);
};

export default ManagerReports;
