import { number } from "prop-types";

/**
 * Inteface for defining the VehicleRegistryCard props
 *
 * FIXME Here the props should revice a VehicleRegistry object as prop
 */
export interface VehicleRegistryCardProp {
    onClickSave: () => any;
    onClickClose: () => void;
    type : string;
};

/**
 * Interfaces use for defining the VehicleRegistry data types
 */
export interface VehicleListColors{
    color:          string;
};
export interface RetailerList{
    id:             number;
    assigned:       boolean;
    name:           string; 
};
export interface FinancingPlans{
    id:             number;
    months:         number;
    interests:      number;
    downPayment:    number;
}
export interface LoadedImage{
    id:             number;
    url:            string;
};
export interface VehicleRegistry{
    id:             number;
    brand:          string;
    subbrand:       string;
    model:          number;
    fuel:           string;
    transmision:    string;
    dealership:     string;
    performance:    number;
    mileage:        number;
    traction:       string;
    version:        string;
    airbags:        number;
    doors:          number;
    seats:          number;
    colors:         VehicleListColors[];
    price:          number;
    retailers:      RetailerList[];
    fplans:         FinancingPlans[];
    imgs:           string[];
    active:         boolean;
};

export interface FinancingPlanDto{
    months:number;
    downPayment: number;
    interest:number;
}

export interface VehicleDto{
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
};