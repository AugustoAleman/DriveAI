import { Container, useStyles } from "./styles";
import { useState } from "react";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { BankAccountsList } from "components/BankAccountsList";

const DealershipAccountAdministration = () => {
	const [activeTab, setActiveTab] = useState("Cuentas");
	const tabs = ["Cuentas"];
	const classes = useStyles();

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
				<div className={classes.StaticHeader}>
					<HeaderAdminCards
						tabs={tabs}
						activeTab={activeTab}
						about="Gestión de cuentas"
						title="Gestión de cuentas por agencia"
						onTabClick={handleClick}
					/>
				</div>
				{activeTab === "Cuentas" && <BankAccountsList />}
			</Container>
		</>
	);
};

export default DealershipAccountAdministration;
