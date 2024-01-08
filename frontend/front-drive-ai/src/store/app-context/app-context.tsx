import {createContext, useContext, useEffect, useState} from "react";
import { AppContextProps, AppState, UserObject } from "./types";
import {CircularProgress} from "@material-ui/core";
import Backdrop from '@mui/material/Backdrop';
import {getUserData} from "../../services";

const AppContext = createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProps) => {
	const [user, setUser] = useState<UserObject | undefined | null>();
	const [profilePicture, setProfilePicture] = useState<string | undefined | null>();
	const [jwtToken, setJwtToken] = useState<string | undefined | null>();
	const [refreshToken, setRefreshToken] = useState<string | undefined | null>();
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchData = () => {
			const email = localStorage.getItem("email");
			const jwtToken = localStorage.getItem("jwtToken");

			if (jwtToken && email) {
				setIsLoading(true);
				getUserData(email)
					.then((data) => {
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

		fetchData();
	}, []);

	if (isLoading) return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				loggedIn,
				setLoggedIn,
				jwtToken,
				setJwtToken,
				refreshToken,
				setRefreshToken,
				profilePicture,
				setProfilePicture,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error(
			"useAppContext must be used within a AppContextProvider"
		);
	}

	return context;
};
