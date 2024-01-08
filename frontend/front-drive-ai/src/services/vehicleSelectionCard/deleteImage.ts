import httpInstance from "services/httpInstance";



export const deleteImage = async (urlD : string) => {
    let res: any;
    
    const objeto = { url: urlD };

    const endpoint = `v1/vehicle/deleteImageByUrl`;
    await httpInstance
        .post(endpoint,objeto)
        .then((data) => {
            res = data
        })
        .catch((err) => {
            res = err.response;
        });
        return res;
} 