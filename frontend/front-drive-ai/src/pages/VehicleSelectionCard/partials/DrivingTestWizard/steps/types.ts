import { Dayjs } from "dayjs";
import { DocumentRequiredDto } from "services";

export interface NextPurchaseProps {
    date: Dayjs | null;
    setDate: (value:any) => void;
    //parentUseState: (value:any) => void;
}

export interface BookTestDriveProps {
    date: Dayjs | null;
    setDate: (value:any) => void;
    dealershipvehicleId: number;
}

export interface DocumentUploadProps {
    documentList: string[];
    requiredDocumentsList?: DocumentRequiredDto[]; 
    selectedFilesUseState: Array<File | null>;
    setSelectedFilesUseState: (value: any) => any;
}

//TODO: When validation is ready, stop accepting null dates
export interface ConfirmTestDriveProps {
    bookedDate: Dayjs | null;
    carInfo?:{
        id?:    number;
        brand?: string;
        subBrand?: string;
        model?: string;
        imageUrl?: string;
    }
}
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
