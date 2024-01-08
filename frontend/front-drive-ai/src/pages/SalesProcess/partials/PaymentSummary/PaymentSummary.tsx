import React, { useState } from 'react';
import { Card } from 'components/Card';
import { Grid, Container } from "@material-ui/core";
import { CardSummary, BoxOffer, TableSumarry, TDSummary, THSummary, ButtonPay, ButtonContainer, PaymentConatiner } from './styles';
import { useMediaQuery, Popover, Button } from '@mui/material';
import { SuccessfulPayment } from '../SuccessfulPayment';
import { useLocation } from 'react-router-dom';
import {Payment} from  '../Payment';


interface AppProps {
  showButtonContainer?: boolean; // Optional prop to control the visibility of ButtonContainer
}

const PaymentSummary: React.FC<AppProps> = ({ showButtonContainer = true }) => {

  //SMALL SCREEN
  const isSmallScreen = useMediaQuery('(max-width:769px)');
  //GET ITEM
  const selectedOption = localStorage.getItem('selectedOption');
  let finalPrice, selectedDownPayment, selectedMonths, selectedInsurance;
  //PAYMENT TYPE
  if (selectedOption === 'Plan de contado') {
    finalPrice = localStorage.getItem('finalPrice');
  } else if (selectedOption === 'Plan de financiamiento') {
    finalPrice = localStorage.getItem('finalPrice');
    selectedDownPayment = localStorage.getItem('selectedDownPayment');
    selectedMonths = localStorage.getItem('selectedMonths');
    selectedInsurance = localStorage.getItem('selectedInsurance');
  }
  //DELIVERY OPTION
  const deliveryOption = localStorage.getItem('delivery')
  //FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })

  //HITCH
  const hitch = (Number(finalPrice) * Number(selectedDownPayment))/100;

  //INTEREST RATE
  const location = useLocation()
  const interestRate = location.state?.data.interestRate;

  //TOTAL (FINACING)
  const total = Number(finalPrice) - hitch;
  
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPaymentVisible(true);
  };
  

  const handleClose = () => {
    // Limpiar el estado
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    isSmallScreen ? (
      <>
        <BoxOffer>
        {selectedOption === 'Plan de contado' && finalPrice !== null && (
          <>
          <TableSumarry>
              <tbody>
                {/* <tr>
                  <THSummary>Seguro de contado</THSummary>
                  <TDSummary>NA</TDSummary>
                </tr> */}
                <tr>
                  <THSummary>Lugar de entrega del auto</THSummary>
                  <TDSummary>{deliveryOption}</TDSummary>
                </tr>
                <tr>
                  <THSummary>Total</THSummary>
                  <TDSummary >{formatter.format(Number(finalPrice))}</TDSummary>
                </tr>
              </tbody>
            </TableSumarry>
          </>
        )}
        {selectedOption === 'Plan de financiamiento' && (
          <>
            <TableSumarry>
              <tbody>
              <tr>
                  <THSummary>Lugar de entrega del auto</THSummary>
                  <TDSummary>{deliveryOption}</TDSummary>
                </tr>
                <tr>
                  <THSummary>Enganche</THSummary>
                  <TDSummary>{formatter.format(Number(hitch))}</TDSummary>
                </tr>
                {/* <tr>
                  <THSummary>Seguro Financiado</THSummary>
                  <TDSummary>NA</TDSummary>
                </tr> */}
                <tr>
                  <THSummary>Tasa de interés</THSummary>
                  <TDSummary>{interestRate}%</TDSummary>

                </tr>
                <tr>
                  <THSummary>Plazo</THSummary>
                  <TDSummary>{selectedMonths} meses</TDSummary>
                </tr>
                <tr>
                  <THSummary>Total</THSummary>
                  <TDSummary>{formatter.format(total)}</TDSummary>
             
                </tr>
              
              </tbody>
            </TableSumarry>
        </>
      )}
        
        </BoxOffer>
        {showButtonContainer && (
          <ButtonContainer>
            <ButtonPay>
              <Button onClick={handleClick} variant="contained">
                Pagar
              </Button>
            </ButtonPay>
          </ButtonContainer>
        )}
      
       {isPaymentVisible ? <PaymentConatiner> <Payment />  </PaymentConatiner> : null}
      
      </>
    ) : (
      <>
        <BoxOffer>
        {selectedOption === 'Plan de contado' && finalPrice !== null && (
          <>
          <TableSumarry>
              <tbody>
                {/* <tr>
                  <THSummary>Seguro de contado</THSummary>
                  <TDSummary>NA</TDSummary>
                </tr> */}
                <tr>
                  <THSummary>Lugar de entrega del auto</THSummary>
                  <TDSummary>{deliveryOption}</TDSummary>
                </tr>
                <tr>
                  <THSummary>Total</THSummary>
                  <TDSummary >{formatter.format(Number(finalPrice))}</TDSummary>
                </tr>
              </tbody>
            </TableSumarry>
          </>
        )}
        {selectedOption === 'Plan de financiamiento' && (
          <>
            <TableSumarry>
              <tbody>
                <tr>
                  <THSummary>Lugar de entrega del auto</THSummary>
                  <TDSummary>{deliveryOption}</TDSummary>
                </tr>
                <tr>
                  <THSummary>Enganche</THSummary>
                  <TDSummary>{selectedDownPayment}% = {formatter.format(Number(hitch))}</TDSummary>
                </tr>
                {/* <tr>
                  <THSummary>Seguro Financiado</THSummary>
                  <TDSummary>NA</TDSummary>
                </tr> */}
                <tr>
                  <THSummary>Tasa de interés</THSummary>
                  <TDSummary>{interestRate}%</TDSummary>

                </tr>
                <tr>
                  <THSummary>Plazo</THSummary>
                  <TDSummary>{selectedMonths} meses</TDSummary>
                </tr>
                <tr>
                  <THSummary>Total</THSummary>
                  <TDSummary>{formatter.format(total)}</TDSummary>
             
                </tr>
              
              </tbody>
            </TableSumarry>
        </>
      )}
        
        </BoxOffer>    
        {showButtonContainer && (
          <ButtonContainer>
            <ButtonPay>
              <Button onClick={handleClick} variant="contained">
                Pagar
              </Button>
            </ButtonPay>
          </ButtonContainer>
        )}

         {isPaymentVisible ? <PaymentConatiner> <Payment />  </PaymentConatiner> : null}
      </>
    )
  );
};

export default PaymentSummary;