import httpInstance from "../httpInstance";

interface User {
	name?: string;
	surname?: string;
	email?: string;
	cellphone?: string;
	telephone?: string;
	address?: string;
	city?: string;
	state?: string;
	postal?: string;
}

export const putUserData = async (email: string | undefined, user: User) => {
	// Ignore empty fields
	const userToPut: Partial<User> = Object.keys(user).reduce((acc, key) => {
		if (user[key as keyof User]) {
			acc[key as keyof User] = user[key as keyof User];
		}
		return acc;
	}, {} as Partial<User>);

	return await httpInstance
		.patch(`/v1/user/update/${email}`, userToPut)
		.then((response) => {
			console.log("Response data");
			console.log(response.data);
			return response.data;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
};
