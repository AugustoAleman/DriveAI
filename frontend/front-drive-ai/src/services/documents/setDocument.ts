import httpInstance from "services/httpInstance";

export async function setDocument (
  filePath: string,
  newFile: File | null,
  externalTable: number | null,
  reqDocId: number | null,
) {

  if (!newFile) {
    console.log("No file provided");
    return;
  }

  // Creating body for upload
  // const formData = new FormData();
  // formData.append(file.name, file);
  // const data = { fileName: file.name, file: file };

  const params = { params: {
    filePath,
    newFile,
    externalTable,
    reqDocId
  }}
  
  // const headers = {
  //   'Content-Type': 'multipart/form-data',
  // }

  try {

    const endpoint = `v1/s3/create-update-document/`
    const response: any = await httpInstance.post(endpoint,params);

    return response.data;

  } catch (error) {
    // Handle error
    console.error(error);
    return null;
  }
}