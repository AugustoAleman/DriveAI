
// Importa los componentes y tipos necesarios
import React, { useState } from 'react';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMediaQuery, Popover, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Importa los componentes que quieras usar como opciones
import { CreditCard } from '../partials-payments/CreditCard';
import { PayPal } from '../partials-payments/PayPal';
import { DepositSlip } from '../partials-payments/DepositSlip';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import PayPayCreditImg from '../partials-payments/PayPal/assets/paypalBox.png'


import {
  CreditBox,
  CvvBox,
  RegisterBox,
  CancelBox,
  PayPalBox,
  DepositBox,
  RegisterTwoBox,
  CancelTwoBox,
  TitlePayment,
  DueDateBox,
  MediaRegisterButton,
  MediaCancelButton
} from '../partials-payments/styles'

function RegisterCredit() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Oferta agregada!', { variant });
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickVariant('success')}>Registrar</Button>
    </React.Fragment>
  );
}

function CancelCredit() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Acción cancelada', { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant('success')}>Cancelar</Button>
    </React.Fragment>
  );
}

function Deposit() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Ficha generada', { variant });
  };

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickVariant('success')}>Generar ficha</Button>
    </React.Fragment>
  );
}

function PayPalType() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Pago realizado', { variant });
  };

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickVariant('success')}>Realizar Pago</Button>
    </React.Fragment>
  );
}

// Crea un componente funcional de React
const MyRadioGroup: React.FC = () => {
  // Crea un estado para almacenar el valor seleccionado
  const [value, setValue] = useState<string>('default');

  // Crea una función para manejar el cambio de valor
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  //useState
  const [name,setName] = useState('');
  const [number,setNumber] = useState(0);
  const [duedate,setDuedate] = useState('');
  const [cvv,setCvv] = useState(0);
  const [amountDeposit, setAmountDeposit] = useState(0);
  const [numberDeposit, setNumberDeposit] = useState(0);

  const isSmallScreen = useMediaQuery('(max-width:769px)');

  const nameHanlder = (txt: string)=>{
    setName(txt);
  }

  const numberHandler = (number: number) =>{
    setNumber(number);
  };

  const duedateHandler = (txt:string)=>{
    setDuedate(txt);
  }

  const cvvHandler = (number: number)=>{
    setCvv(number);
  }

  const amountDepositHandler = (number: number)=>{
    setAmountDeposit(number);
  }


  const numberDepositHandler = (number: number)=>{
    setNumberDeposit(number);
  }

  return (
    isSmallScreen? 
    <>
    <TitlePayment>Administrar formas de pago</TitlePayment>


    <RadioGroup
      value={value}
      onChange={handleChange}
      row={true}
    >
      <FormControlLabel value="A" control={<Radio />} label={<CreditCard/>} />
      <FormControlLabel value="B" control={<Radio />} label={<PayPal />} />
      <FormControlLabel value="C" control={<Radio />} label={<DepositSlip />} />
    </RadioGroup>
    {value === 'A' && (
        <CreditBox>
          <h2>Información de tarjeta</h2>
          <p>Nombre completo</p>
            <FormControl sx={{ width: '20ch' }}>
              <OutlinedInput placeholder="Nombre completo del titular" onChange={(e)=>nameHanlder(e.target.value)}/>
            </FormControl>
          <p>Número de tarjeta</p>
          <FormControl sx={{ width: '20ch' }}>
              <OutlinedInput placeholder="Número de tarjeta" onChange={(e)=>numberHandler(Number(e.target.value))} />
            </FormControl>

          <DueDateBox>
          <p>Fecha de vencimiento</p>
          <FormControl sx={{ width: '20ch' }}>
              <OutlinedInput placeholder="mm/aaaaa" onChange={(e)=>duedateHandler(e.target.value)}/>
            </FormControl>
          </DueDateBox>

          <CvvBox>
          <p>CVV</p>
          <FormControl sx={{ width: '20ch' }}>
              <OutlinedInput placeholder="CVV" onChange={(e)=>cvvHandler(Number(e.target.value))}/>
          </FormControl>
          </CvvBox>

          <RegisterBox>
          <SnackbarProvider>
            <RegisterCredit/>
          </SnackbarProvider>
          </RegisterBox>

          <CancelBox>
          <SnackbarProvider>
            <CancelCredit/>
          </SnackbarProvider>
          </CancelBox>

        </CreditBox>
    )}
    {value === 'B' && (
      <PayPalBox>
        <img src={PayPayCreditImg} alt="" />
        
        <RegisterTwoBox>
          <SnackbarProvider>
            <PayPalType/>
          </SnackbarProvider>
        </RegisterTwoBox>

        
        <CancelTwoBox>
          <SnackbarProvider>
            <CancelCredit/>
          </SnackbarProvider>
        </CancelTwoBox>

      </PayPalBox>
    )}
    {value === 'C' && (
        <DepositBox>
        <h2>Al crear esta opcion se generará una ficha de depósito</h2>
        <p>Monto a depositar</p>
          <FormControl sx={{ width: '40ch' }}>
            <OutlinedInput onChange={(e)=>amountDepositHandler(Number(e.target.value))}/>
          </FormControl>
        <p>Número de cuenta objetivo</p>
        <FormControl sx={{ width: '40ch' }}>
            <OutlinedInput onChange={(e)=>numberDepositHandler(Number(e.target.value))} />
          </FormControl>

        <MediaRegisterButton>
          <SnackbarProvider>
            <Deposit/>
          </SnackbarProvider>
        </MediaRegisterButton>

        <MediaCancelButton>
          <SnackbarProvider>
            <CancelCredit/>
          </SnackbarProvider>
        </MediaCancelButton>

      </DepositBox>
    )}
    </>
    :
    <>
    <TitlePayment>Administrar formas de pago</TitlePayment>


    <RadioGroup
      value={value}
      onChange={handleChange}
      row={true}
    >
      <FormControlLabel value="A" control={<Radio />} label={<CreditCard/>} />
      <FormControlLabel value="B" control={<Radio />} label={<PayPal />} />
      <FormControlLabel value="C" control={<Radio />} label={<DepositSlip />} />
    </RadioGroup>
    {value === 'A' && (
        <CreditBox>
          <h2>Información de tarjeta</h2>
          <p>Nombre completo</p>
            <FormControl sx={{ width: '40ch' }}>
              <OutlinedInput placeholder="Nombre completo del titular" onChange={(e)=>nameHanlder(e.target.value)}/>
            </FormControl>
          <p>Número de tarjeta</p>
          <FormControl sx={{ width: '40ch' }}>
              <OutlinedInput placeholder="Número de tarjeta" onChange={(e)=>numberHandler(Number(e.target.value))} />
            </FormControl>
          <p>Fecha de vencimiento</p>
          <FormControl sx={{ width: '40ch' }}>
              <OutlinedInput placeholder="mm/aaaaa" onChange={(e)=>duedateHandler(e.target.value)}/>
            </FormControl>

          <CvvBox>
          <p>CVV</p>
          <FormControl sx={{ width: '40ch' }}>
              <OutlinedInput placeholder="CVV" onChange={(e)=>cvvHandler(Number(e.target.value))}/>
          </FormControl>
          </CvvBox>

          <RegisterBox>
          <SnackbarProvider>
            <RegisterCredit/>
          </SnackbarProvider>
          </RegisterBox>

          <CancelBox>
          <SnackbarProvider>
            <CancelCredit/>
          </SnackbarProvider>
          </CancelBox>

        </CreditBox>
    )}
    {value === 'B' && (
      <PayPalBox>
        <img src={PayPayCreditImg} alt="" />
        
        <RegisterTwoBox>
          <SnackbarProvider>
            <PayPalType/>
          </SnackbarProvider>
        </RegisterTwoBox>

        
        <CancelTwoBox>
          <SnackbarProvider>
            <CancelCredit/>
          </SnackbarProvider>
        </CancelTwoBox>

      </PayPalBox>
    )}
    {value === 'C' && (
        <DepositBox>
        <h2>Al crear esta opcion se generará una ficha de depósito</h2>
        <p>Monto a depositar</p>
          <FormControl sx={{ width: '40ch' }}>
            <OutlinedInput onChange={(e)=>amountDepositHandler(Number(e.target.value))}/>
          </FormControl>
        <p>Número de cuenta objetivo</p>
        <FormControl sx={{ width: '40ch' }}>
            <OutlinedInput onChange={(e)=>numberDepositHandler(Number(e.target.value))} />
          </FormControl>

        <RegisterTwoBox>
          <SnackbarProvider>
            <Deposit/>
          </SnackbarProvider>
        </RegisterTwoBox>

        <CancelTwoBox>
          <SnackbarProvider>
            <CancelCredit/>
          </SnackbarProvider>
        </CancelTwoBox>

      </DepositBox>
    )}
    </>
  );
};

export default MyRadioGroup