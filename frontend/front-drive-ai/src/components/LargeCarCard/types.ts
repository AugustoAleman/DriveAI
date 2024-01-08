import { ReactNode } from "react";

export interface LargeCarCardProp {

    /** 
     * The variant of the card to be rendered.
     * */
    variant?: | 0 | 1;

    /** 
     *  Size of the Component
     */
    size?: | 'small' | 'normal' | 'large';

    /**
     * The image to be displayed in the card.
     * */
    image?: string;

    /**
     * The name of the brand of the car.
     * */
    brand?: string;

    /**
     * The name of the model of the car.
     * */
    model?: string;

    /**
     * The year of the car.
     * */
    year?: string;

    /**
     * The type of fuel of the car.
     * */
    fuelType?: | "Gasolina" | "Eléctrico" | "Híbrido";

    /**
     * The price of the car.
     * */
    price?: number;

    /**
     *  The amount to pay in installments for the car.
     * */
    installments?: number;

    /**
     * The pruchase date of the car.
     * */
    purchaseDate?: string;

    /**
     * The seller in charge of the car.
     * */
    seller?: string;

    /**
     * The location of the process for the car.
     * */
    location?: string;

    /**
     * The time appointed for the car test drive.
     * */
    time?: string;

    /**
     * The status of the document process.
     * */
    documentStatus?: string;

    /**
     * The status of the drive test for the car.
     * */
    driveTestStatus?: string;

    /**
     * The status of the sale process.
     * */
    saleStatus?: string;

    /**
     * The function to be executed when the card is clicked.
     * */
    onCardClick?: () => void;

    /**
     * The function to be executed when the drive test button is clicked.
     * */
    onDriveTestClick?: () => void;

    /**
     * The function to be executed when the price button is clicked.
     * */
    onPriceClick?: () => void;

    /**
     * The function to be executed when the compare button is clicked.
     * */
    onCompareClick?: () => void;    

    // Styles

    /**
     * height of the component
     * */
    height?: string;

    /**
     * width of the component
     * */
    width?: string;

    /**
     * The primary font size of the component.
     * */
    primaryFont?: number;

    /**
     * The secondary font size of the component.
     * */
    secondaryFont?: number;

    /**
     * The tertiary font size of the component.
     * */
    tertiaryFont?: number;

    /**
     * image size of the component
     * */
    imageWidth?: string;

    /**
     * image height of the component
     * */
    contentWidth?: string;
}

export interface ColSettingsProp {

    allignment: string;
    padding: string;
    width: string;

}

export interface ComponentSize {
    height?: string;
    width?: string;
    direction?: string;
    sx?: any;
}

export interface AppearanceProps {
    primaryFont: number,
    secondaryFont: number,
    tertiaryFont: number,
    width: string,
    height: string
}