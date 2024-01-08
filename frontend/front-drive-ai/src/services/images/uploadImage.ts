import httpInstance from "services/httpInstance";

export async function uploadImage(
  file: File | null
) {

  if (!file) {
    console.log("No file provided");
    throw new Error("No file provided");
  }

  // Creating body for upload
  const formData = new FormData();
  formData.append(file.name, file);

  const data = { fileName: file.name, file: file };
  const headers = {
    'Content-Type': 'multipart/form-data',
  }

  try {

    const endpoint = `v1/s3/upload-images?filePath=pfp/`
    const response: any = await httpInstance.post(endpoint,data, {headers});

    return response.data;

  } catch (error) {
    // Handle error
    console.error(error);
    return null;
  }
}