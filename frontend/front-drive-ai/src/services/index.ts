export { getExample } from "./example/getExample";
export { getRequests } from "./User-ms/SuperUser/getRequests";
export {getActiveSales} from "./User-ms/UserSettings/getActiveSales";
export {getDriveTest} from "./User-ms/UserSettings/getDriveTest";
export {putUserData} from "./User-ms/putUserData";
export {getUserData} from "./User-ms/getUserData";
export {getRequestsById} from "./User-ms/SuperUser/getRequestsById";
export {putRequest} from "./User-ms/SuperUser/putRequest";
export { requestNewPassword } from "./RequestNewPassword/RequestNewPassword";
export { resetPassword } from "./ResetPassword/ResetPassword";
export { getDocumentsById } from "./User-ms/SuperUser/getDocumentsById";

export { getVehicleById } from "./vehicleSelectionCard/getVehicleById";
export { getUserById } from "./ManagerReports/getUserById";
export { getVehiclesByDealershipId } from "./ManagerReports/getVehiclesByDealershipId";
export { uploadImageUrls } from "./vehicleSelectionCard/uploadImageUrls";
export { getAssignedByManager } from "./vehicleSelectionCard/getAssignedByManager";
export { getAssignedBySalesman } from "./vehicleSelectionCard/getAssignedBySalesman";
export { getCatalogueByQuery } from "./vehicleSelectionCard/getCatalogueByQuery";
export type { CarImageList } from "./vehicleSelectionCard/types";

export { postRequest } from "./User-ms/Dealership/postRequest";
export { getProfilePicture } from "./User-ms/UserSettings/getProfilePicture";
export { getVehicleInfoById } from "./vehicleSelectionCard/getVehicleInfoById";
export { getVehiclesLogs } from "./AGARegisters/getVehiclesLogs";
export { createDrivingTest } from "./vehicleSelectionCard/createDrivingTest";
export { setToFavorites } from "./vehicleSelectionCard/setToFavorites";
export { getOccupiedDates } from "./vehicleSelectionCard/getOccupiedDates";
export { getAgencyManager } from "./User-ms/manager/getAgecyManager";
export { createSalesman } from "./User-ms/manager/createSalesman";
export { listAllUsers } from "./User-ms/manager/listAllUsers";
export { getDocumentsLogs } from "./documents/getDocumentsLogs";
export { getCatalogByQuery } from "./example/vehicleService";
export { getUsersLogs } from "./User-ms/SuperUser/getUsersLogs";
export { getRequiredDocumentsDT } from "./vehicleSelectionCard/getRequiredDocumentsDT";
export type { DocumentRequiredDto } from "./vehicleSelectionCard/types";
export { saveDTDocuments } from "./vehicleSelectionCard/saveDTDocuments";
export { saveDTDocumentsUpload } from "./vehicleSelectionCard/uploadVehicleImages";
export { getInsuranceByDealershipId } from "./QuoterWizard/getInsuranceByDealershipId";
export { getDealershipCoords } from "./vehicleSelectionCard/getDealershipCoords";
export type { DealershipCoords } from "./vehicleSelectionCard/types";

export { getCompareCarsList } from "./Compare/getCompareList";
export { getFavorite } from "./Favorites/getFavorite";
export { setFavorite } from "./Favorites/setFavorite";

export { getPendingOrdersFromUser } from "./SalesProcess/getPendingOrdersFromUser";
export { putPlanTypeByUserId } from "./SalesProcess/putPlanTypeByUserId";
export { getSuscriptionByUserId } from "./SalesProcess/getSuscriptionByUserId";
export { getLastTransactionsOfTheSystem } from "./User-ms/SuperUser/getLastTransactionsOfTheSystem";

export { preActivate2FA } from "./Security2FA/PreActivate2FA";
export { activate2FA } from "./Security2FA/activate2FA";
export { verify2FAcode } from "./Security2FA/verify2FAcode";
export { isEnabled } from "./Security2FA/isEnabled";
export { disable2FA } from "./Security2FA/disable2FA";
export { getCredentials } from "./Security2FA/getCredentials";

export { getHistoryPurchase } from "./User-ms/UserSettings/getHistoryPurchase";
export { getActivePurchase } from "./User-ms/UserSettings/getActivePurchase";
export { getDealershipAdministration } from "./User-ms/AGA/getDealershipAdministration";
export {getDrivingTestBySalesman} from "./User-ms/Salesman/getDrivingTestBySalesman";

export { putAddresses } from "./User-ms/UserSettings/putAddresses";
export { getComissionLog } from "./ComissionInfo/getComissionLog";
export { getAllComissionsInfo } from "./ComissionInfo/getAllComissionsInfo";
export { putUpdateCarComission } from "./ComissionInfo/putUpdateCarComission";
export { putUpdatePlanEnterprise } from "./ComissionInfo/putUpdatePlanEnterprise";
export { putUpdatePlanFree } from "./ComissionInfo/putUpdatePlanFree";
export { putUpdatePlanPlus } from "./ComissionInfo/putUpdatePlanPlus";
export { putUpdatePlanPro } from "./ComissionInfo/putUpdatePlanPro";
export { putUpdateRegisterComission } from "./ComissionInfo/putUpdateRegisterComission";
export { putUpdateSaleComission } from "./ComissionInfo/putUpdateSaleComission";
export { registerAutomotiveGroup } from "./User-ms/registerAutomotiveGroup";
export { activateAutomotiveGroup } from "./User-ms/AGA/activateAutomotiveGroup";

export { getDealershipsByManagerId } from "./User-ms/Dealership/getDealershipsByManagerId";
export { getGroupsTransactions } from "./User-ms/SuperUser/getGroupsTransactions";
export { getAllDealerships } from "./User-ms/Dealership/getAllDealerships";
export { getNewUsersCount } from "./User-ms/SuperUser/getNewUsersCount";
export { getDrivingTestsAG } from "./User-ms/SuperUser/getDrivingTestsAG";
export { getAGAdemos } from "./User-ms/AGA/getAGAdemos";
export { getSuperUserTotals } from "./User-ms/SuperUser/getSuperUserTotals";
export { getAGASales } from "./AGARegisters/getAGASales";
export { getAGATotals } from "./User-ms/AGA/getAGATotals";
export { getAGSales } from "./User-ms/AGA/getAGSales";
export { getTransactionsByDealershipId } from "./ManagerReports/getTransactionsByDealershipId";

//Mocks
export { getLastTransactions } from "./User-ms/SuperUser/getLastTrasactions";
export { getBankAccounts } from "./User-ms/manager/getBankAccounts";
export { getBankAccountsHistory } from "./User-ms/manager/getBankAccountsHistory";
export { getSalesProcess } from "./User-ms/manager/getSalesProcess";


export { getSalesmanDemos } from "./User-ms/Salesman/getSalesmanDemos";
export { getSalesmanSales } from "./User-ms/Salesman/getSalesmanSales";
export { getSalesmanTotals } from "./User-ms/Salesman/getSalesmanTotals";
export { getSalesmanSalesProcesses } from "./User-ms/Salesman/getSalesmanSalesProcesses";
