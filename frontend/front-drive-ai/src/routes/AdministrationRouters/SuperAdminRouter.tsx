import { Outlet } from "react-router-dom";
import { NavbarVertical } from "components/NavbarVertical";
import { Container } from "routes/styles";
import AuthorizedRoute from "routes/AuthorizedRoute";
import { useAppContext } from "store/app-context/app-context";

const SuperAdminRouter = () => {
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
				requiredRole="SUPERADMIN"
				>
					<Outlet />
				</AuthorizedRoute>
			</Container>
		</>
	);
};

export default SuperAdminRouter;
