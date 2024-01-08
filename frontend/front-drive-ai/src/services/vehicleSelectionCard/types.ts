import { Dayjs } from "dayjs";

export interface DrivingTestDto {
    drivingTestId?: number;
    userId?: number;
    dealershipVehicleId?: number;
    schedule?: Dayjs | null;
    tentativeBuyingDate?: Dayjs | null;
    status?: string;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
}
export interface FinancingPlanDto{
  months:number;
  downPayment: number;
  interest:number;
}
  
export interface VehicleDto {
    // Define the properties of the VehicleDto interface
  
    // Example properties:
    vehicleId?: number;
    mileage?: number;
    performance?: number;
    info?: string;
    subBrand?: string;
    brand?: string;
    colors?: string[];
    model?: number;
    version?: string;
    seats?: number;
    transmission?: string;
    doors?: number;
    fuel?: string;
    airbags?: number;
    traction?: string;
    price?: number;
    dealershipName?: string;
    dealershipId?: number;
    salesManId?: number;
    financingPlans?: FinancingPlanDto[];
    favorite?: boolean;
  
    weaviate_id?: string;
    img_url?: string;
  }

  export interface VehicleDto2 {
    // Define the properties of the VehicleDto interface
  
    // Example properties:
    vehicleId : number | null;
    mileage: number;
    performance: number;
    info: string;
    subBrand: string;
    brand: string;
    colors: string[];
    model: number;
    version: string;
    seats: number;
    transmission: string;
    doors:number;
    fuel: string;
    airbags: number;
    traction:string;
    price: number;
    dealershipName: string;
    dealershipId:number;
    salesManId:number;
    financingPlans:FinancingPlanDto[];
    favorite: boolean;
    weaviate_id: string;
    img_url: string;
  }

export type CarImage = {
  name: null | string;
  key: string;
  url: string;
};
  
export type CarImageList = CarImage[];

export interface DocumentRequiredDto {
    documentRequiredId?: number;
    externalId?: number;
    externalTable?: string;
    documentName?: string;
    documentNote?: string;
    documentFormat?: string;
    processType?: string;
    createdAt?: string; // Assuming the usage of ISO 8601 formatted string for timestamps
    updatedAt?: string; // Assuming the usage of ISO 8601 formatted string for timestamps
    isDeleted?: boolean;
    deletedAt?: string | null; // Assuming the usage of ISO 8601 formatted string or null for the deletedAt field
}
  
export interface DealershipCoords {
  longitude: string;
  latitude: string;
};