interface ObjectColors {
    color?: string;
    index?: number;
};

/**
 * This interface represents the props for a Car Catalog Card Information component.
 */
export interface CarFavoriteCardInformationProp<T = any, U = any, V = any> {
  
    /**
     * The image URL for the car.
     */
    image?: string;
  
    /**
     * The price of the car.
     */
    price?: number;
  
    /**
     * The brand of the car.
     */
    brand?: string;
  
    /**
     * The sub-brand of the car.
     */
    subbrand?: string;
  
    /**
     * The model of the car.
     */
    model?: number;
  
    /**
     * Variable representing value of monthly payment plan.
     */
    payment?: number;

     /**
     * Variable representing value of monthly payment plan.
     */
     elements?: string[];
  
    /**
     * The function to be called when the favorite button is clicked.
     */
    onClickFavorite?: (value: T) => U;
  
    /**
     * The function to be called when the card is selected.
     */
    onClickSelected?: (value: T) => V;
    /**
     * Variable that indicates state of the favorite button.
     */
    addedToFavorites: boolean;
  }