import { Compositor } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
// import { SalesRepresentativeAccountSecurity } from "pages/Salesman/Account/SalesRepresentativeAccountSecurity";
import { AdminConfigurationPage } from "components/AdminConfigurationPage";
import { AdminSecurityPage } from "components/AdminSecurityPage";
import { useState } from "react";
import { useStyles } from "./styles";

// Use application context
// import { useAppContext } from "store/app-context/app-context";

const SalesRepresentativeRoot = () => {
	// const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("General");
	const classes = useStyles();
	const tabs = ["General", "Seguridad"];

	// Use app context
	// const appContext = useAppContext();

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
				{activeTab === "Seguridad" && (
					<AdminSecurityPage />
				)}
			</Compositor>
		</>
	);
};

export default SalesRepresentativeRoot;
