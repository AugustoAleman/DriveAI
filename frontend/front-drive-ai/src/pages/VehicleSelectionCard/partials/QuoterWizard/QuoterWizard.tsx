import { Stepper } from 'components/Stepper_v2'
import { Button } from 'components/Button'
import { InsuranceStep } from './Steps';
import { PaymentStep } from './Steps';
import { QuoteBreakdown } from './Steps';
import { QuoterProps } from './types';
import { Card } from 'components/Card';
import { financeOptions, insuranceImages, steps } from 'pages/VehicleSelectionCard/partials/QuoterWizard/constants';
import { useNavigate } from 'react-router-dom';
import { calculateDownPayment, calculateInstallments } from 'utils';
import { AlertWindow } from 'components/AlertWindow';
import { 
  ButtonHolder, 
  CardBody,
  CardWrapper, 
  GeneralWrapper,
  StepperWrapper,  
  TitleWrapper,
  ContentWrapper,
  Overlay,
  OverlayCardTitle,
  Title, } from './styles'
import { useState, useEffect } from 'react'
import { getVehicleById } from 'services';
import { getInsuranceByDealershipId } from 'services';



const QuoterWizard: React.FC<QuoterProps> = ({ isLoggedIn, vehicleId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleDetails, setVehicleDetails] = useState<any>(null);
  const [insuranceDetails, setInsuranceDetails] = useState<any>(null);
  const [financingPlanSelection, setFinancingPlanSelection] = useState<number>(3);
  const [downPaymentSelection, setDownPaymentSelection] = useState<any>(null);
  const [installmentSelection, setInstallmentSelection] = useState<any>(null);
  const [installmentValueSelection, setInstallmentValueSelection] = useState<any>(null);
  const [insurancePlanSelection, setInsurancePlanSelection] = useState<any>(null);
  const [insuranceIndex, setInsuranceIndex] = useState<number>(999);
  const [showAlert, setShowAlert] = useState(false);
  const [showNoInsuranceAlert, setShowNoInsuranceAlert] = useState(false);
  const navigate = useNavigate();
  
  interface paymentDetails {
    vehicleId: number;
    financingPlanSelection: number;
    downPaymentSelection: number;
    installmentSelection: number;
    insurancePlanSelection: number;
    downPaymentValue: number;
    installmentValue: number;
    insurancePrice: number;
    interestRate: number;

  }

  const handleNoOptionWarning = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); 
  };

  const handleNoInsuranceWarning = () => {
    setShowNoInsuranceAlert(true);
    setTimeout(() => {
      setShowNoInsuranceAlert(false);
    }, 3000); 
  };

  const fetchVehicleDetails = async () => {
    const dealershipId = await getVehicleById(vehicleId)
    .then((res) => {
      if (res && res.data) {
        console.log(res.data, "data");
        setVehicleDetails(res.data);
        return res.data.dealershipId;
      }
    }).catch((err =>{
      console.log(err);
    }))
    return dealershipId;
  }
  

  const fetchInsuranceDetails = async (dealershipId: number) => {
    await getInsuranceByDealershipId(dealershipId)
    .then((res) => {
      if (res && res.data) {
        console.log(res.data, "data");
        setInsuranceDetails(res.data);
        
      }
    }).catch((err =>{
      console.log(err);
    }))
  }

  const getInitData = async () => {
    const dealershipId = await fetchVehicleDetails();
    if(dealershipId){
      fetchInsuranceDetails(dealershipId);
    }
  }

  useEffect(() => {
    getInitData();
  }, [])

  

  const handleCurrentStep = () => {
    switch(activeStep) {
      case 0: return (<PaymentStep 
        options = {financeOptions} 
        price = {vehicleDetails?.price}
        financingPlans={vehicleDetails?.financingPlans}
        financingPlanSelection={financingPlanSelection}
        setFinancingPlanSelection={setFinancingPlanSelection}
        downPaymentSelection={downPaymentSelection}
        setDownPaymentSelection={setDownPaymentSelection}
        installmentSelection={installmentSelection}
        setInstallmentSelection={setInstallmentSelection}
        paymentValueSelection={installmentValueSelection}
        setPaymentValueSelection={setInstallmentValueSelection}
      />);
      case 1: return (<InsuranceStep 
        insurancePlans= {insuranceDetails}
        insurancePlanSelection={insurancePlanSelection}
        insuranceIndex={insuranceIndex}
        setInsuranceIndex={setInsuranceIndex}
        setInsurancePlanSelection= {setInsurancePlanSelection}
        insurancePaths={insuranceImages}
      />);
      case 2: return (<QuoteBreakdown 
        brand={vehicleDetails?.vehicle.subBrand.brand} 
        subBrand={vehicleDetails?.vehicle.subBrand.subBrand} 
        version={vehicleDetails?.vehicle.version} 
        price = {vehicleDetails?.price} 
        financingPlans = {vehicleDetails?.financingPlans}
        insurancePlans = {insuranceDetails}
        financingPlanSelection={financingPlanSelection}
        setFinancingPlanSelection={setFinancingPlanSelection}
        downPaymentSelection={downPaymentSelection}
        setDownPaymentSelection={setDownPaymentSelection}
        installmentSelection={installmentSelection}
        setInstallmentSelection={setInstallmentSelection}
        insurancePlanSelection={insurancePlanSelection}
        setInsurancePlanSelection= {setInsurancePlanSelection}
        setInsuranceIndex={setInsuranceIndex}
      />);
    }
  };

  const handleNext = () => {
    switch (activeStep){
      case 0: 
        if(financingPlanSelection !== 3){
          if(financingPlanSelection === 0){
            setDownPaymentSelection(null);
            setInstallmentSelection(null);
          }
          if(insuranceDetails === null || insuranceDetails.length === 0){
            setActiveStep(2);
            handleNoInsuranceWarning();
            break;
          }
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else {
          handleNoOptionWarning();
          console.log("no option selected, could not continue to next step");
        }
        break;
      case 1:
        if (insuranceIndex === 999 && insurancePlanSelection === null){
          handleNoOptionWarning();
          console.log("no option selected, could not continue to step 3")
        } else {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
        break;
      case 2: 
        const data: paymentDetails = {
          vehicleId: vehicleId,
          financingPlanSelection: financingPlanSelection ? financingPlanSelection : 0,
          downPaymentSelection: downPaymentSelection?.downPayment ? downPaymentSelection?.downPayment : vehicleDetails?.price,
          installmentSelection: installmentSelection?.months ? installmentSelection?.months : 0,
          insurancePlanSelection: insurancePlanSelection ? insuranceIndex : 0,
          downPaymentValue: downPaymentSelection?.downPayment ? calculateDownPayment(vehicleDetails?.price, downPaymentSelection?.downPayment) : 0,
          installmentValue: installmentSelection?.months ? calculateInstallments(vehicleDetails?.price, downPaymentSelection?.downPayment, installmentSelection?.months, installmentSelection.interest) : 0,
          insurancePrice: insuranceDetails?.price || 0,
          interestRate: installmentSelection ? installmentSelection?.interest : (vehicleDetails?.financingPlans ? vehicleDetails?.financingPlans[0].interest : 15)
        };

        navigate('/sales-process', { state: { data } });

        break;
    } 
  };

  const handleBack = () => {
    switch(activeStep) {
      case 1:
        setActiveStep(activeStep-1);
        break;
      case 2:
        if (insuranceDetails.length === 0) {
          setActiveStep(0);
          handleNoInsuranceWarning();
        } else  {
          setActiveStep(activeStep-1);
        }
    }
    
  };

  const handleNavigateToLogin = () => {
    window.scrollTo(0, 0); 
    navigate('/login');
  }


  const buttonText = activeStep === 2 ? 'FINALIZAR' : 'SIGUIENTE'; 

  return (

    <GeneralWrapper>
      
      <CardWrapper>
            
        <StepperWrapper>
                <Stepper
                  steps={steps}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}/>
        </StepperWrapper>

        <TitleWrapper>
          <Title>
            {steps[activeStep]}
           </Title>
        </TitleWrapper>

        <ContentWrapper>
          {handleCurrentStep()}
        </ContentWrapper>

        <ButtonHolder>
          {activeStep !== 0 ? (<Button
            height="40px"
            onClick={handleBack}
            width="10em" >
            Atras
          </Button>) : (<div></div>)}
          <Button
            height="40px"
            onClick={handleNext}
            width="10em"
            href={buttonText === "FINALIZAR" ? "/sales-process" : ""}>
            {buttonText}
          </Button>
        </ButtonHolder>

        {!isLoggedIn && (
                <Overlay>
                    <Card height='40%' width='60%' cursor='default' >
                        <CardBody>
                            <OverlayCardTitle>Para utilizar esta herramienta debes iniciar sesión</OverlayCardTitle>
                            <Button onClick={() => {handleNavigateToLogin()}}>Iniciar Sesión</Button>
                        </CardBody>
                    </Card>
                </Overlay>
          )}      
      </CardWrapper>

      {showAlert && (
        <AlertWindow
          message="No se ha seleccionado ninguna opción. Por favor selecciona una opción e intentalo de nuevo."
          severity="warning"
        />
      )}

      {showNoInsuranceAlert && (
        <AlertWindow
        message="No existen planes de seguros para este vehiculo."
        severity="info"
        />
      )}
    </GeneralWrapper>
  )
}

export default QuoterWizard