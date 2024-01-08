
export interface AddManagerModalProps {
  /**
   * Open defines the current state of the modal, if its true then the modal will be open, otherwise it won't
   */
  open: boolean,
  /**
   * Function to clos modal, must be provided by parent component. It's called when the X button is clicked or the user clicks out of the modal.
   */
  handleClose: () => void,
  /**
   * Function to do sth with the input data after the save button is clicked, the closing of the modal can be handled inside by the parent component.
   */
  handleOnSave: (inputs: InputStateProps) => Promise<any>,
  /**
   * Agencies options for dropdown
   */
  onSuccess?: () => void,
}

export interface FetchHandlingType {
  agency: boolean,
  save: boolean
}

export interface AgencyObj {
  value: number,
  label: string,
}


export interface InputStateProps {
  /**
   * Text data of the input Nombre(s)
   */
  name: string,
  /**
   * Text data of the input Apellido
   */
  surname: string,
  /**
   * Text data of the input Agencia
   */
  email: string,
  telephone: number,
  cellphone: number,
  dateOfBirth: string,
  password: string,
  dealershipsIds: number[],
}