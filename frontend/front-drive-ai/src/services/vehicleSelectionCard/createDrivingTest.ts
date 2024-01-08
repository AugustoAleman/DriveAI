import httpInstance from "services/httpInstance";
import { DrivingTestDto } from "./types";

export const createDrivingTest = async (drivingTest: DrivingTestDto) => {
    let res: any;
    const endpoint = `v1/drivingTest/create`;
    await httpInstance.post(endpoint, drivingTest).then((response) => {
        res = response;
    }).catch((err) => {
        res = err.response;
    });
    return res;
}