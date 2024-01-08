interface ObjectColors {
    color?: string;
    index?: number;
};

/**
 * This interface represents the props for a Car Catalog Card Information component.
 */
export interface CarCatalogCardInformationProp<T = any, U = any, V = any> {
    /**
     * The index of the card.
     */
    index?: number;
  
    /**
     * Whether the user is an admin or not.
     */
    isAdmin?: boolean;
  
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
     * The name of the dealership where the car is located.
     */
    dealership?: string;
  
    /**
     * An array of available colors for the car.
     */
    colors?: ObjectColors[];
  
    /**
     * The function to be called when the favorite button is clicked.
     */
    onClickFavorite?: (value: T) => U;
  
    /**
     * The function to be called when the compare button is clicked.
     */
    onClickCompare?: (value: T) => U;
  
    /**
     * The function to be called when the card is selected.
     */
    onClickSelected?: (value: T) => V;
  
    /**
     * The function to be called when the delete button is clicked.
     */
    onClickDelete?: any;
  }