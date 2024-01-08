import React, { useState, useEffect, useRef } from 'react';
import {    CarouselWrapper, ImageCarousel, ImageSelection, 
            VehicleSelectionTitleWrapper, VehicleSelectionTitle,
            CarouselAndInfoWrapper, GeneralInfoVehicleWrapper,
            TechnicalSpecsWrapper, TechnicalSpecsTitleWrapper,
            SectionTitle, ListOfCharacteristicsWrapper,
            VehicleSelectionInformationWrapper, Image, 
            FunctionalCarouselWrapper, LeftButon, RightButon, 
            VehicleInformationWrapper, VehicleInformationButtonsWrapper,
            RowIconAndText, IconDescription, ElementsTST,
            ColTST, RowTST, CellTST, CirclePicker, GeneralPurposeTitle, 
            MainSelectionTitle, ModelAndTranmissionTitle, PriceTitle, 
            MonthlyPaymenTitle, CirclePickerActivated, MapIframe } from './styles';

import useStyles from './styles';

import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton';

import { CalendarMonth, FavoriteBorderOutlined, FileDownload, 
         DirectionsCar, LocationCity, ArrowForwardIos, 
         ArrowBackIos, CompareArrowsRounded, Favorite} from '@mui/icons-material';

import { vehicleDummyData } from './consts';            // dummy data
import { VehicleSelectionInformationProp } from './types';
import theme from 'theme/theme';
import { LoadingText } from 'components/LoadingText';
import { DealershipCoords, getDealershipCoords, setToFavorites } from 'services';
import { ListCompareStore, addToCompareListAction, deleteFromCompareListAction, isElementInCompareList } from 'pages/VehicleSelectionCard/toCompareStore';
import { AlertWindow } from 'components/AlertWindow';
import { calculateInstallments } from 'utils';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useAppContext } from 'store/app-context/app-context';

const VehicleSelectionInformation : React.FC<VehicleSelectionInformationProp> = ({
    onClickDrivinTest = () => {
        console.log("OnClick driving test");
    },
    onClickQuote = () => {
        console.log("OnClick Quote");
    },
    vehicleObj 
}) => {

    /**
     *  Referecent to handle carousel scroll movement 
     */
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * UseState for handle multiple functionalities
     */
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedColor, setSelectedColor] = useState(1);
    const [addedToFavorites, setAddedToFavorites] = useState(vehicleObj?.favorite);
    const [changedToCompare, setChangedToCompare] = useState(false);
    const { loggedIn } = useAppContext();

    const [compareColors, setCompareColors] = useState({
        backgr: theme.palette.background.default,
        fontCol: theme.palette.secondary.main
    });
    
    // Usetate for handling the url selection of an image
    const [srcImageSelection, setSrcImageSelection] = useState("https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png");

    /**
     *  Variable to handle MUI component styles defined on styles file 
     */
    const classes = useStyles();
  
    /**
     * Method for handling offSet scroll when clicking on carousel buttons
     * @param scrollOffset the ofset
     */
    const handleScroll = (scrollOffset: number) => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: scrollOffset,
          behavior: "smooth",
        });
        setScrollLeft(containerRef.current.scrollLeft);
      }
    };

    const handleAddToCompare = () => {
        if(vehicleObj?.vehicleId){
            if(isElementInCompareList(vehicleObj?.vehicleId)){
                console.log("TO DELETE");
                deleteFromCompareListAction(vehicleObj?.vehicleId);
            }else{
                console.log("TO ADD");
                addToCompareListAction(vehicleObj?.vehicleId)
            }
            setChangedToCompare(!changedToCompare);
        }
    };

    /**
     * Method for handling the image selection  
     */
    const handleAddedToFavorites = async () => {
        if(vehicleObj?.vehicleId){
            setAddedToFavorites(!addedToFavorites);
            await setToFavorites(vehicleObj?.vehicleId).then((res) => {
                if(res){
                    console.log(res.data);
                    setAddedToFavorites(res.data);
                }else{
                    setAddedToFavorites(!addedToFavorites);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    /**
     * Method for handling the download of a datasheet
     * @param fileURL 
     */
    const handleDownloadByURL = (fileURL: string) => {
        window.open(fileURL, '_blank');
    };

    useEffect(() => {}, [changedToCompare])

    // Coords Managements
    /*
    const [latitude, setLatitude] = useState(25.664621473033247);
    const [longitude, setLongitude] = useState(-100.3913927078247);
    const [iframeSrc, setIframeSrc] = useState(`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.03},${latitude - 0.01},${longitude + 0.03},${latitude + 0.01}&layer=hot&marker=${latitude},${longitude}`);
    */
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [iframeSrc, setIframeSrc] = useState<string | null>(null);
    const handleHandleSetCoords = async (dealershipID: number) => {
        await getDealershipCoords(dealershipID).then((res: any) => {
            const coords: DealershipCoords = res.data;

            console.log("This are the coords: " + res.data);

            if(coords.latitude !== null){
                setLatitude(parseFloat(coords.latitude));
                setLongitude(parseFloat(coords.longitude));
                const lat = parseFloat(coords.latitude);
                const long = parseFloat(coords.longitude);
                setIframeSrc(`https://www.openstreetmap.org/export/embed.html?bbox=${long - 0.03},${lat - 0.01},${long + 0.03},${lat + 0.01}&layer=hot&marker=${lat},${long}`);
            }
        }).catch((err: any) => {

        });
    }

    useEffect(() => {
        setAddedToFavorites(vehicleObj?.favorite);
        if(vehicleObj?.imageList?.length! > 0){
            setSrcImageSelection(vehicleObj?.imageList?.[0].url!);
        }
        if(vehicleObj?.dealershipId){
            handleHandleSetCoords(vehicleObj.dealershipId);
        }
    }, [vehicleObj]);

    const [showAlertDT, setShowAlertDT] = useState(false);

    const handleClickNotLoggedDT = () => {
      setShowAlertDT(true);
      setTimeout(() => {
        setShowAlertDT(false);
      }, 3000); // Adjust the duration (in milliseconds) as per your requirement
    };

    console.log("VEHICLE OBJ");
    console.log(vehicleObj);


  return (
    <VehicleSelectionInformationWrapper>
        {/**/}

        {/* Title */}
        <VehicleSelectionTitleWrapper>
            <VehicleSelectionTitle>Compra un Auto / {vehicleObj?.subBrand}</VehicleSelectionTitle>
        </VehicleSelectionTitleWrapper>
        
        {/* holder image "picker & carousel" and basic info */}
        <CarouselAndInfoWrapper>
            {/* carouse holder */}
            <CarouselWrapper>
                <ImageSelection imageSrc={srcImageSelection}/>

                <FunctionalCarouselWrapper>
                    <LeftButon onClick={() => handleScroll(-500)}>
                        <ArrowBackIos/>
                    </LeftButon>
                    <ImageCarousel ref={containerRef}>
                    {vehicleObj?.imageList?.map((photo, index) => (
                            <Image src={photo.url} alt={`Image ${index + 1}`} onClick={() => setSrcImageSelection(photo.url)}/>
                    ))}
                    </ImageCarousel>
                    <RightButon onClick={() => handleScroll(500)}>
                        <ArrowForwardIos/>
                    </RightButon>
                </FunctionalCarouselWrapper>
            </CarouselWrapper>

            {/* holder general vehicle info */}
            <GeneralInfoVehicleWrapper>
                {/** All the other content */}
                <VehicleInformationWrapper>

                        {
                            vehicleObj ? (
                                <MainSelectionTitle>
                                    {vehicleObj?.brand} {vehicleObj?.subBrand} / {vehicleObj?.version} 
                                </MainSelectionTitle>
                            ):(
                                <LoadingText/>
                            )
                        }
                        {
                            vehicleObj ? (
                                <ModelAndTranmissionTitle>
                                    {vehicleObj?.model} | {vehicleObj?.transmission}
                                </ModelAndTranmissionTitle>
                            ):(
                                <LoadingText/>
                            )
                        }
                        {
                            vehicleObj ? (
                                <PriceTitle>
                                    {
                                        vehicleObj?.price && (
                                            vehicleObj?.price.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            })
                                        )
                                    } MXN Contado
                                </PriceTitle>
                            ):(
                                <LoadingText/>
                            )
                        }

                        {
                            vehicleObj ? (
                                <div>
                                    <MonthlyPaymenTitle>
                                        Mensualidad de {vehicleObj?.price && vehicleObj?.financingPlans ? 
                                        ((calculateInstallments(vehicleObj?.price, vehicleObj?.financingPlans[0].downPayment, vehicleObj?.financingPlans[0].months, vehicleObj?.financingPlans[0].interest)).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
                                        ) : "---"} / mes a 12 meses 
                                    </MonthlyPaymenTitle>
                                    <MonthlyPaymenTitle>
                                        Con enganche desde {vehicleObj?.financingPlans ? vehicleObj?.financingPlans[0].downPayment : "---"}%
                                    </MonthlyPaymenTitle>
                                </div>
                            ):(
                                <LoadingText/>
                            )
                        }
                        {
                            vehicleObj ? (
                                <RowIconAndText>
                                    {/** Icon */}
                                    <DirectionsCar
                                        className={classes.directionsCar}
                                    />
                                    <IconDescription>
                                    {vehicleObj?.fuel} 
                                    </IconDescription>
                                </RowIconAndText >
                            ):(
                                <LoadingText/>
                            )
                        }
                        {
                            vehicleObj ? (
                                <RowIconAndText
                                    style={{
                                    }}
                                >
                                    {/** Icon */}
                                    <LocationCity
                                        className={classes.locationCity}
                                    />
                                    <IconDescription>{vehicleObj?.dealershipName}</IconDescription>
                                </RowIconAndText>
                            ):(
                                <LoadingText/>
                            )
                        }

                        {
                            loggedIn ? (
                                <Button
                                    color={theme.palette.primary.main}
                                    startIcon={<CalendarMonth/>}
                                    fontSize='0.5rem'
                                    variant="outlined"
                                    onClick={onClickDrivinTest}
                                >
                                    Solicita tu prueba de manejo
                                </Button>
                            ) : (

                                <Button
                                    color={theme.palette.primary.main}
                                    startIcon={<CalendarMonth/>}
                                    fontSize='0.5rem'
                                    variant="outlined"
                                    onClick={handleClickNotLoggedDT}
                                >
                                    Solicita tu prueba de manejo
                                </Button>
                            )
                        }
                        <Button
                            width="60%"
                            fontSize='0.8rem'
                            onClick={onClickQuote}
                        >
                            Cotízalo
                        </Button>
                </VehicleInformationWrapper>
                {/** heart and compare button */}
                <VehicleInformationButtonsWrapper>
                    {
                        addedToFavorites === true ? (
                            <IconButton color={theme.palette.accent.main} onClick={() => handleAddedToFavorites()}>
                                <Favorite/>
                            </IconButton>
                        ) : (
                            <IconButton color ={theme.palette.primary.main} onClick={() => handleAddedToFavorites()}>
                                <FavoriteBorderOutlined/>
                            </IconButton>
                        )
                    }

                    {
                        vehicleObj?.vehicleId ? (
                            <Button
                                endIcon={<CompareArrowsRounded/>}
                                backgroundColor={ isElementInCompareList(vehicleObj.vehicleId) ? 
                                    theme.palette.secondary.main
                                    :
                                    theme.palette.background.default
                                }
                                color={isElementInCompareList(vehicleObj.vehicleId) ? 
                                    theme.palette.background.default 
                                    : 
                                    theme.palette.secondary.main
                                }
                                onClick={handleAddToCompare}
                            >Compare</Button>
                        ) : (
                            <Button
                                endIcon={<CompareArrowsRounded/>}
                                backgroundColor={theme.palette.background.default}
                                color={theme.palette.background.default}
                            >Compare</Button>
                        )
                    }
                </VehicleInformationButtonsWrapper>
            </GeneralInfoVehicleWrapper>
        </CarouselAndInfoWrapper>

        {/* Specific characteristics holder */}
        <TechnicalSpecsWrapper>
            {/* Title and Technical specs button */}
            <TechnicalSpecsTitleWrapper>
                <ElementsTST>
                    <SectionTitle>Caracteristicas</SectionTitle>
                </ElementsTST>
                {/* Button Victor */}
                <ElementsTST>
                    {
                        /*
                        
                        
                    <Button
                        endIcon={<FileDownload/>}
                        backgroundColor={theme.palette.background.default}
                        color={theme.palette.secondary.main}
                        fontSize='0.8rem'
                        onClick={ () => handleDownloadByURL("https://www.audi.com.mx/dam/nemo/mx/FichasTecnicas/fichasOne22/S4-audi_ficha-tecnica_MY-2022.pdf")}
                    >
                            Ficha Técnica
                    </Button>
                        */
                    }
                </ElementsTST>
            </TechnicalSpecsTitleWrapper>

            {/* List of characteristics */}
            <ListOfCharacteristicsWrapper>
                        <ColTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Transmisión</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.transmission}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Modelo</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.model}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Asiento</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.seats}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST   >
                                    <GeneralPurposeTitle>Color</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST >
                                    {   vehicleObj?.colors ? (
                                            vehicleObj?.colors.map((col, index) => (
                                                index === selectedColor ? (
                                                    <CirclePickerActivated
                                                        style={{
                                                                backgroundColor: col
                                                        }}
                                                        onClick={() => setSelectedColor(index)}
                                                    />
                                                ) : (
                                                    <CirclePicker
                                                        style={{ backgroundColor: col}}
                                                        onClick={() => setSelectedColor(index)}
                                                    />
                                                )
                                            ))
                                        ) : (
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Puertas</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.doors}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                        </ColTST>
                        <ColTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Tipo</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.fuel}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Bolsas</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.airbags}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Tracción</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.traction}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Rendimiento</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.performance}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                            <RowTST>
                                <CellTST>
                                    <GeneralPurposeTitle>Agencia</GeneralPurposeTitle>
                                </CellTST>
                                <CellTST>
                                    {
                                        vehicleObj ? (
                                            <p>{vehicleObj?.dealershipName}, {vehicleObj?.dealershipLocation?.address}, {vehicleObj?.dealershipLocation?.state}, {vehicleObj?.dealershipLocation?.city}</p>
                                            // <p>{vehicleObj?.dealershipName}</p>
                                        ):(
                                            <LoadingText height='50%'/>
                                        )
                                    }
                                </CellTST>
                            </RowTST>
                        </ColTST>
                        {
                            longitude !== null && (
                                <ColTST>
                                    <br />
                                    <MapIframe
                                        src={iframeSrc as string}
                                        allowFullScreen={false}
                                        loading="lazy"
                                    ></MapIframe>
                                    <br />
                                    <small>
                                        <a
                                        href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}&layers=H`}
                                        >
                                        View Larger Map
                                        </a>
                                    </small>
                                </ColTST>
                            )
                        }
            </ListOfCharacteristicsWrapper>
        </TechnicalSpecsWrapper>

        {showAlertDT && (
        <AlertWindow
          message="Debes inciar sesión."
          severity="warning"
        />
      )}

    </VehicleSelectionInformationWrapper>
  )
}
export default VehicleSelectionInformation;