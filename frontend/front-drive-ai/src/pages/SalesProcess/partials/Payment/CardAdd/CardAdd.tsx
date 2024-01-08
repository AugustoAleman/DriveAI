import React, { useState } from 'react';
import { CardContent, Grid, Box, IconButton } from '@mui/material';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CardContainer, CustomerName, PlusIcon } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CardAddProps {
  onAddCard: () => void;
  showPayment: () => void;
}

const CardAdd = ({ onAddCard, showPayment }: CardAddProps) => {
  const handleAddCardClick = () => {
    // Lógica para agregar una nueva forma de pago
    // ...

    // Mostrar el componente de pago
    showPayment();
  };

  return (
    <Grid item xs={12} sm={2} md={4}>
      <CardContainer sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Box flex={2} pl={0.5} pr={5}>
              <Box display="flex" alignItems="center" mb={0.4}>
                <CustomerName variant="subtitle1" style={{ marginTop: '9px' }}>
                  Añadir nueva forma de pago
                </CustomerName>
              </Box>
            </Box>
            <Box pl={2} pr={2}>
              <IconButton aria-label="Añadir tarjeta" onClick={handleAddCardClick}>
                <PlusIcon>
                  <FontAwesomeIcon icon={faPlus} />
                </PlusIcon>
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </CardContainer>
    </Grid>
  );
};

export default CardAdd;
