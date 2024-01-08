import React, { useEffect, useState, useRef } from 'react'
import {    ActivateParagraph, BackInputButtonWrapper, CarouselAndInputWrapper,
            CarouselWrapper, CellInputs, CellInputsInfo, CellInputsTwice, CellIntoCell, FPTCellWrapper, FPTColumn, FPTColumnCellInput, 
            FPTColumnCellText, FPTColumnTitle, FinancingPlansTable, ImagesWrapper, 
            InnerUploadImage, InputSpecsWrapper, LastRowInput, MainContent, MainWrapper, 
            ModalContent, ModalTitle, NextInputButtonWrapper, PercentageCellInput, 
            RowInputs, RowInputsInfo, SSTitle, SaveButtonWrapper, SecondStageContentWrapper, 
            SecondStageWrapper, SheetInputUpload, TitleAndButtonsSSWrapper, TitleAndExit, UploadedImage } from './styles'
import useStyles from './styles';

import { FinancingPlans,  VehicleRegistryCardProp } from './types';




import { IconButton } from 'components/IconButton'
import { Button } from 'components/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { ArrowBackIos, ArrowForwardIos, CloseSharp } from '@mui/icons-material';
import { InputAdornment, Switch } from '@mui/material';
import { FinancingPlanDto, VehicleDto, VehicleRegistry } from 'pages/DealershipManager/VehicleCatalogueAndAssignation/VehicleCatalogue/partial/VehicleRegistryCard/types';
import { DummyRegistryData } from 'pages/DealershipManager/VehicleCatalogueAndAssignation/VehicleCatalogue/partial/VehicleRegistryCard/consts';
import { deleteImage } from 'services/vehicleSelectionCard/deleteImage';
import { updateVehicle } from 'services/vehicleSelectionCard/updateVehicle';
import { CarImageList, saveDTDocumentsUpload, uploadImageUrls } from 'services';
import TagsInput from 'pages/DealershipManager/VehicleCatalogueAndAssignation/VehicleCatalogue/partial/VehicleRegistryCard/TagsInput';
import { useAppContext } from 'store/app-context/app-context';
import { getAdminsVehiclesById, getSalesmanVehiclesById } from 'services/vehicleSelectionCard/getVehicleById';




const VehicleRegistryCard : React.FC<VehicleRegistryCardProp> = ({
    onClickSave = () => {
        console.log("Save modal registry");
    },
    onClickClose = () => {
        console.log("Close modal registry");
    },
    type,
}) => {
    const { user: loggedUser } = useAppContext();
    
    /**
     * References between custom buttons and html input tags.
     */
    const imgUploadRef = useRef(null);
    const dataSheetRef = useRef(null);

    /**
     * useStates to handle multiple variables and changes between components
     */
    // Data Sheet useState handlers
    const [dataSheetUrl, setDataSheetUrl] = useState('');
    const [dataSheetName, setDataSheetName] = useState('');

    // UseState to handle fade in and fade out while channg stages
    const [fadeOutFirstStep, setFadeOutFirstStep] = useState(false);
    const [fadeInSecondStep, setFadeInSecondStep] = useState(false);
    const [fadeOutComplete, setFadeOutComplete] = useState(false);

    const [dealershipVerification, setDealershipVerification ] = useState(false);
    const [salesmanVerification, setSalesmanVerification] = useState(false);

    const [updateVehicleDto, setUpdateVehicleDto] = useState<VehicleDto>();

    // Main UseState, this one handles the input car data. The formulary changes
    // are saved in here
    const [vehicleFormData, setVehicleFormData] = useState<VehicleRegistry>(
        DummyRegistryData
    );
    const [selectedVehicle, setSelectedVehicle] = useState<any>();

    /**
     * Variable to handle style classnames for MUI components
     */
    const classes = useStyles();

    // Function to update a financing plan by id
    const updateFplanById = (indexp: number, updatedFplan: FinancingPlanDto): FinancingPlanDto[] => {
        // Find the index of the financing plan with the given id
        const updatedFplans = [...selectedVehicle.financingPlans];
        updatedFplans[indexp] = updatedFplan;
        return updatedFplans;
    };
    // Function to handle the change event of the interests input field
    const handleInterestsChange = (index: number, value: number) => {
         // Find the financing plan with the given id
         const fplan = selectedVehicle.financingPlans[index];
        
         // Financing plan with the given id was found, create a new financing plan object with the updated interests value
         const updatedFplan = { ...fplan, interest: value };
         // Update the fplans property of the vehicleFormData object with the new array
         setSelectedVehicle((prevState:any) => ({
             ...prevState,
             financingPlans: updateFplanById(index, updatedFplan)
         }));
    };
    // function to handle the change event of the interests input field
    const handleDownPaymentChange = (index: number, value: number) => {
        // Find the financing plan with the given id
        const fplan = selectedVehicle.financingPlans[index];
        
        // Financing plan with the given id was found, create a new financing plan object with the updated interests value
        const updatedFplan = { ...fplan, downPayment: value };
        // Update the fplans property of the vehicleFormData object with the new array
        setSelectedVehicle((prevState:any) => ({
            ...prevState,
            financingPlans: updateFplanById(index, updatedFplan)
        }));
    };
    // Method for handling the upload functionality when clicking on the upload imgs button
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const fileName = file && file.name;
          const newImageUrl = URL.createObjectURL(file);
          var listTemp = selectedVehicle.imageUrls;
            listTemp.push(newImageUrl);
            setSelectedVehicle((prevState:any) => ({
                ...prevState,
                imageUrls: listTemp
            }));
        }
    };
    // Method for handling the elements in the list of images while removing theme
    const handleRemoveImage = async(url: string, indice:number ) => {
        var listTemp = selectedVehicle.imageUrls;
        
        listTemp.splice(indice,1);
        setSelectedVehicle((prevState:any) => ({
            ...prevState,
            imageUrls: listTemp
        }));
            const response = await deleteImage(url).then((res:any)=>{
                
            }).catch((err:any)=>{
                console.error(err); 
            });
    };
    // Method for handling upload of data sheet while click into the upload
    // Datasheet button
    const handleDataSheetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const fileName = file && file.name;
          const newDataSheetUrl = URL.createObjectURL(file);
          setDataSheetName(fileName);
          setDataSheetUrl(newDataSheetUrl);
        }
    };

    /**
     * Methods for handling fade-in and fade-out transitions
     */
    const handleClickNext = () => {
        setFadeOutFirstStep(true);
    };
    const handleClickBack = () => {
        setFadeInSecondStep(false);
    };
    const handleAnimationEnd = () => {
        if(fadeOutFirstStep === true){
            setFadeOutComplete(true)
        }else{
            setFadeOutComplete(false);
        }
    };

    /**
     * 
     * Methods for handling changes on Text fields
     */
    const handleChangeBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleFormData(prevState => ({
            ...prevState,
            brand: (event.target.value)
        }));
    };
    const handleOnChangeFuel = (event: SelectChangeEvent<string>) => {
        setVehicleFormData(prevState => ({
            ...prevState,
            fuel: (event.target.value)
        }));
    };

    /**
     * Using a proxy for uploading files
     */
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Replace with the URL of the proxy server

    const handleSaveRegistry = async() => {
        if(selectedVehicle.selectedSalesman === 0){
            setSalesmanVerification(true);
        }else if(selectedVehicle.selectedDealership === 0){
            setDealershipVerification(true);
        }
        if(selectedVehicle.selectedSalesman !== 0 && selectedVehicle.selectedDealership !==0){
        
            try {
              const response = await updateVehicle(updateVehicleDto);
              console.log(response); // Accede a la respuesta después de que la promesa se haya resuelto
              await cargarImages(parseInt(type));
              onClickSave();
              
              // Resto de tu código...
            } catch (error) {
              console.error(error); // Captura cualquier error que pueda ocurrir durante la ejecución de la promesa
            }
          } 
    };

    const updateVehicleDtoData = () => {
        //const newList = Object.assign({}, updateVehicleDto, selectedVehicle);
        
        console.log("Adios")

        const newList: VehicleDto = {
            vehicleId: selectedVehicle.vehicleId,
            mileage:selectedVehicle.mileage,
            performance:selectedVehicle.performance,
            info:selectedVehicle.info,
            subBrand:selectedVehicle.subBrand,
            brand: selectedVehicle.brand,
            colors: selectedVehicle.colors,
            model: selectedVehicle.model,
            version: selectedVehicle.version,
            seats: selectedVehicle.seats,
            transmission: selectedVehicle.transmission,
            doors:selectedVehicle.doors,
            fuel: selectedVehicle.fuel,
            airbags: selectedVehicle.airbags,
            traction:selectedVehicle.traction,
            price: selectedVehicle.price,
            dealershipName: selectedVehicle.dealershipName,
            dealershipId:selectedVehicle.selectedDealership,
            salesManId:selectedVehicle.selectedSalesman,
            financingPlans:selectedVehicle.financingPlans,
            favorite: false,
            weaviate_id: "",
            img_url: "",

            // Asigna aquí las demás propiedades que desees copiar
          };
        
        console.log("Dios")
        console.log({newList} );
        setUpdateVehicleDto(newList);
        
    }

    const cargarImages = async(id:number) => {
        const UploadedFilesFormData = new FormData();
    let counter = 0;
    let p:any;
        if(type==="save"){
            p=vehicleFormData.imgs;
        }else{
            p=selectedVehicle.imageUrls;
        }
      for (const image of p) {
        
        await fetch(image)
          .then(response => response.blob())
          .then(blob => {
            const file = new File([blob], image+'.jpg', { type: blob.type });
            console.log("THE BLOB: " + blob);
            console.log(file); // The new file object
            UploadedFilesFormData.append("file"+counter, file, "image_01.jpg");
          })
          .catch(error => console.error(error));
          counter = counter + 1;
      }
        // Log the formData contents
        UploadedFilesFormData.forEach((value, key) => {
            console.log("The form data: " + key + " - " + value);
        });
        let urls: CarImageList[]; 
        await saveDTDocumentsUpload("cars/",UploadedFilesFormData).then((res:any)=>{
            if(res && res.data){
                console.log(res);
                urls = res.data;
            }
        }).catch((err:any) =>{
            console.log(err);
        })
        await uploadImageUrls(id,urls!).then((res: any) => {
            if(res && res.data){
                console.log(res.data);
            }
        }).catch((err:any) => {
            console.log(err);
        });
    }

    const getVehicleSelected = async (vehicleId: number) => {
        await getSalesmanVehiclesById(vehicleId).then((res) => {
            if (res && res.data) {
                console.log("FOUND DATAT: "+res.data);
                setSelectedVehicle(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
        })
    }


    /**
     * UseEffect for handling fade-out. It tracks the fadeOutFirstStep state
     */
    useEffect(() => {
        if(fadeOutFirstStep){
            const timer = setTimeout(() => {
                setFadeInSecondStep(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [fadeOutFirstStep]);

    /**
     * UseEffect for handling fade-in. It tracks the fadeInSecondStep state
     */
    useEffect(() => {
        if(fadeInSecondStep === false){
            const timer = setTimeout(() => {
                setFadeOutFirstStep(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [fadeInSecondStep])

    useEffect(() => {
        if(loggedUser === undefined || loggedUser === null){
            return;
        }

        
        getVehicleSelected(parseInt(type));
        
        
        
    }, [])
    useEffect(() => {
        console.log("panchoo")
        console.log(selectedVehicle)
        if(selectedVehicle!==undefined){
            updateVehicleDtoData();
        }
        
    }, [selectedVehicle])

    /**
     * Variable used by the 'vehicle active' MUI switch component
     */
    const labelActivate = { inputProps: { 'aria-label': 'Switch demo' } }

    if(selectedVehicle !== undefined){
        return (

            <MainWrapper>
                <ModalContent>
                    <MainContent>
                        <TitleAndExit>
                            <ModalTitle>Registro de Vehiculo</ModalTitle>
                            <IconButton
                                onClick={onClickClose}
                            >
                                <CloseSharp></CloseSharp>
                            </IconButton>
                        </TitleAndExit>
        
                        {
                            fadeInSecondStep === true ? (
                                <SecondStageWrapper
                                    className={fadeInSecondStep ? 'fadeIn' : 'fadeOut'} 
                                >
                                    <BackInputButtonWrapper>
                                        <IconButton
                                            onClick={handleClickBack}
                                        >
                                            <ArrowBackIos/>
                                        </IconButton>
                                    </BackInputButtonWrapper>
                                    <SecondStageContentWrapper>
                                        <TitleAndButtonsSSWrapper>
                                            <SSTitle>Selección de Planes de Financiamiento</SSTitle>
                                        </TitleAndButtonsSSWrapper>
                                        <FinancingPlansTable>
                                            <FPTColumn>
                                                <FPTColumnTitle>Meses</FPTColumnTitle>
                                                { 
                                                    selectedVehicle.financingPlans.map((FP:any) => (
                                                        <FPTColumnCellText>{FP.months}</FPTColumnCellText>
                                                    )) 
                                                
                                                    
                                                }
                                            </FPTColumn>
                                            <FPTColumn>
                                                <FPTColumnTitle>Interés</FPTColumnTitle>
                                                {
                                                   
                                                        selectedVehicle.financingPlans.map((FP:any,index:any) => (
                                                            <FPTCellWrapper>
                                                                <FPTColumnCellInput
                                                                    type='number'
                                                                    defaultValue={FP.interest}
                                                                    onChange={(event) => {
                                                                        handleInterestsChange(index, parseInt(event.target.value));
                                                                    }}
                                                                >
                                                                    
                                                                </FPTColumnCellInput>
                                                                <PercentageCellInput>%</PercentageCellInput>
                                                            </FPTCellWrapper>
                                                        ))  
                                                    
                                                    
                                                }
                                            </FPTColumn>
                                            <FPTColumn>
                                                <FPTColumnTitle>Enganche</FPTColumnTitle>
                                                {   
                                                    selectedVehicle.financingPlans.map((FP:any,index:any) => (
                                                        <FPTCellWrapper>
                                                            <FPTColumnCellInput
                                                                type='number'
                                                                defaultValue={FP.downPayment}
                                                                onChange={(event) => {
                                                                    handleInterestsChange(index, parseInt(event.target.value));
                                                                }}
                                                            >
                                                            </FPTColumnCellInput>
                                                            <PercentageCellInput>%</PercentageCellInput>
                                                        </FPTCellWrapper>
                                                    ))
                                                
                                                }
                                            </FPTColumn>
                                        </FinancingPlansTable>
                                    </SecondStageContentWrapper>
                                </SecondStageWrapper>
                            ) : null
                        }
                        <CarouselAndInputWrapper
                            className={fadeOutFirstStep ? 'fadeOut' : 'fadeIn'}
                            onAnimationEnd={handleAnimationEnd}
                            style={{display: fadeOutComplete && fadeOutFirstStep ? "none" : "flex"}}
                        >
                            <CarouselWrapper>
                                <ImagesWrapper>
                                    {selectedVehicle.imageUrls.map((photo:any,indice:any) => (
                                        <UploadedImage url={photo}>
                                            <InnerUploadImage className='inner' onClick={() => {handleRemoveImage(photo,indice)}}>
                                                <p>Delete</p>
                                            </InnerUploadImage>
                                        </UploadedImage>
                                    ))}
                                </ImagesWrapper>
                                <Button
                                    onClick={() => {
                                        if(imgUploadRef.current){
                                            (imgUploadRef.current as HTMLInputElement).click();
                                        }
                                    }}
                                >Cargar Imagen</Button>
                                    <input
                                        type="file"
                                        ref={imgUploadRef}
                                        style={{ display: "none" }}
                                        onChange={handleImageUpload}
                                    />
                            </CarouselWrapper>
                            <InputSpecsWrapper>
                                <RowInputs>
                                    <CellInputs>
                                        <TextField
                                            fullWidth 
                                            id="outlined-basic" 
                                            
                                            size='small'  
                                            label="Marca" 
                                            variant="outlined"
                                            defaultValue={selectedVehicle.brand}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    brand: (event.target.value)
                                                }));
                                            }}
                                        />
                                        
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            id="outlined-basic" 
                                            fullWidth
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    subBrand: (event.target.value)
                                                }));
                                            }}
                                            size='small'  
                                            label="Sub Marca" 
                                            variant="outlined"
                                            defaultValue={selectedVehicle.subBrand}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Modelo"
                                            type="number"
                                            size='small'
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    model: parseInt(event.target.value)
                                                }));
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: 1900, // minimum value
                                                max: 2200, // maximum value
                                                defaultValue: selectedVehicle.model, // default value
                                                step: 1, // step value
                                              }}
                                        />
                                    </CellInputs> 
                                </RowInputs>                        
                                <RowInputs>
                                    <CellInputs>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-select-small-label">Combustible</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label="Combustible"
                                                onChange={handleOnChangeFuel}
                                                defaultValue={selectedVehicle.fuel}
                                                sx={{paddingRight:0}}
                                            >
                                                <MenuItem value={"Gasolina"}>Gasolina</MenuItem>
                                                <MenuItem value={"Diésel"}>Diésel</MenuItem>
                                                <MenuItem value={"Gas natural"}>Gas natural</MenuItem>
                                                <MenuItem value={"Hidrógeno"}>Hidrógeno</MenuItem>
                                                <MenuItem value={"Electricidad"}>Electricidad</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CellInputs>
                                    <CellInputs>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-select-small-label">Transmisión</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                defaultValue={selectedVehicle.transmission}
                                                label="Transmisión"
                                                onChange={(event: SelectChangeEvent<string>) => {
                                                    setSelectedVehicle((prevState:any) => ({
                                                        ...prevState,
                                                        transmission: (event.target.value)
                                                    }));
                                                }}
                                                sx={{paddingRight:0}}
                                            >
                                                
                                                <MenuItem value={"Manual"}>Manual</MenuItem>
                                                <MenuItem value={"Automática"}>Automática</MenuItem>
                                                <MenuItem value={"Variable"}>Variable</MenuItem>
                                                <MenuItem value={"Semiautomática"}>Semiautomática</MenuItem>
                                                <MenuItem value={"Embrague"}>Embrague</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CellInputs>
                                    <CellInputs>
                                            <TextField 
                                                fullWidth 
                                                id="outlined-number"
                                                label="Puertas"
                                                type="number"
                                                size='small'
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setSelectedVehicle((prevState:any) => ({
                                                        ...prevState,
                                                        doors: parseInt(event.target.value)
                                                    }));
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    min: 1, // minimum value
                                                    max: 100, // maximum value
                                                    defaultValue: selectedVehicle.doors, // default value
                                                    step: 1, // step value
                                                }}
                                            />
                                        </CellInputs>
                                </RowInputs>
                                <RowInputs>
                                    <CellInputs>
                                        <TextField
                                            fullWidth
                                            label="Rendimiento"
                                            id="outlined-start-adornment"
                                            type='number'
                                            size='small'
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">km/l</InputAdornment>,
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    performance: parseInt(event.target.value)
                                                }));
                                            }}
                                            defaultValue={selectedVehicle.performance}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            fullWidth
                                            label="Kilometraje"
                                            id="outlined-start-adornment"
                                            type='number'
                                            size='small'
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">km</InputAdornment>,
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    mileage: parseInt(event.target.value)
                                                }));
                                            }}
                                            defaultValue={selectedVehicle.mileage}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-select-small-label">Tracción</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                defaultValue={selectedVehicle.traction}
                                                label="Tracción"
                                                onChange={(event: SelectChangeEvent<string>) => {
                                                    setSelectedVehicle((prevState:any) => ({
                                                        ...prevState,
                                                        traction: (event.target.value)
                                                    }));
                                                }}
                                            >
                                                <MenuItem value={"Delantera"}>Delantera</MenuItem>
                                                <MenuItem value={"Trasera"}>Trasera</MenuItem>
                                                <MenuItem value={"4x4"}>4x4</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CellInputs>
                                </RowInputs>
                                <RowInputs>
                                    <CellInputs>
                                        <TextField 
                                            fullWidth
                                            id="outlined-basic" 
                                            size='small' 
                                            label="Versión" 
                                            variant="outlined" 
                                            defaultValue={selectedVehicle.version}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    version: event.target.value
                                                }));
                                            }}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="No. Bolsas de Aire"
                                            type="number"
                                            size='small'
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: 0, // minimum value
                                                max: 20, // maximum value
                                                defaultValue: selectedVehicle.airbags, // default value
                                                step: 1, // step value
                                              }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    airbags: parseInt(event.target.value)
                                                }));
                                            }}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            fullWidth
                                            label="Price"
                                            id="outlined-start-adornment"
                                            type='number'
                                            size='small'
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    price: parseInt(event.target.value)
                                                }));
                                            }}
                                            defaultValue={selectedVehicle.price}
                                        />
                                    </CellInputs> 
                                </RowInputs>
                                <RowInputsInfo>
                                    <CellInputsTwice>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Asientos"
                                            type="number"
                                            size='small'
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedVehicle((prevState:any) => ({
                                                    ...prevState,
                                                    seats: parseInt(event.target.value)
                                                }));
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: 1, // minimum value
                                                max: 100, // maximum value
                                                defaultValue: selectedVehicle.seats, // default value
                                                step: 1, // step value
                                              }}
                                        />
                                        
                                    </CellInputsTwice>
                                    <CellInputsTwice>
                                        <TagsInput label='Colors' setFormDataEmpty={setSelectedVehicle} colors={selectedVehicle.colors.map((color:any) => color)}></TagsInput>
                                    </CellInputsTwice>
                                </RowInputsInfo>
                                <RowInputsInfo>
                                <CellInputsInfo>
                                    <TextField
                                    fullWidth
                                    id="outlined-number"
                                    label="Informacion"
                                    defaultValue={selectedVehicle.info}
                                    type="text"
                                    size='medium'
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setSelectedVehicle((prevState:any) => ({
                                            ...prevState,
                                            info: event.target.value
                                            }));
                                        }}
                                    InputLabelProps={{
                                        shrink: true,
                                        }}
                                    
                                    />
                                </CellInputsInfo>        
                                    
                                </RowInputsInfo>
                            </InputSpecsWrapper>
                            <NextInputButtonWrapper>
                                <IconButton
                                    onClick={handleClickNext}
                                >
                                    <ArrowForwardIos/>
                                </IconButton>
                            </NextInputButtonWrapper>
                        </CarouselAndInputWrapper>
        
                        <SaveButtonWrapper>
                                <Button
                                    
                                    onClick={handleSaveRegistry}
                                >
                                    Guardar
                                </Button>
                        </SaveButtonWrapper>
                    </MainContent>
                </ModalContent>
            </MainWrapper>
          )
        
    }else{
        return (

            <MainWrapper>
                <ModalContent>
                    
                </ModalContent>
            </MainWrapper>
          )
    }
}

export default VehicleRegistryCard