import React, { useState, useEffect } from 'react'
import { 
    TitleDelivery,
    RadioDelivery,
    TextFieldAddressOne,
    TextFieldCity,
    TextFieldCountry,
    TextFieldState,
    TextFieldZipCode
 } from './styles';
 //IMPORT MUI
import { Radio, FormControlLabel, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//IMPORT LOCATION
import { useLocation } from 'react-router-dom';
//IMPORT SERVICES
import { getVehicleById } from 'services';
//IMPORT USEAPPCONTEXT
import { useAppContext } from "store/app-context/app-context";
//IMPORT CURRENT PRICE
import { ContainerPrice } from '../GeneralInfo/styles';
import { CurrentPrice } from '../CurrentPrice';

const DeliveryOptions = () => {

  const location = useLocation()
  const dataVehicleId = location.state?.data.vehicleId
  const appContext = useAppContext()

  const [value, setValue] = React.useState('default');
  const [agency,setAgency] = useState<any>(null);
  //VEHICLE SERVICE
  const handleGetVehicle = async () => {
    await getVehicleById(dataVehicleId).then((res: any) => {
      if (res && res.data) {
        console.log(res.data)
        setAgency(res.data); 
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }
  //USE_EFFECT VEHICLE
  useEffect(() => {
      handleGetVehicle();
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (event.target.value === 'A') {
        localStorage.setItem('delivery', appContext.user?.address ?? '');
      } else if (event.target.value === 'B') {
        localStorage.setItem('delivery', agency.dealershipName);
      }
    };
    

  //FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })

  //GINAL PRICE VEHICLE
  const finalPrice = localStorage.getItem('finalPrice');

  return (
    <div>
      <ContainerPrice>
        <CurrentPrice valuePrice={formatter.format(Number(finalPrice))}/>
      </ContainerPrice>
      {agency ? (
        <Box sx={{ display: 'flex', fontSize: 18, fontWeight: 'bold', textAlign:"center",marginTop:20,height:"50vh", marginLeft: 30, width:"100vh" }}>
          <Box sx={{ fontSize: 40 }} >
            ¿Dónde quieres recibir tu vehículo?
              <Box sx={{fontSize: 30, fontWeight:"normal", display:"flex"}}>
                Seleccione una opción
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', fontSize: 20, marginTop:1}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <RadioGroup value={value} onChange={e=>handleChange(e)} >
                    <FormControlLabel value="A" control={<Radio />} label={<span style={{ fontSize: '30px' }}>  Domicilio Asignado: {appContext.user?.address} </span>}/>
                    <FormControlLabel value="B" control={<Radio />} label={<span style={{ fontSize: '30px' }}>    Agencia: {agency.dealershipName} </span>} />
                  </RadioGroup>
                </Box>
              </Box>
            </Box>
          </Box>    
    ):(
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  
    )}     
    </div>
  )
}

export default DeliveryOptions