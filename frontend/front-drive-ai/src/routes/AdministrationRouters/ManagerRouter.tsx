import { NavbarVertical } from "components/NavbarVertical";
import { Outlet } from "react-router-dom";
import { Container } from "routes/styles";
import { useAppContext } from "store/app-context/app-context";
import AuthorizedRoute from "routes/AuthorizedRoute";

const ManagerRouter = () => {
	const appContext = useAppContext();

	return (
		<>
			<Container>
				<NavbarVertical
					color="#111D4E"
					rol={appContext.user?.userType}
					width="70px"
					marginIconButt="0.5rem"
					position="fixed"
				/>
				<AuthorizedRoute
				allowWhenNotLoggedIn={false}
				allowWhenLoggedIn={true}
				requiredRole="MANAGER"
				>
					<Outlet />
				</AuthorizedRoute>
			</Container>
		</>
	);
};

export default ManagerRouter;
