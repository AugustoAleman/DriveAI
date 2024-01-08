import { ChangeEvent } from "react";

export interface UserAddressProps {
	/**
	 * Is it main  ?
	 */
	main?: true | false;

	/**
	 * Placeholder for state
	 */
	state?: string;

	/**
	 * Placeholder for city
	 */
	city?: string;

	/**
	 * Placeholder for city
	 */
	address?: string;

	/**
	 * Placeholder for city
	 */
	postal?: string;

	/**
	 * A function that will be called when the component is clicked.
	 */
	onClick?: () => void;

	/**
	 * A function that will be called when the component is clicked.
	 */
	onRemove?: () => void;

	/**
	 * Functions that will be called when the component is clicked.
	 */
	onAddressChange: (e: ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Functions that will be called when the component is clicked.
	 */
	onStateChange: (e: ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Functions that will be called when the component is clicked.
	 */
	onCityChange: (e: ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Functions that will be called when the component is clicked.
	 */
	onPostalChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
