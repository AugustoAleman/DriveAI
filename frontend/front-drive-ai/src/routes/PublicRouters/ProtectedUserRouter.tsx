import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import AuthorizedRoute from "routes/AuthorizedRoute";

const ProtectedUserRouter = () => {
	return (
		<>
			<Header />
			<AuthorizedRoute
				allowWhenNotLoggedIn={true}
				allowWhenLoggedIn={false}
			>
				<Outlet />
			</AuthorizedRoute>
			<Footer />
		</>
	);
};

export default ProtectedUserRouter;
