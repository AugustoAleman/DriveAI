import React, { useState, useEffect } from 'react'
import { PriceContainer, TableInfo,
    TDInfo,
    THInfo,
    THInfoTwo, 
    TitleVehicle
} from './styles'
//CONTAINER PRICE
import { ContainerPrice } from '../GeneralInfo/styles';
import { CurrentPrice } from '../CurrentPrice';
//LOCATION
import { useLocation } from 'react-router-dom';
//SERVICE
import { getVehicleById } from 'services';
//MUI
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface AppProps {
  showPaperCard?: boolean; // Optional prop to control the visibility of ButtonContainer
}

const GeneralInfo: React.FC<AppProps> = ({ showPaperCard = true }) =>{

    const location =  useLocation();
    const dataVehicleId = location.state?.data.vehicleId
    const financingOption = location.state?.data.financingPlanSelection
    const [vehicle, setVehicle] = useState<any>(null);
    const [agency, setAgency] = useState<any>(null);
    const [price, setPrice] = useState<any>(null)
  
    const handleGetVehicle = async () => {
        await getVehicleById(dataVehicleId).then((res: any) => {
          if (res && res.data) {
            console.log(res.data)
            setVehicle(res.data.vehicle);
            setPrice(res.data)
            setAgency(res.data); 
          }
        }).catch((err: any) => {
          console.log(err);
        });
      }

    useEffect(() => {
        handleGetVehicle();
      }, [])
  
    useEffect(()=>{
        if(dataVehicleId){
            console.log("JSON OBJECT of Vehicle: ", dataVehicleId);
        } else {
            console.log("no data was found")
      }  
    })


  //FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })

    
  return (
    <div>
      {vehicle && agency ? (
        <>
        {showPaperCard && (
        <PriceContainer> <Box  sx={{ display: 'flex' }}>
    <     CurrentPrice valuePrice={formatter.format(price.price)}/>
    </Box></PriceContainer>)}
   
            <TitleVehicle>
                Información del auto
            </TitleVehicle>
            <TableInfo>
                <tr>
                    <THInfo>Transmisión</THInfo>
                    <TDInfo>{vehicle.transmission}</TDInfo>
                    <THInfo>Tipo de combustible</THInfo>
                    <TDInfo>{vehicle.fuel}</TDInfo>
                </tr>
                <tr>
                    <THInfo>Modelo</THInfo>
                    <TDInfo>{vehicle.model}</TDInfo>
                    <THInfo>Bolsas</THInfo>
                    <TDInfo>{vehicle.airbags}</TDInfo>
                </tr>
                <tr>
                    <THInfo>Asientos</THInfo>
                    <TDInfo>{vehicle.seats}</TDInfo>
                    <THInfo>Tracción</THInfo>
                    <TDInfo>{vehicle.traction}</TDInfo>
                </tr>
                <tr>
                    <THInfo>Rendimiento</THInfo>
                    <TDInfo>{vehicle.performance}</TDInfo>
                    <THInfo>Puertas</THInfo>
                    <TDInfo>{vehicle.doors}</TDInfo>
                </tr>
                <tr>
                  <THInfo>Agencia</THInfo>
                  <THInfo>{agency.dealershipName}</THInfo>
                </tr>
            </TableInfo>
    	</>
      ) : (
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
      
    </div>

  )
}

export default GeneralInfo