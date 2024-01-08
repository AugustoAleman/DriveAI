import React, {useState, useEffect} from 'react';

import { Title } from './styles';
//IMPORT MUI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//LOCATION
import { useLocation } from 'react-router-dom';
//SERVICE
import { getVehicleById } from 'services';

const Results: React.FC = () => {
  const location =  useLocation();
  const dataVehicleId = location.state?.data.vehicleId
  const [vehicle, setVehicle] = useState<any>(null);
  const [brand, setBrand] = useState<any>(null)

  const handleGetVehicle = async () => {
    await getVehicleById(dataVehicleId).then((res: any) => {
      if (res && res.data) {
        console.log(res.data)
        setVehicle(res.data.vehicle);
        setBrand(res.data.vehicle.subBrand)
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  useEffect(() => {
    handleGetVehicle();
  }, [])

  //FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })

  //VEHICLE PRICE
  const finalPrice = localStorage.getItem('finalPrice');
  //PAYMENT METHOD
  const selectedOption = localStorage.getItem('selectedOption');

  const transaction = {
    id: 1,
    vehicle: 'Car 1',
    paymentMethod: 'Method 1',
    finalPrice: 1000,
  };

  return (
    <>
      <Title>Resumen de Compra</Title>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id transaccion</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Vehiculo</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Payment Method</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Precio Final</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {vehicle && brand ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>{transaction.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{brand.subBrand}</Typography>
              </TableCell>
              <TableCell>
                {selectedOption === 'Plan de contado' ? (
                  <Typography>Plan de Contado</Typography>
                ):
                (
                  <Typography>Plan de Financiamiento</Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography>{formatter.format(Number(finalPrice))}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          ):
          (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Table>
      </TableContainer>
      
      
    </>
  );
};

export default Results;
