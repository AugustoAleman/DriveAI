import React, { useEffect, useState } from 'react';
import { CardContent, Grid, Box, CircularProgress, Tooltip, Typography, Popover, Stack, Alert } from '@mui/material';
import { faTrashAlt, faCartArrowDown, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { CardListProps, Card } from './types';
import {
  CardContainer,
  CardIcon,
  CustomerName,
  CardNumber,
  DeleteButton,
} from './styles';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SuccessfulPayment } from 'pages/SalesProcess/partials/SuccessfulPayment';

const ConfirmButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  margin-left: 3px;
  margin-right:-18px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmationIcon = styled.div`
  color: green;
  margin-right: 10px;
  margin-left: 85px;
`;

const CancelButtonWrapper = styled.button`
  background-color: transparent;
  color: red;
  border: none;
  padding: 1px .01px; /* Ajusta el padding para hacer el botón más pequeño */
  margin-left: 8px;
  margin-right: 3px;

  cursor: pointer;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: dark;
  }
`;

const LoaderContainer = styled.div`
  color: green;
  margin-right: 25px;
  margin-left: 30px;
`;

const Exp = styled(Typography)`
  font-size: 1px;
  margin-top: 1px;
  font-weight: 700;
`;

const CardContentWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const CardNumberWrapper = styled(Box)`
  flex: auto;
  padding-left: 40px;
  padding-right: 8px;
`;

const ExpWrapper = styled(Box)`
  flex: 2;
  padding-left: 40px;
  padding-right: 2px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

interface ConfirmButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  loading: boolean;
}

interface CancelButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, children, loading }) => (
  <ConfirmButtonWrapper onClick={onClick} disabled={loading}>
    {loading ? <CircularProgress size={16} color="inherit" /> : children}
  </ConfirmButtonWrapper>
);

const CancelButton: React.FC<CancelButtonProps> = ({ onClick, children }) => (
  <CancelButtonWrapper onClick={onClick}>{children}</CancelButtonWrapper>
);

const CreditCardSelect = ({ cards, onDeleteCard }: CardListProps) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [showConfirmationIcon, setShowConfirmationIcon] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCancelTooltip, setShowCancelTooltip] = useState(false);
  const [counter, setCounter] = useState(10); // Estado para el contador
  const [open, setOpen] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const handleDeleteClick = (card: Card) => {
    setSelectedCard(card);
    setShowConfirmationIcon(false);
    setShowCancelButton(true);
  };

  const handlePaymentConfirmation = async (card: Card) => {
    console.log('Pago confirmado para la tarjeta:', card.id);
    setPaymentConfirmed(true);
    setLoading(true);

    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 8000));

    setLoading(false);
    setShowConfirmationIcon(true);
    setShowCancelButton(true);
  };

  const handleCancelClick = () => {
    setSelectedCard(null);
    setShowConfirmationIcon(false);
    setShowCancelButton(false);
    resetCounter(); // Reiniciar el contador
  };
  const callApi = async (paymentMethodId: string, price: number | undefined) => {
    try {
      const response = await fetch(`http://localhost:5252/create-payment-intent2?paymentMethodId=${paymentMethodId}&price=${price}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Solicitud exitosa a la URL después de confirmar el pago');
      } else {
        console.log('Error en la solicitud a la URL después de confirmar el pago');
      }
    } catch (error) {
      console.log('Error en la solicitud a la URL después de confirmar el pago:', error);
    }
  };
  
  const resetCounter = () => {
    setCounter(10);
  };

  useEffect(() => {
    if (paymentConfirmed && counter === 0) {
      setShowConfirmationIcon(true);
    }
  }, [paymentConfirmed, counter]);

  useEffect(() => {
    if (paymentConfirmed && selectedCard && !showConfirmationIcon) {
      callApi(selectedCard.paymenId,2000);
    }
  }, [paymentConfirmed, selectedCard]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
    } else {
      resetCounter(); // Reiniciar el contador cuando no hay carga
    }

    return () => {
      clearInterval(interval);
    };
  }, [loading]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // Guardar el elemento que disparó el evento
    setAnchorEl(event.currentTarget);
  };



  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container spacing={2}>
       {paymentConfirmed && showConfirmationIcon && (

<Stack spacing={2} sx={{ width: '100%' }}>
<Alert severity="success">Tu pago ha sido exitoso, puedes continuar con el proceso!</Alert>
</Stack>)}
      {cards.map((card: Card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <CardContainer>
            <CardContent>
              <Box display="flex" alignItems="center">
                {card.icon ? (
                  <CardIcon icon={card.icon} />
                ) : (
                  <CardIcon icon="defaultIcon" />
                )}

                <CardContentWrapper>
                  <CardNumberWrapper>
                    <Box display="center" alignItems="center" mb={0.1}>
                      <CustomerName variant="subtitle1">
                        {card.customerName}
                      </CustomerName>
                    </Box>
                    <Box display="flex" alignItems="center" mb={0.1}>
                      <CardNumber variant="h6">
                        **** **** **** {card.last4}
                      </CardNumber>
                    </Box>
                  </CardNumberWrapper>
                  <ExpWrapper>
                    <Box display="flex" alignItems="center" mb={0.1}>
                      <Exp variant="subtitle2" color="error">
                        Exp: {card.exp_month}/{card.exp_year}
                      </Exp>
                    </Box>
                  </ExpWrapper>
                  {selectedCard === card ? (
                    showConfirmationIcon ? (
                      <ConfirmationIcon>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </ConfirmationIcon>
                    ) : (
                      <>
                        {showCancelButton && (
                          <ButtonContainer>
                            <LoaderContainer>
                              {loading ? (
                                <>
                                <Typography variant="caption" color="textSecondary" style={{ fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
  {`Cancelar: ${counter}s  `}
  <div style={{ marginLeft: "5px" }}>
    <CircularProgress size={18} color="success" />
  </div>
</Typography>
                                </>
                              ) : (
                                <ConfirmButton
                                  onClick={() => handlePaymentConfirmation(card)}
                                  loading={loading}
                                >
                                  {loading ? 'Cargando...' : 'Confirmar pago'}
                                </ConfirmButton>
                              )}
                            </LoaderContainer>
                            <Tooltip title="Cancelar pago" placement="top">
                              <CancelButton onClick={handleCancelClick}>
                                <FontAwesomeIcon icon={faTimesCircle} />
                              </CancelButton>
                            </Tooltip>
                          </ButtonContainer>
                        )}
                      </>
                    )
                  ) : (
                    <DeleteButton
                      icon={faCartArrowDown}
                      aria-label="Eliminar tarjeta"
                      onClick={() => handleDeleteClick(card)}
                      style={{ marginRight: '20px' }}
                    />
                  )}
                </CardContentWrapper>
              </Box>
            </CardContent>
          </CardContainer>
          {paymentConfirmed && showConfirmationIcon && (
            
            <Popover
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              sx={{
                bottom: '-50px',
                position: 'absolute',
                left: '10px',
                zIndex: '9999',
              }}
            >
              <Box width="500px" height="500px">
                <SuccessfulPayment />
              </Box>
            </Popover>
          
          )}        </Grid>
      ))}
       
       
    </Grid>
    
    
  );
 
};

export default CreditCardSelect;
function setOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}

