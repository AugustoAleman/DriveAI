import { GridRow, InsuranceStepCard, GridItem } from "./styles";
import { InsuranceProps } from './types';
import { useEffect, useState } from "react";
import { OptionInsurance } from 'components/OptionInsurance'
import React from 'react'



const InsuranceStep: React.FC<InsuranceProps> = ({ insurancePlans, insurancePlanSelection, setInsurancePlanSelection, insuranceIndex, setInsuranceIndex, insurancePaths }) => {
  
  const [current, setCurrent] = useState<number>();

  const handleClick = (indexInsurance: number) => {
    setCurrent(indexInsurance);
    setInsuranceIndex(indexInsurance);
    
    setInsurancePlanSelection(insurancePlans[indexInsurance])
    console.log(insurancePlanSelection);
  }

  useEffect(() => {
    setCurrent(insuranceIndex);
    console.log("Insurance step: loaded pre-selected index as:" + insuranceIndex);
  }, [insuranceIndex])
  
  return (
    <InsuranceStepCard>
      {insurancePlans.length > 0 ? (
      <GridRow>
        {insurancePlans?.map((option, index: number) => (
          <GridItem key={index}>
            <OptionInsurance 
              index={index} 
              text={option.name} 
              imageUrl={insurancePaths.length > 0 ? insurancePaths[index] : "https://static.wikia.nocookie.net/the-incredibles/images/5/57/A2e320b9c580099ac14bafdb6ed9402c.jpg"} 
              width={5} 
              active={current === index} 
              onClick={() => handleClick(index)} 
            />
          </GridItem>
        ))}    
      </GridRow> 
      ) : (<GridRow><h3>Sin planes disponibles</h3></GridRow>)}
    </InsuranceStepCard>
  );
}

export default InsuranceStep;