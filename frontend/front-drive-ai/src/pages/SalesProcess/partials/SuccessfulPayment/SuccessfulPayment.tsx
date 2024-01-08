import React, { useContext } from 'react';
import { Button } from '@mui/material';
import {
  BoxCardSuccess,
  CheckIcon,
  TittleSucces,
  TextSucces,
  TextTwoSucces,
  BoxButton,
} from './styles';
import { ActiveStepContext } from '../Steppers/Steppers';

const SuccesfulPayment: React.FC = () => {
  const { setActiveStep } = useContext(ActiveStepContext);

  const handleButtonClick = () => {
    setActiveStep(8);
    localStorage.removeItem("")
  };

  return (
    <>
      <BoxCardSuccess style={{ marginLeft: 200 }}>
        <CheckIcon style={{ fontSize: 100 }} />
        <TittleSucces>El pago ha sido exitoso</TittleSucces>
        <TextSucces>Gracias por usar Drive AI</TextSucces>
       
        <Button
          onClick={handleButtonClick}
          style={{ marginLeft: 70, marginTop: 50 }}
          variant="contained"
          color="secondary"
        >
          Avanzar
        </Button>
      </BoxCardSuccess>
    </>
  );
};

export default SuccesfulPayment;
