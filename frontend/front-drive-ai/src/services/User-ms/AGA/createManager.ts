import httpInstance from "../../httpInstance";

interface User {
  name: string,
  surname: string,
  email: string,
  telephone: number,
  cellphone: number,
  dateOfBirth: string,
  password: string,
  user_type: string,
  dealershipsIds: number[],
}

export const createManager = async (manager: User) => {
  const endpoint = 'v1/user/create';
  return httpInstance.post(endpoint, { ...manager })
    .then(response => {
      return response.data
    })
    .catch((err) => {
      throw Error(err)
    });
};
