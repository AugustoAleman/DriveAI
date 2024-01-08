export interface ModalProps {
  /**
   * Open defines the current state of the modal, if its true then the modal will be open, otherwise it won't
   */
  open: boolean,
  /**
   * Function to clos modal, must be provided by parent component. It's called when the X button is clicked or the user clicks out of the modal.
   */
  handleClose: () => void,

  /**
   * Function to clos modal, must be provided by parent component. It's called when the X button is clicked or the user clicks out of the modal.
   */
  handleOnSave?: () => void,

  /**
  * This is the children of the modal, it can be anything, but it's recommended to use the Input component
  */
  children?: React.ReactNode
}
