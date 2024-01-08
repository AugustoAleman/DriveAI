import React, {useState, useEffect} from 'react'
import { 
  TitleOffer,
  PriceOffer,
  OptionOne,
  BoxOffer,
  ButtonOffer,
  ButtonGenerate,
 } from './styles';
//IMPORT COMPONENTS
import { ContainerPrice } from '../GeneralInfo/styles';
import { CurrentPrice } from '../CurrentPrice';
import { Card } from "components/Card";
import { Button } from "components/Button";
//IMPORT SERVICES
import { getTradeIn } from 'services/SalesProcess/getTradeIn';
import { getVehicleById } from 'services';
//IMPORT LOCATION
import { useLocation } from 'react-router-dom';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
//MUI
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TradeIn  = () => {

  const [brandName, setBrandName] = useState("Toyota");

  //CAR BRAND
  const [brand, setBrand] = useState<any[]>([])
  const [selectedBrand, setSelectedBrand] = useState('');
  //CAR MODELS
  const [models, setModels] = useState<any[]>([]);
  const [selectedModels, setSelectedModels] = useState('');
  //CAR YEAR
  const [year, setYear] = useState<any[]>([])
  const [selectedYear, setSelectedYear] = useState('')
  //CAR COLOR
  const [color, setColor] = useState<any[]>([])
  const [selectedColor, setSelectedColor] = useState('')
  //CAR kilometers
  const [kilometers, setKilometers] = useState<any[]>([])
  const [selectedKilometers, setSelectedKilometers] = useState('')
  //CAR version
  const [version, setVersion] = useState<any[]>([])
  const [selectedVersion, setSelectedVersion] = useState('')
  //PRICE
  const [price, setPrice] = useState(0)
  const [tradeInData, setTradeInData] = useState([]);
  const [showPrice, setShowPrice] = useState(false);
  //VEHICLE INFORMATION
  const [vehiclePrice, setVehiclePrice] = useState<any>(null)
  //LOCATION
  const location = useLocation();
  const dataVehicleId = location.state?.data.vehicleId
  //PRICE WITH OFFER
  const [finalPrice, setFinalPrice] = useState<any>();
  const [showFinalPrice, setShowFinalPrice] = useState(false);

  //ADDED OFFER
  function AddedOffer() {
    const { enqueueSnackbar } = useSnackbar();
    //CHANGE VARIANT
    const handleClickVariant = (variant: VariantType) => () => {
      if (selectedBrand && selectedModels && selectedYear && selectedColor && selectedKilometers && selectedVersion) {
        enqueueSnackbar('Oferta agregada!', { variant });
      } else {
        enqueueSnackbar('No se agregó oferta', { variant: 'default' });
      }
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleClickVariant('success')}>
          {selectedBrand && selectedModels && selectedYear && selectedColor && selectedKilometers && selectedVersion ? 'Agregar oferta' : 'No generar oferta'}
        </Button>
      </React.Fragment>
    );
  }
  
  //GENERATE OFFER
  function GenerateOffer(){
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = () => {
      enqueueSnackbar('Oferta Generada');
    };
  
    return(
      <React.Fragment>
        <Button height = "50px" width="12vw" onClick={handleClick}>Generar oferta</Button>
      </React.Fragment>
    )
  }
 
  const handleGetVehicle = async () => {
    await getVehicleById(dataVehicleId).then((res: any) => {
      if (res && res.data) {
        console.log(res.data)
        setVehiclePrice(res.data);
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  useEffect(() => {
    handleGetVehicle();
  }, [])

  const handleGetTradeIn = async () => {
    await getTradeIn().then((res: any) => {
      if (res && res.data) {
        setTradeInData(res.data);
        console.log(res.data)

        const carBrand = res.data.map((item: any) => item.brand);
        setBrand(carBrand);
        
        const carModels = res.data.map((item: any) => item.carModel);
        setModels(carModels);
        console.log(carModels);
        const carYears = res.data.map((item: any)=> item.year)
        setYear(carYears);

        const carColor = res.data.map((item: any)=> item.color)
        setColor(carColor);

        const carKilometers = res.data.map((item: any)=> item.kilometers)
        setKilometers(carKilometers);

        const carVersion = res.data.map((item: any)=> item.version)
        setVersion(carVersion);

        const selectedCar = res.data.find(
          (car: any) =>
            car.brand === selectedBrand &&
            car.carModel === selectedModels &&
            car.year === selectedYear &&
            car.color === selectedColor &&
            car.kilometers === selectedKilometers &&
            car.version === selectedVersion
        );
        if (selectedCar) {
          console.log("SELECTEDCAR",selectedCar)
          setPrice(selectedCar.price);
        }
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  //TRADEIN
  useEffect(()=>{
    handleGetTradeIn();
  },[selectedBrand, selectedColor, selectedKilometers, selectedModels, selectedVersion, selectedYear])

  //HIDE THE PRICE 
  useEffect(() => {
    // Hide the price when the user selects a new option
    setShowPrice(false);
    setShowFinalPrice(false);
  }, [selectedBrand, selectedModels, selectedYear, selectedColor, selectedKilometers, selectedVersion]);
     
  //FORMATO DE MONEDA MXN
  const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })
  
  //LOCALSTORAGE
  //PRICE WITH OFFER
  localStorage.setItem('finalPrice',finalPrice)
  localStorage.getItem('finalPrice')

  return (
    <>
      {vehiclePrice? (
        <>          
          <ContainerPrice>
            <CurrentPrice valuePrice={formatter.format(vehiclePrice.price)}/>
          </ContainerPrice>
          <Box sx={{ display: 'flex', fontSize: 18, fontWeight: 'bold', marginBottom: 0.5, textAlign:"center" }}>
            <Box sx={{ }} >
              ¿Sabes Cuánto Vale tu Auto?
                <Box sx={{fontSize: 14, fontWeight:"normal"}}>
                  Llena los datos de tu vehículo para saber cuánto te podemos ofrecer en caso de que quieras usar su valor como parte del enganche
                </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', fontSize: 14, marginTop:1}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <p>Seleccione la marca de tu auto:</p>
              <OptionOne>
                <FormControl fullWidth>
                  <Select
                    value={selectedBrand}
                    onChange={(event) => setSelectedBrand(event.target.value)}
                    style={{width: 150}}
                    >
                    {brand.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </OptionOne>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <p>Seleccione el año de tu auto</p>
                  <OptionOne>
                    <FormControl fullWidth>
                      <Select
                          value={selectedYear}
                          onChange={(event) => setSelectedYear(event.target.value)}
                          style={{width: 150}}
                        >
                          {year.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </OptionOne>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <p>Seleccione el modelo de tu auto:</p>
                  <OptionOne>
                    <FormControl fullWidth>
                      <Select
                          value={selectedModels}
                          onChange={(event) => setSelectedModels(event.target.value)}
                          style={{width: 150}}
                        >
                          {models.map((model) => (
                            <MenuItem key={model} value={model}>
                              {model}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </OptionOne>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <p>Seleccione la versión de tu auto:</p>
                  <OptionOne>
                    <FormControl fullWidth>
                      <Select
                          value={selectedVersion}
                          onChange={(event) => setSelectedVersion(event.target.value)}
                          style={{width: 150}}
                        >
                          {version.map((version) => (
                            <MenuItem key={version} value={version}>
                              {version}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </OptionOne>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <p>Seleccione el color de tu auto:</p>
                  <OptionOne>
                    <FormControl fullWidth>
                      <Select
                          value={selectedColor}
                          onChange={(event) => setSelectedColor(event.target.value)}
                          style={{width: 150}}
                        >
                          {color.map((color) => (
                            <MenuItem key={color} value={color}>
                              {color}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>     
                  </OptionOne>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <p>Seleccione el kilometraje de tu auto:</p>
                  <OptionOne>
                    <FormControl fullWidth>
                      <Select
                          value={selectedKilometers}
                          onChange={(event) => setSelectedKilometers(event.target.value)}
                          style={{width: 150}}
                        >
                          {kilometers.map((kilometers) => (
                            <MenuItem key={kilometers} value={kilometers}>
                              {kilometers}km
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </OptionOne>
                </Box>
              </Box>
            </Box>
            <BoxOffer>
              <Card height="360px" width="320px" hasHoverColor = {false} cursor = "default" borderRadius="Small">
                <TitleOffer>Nuestra Oferta:</TitleOffer>
                {showPrice && <PriceOffer>{formatter.format(price)}</PriceOffer>}
                {showFinalPrice && <PriceOffer>Precio con oferta:{formatter.format(finalPrice)}</PriceOffer>}
                {/* ADD OFFER */}
                <ButtonOffer  onClick={() => {
                    if (selectedBrand && selectedModels && selectedYear && selectedColor && selectedKilometers && selectedVersion) {
                      const newFinalPrice = vehiclePrice.price - price;
                      setFinalPrice(newFinalPrice);
                      setShowFinalPrice(true);
                      setVehiclePrice({ ...vehiclePrice, price: newFinalPrice });
                    } else {
                      //NOT GENERATE OFFER
                      setShowFinalPrice(false);
                      const newFinalPrice = vehiclePrice.price;
                      setFinalPrice(newFinalPrice)
                    }
                  }}>
                  <SnackbarProvider>
                    <AddedOffer/>
                  </SnackbarProvider>
                </ButtonOffer>
                {/* GENERATE OFFER */}
                {selectedBrand && selectedModels && selectedYear && selectedColor && selectedKilometers && selectedVersion && (
                  <ButtonGenerate onClick={()=>
                    {
                      const minPrice = 10000; // set the minimum price
                      const maxPrice = 30000; // set the maximum price
                      const tradeInOfferPrice = Math.floor(
                        Math.random() * (maxPrice - minPrice + 1) + minPrice
                      );
                      setPrice(tradeInOfferPrice);
                      setShowPrice(true)
                    }
                    }>
                    <SnackbarProvider>
                      <GenerateOffer/>
                    </SnackbarProvider>
                  </ButtonGenerate>
                )}
              </Card>
            </BoxOffer>
          </Box>  
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
      )
      }
    </>
  );

}

export default TradeIn