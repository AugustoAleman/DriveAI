import httpInstance from "services/httpInstance";

import { VehicleDto } from "pages/DealershipManager/VehicleCatalogueAndAssignation/VehicleCatalogue/partial/VehicleRegistryCard/types";



export const createVehicle = async (vehicleData: VehicleDto) => {
    let res: any;
    const endpoint = "/v1/vehicle/create";
    await httpInstance.post(endpoint, vehicleData).then((response) => {
      res = response;
    }).catch((err) => {
      res = err.response;
    });
    return res;
  }