import httpInstance from "services/httpInstance";

export const getNotificationList = async () => {
  const endpoint = `/v1/notifications/list`;
  return await httpInstance
    .get(endpoint)
    .then((response) => response && response.data)
    .catch((err) => console.error(err));
};
