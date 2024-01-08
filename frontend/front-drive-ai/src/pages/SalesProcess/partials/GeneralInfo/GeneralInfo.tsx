import React from 'react';
import { useState, useEffect } from 'react';
import { CurrentPrice } from '../CurrentPrice';
import {
  ContainerPrice,
  ContainerAllInfo,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from './styles';
//USEAPPCONTEXT
import { useAppContext } from 'store/app-context/app-context';
//USE LOCATION
import { useLocation } from 'react-router-dom';
//IMPORT VEHICLE SERVICE
import { getVehicleById } from 'services';
//IMPORT MUI
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const GeneralInfo = () => {
  const appContext = useAppContext();
  const location = useLocation() 
  const dataVehicleId = location.state?.data.vehicleId

  const [price, setPrice] = useState<any>(null)

  const handleGetVehicle = async () => {
    await getVehicleById(dataVehicleId).then((res: any) => {
      if (res && res.data) {
        // console.log(res.data.dealershipName)
        // setDealership(res.data.dealershipName)
        setPrice(res.data);
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

  return (
    <>
    {price ? (
      <>
      <ContainerPrice>
        <CurrentPrice valuePrice={formatter.format(price.price)}></CurrentPrice>
      </ContainerPrice>
      </>
    ):
    (
      <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    )}
      <ContainerAllInfo>
        <Box
          sx={{
            display: 'flex',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 0.5,
          }}
        >
          <Box sx={{}}>
            Información General
            <Box sx={{ fontSize: 14, fontWeight: 'normal' }}>
              Favor de confirmar sus datos personales, los cuales serán utilizados en el contrato de la venta conforme a la agencia
            </Box>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Nombre:
                    </TableCell>
                    <TableCell>{appContext.user?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Apellido:
                    </TableCell>
                    <TableCell>{appContext.user?.surname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Teléfono:
                    </TableCell>
                    <TableCell>{appContext.user?.cellphone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Dirección:
                    </TableCell>
                    <TableCell>{appContext.user?.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Ciudad:
                    </TableCell>
                    <TableCell>{appContext.user?.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Estado:
                    </TableCell>
                    <TableCell>{appContext.user?.state}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </ContainerAllInfo>
    </>
  );
};

export default GeneralInfo;
