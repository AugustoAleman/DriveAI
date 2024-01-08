import { NavbarVertical } from "components/NavbarVertical";
import { Outlet } from "react-router-dom";
import { Container } from "routes/styles";
import AuthorizedRoute from "routes/AuthorizedRoute";

// Import app context
import { useAppContext } from "store/app-context/app-context";

const SalesmanRouter = () => {
	const appContext = useAppContext();

	return (
		<>
			<Container>
				<NavbarVertical
					color="#111D4E"
					rol={appContext.user?.userType}
					width="70px"
					marginIconButt="1rem"
					position="fixed"
				/>
				<AuthorizedRoute
				allowWhenNotLoggedIn={false}
				allowWhenLoggedIn={true}
				requiredRole="SALESMAN"
				>
					<Outlet />
				</AuthorizedRoute>
			</Container>
		</>
	);
};

export default SalesmanRouter;
