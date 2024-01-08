
  export interface VehicleDto {
    favoriteId: number;
    dealershipVehicle: {
      dealershipVehicleId: number;
      dealershipId: number;
      dealershipName: string;
      vehicle: {
        vehicleId: number;
        mileage: number;
        performance: number;
        info: string;
        subBrand: {
          subBrandId: number;
          subBrand: string;
          brand: string;
        };
        model: number;
        version: string;
        seats: number;
        transmission: string;
        doors: number;
        fuel: string;
        airbags: number;
        traction: string;
        createdAt: string;
        updatedAt: string ;
        deleted: boolean;
        deletedAt: string ;
      };
      colors: {
        colorId: number;
        color: string;
        createdAt: string;
        updatedAt: string ;
        deleted: boolean;
        deletedAt: string ;
      }[];
      available: boolean;
      price: number;
      salesmanId: number;
      weaviateId: string;
      img_url: string | null;
      createdAt: string;
      updatedAt: string ;
      deleted: boolean;
      deletedAt: string ;
    };
    userId: number;
  }