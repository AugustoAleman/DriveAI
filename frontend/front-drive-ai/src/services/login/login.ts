import Config from "config";
import axios from "axios";
import qs from "qs";

export async function login(email: string, password: string) {
	let data = qs.stringify({
		grant_type: "password",
		client_id: "drive-ai",
		username: email,
		password: password,
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: Config.AUTH_URL,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: data,
	};

	try {
        const response = await axios
            .request(config);

        // Save data to local storage
        const { data: data_2 } = response;
        const { access_token, refresh_token } = data_2;

        return {
            jwtToken: access_token,
            refreshToken: refresh_token,
            email,
        };

    } catch (error) {
        console.log(error);
        return false;
    }
}
