import React, { useState } from 'react';
import { Title, ContainerVinfo, ContainerSummary } from './styles';
import { VehicleInfo } from '../VehicleInfo';
import {PaymentSummary} from '../PaymentSummary';

const TotalSummary: React.FC = () => {
  const showPaperCard = false;
    // Add your state variables and logic here using the useState hook
  
    return (
      <>
        <Title>Resumen de Compra</Title>
        <ContainerVinfo>
          <VehicleInfo showPaperCard = {showPaperCard}/>
        </ContainerVinfo>
  
        <ContainerSummary>
          <PaymentSummary/>
        </ContainerSummary>
  
        
      </>
    );
  };
  
  export default TotalSummary;