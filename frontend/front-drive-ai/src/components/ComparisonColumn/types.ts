export interface ComparisonColProps {
    /**
   * Path for the image displayed on top of the column.
   */
    path: string;
    /**
     * Name of the car being displayed.
     */
    name: string;
    /**
     * Dealership of the car being displayed.
     */
    dealership: string;
    /**
     * Price of the car being displayed. 
     */
    price: string;
    /**
     * Model of the car being displayed.
     */
    model: string;
    /**
     * Transmission type of the car being displayed.
     */
    transmissionType: string;
     /**
     * PaymentPlan type of the car being displayed.
     */
    paymentPlan: string;
    /**
     * Tells whether the car has an available test drive.
     */
    testDriveAvailable: string;
    /**
     * Fuel type of the car being displayed.
     */
    fuelType: string;
    /**
     * Estimated delivery date of the car being displayed.
     */
    deliveryTime: string;
    /**
     * Funcition passed on to the button at the lower end of the column
     */
    onButtonClick?: () => void;

}