import { Card } from "components/Card"
import theme from "theme/theme";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { QuoteBreakdownProps } from "./types";
import { calculateOpeningComission, calculateInstallments, calculateDownPayment } from "utils";
import { useEffect } from "react";
import { 
  BreakdownStepCard, 
  CarTitle,
  CardComponentWrapper,
  CardSubtext,
  CardTitle,
  CheckHolder,
  DropdownItem,
  DropdownRow,
  QuoterCardHolder,
  CardBody, 
  QuoterCardRow,
  StyledSelect,
  TitleWrapper} from "./styles";


  const QuoteBreakdown: React.FC<QuoteBreakdownProps> = ({ 
    brand, 
    subBrand, 
    version, 
    price, 
    financingPlans, 
    insurancePlans, 
    financingPlanSelection, 
    setFinancingPlanSelection,
    downPaymentSelection,
    setDownPaymentSelection,
    installmentSelection,
    setInstallmentSelection,
    insurancePlanSelection,
    setInsurancePlanSelection,
    setInsuranceIndex }) =>{


    const handleDownPaymentSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIndex = event.target.selectedIndex;
      const selectedPlan = financingPlans[selectedIndex - 1];
      setDownPaymentSelection(selectedPlan);
      console.log("Enganche: " + downPaymentSelection+ " " + selectedIndex );

    }

    const handleInstallmentSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIndex = event.target.selectedIndex;
      const selectedPlan = financingPlans[selectedIndex - 1];
      setInstallmentSelection(selectedPlan);
      console.log("Mensualidades: " + installmentSelection + " " + selectedIndex);

    } 

    const handleInsuranceOptionChoice = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedIndex = event.target.selectedIndex;
      setInsuranceIndex(selectedIndex - 1);
      const selectedPlan = insurancePlans[selectedIndex - 1];
      setInsurancePlanSelection(selectedPlan);
      console.log("Seguro: " + insurancePlanSelection+ " " + selectedIndex);

    }

    function handleSelectClick(e: React.MouseEvent<HTMLSelectElement>) {
      e.stopPropagation();
    }

    useEffect(() =>{
      if (downPaymentSelection !== null || installmentSelection !== null) {
        setFinancingPlanSelection(1);
      } 
      if (financingPlanSelection === 0){
        setDownPaymentSelection(null);
        setInstallmentSelection(null);
        console.log("Defaulted all values to null");
      }
    }, [downPaymentSelection, installmentSelection, financingPlanSelection])
  
    return (
      <BreakdownStepCard>
        
          <TitleWrapper>
            <CarTitle>{brand} {subBrand} / {version}</CarTitle> 
            <CarTitle>Desde:* {price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</CarTitle>
          </TitleWrapper>
          <QuoterCardHolder>
            <Card width='30em' height= '100%' hasHoverColor = {false} cursor='default'>
              <CardComponentWrapper>
                <CardSubtext>Elige tu plan de financiamiento</CardSubtext>
                <CheckHolder>
                  <FormControl component='fieldset'>
                  <RadioGroup
                    defaultValue="deContado"
                    name="radio-buttons-group"
                    value = {String(financingPlanSelection)}
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      setFinancingPlanSelection(Number(selectedValue));
                    }} 
                  >
                    <FormControlLabel value="0" control={<Radio />} label="De Contado" />
                    <FormControlLabel value="1" control={<Radio />} label="A Meses" />
                  </RadioGroup>
                  </FormControl>
                </CheckHolder>
                <DropdownRow>
                  <DropdownItem>
                    <CardSubtext>
                      Enganche:
                    </CardSubtext>
                    {financingPlans ? (
                    <StyledSelect onClick={handleSelectClick} onChange={handleDownPaymentSelectChange}>
                      {downPaymentSelection ? <option value="">{downPaymentSelection.downPayment} % </option> : <option value="">Sin enganche</option>}
                      {financingPlans?.map((plan, index) =>(
                        <option key ={index} value={`option${index + 1}`}>
                          {plan.downPayment} %
                        </option>
                      ))}
                    </StyledSelect>
                    ) : null}
                  </DropdownItem>             
                  <DropdownItem>
                    <CardSubtext>
                    Plazos:
                    </CardSubtext>
                    {financingPlans ? (
                    <StyledSelect onClick={handleSelectClick} onChange={handleInstallmentSelectChange}>
                      {installmentSelection ? <option value="">{installmentSelection.months} meses</option> : <option value="">Sin mensualidades</option>}
                      {financingPlans?.map((plan, index) =>(
                        <option key ={index} value={`option${index + 1}`}>
                          {plan.months} meses
                        </option>
                      ))}
                    </StyledSelect>
                    ) : null}
                  </DropdownItem>
                  
                </DropdownRow>             
                <DropdownRow>
                  <DropdownItem>
                    <CardSubtext>
                      Aseguradora:
                    </CardSubtext>
                    <StyledSelect onClick={handleSelectClick} onChange={handleInsuranceOptionChoice}>
                      {insurancePlanSelection ? <option value="">{insurancePlanSelection.name} - {insurancePlanSelection.price}</option> : <option value="">Sin aseguradora</option>}
                      {insurancePlans?.map((plan, index) =>(
                        <option key ={index} value={`option${index + 1}`}> 
                          {plan.name} - ${plan.price} 
                        </option>
                      ))}
                    </StyledSelect> 
                  </DropdownItem>
                </DropdownRow>
              </CardComponentWrapper>
            </Card>
            <Card width='30em' height= '100%' hasHoverColor = {false} cursor='default' color = {theme.palette.tertiary.main}>
              <CardComponentWrapper>
                <QuoterCardRow>
                  <CardTitle>
                    Mensualidad:
                  </CardTitle>
                  <CardTitle>{installmentSelection ? `${calculateInstallments(price, downPaymentSelection?.downPayment, installmentSelection?.months, installmentSelection.interest).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}` : "Sin mensualidad"} </CardTitle>
                </QuoterCardRow>
                
                
                <CardSubtext>RESUMEN DE COTIZACIÓN:</CardSubtext>
                <QuoterCardRow>
                  <CardBody>Enganche:</CardBody>
                  <CardBody>{downPaymentSelection ? `${calculateDownPayment(price, downPaymentSelection?.downPayment).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}` : "Sin enganche"} </CardBody>
                </QuoterCardRow>
                <QuoterCardRow>
                  <CardBody>Monto a financiar:</CardBody>
                  <CardBody>{price ? price.toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : "-"}</CardBody>
                </QuoterCardRow>
                <QuoterCardRow>
                  <CardBody>Comisión por apertura:</CardBody>
                  <CardBody>{price ? calculateOpeningComission(price).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : "Sin comision por apertura"}</CardBody>
                </QuoterCardRow>
                <QuoterCardRow>
                  <CardBody>Seguro de contado:</CardBody>
                  <CardBody>{insurancePlanSelection ? `${insurancePlanSelection?.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}` : "Sin seguro seleccionado"}</CardBody>
                </QuoterCardRow>
                <QuoterCardRow>
                  <CardBody>Tasa de interés:</CardBody>
                  <CardBody>{installmentSelection ? `${installmentSelection.interest} %` : 'No hay tasa de interés'}</CardBody>
                </QuoterCardRow>
              </CardComponentWrapper>
            </Card> 
          </QuoterCardHolder>
          
        
      </BreakdownStepCard>
    )
  }

export default QuoteBreakdown;