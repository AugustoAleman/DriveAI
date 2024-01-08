import { useEffect, useState } from "react";
import { useAppContext } from "store/app-context/app-context";
import { getUserData } from "services/User-ms/getUserData";
import { verifyToken } from "../services/session/verifyToken";
import { useNavigate } from "react-router-dom";
import { refreshSessionToken } from "../services/session/refreshSession";

const useAuth = () => {
	const appContext = useAppContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = () => {
			const email = sessionStorage.getItem("email");
			const jwtToken = sessionStorage.getItem("jwtToken");
			const { setUser, setLoggedIn } = appContext;

			if (jwtToken) {
				setIsLoading(true);
				getUserData(email)
					.then((data) => {
						console.log("User data has been fetched");
						console.log(data);
						data && setUser(data);
						data && setLoggedIn(true);
						setIsLoading(false);
					})
					.catch((err) => {
						setIsLoading(false);
						console.error(err);
					});
			}
		};

		// Check if user is meant to be kept logged in or not
		if (localStorage.getItem("keepLogged") === "true") {
			// User is meant to be kept logged in therefore loading the data from the local storage and setting it to the sessionStorage
			sessionStorage.setItem(
				"jwtToken",
				localStorage.getItem("jwtToken") || ""
			);
			sessionStorage.setItem(
				"refreshToken",
				localStorage.getItem("refreshToken") || ""
			);
			sessionStorage.setItem(
				"email",
				localStorage.getItem("email") || ""
			);
		}

		// If the user is logged in then we have to verify the token, if it is still valid or not
		if (sessionStorage.getItem("jwtToken") === null) {
			console.log("User is not logged in yet!");
			return;
		}

		// Else the user is logged in and we have to verify the token
		verifyToken()
			.then(() => {
				console.log("Token is still valid");
				fetchData();
			})
			.catch(() => {
				refreshSessionToken().then(() => fetchData());
			});
	}, []);

	return isLoading;
};

export default useAuth;
