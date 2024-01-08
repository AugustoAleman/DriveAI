export interface FinancingPlanDto {
    // Define the properties of the FinancingPlanDto interface
    // ...
  
    // Example properties:
    name: string;
    interestRate: number;
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