interface ObjectColors {
    color: string;
    index: number;
};

export interface VehicleCatalogProp <T = any, U = any, V = any> {
    /**
     * The list of vehicles
     */
    carlist?:  {dealershipVehicleId: number;
                image: string;
                price: number;
                brand: string;
                subBrand: string;
                model: number;
                dealershipName: string;
                favorite: boolean;
                colors: string[];
                }[];
    vehicleIdSetter?: any,
    isAdmin?: boolean,
    loading?: boolean,
    favorite?: boolean,
    indexToRemoveReference?: (value: number) => void;
    OnButtonClickFavorite?: (value: T) => U;
    OnButtonClickCompare?: (value: T) => U;
    OnButtonClickSelected?: (value: T) => V;
    OnButtonClickDelete?: (value: T) => U;
                
};