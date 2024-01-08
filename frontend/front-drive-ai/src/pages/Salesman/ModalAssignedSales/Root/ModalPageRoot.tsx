import { Compositor } from "./styles";
import { HeaderAdminCards } from "components/HeaderAdminCards";
import { ModalPage } from "pages/Salesman/ModalAssignedSales/ModalPage";
import { useStyles } from "./styles";
import { useParams, useLocation } from "react-router-dom";

const SalesRepresentativeRoot = () => {
	const { id } = useParams();
	const classes = useStyles();
	const location = useLocation();

	console.log("Data received from params:");
	console.log(location.state.type);
	console.log(location.state.name);

	return (
		<>
			<Compositor>
				<div className={classes.StaticHeader}>
					<HeaderAdminCards
						tabs={null}
						activeTab={null}
						about="Ventas asignadas"
						title="Ventas asignadas"
						description="Aqui puedes observar tus cuentas asignadas"
						onTabClick={() => {}}
					/>
				</div>
				<ModalPage />
			</Compositor>
		</>
	);
};

export default SalesRepresentativeRoot;
