import { OptionsFinance } from "components/OptionsFinance"
import { useEffect, useState } from "react";
import { PaymentHorizontalCardHolder } from "./styles"
import { PaymentStepCard} from "./styles"
import { PaymentProps } from "./types";

const PaymentStep: React.FC<PaymentProps> = ({ 
  options, 
  price, 
  financingPlans, 
  financingPlanSelection, 
  setFinancingPlanSelection, 
  downPaymentSelection, 
  setDownPaymentSelection, 
  installmentSelection, 
  setInstallmentSelection,
  paymentValueSelection,
  setPaymentValueSelection }) => {

  const [current, setCurrent] = useState<number>();

  const handleClick = (indexPayment: number) => {
    setCurrent(indexPayment);
    setFinancingPlanSelection(indexPayment);
    
    console.log(financingPlanSelection)
  }

  useEffect(() =>{
    setCurrent(financingPlanSelection);
  }, [financingPlanSelection])


    return (
      <PaymentStepCard>
        <PaymentHorizontalCardHolder>
        {options.map((option, index: number) => (
          <OptionsFinance 
            onClick={() => handleClick(index)}
            recommended = {option.recommended}
            selected = {current === option.id}
            type={option.type}
            price={price? price : 0}
            financingPlans={financingPlans}
            downPaymentSelection={downPaymentSelection}
            setDownPaymentSelection={setDownPaymentSelection}
            installmentSelection={installmentSelection} 
            setInstallmentSelection={setInstallmentSelection}
            paymentValueSelection={paymentValueSelection}
            setPaymentValueSelection={setPaymentValueSelection}      
          />

        ))} 
        </PaymentHorizontalCardHolder>
        
      </PaymentStepCard>
    )
  }

export default PaymentStep;