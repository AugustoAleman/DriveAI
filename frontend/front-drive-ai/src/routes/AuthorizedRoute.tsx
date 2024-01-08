import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "store/app-context/app-context";
import useAuth from "hooks/useAuth";

interface AuthorizedRouteProps {
	children: React.ReactNode;
	requiredRole?: string;
	allowWhenLoggedIn?: boolean;
	allowWhenNotLoggedIn?: boolean;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = props => {
	const { children, requiredRole, allowWhenLoggedIn = false, allowWhenNotLoggedIn = false } = props;
	const isLoading = useAuth();
	const navigate = useNavigate();
	const { user } = useAppContext();

	if (isLoading) return <p>Loading...</p>

	if (!user && !allowWhenNotLoggedIn) { // anonymous user trying to access protected route
		navigate("/");
	}

	if (user && allowWhenLoggedIn) { // If user authenticated and accessing protected routes
		if (requiredRole && user.userType !== requiredRole) { // If user accessing other roles protected routes, redirect
			if (user.userType === "SUPERADMIN") {
				navigate("/super-admin");
			} else if (user.userType === "AGA") {
				navigate("/automotive-group-manager");
			} else if (user.userType === "MANAGER") {
				navigate("/manager");
			} else if (user.userType === "SALESMAN") {
				navigate("/salesman");
			} else {
				navigate("/");
			}
		}
	}

	if (user && !allowWhenLoggedIn) {
		navigate("/");
	}

	return <>{children}</>;
};

export default AuthorizedRoute;
