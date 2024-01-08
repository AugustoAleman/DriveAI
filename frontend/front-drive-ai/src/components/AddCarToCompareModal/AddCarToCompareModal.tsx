import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import VehiclesCatalogRouter from "pages/VehiclesCatalog/VehiclesCatalog";
import { StyledModal } from './styles';

type VehiclesCatalogModalProps = {
  onClose: () => void;
};

const VehiclesCatalogModal: React.FC<VehiclesCatalogModalProps> = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    openModal(); // Open the modal automatically when the component mounts
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(); // Call the onClose callback to handle modal close in the parent component
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <StyledModal
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          position: 'absolute',
          width: '70%',
          height: '70%',
          maxWidth: '95%',
          maxHeight: '97%',
          background: 'white',
          borderRadius: '8px',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
        }}
      >
        <VehiclesCatalogRouter />
      </StyledModal>
    </Modal>
  );
};

export default VehiclesCatalogModal;
