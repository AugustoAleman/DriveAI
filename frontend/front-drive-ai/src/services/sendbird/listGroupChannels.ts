import httpInstance from "../httpInstance";

export const listGroupChannels = async (userSendbirdId: string, vendorSendbirdId: string) => {
  const endpoint = `https://api-${process.env.REACT_APP_SENDBIRD_APP_ID}.sendbird.com/v3/group_channels?members_exactly_in=${userSendbirdId}, ${vendorSendbirdId}`;
  return await httpInstance
    .get(endpoint)
    .then(res => {
      return res && res.data
    })
    .catch((err) => {
      return err
    });
};