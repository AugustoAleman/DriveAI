import { Dayjs } from "dayjs";

export interface DrivingTestWizardProps<T = any, U = any, V = any> {
    carInfo?:{
        id?: number;
        brand?: string;
        subBrand?: string;
        model?: string;
        imageUrl?: string;
    }
    onSend: (value: T) => U;
    
}

export interface StepperProps {
    parentUseState: (value:any) => void;
}
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