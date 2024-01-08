import httpInstance from "services/httpInstance";

export const getGeneralAdministration = async (
  idAGA: string,
  option: string
) => {
  let res: any;
  const endpoint = `/v1/user/getAdministration/${idAGA}/${option}`;
  await httpInstance
    .get(endpoint)
    .then((data) => {
      res = data;
    })
    .catch((err) => {
      res = err.response;
    });
  return res;
};
