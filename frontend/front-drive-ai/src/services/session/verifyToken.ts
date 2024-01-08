import httpInstance from "../httpInstance";

export const verifyToken = async () => {
    return await httpInstance.get("https://auth-drive-ai.applab.mx/auth/realms/drive-ai/protocol/openid-connect/userinfo")
}
