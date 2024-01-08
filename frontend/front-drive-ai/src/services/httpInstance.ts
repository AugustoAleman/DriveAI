import Config from "config";
import axios from "axios";

import {refreshSessionToken} from "./session/refreshSession";

const httpInstance = axios.create({
	baseURL: Config.API_URL,

});

// Add a request interceptor
httpInstance.interceptors.request.use(

	async (config) => {
		const newConfig = { ...config };

		// Get the Keycloak access token from the app context
		const jwtToken = sessionStorage.getItem("jwtToken");

		// Add the Keycloak access token to the Authorization header if available
		if (jwtToken) {
			newConfig.headers.Authorization = `Bearer ${jwtToken}`;
		} else {
			console.log(
				"No token found, as there is no user logged in yet. Redirecting to login page."
			);
		}

		return newConfig;
	},
	(error) => {
		console.log("Error in request interceptor");
		console.log(error);
		return Promise.reject(error);
	}

);

// Add a response interceptor
httpInstance.interceptors.response.use(

	(response) => {
		return response;
	},
	async (error) => {
		// Handle specific error conditions, such as unauthorized (401) or token expired (403)
		if (error.response && error.response.status === 401) {
			// TODO: notify the user that he is not authorized to call this endpoint
		} else if (error.response && error.response.status === 403) {
				 await refreshSessionToken();
		}

		return Promise.reject(error);
	}

);

export default httpInstance;
