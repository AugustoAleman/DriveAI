import React from "react";

export type UserObject = {
	id: number;
	agId: number;
	name: string;
	surname: string;
	email: string;
	cellphone: string;
	telephone: string;
	dateOfBirth: string;
	address: string;
	city: string;
	state: string;
	postal: string;
	userType:
		| "SALESMAN"
		| "MANAGER"
		| "AGA"
		| "SUPERADMIN"
		| "CLIENT"
		| undefined;
};

export type AppState = {
	user: UserObject | undefined | null;
	setUser: (user: UserObject | null) => void;
	loggedIn: boolean;
	profilePicture: string | undefined | null;
	setProfilePicture: (profilePicture: string| null) => void;
	setLoggedIn: (loggedIn: boolean) => void;
	jwtToken: string | undefined | null;
	setJwtToken: (jwtToken: string | null) => void;
	refreshToken: string | undefined | null;
	setRefreshToken: (refreshToken: string | null) => void;
};

export type AppContextProps = {
	children: React.ReactNode;
};
