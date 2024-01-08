import axios from "axios";
import qs from "qs";

export const refreshSessionToken = async () => {
  let refreshToken = sessionStorage.getItem("refreshToken");
  let email = sessionStorage.getItem("email");

  if (refreshToken) {
    const data = qs.stringify({
      grant_type: "refresh_token",
      client_id: "drive-ai",
      refresh_token: refreshToken,
      username: email,
    });

    axios.post("https://auth-drive-ai.applab.mx/auth/realms/drive-ai/protocol/openid-connect/token", data)
      .then(response => {

		// Check if the sessions will be kept alive or not
		if (localStorage.getItem("keepLogged") === "true") {
			// If the session will be kept alive then also update the local storage data
			localStorage.setItem("jwtToken", response.data.access_token);
			localStorage.setItem("refreshToken", response.data.access_token);
		}

		// At any rate, change the session storage data to the new tokens
        sessionStorage.setItem("jwtToken", response.data.access_token);
        sessionStorage.setItem("refreshToken", response.data.refresh_token);
      })
      .catch(err => console.error(err))

  }
}
