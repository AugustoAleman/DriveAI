import React, { useState, useEffect } from 'react';
import { PaperAvatar, PaperAvatar2, PaperAvatar3 } from '../styles';
import { Avatars } from 'components/Avatars';
import { SpanStepper, ContainerStepper, BackButton, ContainerButton } from './styles';
import { VehicleInfo } from '../VehicleInfo';
import { GeneralInfo } from '../GeneralInfo';
import { TradeIn } from '../TradeIn';
import { DocumentInfo } from '../DocumentInfo';
import { PaymentType } from '../PaymentType';
import { DeliveryOptions } from '../DeliveryOptions';
import { PaymentSummary } from '../PaymentSummary';
import { Payment } from '../Payment';
import { Subscription } from '../Subscription';
import { SuccessfulProcess } from '../SuccessfulProcess';
import { StatusDocuments } from '../StatusDocuments';
import {Results} from '../Results';
import { TotalSummary } from '../TotalSummary';
//IMPORT MUI
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { StepContent } from '@mui/material';
import Box from '@mui/material/Box';
import StepButton from '@mui/material/StepButton';
import CheckIcon from '@mui/icons-material/Check';
import StepIcon from '@mui/material/StepIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
//LOCATION
import { useLocation } from 'react-router-dom';
//SERVICE
import { getVehicleById } from 'services';

//REPLACE DESCRIPTION BY COMPONENTS
const CustomStepIcon = (props: { active: any; completed: any; icon: any }) => {
  const { active, completed, icon } = props;

  return (
    <StepIcon
      active={active}
      completed={completed}
      icon={completed ? <CheckCircleIcon color="secondary" /> : icon}
    />
  );
};

const steps = [

  {
    label: 'Información del Vehículo',
    description: <VehicleInfo />,
  },
  {
    label: 'Detalles personales',
    description: <GeneralInfo />,
  },
  {
    label: 'Trade-In',
    description: <TradeIn/>,
  },
  {
    label: 'Contado o financiamiento',
    description: <PaymentType/>,
  },
  {
    label: 'Documentación',
    description: <DocumentInfo id={1234} />
    ,
  },
  {
    label: 'Confirmación de documentos',
    description: <StatusDocuments />,
  },
  {
    label: 'Opciones de entrega',
    description: <DeliveryOptions />,
  },
  {
    label: 'Resumen de compra',
    description: <TotalSummary/>,
  },
  {
    label: 'Resultado de pago',
    description: <Results />,
  },
];


export const ActiveStepContext = React.createContext<{
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}>({
  activeStep: 0,
  setActiveStep: () => {},
});

function Steppers() {
  //ID VEHICLE
  const location =  useLocation();
  const dataVehicleId = location.state?.data.vehicleId
  //Vehicle
  const [vehicle, setVehicle] = useState<any>(null);
  const [brand, setBrand] = useState<any>(null)
  const [generalInfo, setGeneralInfo] = useState<any>(null)

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [process, setProcess] = useState('En proceso');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleGetVehicle = async () => {
    await getVehicleById(dataVehicleId).then((res: any) => {
      if (res && res.data) {
        console.log(res.data)
        setGeneralInfo(res.data)
        setVehicle(res.data.vehicle);
        console.log(res.data.vehicle.subBrand)
        setBrand(res.data.vehicle.subBrand)
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

useEffect(() => {
    handleGetVehicle();
  }, [])


  const totalSteps = () => {
    return steps.length;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step: React.SetStateAction<number>) => () => {
    setActiveStep(step);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const checkIsMobileView = () => {
      const isMobile = window.innerWidth < 600;
      setIsMobileView(isMobile);
      setIsDrawerOpen((prevIsDrawerOpen) => prevIsDrawerOpen && !isMobile);
    };
  
    window.addEventListener('resize', checkIsMobileView);
    checkIsMobileView();
  
    return () => {
      window.removeEventListener('resize', checkIsMobileView);
    };
  }, []);

  return (
    <>
    <ActiveStepContext.Provider value={{ activeStep, setActiveStep }}>
    {/* <p>{dataVehicleId}</p> */}
      <div style={{ display: 'flex' }}>
        {isMobileView && (
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            style={{ marginRight: '1rem' }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <div
          style={{
            backgroundColor: 'white',
            height: '90vh',
            width: '250px',
            marginRight: '2rem',
            boxShadow: '0 0 40px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            display: isMobileView && !isDrawerOpen ? 'none' : 'block',
          }}
        >
          {vehicle  && brand && generalInfo ? (
            <PaperAvatar square elevation={0} sx={{ p: 1 }}>
              <Avatars
                typeOfAvatars="main"
                colorOneAvatarMain="#000000"
                textOneAvatarMain={brand.brand}
                colorTwoAvatarMain="#78787B"
                textTwoAvatarMain={vehicle.version}
                imageCar={generalInfo.img_url}
              />
            </PaperAvatar>
          ): (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <Typography variant="body1" align="left" style={{ padding: '1rem', fontSize: '.8rem' }}>
            PROCESO DE COMPRA <span style={{ color: '#f50057' }}>{process}</span>
          </Typography>

          <div style={{ backgroundColor: 'white', height: 'calc(90vh - 80px)', padding: '1rem', boxShadow: 'none' }}>
            <Stepper orientation="vertical" activeStep={activeStep} style={{ padding: '10' }}>
              {steps.map((step, index) => (
                <Step key={step.label} style={{ padding: '0' }}>
                  <StepLabel
                    StepIconComponent={CustomStepIcon}
                    StepIconProps={{
                      icon: index + 1,
                    }}
                    style={{ margin: '4px 0', paddingLeft: '0' }}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
        <div style={{ flex: '2', marginLeft: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginRight: '1rem' }}>
          {steps[activeStep].description}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} variant="contained" color="secondary" style={{ marginRight: '1rem' }}>
                Regresar
              </Button>
            )}
            {activeStep !== totalSteps() - 1 && activeStep !== steps.length - 2 && (
              <Button onClick={handleNext} variant="contained" color="secondary">
                Continuar
              </Button>
            )}
          </div>
        </div>
      </div>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <div style={{ width: '250px', padding: '1rem' }}>
        {vehicle  && brand && generalInfo ? (
            <PaperAvatar square elevation={0} sx={{ p: 1 }}>
              <Avatars
                typeOfAvatars="main"
                colorOneAvatarMain="#000000"
                textOneAvatarMain={brand.brand}
                colorTwoAvatarMain="#78787B"
                textTwoAvatarMain={vehicle.version}
                imageCar={generalInfo.img_url}
              />
            </PaperAvatar>
          ): (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <Typography variant="body1" align="left" style={{ padding: '1rem', fontSize: '.8rem' }}>
            PROCESO DE COMPRA <span style={{ color: '#f50057' }}>{process}</span>
          </Typography>

          <Stepper orientation="vertical" activeStep={activeStep} style={{ padding: '0' }}>
            {steps.map((step, index) => (
              <Step key={step.label} style={{ padding: '0' }}>
                <StepButton onClick={handleStep(index)}>
                  <StepLabel
                    StepIconComponent={CustomStepIcon}
                    StepIconProps={{
                      icon: index + 1,
                    }}
                    style={{ margin: '4px 0', paddingLeft: '0' }}
                  >
                    {step.label}
                  </StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
      </Drawer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}></div>
      </ActiveStepContext.Provider>
    </>
  );
}

export default Steppers;