import httpInstance from "../httpInstance";
import { UserObject } from "store/app-context/types";

export const getUserData = async (email: string | null) => {
	const endpoint = `v1/user/populateWithUserData/${email}`;

	return await httpInstance
		.get(endpoint)
		.then((response) => {
			const res = response.data;

			if (!res) {
				return null;
			}

			const userData: UserObject = {
				id: res.id,
				agId: res.agId,
				name: res.name,
				surname: res.surname,
				email: res.email,
				cellphone: res.cellphone,
				telephone: res.telephone,
				dateOfBirth: res.dateOfBirth,
				address: res.address,
				city: res.city,
				state: res.state,
				postal: res.postal,
				userType: res.userType as UserObject["userType"],
			};

			const mandatoryFields: Array<keyof UserObject> = [
				"id",
				"name",
				"email",
			];
			const optionalFields: Array<keyof UserObject> = [
				"address",
				"city",
				"state",
				"postal",
			];

			for (const key of mandatoryFields) {
				if (
					userData[key] === undefined ||
					typeof userData[key] !== typeof res[key]
				) {
					throw new Error("Invalid user data");
				}
			}

			for (const key of optionalFields) {
				if (
					userData[key] !== undefined &&
					typeof userData[key] !== typeof res[key]
				) {
					throw new Error("Invalid user data");
				}
			}

			return userData;
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
};
