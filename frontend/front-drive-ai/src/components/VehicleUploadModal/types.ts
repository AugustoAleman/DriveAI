import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { UserObject } from "store/app-context/types";

export interface VehicleUploadProps {
    toUpdate?: boolean;
    userType: "salesman" | "manager";
    selectecDealershipVehicleId?:number;
    setCloseModal:() => void;
};

export interface StepOneProps {
    states?:any;
    salesList?: any;
    user: UserObject | null | undefined
    userType: any;
    formData: any;
    dealership: any;
    imageFormData: any;
    imageList: any[];
    setImageList: (arg: any) => any;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (event: SelectChangeEvent<string>) => void;
};
export interface StepTwoProps {
    states?:any;
    user: UserObject | null | undefined
    userType: any;
    formData: any;
    fuel: any;
    transmision: any;
    traction: any;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (event: SelectChangeEvent<string>) => void;

    listColors: string[];
    setListColors: (arg: any) => any;
};
export interface ColorListPickerProps {
    listColors: string[];
    setListColors: (arg: any) => any;
};
export interface StepThreeProps {
    downPayment0?:any;
    downPayment1?:any;
    downPayment2?:any;
    downPayment3?:any;
    downPayment4?:any;
    interest0?:any;
    interest1?:any;
    interest2?:any;
    interest3?:any;
    interest4?:any;
    states?:any;
    user: UserObject | null | undefined
    userType: any;
    formData: any;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (event: SelectChangeEvent<string>) => void;
};
export interface ImageUploaderProps {
    imageFormData: any;
    imageList: any[];
    setListImage: (arg: any) => any;
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