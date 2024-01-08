import React, { useEffect, useState, useRef } from 'react'
import {    BackInputButtonWrapper, CarouselAndInputWrapper,
            CarouselWrapper, CellInputs, CellInputsInfo, CellIntoCell, FPTCellWrapper, FPTColumn, FPTColumnCellInput, 
            FPTColumnCellText, FPTColumnTitle, FinancingPlansTable, ImagesWrapper, 
            InnerUploadImage, InputSpecsWrapper, MainContent, MainWrapper, 
            ModalContent, ModalTitle, NextInputButtonWrapper, PercentageCellInput, 
            RowInputs, RowInputsInfo, SSTitle, SaveButtonWrapper, SecondStageContentWrapper, 
            SecondStageWrapper, TitleAndButtonsSSWrapper, TitleAndExit, UploadedImage } from './styles'
import { FinancingPlanDto, VehicleDto, VehicleRegistry, VehicleRegistryCardProp } from './types';

import { DummyRegistryData, EmptyData } from './consts';       // Dummy object

import TagsInput from './TagsInput';
import { IconButton } from 'components/IconButton'
import { Button } from 'components/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { ArrowBackIos, ArrowForwardIos, CloseSharp } from '@mui/icons-material';
import { CircularProgress, InputAdornment, Switch } from '@mui/material';
import { type } from 'os';
import { VehicleInfo } from 'pages/SalesProcess/partials/VehicleInfo';
import { createVehicle } from 'services/vehicleSelectionCard/createVehicle';

import { getDealershipManager } from 'services/vehicleSelectionCard/getDealershipsByManager';
import { getSalesmanManager } from 'services/vehicleSelectionCard/getSalesmanByManger';
import { getAdminsVehiclesById } from 'services/vehicleSelectionCard/getVehicleById';
import { number } from 'prop-types';
import { updateVehicle } from 'services/vehicleSelectionCard/updateVehicle';
import { CarImageList, saveDTDocumentsUpload, uploadImageUrls } from 'services';
import { deleteImage } from 'services/vehicleSelectionCard/deleteImage';
import { useAppContext } from 'store/app-context/app-context';


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
   
    // Data Sheet useState handlers
   

    // UseState to handle fade in and fade out while channg stages
    const [fadeOutFirstStep, setFadeOutFirstStep] = useState(false);
    const [fadeInSecondStep, setFadeInSecondStep] = useState(false);
    const [fadeOutComplete, setFadeOutComplete] = useState(false);

    // Main UseState, this one handles the input car data. The formulary changes
    // are saved in here
    const [vehicleFormData, setVehicleFormData] = useState<VehicleRegistry>(
        DummyRegistryData
    );
    
    const [vehicleDto, setVehicleDto] = useState<VehicleDto>(EmptyData);
    const [updateVehicleDto, setUpdateVehicleDto] = useState<VehicleDto>();

    const [dealershipManagerByID, setDealershipManagerByID] = useState<any[]>([]);
    const [salesmanManagerByID, setSalesmanManagerByID] = useState<any[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<any>();
    const [updating, setUpdating] = useState<boolean>(false);

    const getListDealership = async (dealershipId: number) => {
        await getDealershipManager(dealershipId).then((res) => {
            if (res && res.data) {
                console.log("FOUND DATA: "+res.data);
                setDealershipManagerByID(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
        })
    }
    const getListSalesman = async (dealershipId: number) => {
        await getSalesmanManager(dealershipId).then((res) => {
            if (res && res.data) {
                console.log("FOUND DATA: "+res.data);
                setSalesmanManagerByID(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
        })
    }
    const getVehicleSelected = async (vehicleId: number, managerId: number) => {
        await getAdminsVehiclesById(vehicleId,managerId).then((res) => {
            if (res && res.data) {
                console.log("FOUND DATAT: "+res.data);
                setSelectedVehicle(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
        })
    }


    

    // Function to update a financing plan by id
    const updateFplanByIdEmpty = (indexp: number, updatedFplan: FinancingPlanDto): FinancingPlanDto[] => {
        
        // Financing plan with the given id was found, create a new array with the updated financing plan
        const updatedFplans = [...vehicleDto.financingPlans];
        updatedFplans[indexp] = updatedFplan;
        return updatedFplans;
        
    };
    const updateFplanByIdUpdate = (indexp: number, updatedFplan: FinancingPlanDto): FinancingPlanDto[] => {
        
        // Financing plan with the given id was found, create a new array with the updated financing plan
        const updatedFplans = [...selectedVehicle.financingPlans];
        updatedFplans[indexp] = updatedFplan;
        return updatedFplans;
        
    };
    
    const handleInterestsChangeEmpty = (index: number, value: number) => {
        // Find the financing plan with the given id
        const fplan = vehicleDto.financingPlans[index];
        
        // Financing plan with the given id was found, create a new financing plan object with the updated interests value
        const updatedFplan = { ...fplan, interest: value };
        // Update the fplans property of the vehicleFormData object with the new array
        setVehicleDto(prevState => ({
            ...prevState,
            financingPlans: updateFplanByIdEmpty(index, updatedFplan)
        }));
        
    };
    const handleInterestsChangeUpdate = (index: number, value: number) => {
        // Find the financing plan with the given id
        const fplan = selectedVehicle.financingPlans[index];
        
        // Financing plan with the given id was found, create a new financing plan object with the updated interests value
        const updatedFplan = { ...fplan, interest: value };
        // Update the fplans property of the vehicleFormData object with the new array
        setSelectedVehicle((prevState:any) => ({
            ...prevState,
            financingPlans: updateFplanByIdUpdate(index, updatedFplan)
        }));
        
    };
    
    
    const handleDownPaymentChangeEmpty = (index: number, value: number) => {
        // Find the financing plan with the given id
        const fplan = vehicleDto.financingPlans[index];
        
        // Financing plan with the given id was found, create a new financing plan object with the updated interests value
        const updatedFplan = { ...fplan, downPayment: value };
        // Update the fplans property of the vehicleFormData object with the new array
        setVehicleDto(prevState => ({
            ...prevState,
            financingPlans: updateFplanByIdEmpty(index, updatedFplan)
        }));
        
    };
    const handleDownPaymentChangeUpdate = (index: number, value: number) => {
        // Find the financing plan with the given id
        const fplan = selectedVehicle.financingPlans[index];
        
        // Financing plan with the given id was found, create a new financing plan object with the updated interests value
        const updatedFplan = { ...fplan, downPayment: value };
        // Update the fplans property of the vehicleFormData object with the new array
        setSelectedVehicle((prevState:any) => ({
            ...prevState,
            financingPlans: updateFplanByIdUpdate(index, updatedFplan)
        }));
        
    };
    // Method for handling the upload functionality when clicking on the upload imgs button
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const fileName = file && file.name;
          const newImageUrl = URL.createObjectURL(file);
          if(type==="save"){
            var listTemp1 = vehicleFormData.imgs;
            listTemp1.push(newImageUrl);
            setVehicleFormData(prevState => ({
                ...prevState,
                imgs: listTemp1
            }));
          }else{
            var listTemp = selectedVehicle.imageUrls;
            listTemp.push(newImageUrl);
            setSelectedVehicle((prevState:any) => ({
                ...prevState,
                imageUrls: listTemp
            }));
          }
          
        }
    };
    // Method for handling the elements in the list of images while removing theme
    const handleRemoveImage = async(url: string, indice:number ) => {
        if(type ==="save"){
            var listTemp1 = vehicleFormData.imgs;
        
            listTemp1.splice(indice,1);
            setVehicleFormData(prevState => ({
            ...prevState,
            imgs: listTemp1
        }));
        }else{

        
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
        } 
            
            // Resto de tu código...
          
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

    
    const handleChangeBrandEmpty = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVehicleDto(prevState => ({
            ...prevState,
            brand: (event.target.value)
        }));
    };
    const handleOnChangeFuelUpdate = (event: SelectChangeEvent<string>) => {
        setSelectedVehicle((prevState:any) => ({
            ...prevState,
            fuel: (event.target.value)
        }));
    };
    const handleOnChangeFuelEmpty = (event: SelectChangeEvent<string>) => {
        setVehicleDto(prevState => ({
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

    const deleteImStatic = () =>{
        
        const listTemp1=vehicleFormData.imgs;
        listTemp1.splice(0,listTemp1.length)
        
        setVehicleFormData(prevState => ({
        ...prevState,
        imgs: listTemp1
        }));
        
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

    // Data verificaition UseStates
    const [dealershipVerification, setDealershipVerification ] = useState(false);
    const [salesmanVerification, setSalesmanVerification] = useState(false);

    const handleSaveRegistryEmpty = async() => {
        if(vehicleDto.salesManId === 0){
            setSalesmanVerification(true);
        }else if(vehicleDto.dealershipId === 0){
            setDealershipVerification(true);
        }

        if(vehicleDto.salesManId !== 0 && vehicleDto.dealershipId !==0){
            try {
                const response = await createVehicle(vehicleDto);
                // Accede a la respuesta después de que la promesa se haya resuelto
                await cargarImages(response.data);
                deleteImStatic();
                onClickSave();
                
                // Resto de tu código...
            } catch (error) {
                console.error(error); // Captura cualquier error que pueda ocurrir durante la ejecución de la promesa
            }
        }
    };

    const updateVehicleDtoData = () => {
        //const newList = Object.assign({}, updateVehicleDto, selectedVehicle);
        const keys = Object.keys(selectedVehicle.salesmanDealership);
        const index = keys.findIndex(key => selectedVehicle.salesmanDealership[key].dealershipId === selectedVehicle.selectedDealership);

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
            dealershipName: selectedVehicle.salesmanDealership[index].dealershipName,
            dealershipId:selectedVehicle.selectedDealership,
            salesManId:selectedVehicle.selectedSalesman,
            financingPlans:selectedVehicle.financingPlans,
            favorite: false,
            weaviate_id: "",
            img_url: "",

            // Asigna aquí las demás propiedades que desees copiar
          };
        
        //console.log({newList} );
        setUpdateVehicleDto(newList);
        
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
    useEffect(() => {
        if(loggedUser === undefined || loggedUser === null){
            return;
        }

        if (type === "save"){

            getListDealership(loggedUser.id);
            getListSalesman(loggedUser.id);

        }else{
            getVehicleSelected(parseInt(type),loggedUser.id);
        }
        
        
    }, [])
    useEffect(() => {
        console.log(selectedVehicle)
        if(selectedVehicle!==undefined){
            updateVehicleDtoData();
        }
        
    }, [dealershipManagerByID,salesmanManagerByID, selectedVehicle])

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

    /**
     * Variable used by the 'vehicle active' MUI switch component
     */
    const labelActivate = { inputProps: { 'aria-label': 'Switch demo' } }

    if(type == "save"){
        return(
            <MainWrapper>
                <ModalContent>
                    <MainContent>
                        <TitleAndExit>
                            <ModalTitle>Registro de Vehiculo</ModalTitle>
                            <IconButton
                                onClick={() =>{
                                    deleteImStatic();
                                    onClickClose();
                                }}
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
                                                    vehicleDto?.financingPlans.map((FP) => (
                                                        <FPTColumnCellText>{FP.months}</FPTColumnCellText>
                                                    ))
                                                }
                                            </FPTColumn>
                                            <FPTColumn>
                                                <FPTColumnTitle>Interés</FPTColumnTitle>
                                                {
                                                    vehicleDto.financingPlans.map((FP,index) => (
                                                        <FPTCellWrapper>
                                                            <FPTColumnCellInput
                                                                type='number'
                                                                defaultValue={FP.interest}
                                                                onChange={(event) => {
                                                                    handleInterestsChangeEmpty(index, parseInt(event.target.value));
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
                                                    vehicleDto.financingPlans.map((FP,index) => (
                                                        <FPTCellWrapper>
                                                            <FPTColumnCellInput
                                                                type='number'
                                                                defaultValue={FP.downPayment}
                                                                onChange={(event) => {
                                                                    handleDownPaymentChangeEmpty(index, parseInt(event.target.value));
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
                                    {vehicleFormData.imgs.map((photo,indice) => (
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
                                            
                                            onChange={handleChangeBrandEmpty}
                                            size='small'  
                                            label="Marca" 
                                            variant="outlined" 
                                            defaultValue={vehicleDto.brand}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            id="outlined-basic" 
                                            fullWidth
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
                                                    ...prevState,
                                                    subBrand: (event.target.value)
                                                }));
                                            }}
                                            size='small'  
                                            label="Sub Marca" 
                                            variant="outlined"
                                            defaultValue={vehicleDto.subBrand}
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
                                                setVehicleDto(prevState => ({
                                                    ...prevState,
                                                    model: parseInt(event.target.value)
                                                }));
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                min: 1900, // minimum value
                                                max: 2100, // maximum value
                                                defaultValue: 2023, // default value
                                                step: 1, // step value
                                              }}
                                        />
                                    </CellInputs> 
                                </RowInputs>                        
                                <RowInputs>
                                    <CellInputs>
                                        <FormControl fullWidth size="medium">
                                            <InputLabel id="demo-simple-select-label">Combustible</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Combustible"
                                                onChange={handleOnChangeFuelEmpty}
                                                defaultValue={vehicleDto.fuel.toString()}
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
                                        <FormControl fullWidth size="medium">
                                            <InputLabel id="demo-select-small-label">Transmisión</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"

                                                //defaultValue={vehicleDto.transmission.toString()}

                                                label="Transmisión"
                                                onChange={(event: SelectChangeEvent<string>) => {
                                                    setVehicleDto(prevState => ({
                                                        ...prevState,
                                                        transmission: (event.target.value)
                                                    }));
                                                }}
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
                                        <FormControl fullWidth size="small" error={dealershipVerification}>
                                            <InputLabel id="demo-select-small-label">Agencia</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                defaultValue="None"
                                                label="Agencia"
                                                onChange={(event: SelectChangeEvent<string>) => {
                                                    const objetoEncontrado = dealershipManagerByID.find((objeto) => objeto.id === event.target.value);
                                                    setVehicleDto(prevState => ({
                                                        ...prevState,
                                                        dealershipId: parseInt(event.target.value)
                                                    }));

                                                    
                                                    setVehicleDto(prevState => ({
                                                        ...prevState,
                                                        dealershipName: objetoEncontrado.name
                                                    }));
                                                }}
                                            >
                                                <MenuItem value={"None"}>None</MenuItem>
                                                
                                                {dealershipManagerByID.length > 0 ? (
                                                    
                                                    dealershipManagerByID.map((elemento) => (
                                                        <MenuItem value={elemento.id}>{elemento.name}</MenuItem>
                                                      
                                                    ))
                                                  ) : (
                                                    <MenuItem value={"Sin agencias"}>Sin agencias</MenuItem>
                                                  )}
                                            </Select>
                                        </FormControl>
                                    </CellInputs>
                                </RowInputs>
                                <RowInputs>
                                    <CellInputs>
                                        <TextField
                                            label="Rendimiento"
                                            id="outlined-start-adornment"
                                            type='number'
                                            size='small'
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">km/l</InputAdornment>,
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
                                                    ...prevState,
                                                    performance: parseInt(event.target.value)
                                                }));
                                            }}
                                            defaultValue={vehicleDto.performance}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            label="Kilometraje"
                                            id="outlined-start-adornment"
                                            type='number'
                                            size='small'
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">km</InputAdornment>,
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
                                                    ...prevState,
                                                    mileage: parseInt(event.target.value)
                                                }));
                                            }}
                                            defaultValue={vehicleDto.mileage}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="demo-select-small-label">Tracción</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                defaultValue={vehicleDto.traction.toString()}
                                                label="Tracción"
                                                onChange={(event: SelectChangeEvent<string>) => {
                                                    setVehicleDto(prevState => ({
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
                                            defaultValue={vehicleDto.version}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
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
                                                defaultValue: 0, // default value
                                                step: 1, // step value
                                              }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
                                                    ...prevState,
                                                    airbags: parseInt(event.target.value)
                                                }));
                                            }}
                                        />
                                    </CellInputs> 
                                    <CellInputs>
                                        <TextField
                                            label="Price"
                                            id="outlined-start-adornment"
                                            type='number'
                                            size='small'
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
                                                    ...prevState,
                                                    price: parseInt(event.target.value)
                                                }));
                                            }}
                                            defaultValue={vehicleDto.price}
                                        />
                                    </CellInputs> 
                                </RowInputs>
                                <RowInputs>
                                    <CellInputs>
                                        <TextField
                                            fullWidth
                                            id="outlined-number"
                                            label="Asientos"
                                            type="number"
                                            size='small'
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setVehicleDto(prevState => ({
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
                                                defaultValue: 0, // default value
                                                step: 1, // step value
                                              }}
                                        />
                                        <CellIntoCell>
                                            <TextField
                                                fullWidth
                                                id="outlined-number"
                                                label="Puertas"
                                                type="number"
                                                size='small'
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setVehicleDto(prevState => ({
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
                                                    defaultValue: vehicleDto.doors, // default value
                                                    step: 1, // step value
                                                }}
                                            />
                                        </CellIntoCell>
                                    </CellInputs>
                                    <CellInputs>
                                        <TagsInput label='Colors' setFormDataEmpty={setVehicleDto} colors={vehicleDto.colors.map(color => color)}></TagsInput>
                                    </CellInputs>
                                    <CellInputs>
                                        <FormControl fullWidth size="small" error={salesmanVerification}>
                                            <InputLabel id="demo-select-small-label">Encargado</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                label="Encargado"
                                                defaultValue="0"
                                                size='small'
                                                onChange={(event: SelectChangeEvent<string>) => {
                                                    setVehicleDto(prevState => ({
                                                        ...prevState,
                                                        salesManId: parseInt(event.target.value)
                                                    }));
                                                }}
                                            >
                                            <MenuItem value="0">None</MenuItem>
                                                {salesmanManagerByID.length > 0 ? (
                                                    salesmanManagerByID.map((elemento) => {
                                                        
                                                        if (vehicleDto.dealershipId === elemento.dealershipId) {
                                                          return(
                                                            <MenuItem value={elemento.id}>{elemento.name}</MenuItem>
                                                          )
                                                        } 
                                                      })
                                                  ) : (
                                                    <MenuItem value="0">None</MenuItem>
                                                  )}
                                                  

                                            </Select>
                                        </FormControl>
                                    </CellInputs>
                                </RowInputs>
                                <RowInputsInfo>
                                    <CellInputsInfo>
                                        <TextField
                                        fullWidth
                                        id="outlined-number"
                                        label="Informacion"
                                        type="text"
                                        size='medium'
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setVehicleDto(prevState => ({
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
                            {
                                updating ? (
                                    <Button
                                        onClick={handleSaveRegistryEmpty}
                                    >
                                        Guardar
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSaveRegistryEmpty}
                                    >
                                        <CircularProgress color="primary"/>
                                    </Button>
                                )
                            }
                        </SaveButtonWrapper>
                    </MainContent>
                </ModalContent>
            </MainWrapper>
        )
    }else{
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
                                                                        handleInterestsChangeUpdate(index, parseInt(event.target.value));
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
                                                                        handleDownPaymentChangeUpdate(index, parseInt(event.target.value));
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
                                                fullWidth
                                                id="outlined-basic" 
                                                
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
                                                    onChange={handleOnChangeFuelUpdate}
                                                    defaultValue={selectedVehicle.fuel}
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
                                            <FormControl fullWidth size="small" error={dealershipVerification}>
                                                <InputLabel id="demo-select-small-label">Agencia</InputLabel>
                                                <Select
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    defaultValue={selectedVehicle.selectedDealership.toString()}
                                                    label="Agencia"
                                                    onChange={(event: SelectChangeEvent<string>) => {
                                                        setSelectedVehicle((prevState:any) => ({
                                                            ...prevState,
                                                            selectedDealership: parseInt(event.target.value)
                                                        }));
                                                    }}
                                                >
                                                    
                                                    {selectedVehicle.salesmanDealership.map((list:any) =>(
                                                        <MenuItem value={list.dealershipId.toString()}>{list.dealershipName}</MenuItem>
                                                    ))
                                                    }
                                                    
                                                </Select>
                                            </FormControl>
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
                                    <RowInputs>
                                        <CellInputs>
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
                                            <CellIntoCell>
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
                                            </CellIntoCell>
                                        </CellInputs>
                                        <CellInputs>
                                            <TagsInput label='Colors' setFormDataEmpty={setSelectedVehicle} colors={selectedVehicle.colors.map((color:any) => color)}></TagsInput>
                                        </CellInputs>
                                        <CellInputs>
                                            <FormControl fullWidth size="small" error={salesmanVerification}>
                                                <InputLabel id="demo-select-small-label">Encargado</InputLabel>
                                                <Select
                                                    labelId="demo-select-small-label"
                                                    id="demo-select-small"
                                                    label="Encargado"
                                                    size='small'
                                                    defaultValue={selectedVehicle.selectedSalesman.toString()}
                                                    onChange={(event: SelectChangeEvent<string>) => {
                                                        setSelectedVehicle((prevState:any) => ({
                                                            ...prevState,
                                                            selectedSalesman: parseInt(event.target.value)
                                                        }));
                                                    }}
                                                >
                                                    <MenuItem value="0">None</MenuItem>
                                                    {
                                                    selectedVehicle.salesmanDealership.map((elemento:any) => {
                                                        
                                                        if (selectedVehicle.selectedDealership === elemento.dealershipId) {
                                                          return(
                                                            <MenuItem value={elemento.id.toString()}>{elemento.name}</MenuItem>
                                                          )
                                                        } 
                                                      })
                                                  }
                                                </Select>
                                            </FormControl>
                                        </CellInputs>
                                    </RowInputs>
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
                                {
                                    updating ? (
                                        <Button
                                            onClick={handleSaveRegistry}
                                        >
                                            Guardar
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleSaveRegistryEmpty}
                                        >
                                            <CircularProgress color="primary"/>
                                        </Button>
                                    )
                                }
                            </SaveButtonWrapper>
                        </MainContent>
                    </ModalContent>
                </MainWrapper>
              )
        }else{
            return (
                <MainWrapper>
                    <ModalContent/>
                </MainWrapper>
            )
        }
    }
}

export default VehicleRegistryCard