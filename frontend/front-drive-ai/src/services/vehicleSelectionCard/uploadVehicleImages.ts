import httpInstance from "services/httpInstance";

export const saveDTDocumentsUpload = async (filePath: string, formData: FormData) => {
  try {
    const endpoint = `/v1/s3/upload-images?filePath=${filePath}`;
    const response = await httpInstance.post(endpoint, formData);
    return response;
  } catch (error) {
    return error;
  }
};