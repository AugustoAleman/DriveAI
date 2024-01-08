export interface VehicleDto {
  dealershipId: number;
  dealershipVehicleId: number;
  subBrand: string;
  dealershipName: string;
  price: string;
  model: string;
  version: string;
  fuel: string;
  transmission: string;
  mileage: number;
  traction: string;
  downPayment: number;
  image_url: string;
  colors: {
    colorId: number;
    color: string;
    createdAt: string;
    updatedAt: string | null;
    deleted: boolean;
    deletedAt: string | null;
  }[];
  brand: string;
}
