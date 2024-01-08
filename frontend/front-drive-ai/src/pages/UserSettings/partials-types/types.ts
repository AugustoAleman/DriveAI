export interface GenericCarInfoProps {
    image: string;
    brand: string;
    model: string;
    year: string;
    fuelType?: | "Gasolina" | "Eléctrico" | "Híbrido";
    price?: number;
    installments?: number;
    purchaseDate?: string;
    seller: string;
    location: string;
    time?: string;
    documentStatus?: string;
    driveTestStatus?: string;
    saleStatus?: string;
}

export interface CurrentSellsProps {
    image: string;
    brand: string;
    model: string;
    year: string;
    price: number;
    seller: string;
    location: string;
    documentStatus: string;
    saleStatus: string;
}

export interface HistoricSellsProps {
    image: string;
    brand: string;
    model: string;
    year: string;
    price: number;
    seller: string;
    location: string;
    saleDate: string;
}

export interface UserInfoProps {
    name: string;
    surname: string;
    email: string;
    phone: string;
    addresses: AddressProps[];
    photo: string;
}

export interface AddressProps {
    state: string;
    city: string;
    street: string;
    number: string;
    zipCode: string;
    appartment: string;
    main: boolean;
}
