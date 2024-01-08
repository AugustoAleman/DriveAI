import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useMediaQuery, Popover } from '@mui/material';
import { SuccessfulPayment } from '../SuccessfulPayment';
import { useLocation } from 'react-router-dom';

interface AppProps {
  showButtonContainer?: boolean; // Optional prop to control the visibility of ButtonContainer
}

const PaymentSummary: React.FC<AppProps> = ({ showButtonContainer = true }) => {
  const selectedValue = localStorage.getItem('selectedValue');
  const selectedMonths = localStorage.getItem('selectedMonths');
  const selectedInsurance = localStorage.getItem('selectedInsurance');
  const location = useLocation();
  const interestRate = location.state?.data.interestRate;

  const isSmallScreen = useMediaQuery('(max-width:769px)');
  const finalPrice = localStorage.getItem('finalPrice');

  // FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  });

  const hitch = Number(finalPrice) * Number(selectedValue) / 100;
  const totalPrice = Number(finalPrice) - hitch;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // Guardar el elemento que disparó el evento
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // Limpiar el estado
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        marginTop={2}
        marginLeft={1}
        width={isSmallScreen ? '100%' : '250px'} // Cambiar el valor del ancho de la tabla
      >
        <TableContainer component={Box} boxShadow={1} borderRadius={4}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Concepto</TableCell>
                <TableCell align="right">Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Enganche</TableCell>
                <TableCell align="right">{formatter.format(hitch)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Seguro de contado</TableCell>
                <TableCell align="right">NA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tasa de interés</TableCell>
                <TableCell align="right">{interestRate}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Plazo</TableCell>
                <TableCell align="right">{selectedMonths} meses</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right">{formatter.format(totalPrice)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Forma de pago</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {showButtonContainer && (
        <Box marginTop={2} marginLeft={1}>
          <Button variant="contained" size="small" onClick={handleClick}> // Añadir la prop size="small" para reducir el tamaño del botón
            Pagar
          </Button>
        </Box>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
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
        <Box width="400px" height="500px" bottom="990px" zIndex={1000}>
          <SuccessfulPayment />
        </Box>
      </Popover>
    </>
  );
};

export default PaymentSummary;
