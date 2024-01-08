export interface AddDealershipModalProps {
  open: boolean,
  handleClose: () => void,
  handleOnSave: (inputs: InputStateProps) => void,
}
export interface InputAddressStateProps {
  userId: number,
  state: string,
  city: string,
  address: string,
  postal: string,
  isMain: boolean,
  latitude: string,
  longitude: string,
}
export interface InputStateProps {
  name: string,
  address: InputAddressStateProps,
  automotiveGroupId: number,
}