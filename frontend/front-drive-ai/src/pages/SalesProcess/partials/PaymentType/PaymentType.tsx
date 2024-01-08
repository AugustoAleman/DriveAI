import React, { useState, useEffect } from 'react';
import { 
  TextTypeOne, 
  SpanTypeOne, 
  TitleType, 
  TypesOptions, 
  TypesSpan, 
  TextGeneralType,
  TextTwoTypeTwo, 
  RadioOptions,
  TextTypes,
  ContainerPayment ,
 } from './styles';
 //IMPORT MUI
import { 
  Radio, 
  FormControlLabel, 
  MenuItem, 
  Button
} from '@mui/material';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//IMPORT SERVICES
import { getVehicleById } from 'services';
import { getInsuranceByDealershipId } from 'services';
//IMPORT LOCATION
import { useLocation } from 'react-router-dom';
//CONTAINER PRICE
import { ContainerPrice } from '../GeneralInfo/styles';
import { CurrentPrice } from '../CurrentPrice';

const PaymentType = () => {
  const location = useLocation();
  const dataVehicleId = location.state?.data.vehicleId
  const downPaymentSelection = location.state?.data.downPaymentSelection
  const installmentSelection = location.state?.data.installmentSelection
  const  insurancePlanSelection = location.state?.data.insurancePlanSelection
  const interestRate = location.state?.data.interestRate
  const financingPlanSelection = location.state?.data.financingPlanSelection
  console.log("INSURANCE",insurancePlanSelection)

  const [months, setMonths] = useState<any[]>([])
  const [hitch,setHitch] = useState<any[]>([])
  const [nameInsurance, setNameInsurance] = useState<any[]>([])
  const [selectedDownPayment, setSelectedDownPayment] = useState(downPaymentSelection);
  const [selectedMonths, setSelectedMonths] = useState(installmentSelection);
  const [insuranceId, setInsuranceId] = useState<number>(0);
  const [selectedInsurance, setSelectedInsurance] = useState(insurancePlanSelection);
  const [vehicle, setVehicle] = useState<any>(null)
  
  //SERVICE VEHICLE
  const handleGetVehicle = async () => {
    await getVehicleById(dataVehicleId).then((res: any) => {
      if (res && res.data) {
        console.log(res.data)
        console.log(res.data.financingPlans)
        setMonths(res.data.financingPlans)
        setHitch(res.data.financingPlans)
        setVehicle(res.data)
        setInsuranceId(res.data.dealershipId)
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }
//SERVICE INSURANCE
  const handleGetInsurance = async () => {
    if (insuranceId) {
      await getInsuranceByDealershipId(insuranceId).then((res: any) => {
        if (res && res.data) {
          console.log("INSURANCE DATA", res.data);
          setNameInsurance(res.data);
        }
      }).catch((err: any) => {
        console.log(err);
      });
    }
  };
//USE_EFFECT VEHICLE
  useEffect(() => {
    handleGetVehicle();
  }, [])
//USE_EFFECT INSURANCE
  useEffect(() => {
    handleGetInsurance();
  }, [insuranceId])

  //FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })

  //SAVE CHANGES
  const handleSave = () => {
    localStorage.setItem('selectedDownPayment', selectedDownPayment);
    localStorage.setItem('selectedMonths', selectedMonths);
    localStorage.setItem('selectedInsurance', selectedInsurance);
  };
  //GINAL PRICE VEHICLE
  const finalPrice = localStorage.getItem('finalPrice');

    //HANDLECHANGE OF RADIOGROUPS
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      localStorage.setItem('selectedOption', event.target.value);
      if (event.target.value === 'Plan de contado') {
        localStorage.setItem('currentPrice', formatter.format(Number(finalPrice)));
      } else if (event.target.value === 'Plan de financiamiento') {
        localStorage.setItem('selectedDownPayment', selectedDownPayment);
        localStorage.setItem('selectedMonths', selectedMonths);
        localStorage.setItem('selectedInsurance', selectedInsurance);
      }
    };


  const selectedOption = financingPlanSelection === 0 ? "Plan de contado" : "Plan de financiamiento";
  const [value, setValue] = React.useState(selectedOption);
  return (
    <div>
      <ContainerPrice>
        <CurrentPrice valuePrice={formatter.format(Number(finalPrice))}/>
      </ContainerPrice>
      <ContainerPayment>
        {vehicle ? (
          <>
            <TitleType>Organicemos tu forma de pago</TitleType>
            <TextTypes>Selecciona una opción</TextTypes>
            <RadioOptions value={value} onChange={e => handleChange(e)} >
              <FormControlLabel value="Plan de contado" control={<Radio />} label="Plan de contado" componentsProps={{ typography: { fontSize: "23px" } }} />
              <FormControlLabel value="Plan de financiamiento" control={<Radio />} label="Plan de Financiamiento" componentsProps={{ typography: { fontSize: "23px" } }} />
            </RadioOptions>
            {value === 'Plan de contado' && (
              <div>
                <TypesOptions>Has seleccionado la opción: <TypesSpan>{value}</TypesSpan></TypesOptions>
                <TextTypeOne>Precio total de la unidad: <SpanTypeOne>{formatter.format(Number(finalPrice))}</SpanTypeOne></TextTypeOne>
              </div>
            )}
            {value === 'Plan de financiamiento' && (
              <div>
                <TypesOptions>Has seleccionado la opción: <TypesSpan>{value}</TypesSpan></TypesOptions>
                <TextGeneralType>Enganche: {formatter.format((Number(finalPrice) * selectedDownPayment) / 100)}</TextGeneralType>
                {hitch  && (
                  <Select
                    value={selectedDownPayment}
                    onChange={(event) => setSelectedDownPayment(event.target.value)}
                  >
                    {hitch.map((plan) => (
                      <MenuItem key={plan.id} value={plan.downPayment}>
                        {plan.downPayment}%
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <TextGeneralType>¿En cúanto tiempo quieres terminar?</TextGeneralType>
                <p>Mensualidades: {formatter.format((Number(finalPrice) - vehicle.price * (downPaymentSelection / 100)) * (1 + (interestRate / 100)) / selectedMonths)}</p>
                {months &&  (
                  <Select
                    value={selectedMonths}
                    onChange={(event) => setSelectedMonths(event.target.value)}
                  >
                    {months.map((plan) => (
                      <MenuItem key={plan.id} value={plan.months}>
                        {plan.months} meses
                      </MenuItem>
                    ))}
                  </Select>
                )}
                <Button onClick={handleSave} variant="contained" color="secondary">GUARDAR CAMBIOS</Button>
              </div>
            )}
          </>
        ) : (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </ContainerPayment>
    </div>
  );
}

export default PaymentType;