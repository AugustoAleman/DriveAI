import { Address } from "services/User-ms/UserSettings/getUserAddresses";

export interface ProfilePictureProps {
  /**
   * The image url
   */
	userId: number | undefined;
  name: string | null;
  surname: string | null;
  email: string | null;
  cellphone: string | null;
  addresses: Address[] | undefined;
}

export interface ImageContainerProps {
  image: string;
}
