import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { LargeCarCardProp } from './types'
import { CardCol, LCarCard } from './styles'
import { Box } from '@mui/material'
import { Button } from 'components/Button'

// Import icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import EvStationRoundedIcon from '@mui/icons-material/EvStationRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';


const LargeCarCard: React.FC<LargeCarCardProp> = ({
    variant = 0,
    size = 'normal',
    image = "https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png",
    brand = '---',
    model = '---',
    year = 2023,
    fuelType = '',
    price = 327000,
    installments = -1,
    purchaseDate = '',
    seller = '',
    location = '',
    time = '',
    documentStatus = '',
    driveTestStatus = '',
    saleStatus = '',
    onCardClick = () => { },
    onDriveTestClick = () => { },
    onCompareClick = () => { },
    onPriceClick = () => { },
    height = '',
    width = '',
    primaryFont = 24,
    secondaryFont = 17,
    tertiaryFont = 10,
    imageWidth = '35%',
    contentWidth = '65%',
    //Aceptar image width e image height, asignarlos al tamaño de la imagen
}) => {
    const iconMap = {
        'date': <CalendarMonthIcon />,
        'seller': <AccountBoxRoundedIcon />,
        'location': <LocationCityIcon />,
        'time': <AccessTimeRoundedIcon />,
        'document': <DescriptionRoundedIcon />,
        'driveTest': <DriveEtaIcon />,
        'sale': <RequestQuoteIcon />,
        'compare': <CompareArrowsRoundedIcon />,
    };

    const fuelMap = (fuelType: string) => {
        switch (fuelType) {
            case 'Gasolina':
                return <LocalGasStationRoundedIcon />;
            case 'Eléctrico':
                return <BoltRoundedIcon />;
            case 'Híbrido':
                return <EvStationRoundedIcon />;
            default:
                return <></>;
        }
    }

    const [divHeight, setDivHeight] = useState<number>(100);

    useEffect(() => {
        const div = document.getElementById('myDiv');
        if (div) {
            setDivHeight(div.clientHeight);
        }
    }, []);

    const appearance = (size: string) => {
        switch (size) {
            case 'small':
                return {
                    primaryFont: 19,
                    secondaryFont: 14,
                    tertiaryFont: 8,
                    width: '90%',
                    height: ''
                }
            case 'normal':
                return {
                    primaryFont: 24,
                    secondaryFont: 17,
                    tertiaryFont: 10,
                    width: '90%',
                    height: ''
                }
            case 'large':
                return {
                    primaryFont: 34,
                    secondaryFont: 24,
                    tertiaryFont: 14,
                    width: '90%',
                    height: ''
                }
            default:
                return {
                    primaryFont: 24,
                    secondaryFont: 17,
                    tertiaryFont: 10,
                    width: '90%',
                    height: ''
                }
        }
    }

    const bulletPoint = (data: ReactNode) => {
        return (
            <Box sx={{ color: 'text.secondary', fontSize: tertiaryFont, marginBottom: 1 }}>{data}</Box>
        )
    };


    const installmentsComponent = installments === -1 ? <></> : bulletPoint(<>Mensualidad ${installments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*/mes</>)

    const purchaseDateComponent = purchaseDate === '' ? <></> : bulletPoint(<>{iconMap.date} Fecha de {purchaseDate}</>)

    const sellerComponent = seller === '' ? <></> : bulletPoint(<>{iconMap.seller} Encargadx: {seller}</>)

    const fuelTypeComponent = fuelType === '' ? <></> : bulletPoint(<>{fuelMap(fuelType)} Tipo de combustible: {fuelType}</>)

    const locationComponent = location === '' ? <></> : bulletPoint(<>{iconMap.location} Ubicación: {location}</>)

    const timeComponent = time === '' ? <></> : bulletPoint(<>{iconMap.time} Hora: {time}</>)

    const documentStatusComponent = documentStatus === '' ? <></> : bulletPoint(<>{iconMap.document} Estatus de documentos: {documentStatus}</>)

    const driveTestStatusComponent = driveTestStatus === '' ? <></> : bulletPoint(<>{iconMap.driveTest} Estatus de prueba de manejo: {driveTestStatus}</>)

    const saleStatusComponent = saleStatus === '' ? <></> : bulletPoint(<>{iconMap.sale} Estatus de venta: {saleStatus}</>)

    const buttons = () => {
        return (
            <>
                <Box sx={{ marginBottom: 1 }}>
                    <Button
                        backgroundColor="theme.palette.secondary.main"
                        borderRadius="20px"
                        color="theme.palette.background.default"
                        fontSize={tertiaryFont + 'px'}
                        fontWeight="normal"
                        hoverShadow
                        startIcon={iconMap.driveTest}
                        onClick={onDriveTestClick}
                        variant="outlined"
                        width="fit-content"
                    >
                        Solicita tu prueba de manejo
                    </Button>
                </Box>

                <Box display='flex' justifyContent="space-between" sx={{ marginBottom: 1 }}>
                    <Button
                        backgroundColor="theme.palette.secondary.main"
                        borderRadius="20px"
                        fontSize={tertiaryFont + 'px'}
                        fontWeight="bold"
                        onClick={onPriceClick}
                        variant="contained"
                        width="fit-content"
                    >
                        Cotizalo
                    </Button>
                    <Button
                        backgroundColor="theme.palette.secondary.main"
                        borderRadius="20px"
                        fontSize={tertiaryFont + 'px'}
                        fontWeight="bold"
                        startIcon={iconMap.compare}
                        onClick={onCompareClick}
                        variant="contained"
                        width="fit-content"
                    >
                        Comparar
                    </Button>
                </Box>
            </>
        );
    }

    if (variant === 0) {
        return (
            // height={appearance(size)?.height}
            //     width={appearance(size)?.width}
            //     onClick={onCardClick}
            <Box
            sx={{
                display: {
                    xs: 'column',
                    md: 'flex',
                },
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'left',
                width: '100%',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                mv: '10px',
                padding: '10px',
                transition: 'all 0.3s ease-in-out'
            }}
            onClick={() => onCardClick()}
            >
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px',
                    justifyContent: 'center',
                    width: {
                        xs: '100%',
                        md: '80%',
                    },
                    background: '#fff',
                    borderRadius: '10px',
                    // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1),
                    cursor: 'pointer',
                    p: {
                        xs: '10px',
                        md: '0px',
                    }
                }}>
                    <img src={image} 
                    style={{ 
                        width: '100%', 
                        height: 'auto', 
                        objectFit: 'contain', 
                        borderRadius: '10px',
                    }} />
                </Box>
                {/* <CardCol
                    allignment='center'
                    padding='0px'
                    width={imageWidth}
                >
                </CardCol> */}

                {/* Details of the car */}
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px',
                    justifyContent: 'center',
                    width: {
                        xs: '100%',
                        md: '80%',
                    },
                    background: '#fff',
                    borderRadius: '10px',
                    // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1),
                    cursor: 'pointer',
                    p: {
                        xs: '10px',
                        md: '0px',
                    }
                }}>
                    <Box sx={{
                        bgcolor: 'background.paper',
                        p: 1,
                    }}>
                        <Box sx={{ color: 'text.primary', fontSize: primaryFont, fontWeight: 'medium', marginBottom: 1 }}>{brand}, {year}</Box>

                        <Box sx={{ color: 'text.secondary', fontSize: secondaryFont, fontWeight: 'medium', marginBottom: 1 }}>
                            ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} contado
                        </Box>

                        <Box sx={{
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                         }}>
                        {/* Optional Components */}
                        {purchaseDateComponent}
                        {sellerComponent}
                        {locationComponent}
                        {timeComponent}
                        {documentStatusComponent}
                        {driveTestStatusComponent}
                        {saleStatusComponent}
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
    else {
        return (
            <Box
            sx={{
                display: {
                    xs: 'column',
                    md: 'flex',
                },
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'left',
                width: '100%',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                mv: '10px',
                padding: '10px',
                transition: 'all 0.3s ease-in-out'
            }}
            onClick={() => onCardClick()}
            >
                <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0px',
                    justifyContent: 'center',
                    width: {
                        xs: '100%',
                        md: '80%',
                    },
                    background: '#fff',
                    borderRadius: '10px',
                    // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1),
                    cursor: 'pointer',
                    p: {
                        xs: '10px',
                        md: '0px',
                    }
                }}>
                    <img src={image} style={{ width: '100%', height: divHeight, objectFit: 'cover', borderRadius: '10px' }} />
                </Box>

                {/* Details of the car */}
                <Box sx={{
                    bgcolor: 'background.paper',
                    p: 1,
                    width: contentWidth,
                    alignItems: 'left'
                }}>
                    <Box sx={{ color: 'text.primary', fontSize: primaryFont, fontWeight: 'medium' }}>{brand}, {year}</Box>

                    <Box sx={{ color: 'text.secondary', fontSize: secondaryFont, fontWeight: 'medium' }}>
                        ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} contado
                    </Box>

                    {/* Optional Components */}
                    {installmentsComponent}
                    {fuelTypeComponent}
                    {locationComponent}
                    {/* Buttons */}
                    {buttons()}
                </Box>
            </Box>
        )
    }
}

export default LargeCarCard
