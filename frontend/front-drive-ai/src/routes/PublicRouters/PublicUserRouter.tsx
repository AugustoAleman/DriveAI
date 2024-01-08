import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import AuthorizedRoute from "routes/AuthorizedRoute";

const PublicUserRouter = () => {
	return (
		<>
			<Header />
			<AuthorizedRoute
				allowWhenNotLoggedIn={true}
				allowWhenLoggedIn={true}
			>
				<Outlet />
			</AuthorizedRoute>
			<Footer />
		</>
	);
};

export default PublicUserRouter;
