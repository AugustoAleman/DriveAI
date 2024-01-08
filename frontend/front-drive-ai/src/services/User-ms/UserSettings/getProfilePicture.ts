import httpInstance from "services/httpInstance";

export async function getProfilePicture(
    id: number | undefined
) {
  console.log("getProfilePicture", id)
  let res: any;
  const endpoint = `v1/user/profile-picture/${id}`; //Here goes the endpoint to get the drive test
  await httpInstance
    .get(endpoint)
    .then((data) => {
      res = data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res.data;
}