import { GenericModalBox, backdropStyles } from "./styles";
import { ModalProps } from "./types";
import { Modal } from "@mui/material";

const GenericModal: React.FC<ModalProps> = props => {
  const { children, open = false, handleClose, handleOnSave } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      className="add-manager-modal"
      disableAutoFocus
      slotProps={backdropStyles}
	  sx={{
	  backgroundColor: "rgba(0, 0, 0, 0.5)",
	  }}
    >
      <GenericModalBox>
		{children}
      </GenericModalBox>
    </Modal>
  )
};

export default GenericModal;
