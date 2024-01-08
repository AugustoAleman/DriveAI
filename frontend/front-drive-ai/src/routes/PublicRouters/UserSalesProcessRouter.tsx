import { Header } from "components/Header";
import { Outlet } from "react-router-dom";
import AuthorizedRoute from "routes/AuthorizedRoute";

const UserSalesProcessRouter = () => {
    return (
        <>
            <Header />
            <AuthorizedRoute
		    		allowWhenNotLoggedIn={false}
		    		allowWhenLoggedIn={true}
		    >
		        <Outlet />
		    </AuthorizedRoute>
        </>
    );
};

export default UserSalesProcessRouter;
