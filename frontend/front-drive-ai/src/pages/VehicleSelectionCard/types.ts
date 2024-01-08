import { Dayjs } from "dayjs";

export interface DrivingTestDto {
  drivingTestId: number;
  userId: number;
  dealershipVehicleId: number;
  schedule: Date;
  tentativeBuyingDate: Date;
  status: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
export interface FinancingPlanDto{
  months:number;
  downPayment: number;
  interest:number;
}

type DealershipLocation = {
  id: number;
  userId: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  state: string;
  city: string;
  address: string;
  postal: string;
  no_appartment: string | null;
  date_from: Date | null;
  date_to: Date | null;
  is_deleted: boolean;
  main: boolean;
};
export interface ImageDto {
  imageId: number;
  url: string;
  dealershipVehicleId: number;
  deleted: boolean;
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
    imageList: ImageDto[];
    favorite?: boolean;
    dealershipLocation: DealershipLocation;
  
    weaviate_id?: string;
    img_url?: string;
  }

  export interface TicketData {
    marca:string | undefined;
    submarca:string | undefined;
    modelo:string | undefined;
    fecha:Dayjs | null;
    image:string | undefined;
  }