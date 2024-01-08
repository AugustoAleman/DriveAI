import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ButtonWrapper, ButtonsColorsContainer, CarouselWrapper, CellFPlan, ChromePickerWrapper, ColumnFPlan, ContainerColors, ContainerListColors, ContentWrapper, DescriptionWrapper, ImageLoaderWrapper, ImagesWrapper, InnerUploadImage, LeftColumn, ListMenu, ListMenuOption, ListOptionA, LowerWrapper, MainWrapper, MiddleWrapper, RightColumn, SingleColor, StepOneInputWrapper, StepOneLeft, StepOneRight, StepOneWrapper, StepThreeWrapper, StepTitle, StepTwoLeft, StepTwoRight, StepWrapper, Subtitle, TextFieldWrapper, TitleWrapper, UploadedImage, UpperWrapper } from "./styles";
import { ColorListPickerProps, ImageUploaderProps, StepOneProps, StepThreeProps, StepTwoProps, VehicleUploadProps } from "./types";
import TextField from '@mui/material/TextField';
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ChromePicker, ColorPickerProps } from 'react-color';
import theme from "theme/theme";
import Button from '@mui/material/Button';
import { CarImageList, saveDTDocumentsUpload, uploadImageUrls } from "services";
import { deleteImage } from "services/vehicleSelectionCard/deleteImage";
import { FinancingPlanDto, VehicleDto } from "pages/DealershipManager/VehicleCatalogueAndAssignation/VehicleCatalogue/partial/VehicleRegistryCard/types";
import Autocomplete from '@mui/material/Autocomplete';
import { CloseSharp } from "@mui/icons-material";
import { IconButton } from "components/IconButton";
import { getDealershipManager } from "services/vehicleSelectionCard/getDealershipsByManager";
import { useAppContext } from "store/app-context/app-context";
import UserProfile from "@sendbird/uikit-react/ui/UserProfile";
import { getSalesmanManager } from "services/vehicleSelectionCard/getSalesmanByManger";
import { getAdminsVehiclesById } from "services/vehicleSelectionCard/getVehicleById";
import { createVehicle } from "services/vehicleSelectionCard/createVehicle";
import { updateVehicle } from "services/vehicleSelectionCard/updateVehicle";
import { AlertWindow } from "components/AlertWindow";

/**
 * 
                                <ChromePicker color={selectedColor} onChange={(color) => {
                                    setSelectedColor(color.hex);
                                }} />
 */

const StepOne : React.FC<StepOneProps> = ({
    states,
    salesList,
    user,
    userType,
    formData,
    handleInputChange,
    dealership,
    handleSelectChange,
    imageFormData,
    imageList,
    setImageList
}) => {
    

    const combustible = [
        {
          value: 1,
          label: 'Gasolina',
        },
        {
          value: 2,
          label: 'Diésel',
        },
        {
          value: 3,
          label: 'Gas natural',
        },
        {
          value: 4,
          label: 'Hibrido',
        },
        {
            value: 5,
            label: 'Electricidad',
            
        }
    
    ];

    
    const [dealershipManagerByID, setDealershipManagerByID] = useState<any[]>([]);
    const [salesmanManagerByID, setSalesmanManagerByID] = useState<any[]>([]);
    const [listDealerships,setListDealerships] = useState<any>([]);
    const [listSalesman,setListSalesman] = useState<any>([]);
    const [selectDealership,setSelectDealership] = useState("");
    
    
    const dealershipList = () =>{
        const dealershipList = [];

        for ( const dealership of dealershipManagerByID) {
            const item = {
            value: dealership.id,
            label: dealership.name
        };

        dealershipList.push(item);
        }

        setListDealerships(dealershipList);
        
        
    }

    const salesmanList = () =>{
        const salesmanList = [];
        

        for ( const salesman of salesmanManagerByID) {
            if(salesman.dealershipId === parseInt(formData.get("dealershipId"))){
                const item = {
                    value: salesman.id,
                    label: salesman.name,
                    surname: salesman.surname
                };
                salesmanList.push(item);
            }
            
        }
        
        setListSalesman(salesmanList);
        
    }

    const getListDealership = async (dealershipId: number) => {
        await getDealershipManager(dealershipId).then((res) => {
            if (res && res.data) {
                console.log("FOUND DATAd:");
                console.log(res.data);
                setDealershipManagerByID(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
        })
    }

    const getListSalesman = async (dealershipId: number) => {
        await getSalesmanManager(dealershipId).then((res) => {
            if (res && res.data) {
                console.log("FOUND DATA: ");
                console.log(res.data);
                setSalesmanManagerByID(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
        })
    }

    useEffect(() => {
        if(user === undefined || user === null){
            return;
        }

        if (userType === "manager"){

            getListDealership(user.id);
            getListSalesman(user.id);

        }else if(userType === "salesman"){
            //getVehicleSelected(parseInt("0"),loggedUser.id);
            console.log("Salesman")
        }else{
            console.log("Fallo en endpoints");
        }
        
        
    }, [])
    useEffect(() => {
        if(dealershipManagerByID!==undefined){
            dealershipList();
           
        }
        
    }, [dealershipManagerByID,salesmanManagerByID])
    useEffect(() => {
        if(listDealerships!==undefined){
            salesmanList();
        }
        
    }, [selectDealership])

    return(
        <StepWrapper
        >
            <StepOneWrapper>
                <StepOneLeft>
                    <TitleWrapper>
                        <StepTitle>Imágenes</StepTitle>
                    </TitleWrapper>
                    <ImageLoaderWrapper>
                        <ImageUploader
                            imageFormData={imageFormData}
                            imageList={imageList}
                            setListImage={setImageList}
                        />
                    </ImageLoaderWrapper>
                </StepOneLeft>
                <StepOneRight>
                    <TitleWrapper>
                        <LeftColumn>
                            <TextFieldWrapper>
                                <StepTitle>Información General</StepTitle>
                            </TextFieldWrapper>
                        </LeftColumn>
                        <RightColumn></RightColumn>
                    </TitleWrapper>
                    <StepOneInputWrapper>
                        <LeftColumn>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.brand):(false)}
                                    fullWidth
                                    label="Marca"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("brand")}
                                    size="small"
                                    name="brand"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.model):(false)}
                                    fullWidth
                                    label="Modelo"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("model")}
                                    size="small"
                                    type="number"
                                    name="model"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.version):(false)}
                                    fullWidth
                                    label="Versión"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("version")}
                                    size="small"
                                    name="version"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper missing={states !==undefined ?(states.salesManId):(false)}>
                                <Autocomplete
                                    disabled = {userType==="salesman"}
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    size="small"
                                    id="disable-clearable"
                                    defaultValue={salesList !== undefined ?salesList.map((obj:any) =>{
                                        let nameS:string="";
                                        if(obj.id===parseInt(formData.get("salesManId"))){
                                            
                                            nameS =obj.name
                                        }
                                        return nameS;
                                    }):("")}
                                    options={listSalesman}
                                    onChange={(event:any, newValue:any) => {
                                        formData.set("salesManId",newValue.value)
                                        formData.set("salesman",newValue.label)
                                    }}
                                    //defaultValue={combustible[0]}
                                    //sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Encargado" />}
                                />
                            </TextFieldWrapper>
                        </LeftColumn>
                        <RightColumn>
                            <TextFieldWrapper >
                                <TextField
                                    error= {states !==undefined ?(states.subBrand):(false)}
                                    fullWidth
                                    label="Sub-Marca"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("sub_brand")}
                                    size="small"
                                    name="sub_brand"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.price):(false)}
                                    fullWidth
                                    label="Precio"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("price")}
                                    size="small"
                                    type="number"
                                    name="price"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper missing={states !==undefined ?(states.dealershipId):(false)}>
                                <Autocomplete
                                    disabled = {userType==="salesman"}
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    size="small"
                                    id="disable-clearable"
                                    defaultValue={userType==="salesman" ? "":formData.get("dealershipName")}
                                    options={listDealerships}
                                    onChange={(event:any, newValue:any) => {
                                        formData.set("dealershipId",newValue.value)
                                        formData.set("dealershipName",newValue.label)
                                        setSelectDealership(newValue.label);
                                    }}
                                    //defaultValue={combustible[0]}
                                    //sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Agencia" />}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.doors):(false)}
                                    fullWidth
                                    label="Puertas"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("doors")}
                                    size="small"
                                    type="number"
                                    name="doors"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                        </RightColumn>
                    </StepOneInputWrapper>
                </StepOneRight>
            </StepOneWrapper>
        </StepWrapper>
    );
}
const StepTwo : React.FC<StepTwoProps> = ({
    states,
    formData,
    handleInputChange,
    handleSelectChange,
    fuel,
    transmision,
    traction,
    listColors,
    setListColors,
}) => {

    
    

    const combustible = [
        {
          value: 1,
          label: 'Gasolina',
        },
        {
          value: 2,
          label: 'Diésel',
        },
        {
          value: 3,
          label: 'Gas natural',
        },
        {
          value: 4,
          label: 'Hibrido',
        },
        {
            value: 5,
            label: 'Electricidad',
        }
    
    ];

    const traccion = [
        {
            value: 1,
            label: 'Delantera',
          },
          {
            value: 2,
            label: 'Trasera',
          },
          {
            value: 3,
            label: '4x4',
          },
    ];

    const transmi = [
        {
            value: 1,
            label: 'Manual',
          },
          {
            value: 2,
            label: 'Automática',
          },
          {
            value: 3,
            label: 'Variable',
          },
          {
            value: 4,
            label: 'Semiautomática',
          },
          {
            value: 5,
            label: 'Embrague',
          },
    ];
    
    
    const [selectedPlan, setSelectedPlan] = useState(combustible[0]);

    const handlePlanChange = (event:any, newValue:any) => {
        setSelectedPlan(newValue);
    };


    return(
        <StepWrapper>
            <StepOneWrapper>
                <StepTwoLeft>
                    <TitleWrapper>
                        <LeftColumn>
                            <TextFieldWrapper>
                                <StepTitle>Características</StepTitle>
                            </TextFieldWrapper>
                        </LeftColumn>
                        <RightColumn></RightColumn>
                    </TitleWrapper>
                    <StepOneInputWrapper>
                        <LeftColumn>
                            <TextFieldWrapper missing={states !==undefined ?(states.fuel):(false)}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    size="small"
                                    id="disable-clearable"
                                    options={combustible}
                                    defaultValue={formData.get("fuel")}
                                    onChange={(event:any, newValue:any) => {
                                        formData.set("fuel",newValue.label)
                                    }}
                                    //defaultValue={combustible[0]}
                                    //sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Combustible" />}
                                />
                                {/* <FormControl fullWidth>
                                    <InputLabel id="fuel-label-select">Combustible</InputLabel>
                                    <Select
                                        labelId="fuel-label-select"
                                        id="fuel-label"
                                        name="fuel"
                                        value={formData.has("fuel") ? formData.get("fuel") : fuel}
                                        label="Combustible"
                                        size="small"
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value={"None"}>None</MenuItem>
                                        <MenuItem value={"Santa Fe"}>Santa Fe</MenuItem>
                                        <MenuItem value={"Churusbusco"}>Churubusco</MenuItem>
                                        <MenuItem value={"Iztapala"}>Iztapalapa</MenuItem>
                                    </Select>
                                </FormControl> */}
                            </TextFieldWrapper>
                            <TextFieldWrapper missing={states !==undefined ?(states.transmission):(false)}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    size="small"
                                    id="disable-clearable"
                                    options={transmi}
                                    defaultValue={formData.get("transmision")}
                                    onChange={(event:any, newValue:any) => {
                                        formData.set("transmision",newValue.label)
                                    }}
                                    //defaultValue={combustible[0]}
                                    //sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Transmisión" />}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.airbags):(false)}
                                    label="Bolsas de Aire"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("airbags")}
                                    size="small"
                                    type="number"
                                    name="airbags"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.mileage):(false)}
                                    label="Kilometraje"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("mileage")}
                                    size="small"
                                    type="number"
                                    name="mileage"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                        </LeftColumn>
                        <RightColumn>
                            <TextFieldWrapper missing={states !==undefined ?(states.traction):(false)}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    disableClearable
                                    defaultValue={formData.get("traction")}
                                    size="small"
                                    id="disable-clearable"
                                    options={traccion}
                                    onChange={(event:any, newValue:any) => {
                                        formData.set("traction",newValue.label)
                                    }}
                                    //defaultValue={combustible[0]}
                                    //sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Tracción" />}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.performance):(false)}
                                    label="Rendimiento"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("performance")}
                                    size="small"
                                    type="number"
                                    name="performance"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                            <TextFieldWrapper missing={states !==undefined ?(states.colors):(false)}>
                                <ColorPickerList listColors={listColors} setListColors={setListColors}></ColorPickerList>
                            </TextFieldWrapper>
                            <TextFieldWrapper>
                                <TextField
                                    error= {states !==undefined ?(states.seats):(false)}
                                    label="Asientos"
                                    id="outlined-size-small"
                                    defaultValue={formData.get("seats")}
                                    size="small"
                                    type="number"
                                    name="seats"
                                    onChange={handleInputChange}
                                />
                            </TextFieldWrapper>
                        </RightColumn>
                    </StepOneInputWrapper>
                </StepTwoLeft> 
                <StepTwoRight>
                    <TitleWrapper>
                        <StepTitle><br/></StepTitle>
                    </TitleWrapper>
                    <DescriptionWrapper>
                        <TextField
                            error= {states !==undefined ?(states.info):(false)}
                            id="outlined-multiline-static"
                            label="Descripción"
                            multiline
                            rows={13}
                            style={{width: "80%"}}
                            defaultValue={formData.get("description")}
                            name="description"
                            onChange={handleInputChange}
                        />
                    </DescriptionWrapper>
                </StepTwoRight>
            </StepOneWrapper>
        </StepWrapper>
    );
}
const StepThree : React.FC<StepThreeProps> = ({
    states,
    formData,
    downPayment0,
    downPayment1,
    downPayment2,
    downPayment3,
    downPayment4,
    interest0,
    interest1,
    interest2,
    interest3,
    interest4,
    handleInputChange,
    handleSelectChange,
}) => {
    return(
        <StepWrapper
        >
            <StepThreeWrapper>
                <ColumnFPlan>
                    <CellFPlan>
                        Meses
                    </CellFPlan>
                    <CellFPlan>
                       12 
                    </CellFPlan>
                    <CellFPlan>
                       24 
                    </CellFPlan>
                    <CellFPlan>
                       36
                    </CellFPlan>
                    <CellFPlan>
                       48
                    </CellFPlan>
                    <CellFPlan>
                       60
                    </CellFPlan>
                </ColumnFPlan>
                <ColumnFPlan>
                    <CellFPlan>
                        Interes
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={interest0}
                            id="outlined-size-small"
                            defaultValue={formData.get("fpMonths1")}
                            size="small"
                            type="number"
                            name="fpMonths1"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={interest1}
                            id="outlined-size-small"
                            defaultValue={formData.get("fpMonths2")}
                            size="small"
                            type="number"
                            name="fpMonths2"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={interest2}
                            id="outlined-size-small"
                            defaultValue={formData.get("fpMonths3")}
                            size="small"
                            type="number"
                            name="fpMonths3"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={interest3}
                            id="outlined-size-small"
                            defaultValue={formData.get("fpMonths4")}
                            size="small"
                            type="number"
                            name="fpMonths4"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={interest4}
                            id="outlined-size-small"
                            defaultValue={formData.get("fpMonths5")}
                            size="small"
                            type="number"
                            name="fpMonths5"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                </ColumnFPlan>
                <ColumnFPlan>
                    <CellFPlan>
                       Enganche 
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={downPayment0}
                            id="outlined-size-small"
                            defaultValue={formData.get("downpayment1")}
                            size="small"
                            type="number"
                            name="downpayment1"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={downPayment1}
                            id="outlined-size-small"
                            defaultValue={formData.get("downpayment2")}
                            size="small"
                            type="number"
                            name="downpayment2"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={downPayment2}
                            id="outlined-size-small"
                            defaultValue={formData.get("downpayment3")}
                            size="small"
                            type="number"
                            name="downpayment3"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={downPayment3}
                            id="outlined-size-small"
                            defaultValue={formData.get("downpayment4")}
                            size="small"
                            type="number"
                            name="downpayment4"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                    <CellFPlan>
                        <TextField
                            error={downPayment4}
                            id="outlined-size-small"
                            defaultValue={formData.get("downpayment5")}
                            size="small"
                            type="number"
                            name="downpayment5"
                            onChange={handleInputChange}
                        />
                    </CellFPlan>
                </ColumnFPlan>
            </StepThreeWrapper>
        </StepWrapper>
    );
}

const ColorPickerList : React.FC<ColorListPickerProps> = ({
    listColors,
    setListColors,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [toEdit, setToEdit] = useState(false);
    const handleColorClicked = (index: number) => {
        setSelectedIndex(index);
    }

    const handleClickEdit = () => {
        setToEdit(!toEdit);
    };
    const handleClickDelete = () => {
        const newList = [...listColors];
        newList.splice(selectedIndex, 1);
        setListColors(newList);
        setSelectedIndex(0);
    };
    const handleClickAdd = () => {
        const newList = [...listColors, "#ffffff"]
        setListColors(newList);
    }
    return(
        <ContainerListColors>
            <Subtitle>Colores</Subtitle>
            <ContainerColors>
                {
                    listColors.map((color: string, index: number) => {
                        return(
                            <SingleColor
                                backColor={color}
                                onClick={() => {
                                    handleColorClicked(index)
                                }}
                                selectedShadow={index === selectedIndex ? 10:0}
                            >
                            </SingleColor>
                        );
                    })
                }
            </ContainerColors>
            <ButtonsColorsContainer>
                <Button onClick={()=>{handleClickEdit()}}>{(toEdit === false) ? "Editar" : "Cerrar"}</Button>
                <Button onClick={()=>{handleClickDelete()}}>Borrar</Button>
                <Button onClick={()=>{handleClickAdd()}}>Añadir</Button>
            </ButtonsColorsContainer>
            <ChromePickerWrapper>

                {
                    toEdit && (
                        <ChromePicker color={listColors[selectedIndex]} onChange={(color) => {
                            const newList = [...listColors];
                            newList[selectedIndex] = color.hex;
                            setListColors(newList);
                        }} /> 
                    )
                }
            </ChromePickerWrapper>

        </ContainerListColors>
    );
}

const ImageUploader : React.FC<ImageUploaderProps> = ({
    imageFormData,
    imageList,
    setListImage,
}) => {

    const imgUploadRef = useRef(null);

    // Method for handling the upload functionality when clicking on the upload imgs button
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            var listTemp1 = imageList;
            listTemp1.push(newImageUrl);
            setListImage(listTemp1);
            setItChanged(!itChanged);
            /*
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
            */
          
        }
    };
    // Method for handling the elements in the list of images while removing theme
    const handleRemoveImage = async(url: string, indice:number ) => {

        var listTemp1 = imageList;
        listTemp1.splice(indice, 1);
        setListImage(listTemp1);
        setItChanged(!itChanged);
        /*
        if(type ==="save"){
        
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
        } 
        */
        const response = await deleteImage(url).then((res:any)=>{
            console.log(res); 
        }).catch((err:any)=>{
            console.error(err); 
        });
            
            // Resto de tu código...
          
    };

    /*
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
    */
   const [itChanged, setItChanged] = useState(false);
    useEffect(() => {
    }, [itChanged]);
    return(
        <CarouselWrapper>
                <ImagesWrapper>
                    {imageList.map((photo,indice) => (
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
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: "white",
                        '&:hover':{
                            color: "black"
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

    );
}

const VehicleUploadModal : React.FC<VehicleUploadProps> = ({
    toUpdate,
    userType,
    selectecDealershipVehicleId,
    setCloseModal
}) => {

    const { user: loggedUser } = useAppContext();
    
    const [selectedVehicle, setSelectedVehicle] = useState<any>();

    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [listColors, setListColors] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [firstLoading, setFirstLoading] = useState<boolean>(false);
    
    const [imageFormData, setImageFormData] = useState<FormData>(new FormData);
    const [imageList, setImageList] = useState<any[]>([]);

    const [dealership, setDealership] = useState('None');
    const [fuel, setFuel] = useState('None');
    const [transmision, setTransmision] = useState('None');
    const [traction, setTraction] = useState('None');
    const [salesmanDealership, setSalesmanDealership] = useState<any>([]);

    const [states, setStates] = useState<any>()


    const getVehicleSelected = async (vehicleId: number, managerId: number) => {
    setFirstLoading(true);    
    await getAdminsVehiclesById(vehicleId,managerId).then((res) => {
            if (res && res.data) {
            console.log("FOUND DATAT: ");
            console.log(res.data);
            setSelectedVehicle(res.data);
        }
        setFirstLoading(false);
    }).catch((err) => {
        console.log("ERROR: "+err);
        setFirstLoading(false);
    })
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formData.set(name, value);
      setFormData(formData);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        if(name === 'dealership'){
            setDealership(value);
        }else if (name === "fuel"){
            setFuel(value);
        }else if (name === "transmision"){
            setTransmision(value);
        }else if (name === 'traction'){
            setTraction(value);
        }
        formData.set(name, value);
        setFormData(formData);
    };

    // ====================================>>>>>>>>>>>>>
    const cargarImages = async(id:number) => {
        const UploadedFilesFormData = new FormData();
        let counter = 0;
        for (const image of imageList) {
            
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
    /*
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
    */
    // ====================================>>>>>>>>>>>>>

    const toCreateBasicForm = () => {
        if(!toUpdate || selectedVehicle===undefined){
        formData.set("brand", "");
        formData.set("model", "");
        formData.set("version", "");
        formData.set("dealershipId", "");
        formData.set("dealershipName", "");
        formData.set("salesManId", "");
        formData.set("sub_brand", "");
        formData.set("price", "");
        formData.set("salesman", "");
        formData.set("doors", "");
        formData.set("fuel", "");
        formData.set("transmision", "");
        formData.set("airbags", "");
        formData.set("mileage", "");
        formData.set("traction", "");
        formData.set("performance", "");
        formData.set("seats", "");
        formData.set("description", "");
        formData.set("fpMonths1", "");
        formData.set("fpMonths2", "");
        formData.set("fpMonths3", "");
        formData.set("fpMonths4", "");
        formData.set("fpMonths5", "");
        formData.set("downpayment1", "");
        formData.set("downpayment2", "");
        formData.set("downpayment3", "");
        formData.set("downpayment4", "");
        formData.set("downpayment5", "");
        setFormData(formData);
        
        }else{
        
        setListColors(selectedVehicle.colors)
        setImageList(selectedVehicle.imageUrls)
        setSalesmanDealership(selectedVehicle.salesmanDealership)
        formData.set("vehicleId", selectedVehicle.vehicleId)
        formData.set("brand", selectedVehicle.brand);
        formData.set("model", selectedVehicle.model);
        formData.set("version", selectedVehicle.version);
        formData.set("dealershipId", selectedVehicle.selectedDealership);
        formData.set("dealershipName", selectedVehicle.dealershipName);
        formData.set("salesManId", selectedVehicle.selectedSalesman);
        formData.set("sub_brand", selectedVehicle.subBrand);
        formData.set("price", selectedVehicle.price);
        formData.set("salesman", "");
        formData.set("doors", selectedVehicle.doors);
        formData.set("fuel", selectedVehicle.fuel);
        formData.set("transmision", selectedVehicle.transmission);
        formData.set("airbags", selectedVehicle.airbags);
        formData.set("mileage", selectedVehicle.mileage);
        formData.set("traction", selectedVehicle.traction);
        formData.set("performance", selectedVehicle.performance);
        formData.set("seats", selectedVehicle.seats);
        formData.set("description", selectedVehicle.info);
        formData.set("fpMonths1", selectedVehicle.financingPlans[0].interest);
        formData.set("fpMonths2", selectedVehicle.financingPlans[1].interest);
        formData.set("fpMonths3", selectedVehicle.financingPlans[2].interest);
        formData.set("fpMonths4", selectedVehicle.financingPlans[3].interest);
        formData.set("fpMonths5", selectedVehicle.financingPlans[4].interest);
        formData.set("downpayment1", selectedVehicle.financingPlans[0].downPayment);
        formData.set("downpayment2", selectedVehicle.financingPlans[1].downPayment);
        formData.set("downpayment3", selectedVehicle.financingPlans[2].downPayment);
        formData.set("downpayment4", selectedVehicle.financingPlans[3].downPayment);
        formData.set("downpayment5", selectedVehicle.financingPlans[4].downPayment);
        setFormData(formData);
        
        }
        
    }
    const createFinancingPlanDto = () =>{
        let dataSaveF:FinancingPlanDto[]=[];
        
        
        for (let i = 1; i <= 5; i++) {
            const singleF:FinancingPlanDto={
                months: 0,
                downPayment:0,
                interest:0,
            }
            singleF.months=i*12;
            singleF.downPayment=formData.get("downpayment"+i.toString()) !== null ? parseInt(formData.get("downpayment"+i.toString()) as string) as number:0;
            singleF.interest=formData.get("fpMonths"+i.toString()) !== null ? parseInt(formData.get("fpMonths"+i.toString()) as string) as number:0;
            dataSaveF.push(singleF);
        }
        return dataSaveF;
    }
    const createVehicleDto = () => {

        
        const financingPlans = createFinancingPlanDto();
           
        const dataToSaveV:VehicleDto ={
            vehicleId: formData.get("vehicleId") !== undefined ? parseInt(formData.get("vehicleId") as string) as number:null,
            mileage: formData.get("mileage") !== null ? parseInt(formData.get("mileage") as string) as number:0 ,
            performance: formData.get("performance") !== null ? parseInt(formData.get("performance") as string) as number:0,
            info: formData.get("description") !== null ? formData.get("description") as string:"",
            subBrand: formData.get("sub_brand") !== null ? formData.get("sub_brand") as string:"",
            brand: formData.get("brand") !== null ? formData.get("brand") as string:"",
            colors: listColors,
            model: formData.get("model") !== null ? parseInt(formData.get("model") as string) as number:0,
            version: formData.get("version") !== null ? formData.get("version") as string:"",
            seats: formData.get("seats") !== null ? parseInt(formData.get("seats") as string) as number:0,
            transmission: formData.get("transmision") !== null ? formData.get("transmision") as string:"",
            doors: formData.get("doors") !== null ? parseInt(formData.get("doors") as string) as number:0,
            fuel: formData.get("fuel") !== null ? formData.get("fuel") as string:"",
            airbags: formData.get("airbags") !== null ? parseInt(formData.get("airbags") as string) as number:0,
            traction: formData.get("traction") !== null ? formData.get("traction") as string:"",
            price: formData.get("price") !== null ? parseInt(formData.get("price") as string) as number:0,
            dealershipName: formData.get("dealershipName") !== null ? formData.get("dealershipName") as string:"",
            dealershipId: formData.get("dealershipId") !== null ? parseInt(formData.get("dealershipId") as string) as number:0,
            salesManId: formData.get("salesManId") !== null ? parseInt(formData.get("salesManId") as string) as number:0,
            financingPlans: financingPlans,
            favorite: false,
            weaviate_id: "",
            img_url: ""
        }
        return dataToSaveV;
    }

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlerMessage] = useState("Alerta");
    useEffect(() => {
        if(showAlert){
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 4000); // 5 seconds
        }
    }, [showAlert]);

     

    const [downPayment0,setDownPayment0] = useState(false);
    const [downPayment1,setDownPayment1] = useState(false);
    const [downPayment2,setDownPayment2] = useState(false);
    const [downPayment3,setDownPayment3] = useState(false);
    const [downPayment4,setDownPayment4] = useState(false);
    const [interest0,setInterest0] = useState(false);
    const [interest1,setInterest1] = useState(false);
    const [interest2,setInterest2] = useState(false);
    const [interest3,setInterest3] = useState(false);
    const [interest4,setInterest4] = useState(false);

    

    const dataVerification = (data:any) =>{
        
        let isEmpty = false;

        for (let key in data) {
            
            if ((!data[key] ||(key==="colors" && data[key].length<=0) )  && key!=="financingPlans"  && key!=="favorite" && key!=="weaviate_id" && key!=="img_url" && key!=="vehicleId") {
                
                if(data[key]!== 0 || key==="colors"){
                    isEmpty = true;
                    setStates((prevState:any)=>({
                        ...prevState,
                        [key]: true,
                    }))

                }
                
            }else if(key!=="financingPlans" && key!=="favorite" && key!=="weaviate_id" && key!=="img_url" &&(data[key] ||(key==="colors" && data[key].length>0))){
                
                setStates((prevState:any)=>({
                    ...prevState,
                    [key]: false,
                  }))
            }else if(key==="financingPlans"){
                for(let keyF in data[key]){
                    
                    for(let fSing in data[key][keyF] ){
                        if(fSing!=="months"){
                            
                            if(!data[key][keyF][fSing] || data[key][keyF][fSing]===0){
                                
                                isEmpty = true;
                                if(fSing ==="downPayment" && keyF==="0"){
                                    setDownPayment0(true)
                                }else if(fSing ==="downPayment" && keyF==="1"){
                                    setDownPayment1(true)
                                }else if(fSing ==="downPayment" && keyF==="2"){
                                    setDownPayment2(true)
                                }else if(fSing ==="downPayment" && keyF==="3"){
                                    setDownPayment3(true)
                                }else if(fSing ==="downPayment" && keyF==="4"){
                                    setDownPayment4(true)
                                }else if(fSing ==="interest" && keyF==="0"){
                                    setInterest0(true)
                                }else if(fSing ==="interest" && keyF==="1"){
                                    setInterest1(true)
                                }else if(fSing ==="interest" && keyF==="2"){
                                    setInterest2(true)
                                }else if(fSing ==="interest" && keyF==="3"){
                                    setInterest3(true)
                                }else if(fSing ==="interest" && keyF==="4"){
                                    setInterest4(true)
                                }
                            }else{
                                
                                if(fSing ==="downPayment" && keyF==="0"){
                                    setDownPayment0(false)
                                }else if(fSing ==="downPayment" && keyF==="1"){
                                    setDownPayment1(false)
                                }else if(fSing ==="downPayment" && keyF==="2"){
                                    setDownPayment2(false)
                                }else if(fSing ==="downPayment" && keyF==="3"){
                                    setDownPayment3(false)
                                }else if(fSing ==="downPayment" && keyF==="4"){
                                    setDownPayment4(false)
                                }else if(fSing ==="interest" && keyF==="0"){
                                    setInterest0(false)
                                }else if(fSing ==="interest" && keyF==="1"){
                                    setInterest1(false)
                                }else if(fSing ==="interest" && keyF==="2"){
                                    setInterest2(false)
                                }else if(fSing ==="interest" && keyF==="3"){
                                    setInterest3(false)
                                }else if(fSing ==="interest" && keyF==="4"){
                                    setInterest4(false)
                                }

                            }
                        
                        }
                        
                    }
                }
            }
            
        }
        

        return isEmpty;
    }

    const constructor = (data:any) =>{
        const obj: Record<string, any> = {};
        const objF: Record<string, any> = {};

        for (let parameter in data) {
            if ( parameter!=="favorite" && parameter!=="weaviate_id" && parameter!=="img_url" && parameter!=="vehicleId" &&parameter !=="financingPlans") {
                const key = `${parameter}`;
                const value = false;
                obj[key] = value;
            }
        }
        setStates(obj);
        return(obj);
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        setLoading(true);
        const entries = Array.from(formData.entries());
        
        const vehicleCreated = createVehicleDto();
        if(states===undefined){
            
            constructor(vehicleCreated);
        }
        
        const verification = dataVerification(vehicleCreated);
        

        if(!verification){
            
            if(!toUpdate){
                try {
                    const response = await createVehicle(vehicleCreated);
                    console.log("ojo")
                    console.log(response.data);
                    // Accede a la respuesta después de que la promesa se haya resuelto
                    await cargarImages(response.data);
                    
                    setCloseModal();
                    
                    // Resto de tu código...
                } catch (error) {
                    console.error(error); // Captura cualquier error que pueda ocurrir durante la ejecución de la promesa
                    setShowAlert(true);
                    setAlerMessage("Error al intentar agregar vehículo. Intentar más tarde");
                }
            }else{
                try {
                    if(vehicleCreated.vehicleId !== null){
                        const response = await updateVehicle(vehicleCreated);
                        console.log(response); // Accede a la respuesta después de que la promesa se haya resuelto
                        await cargarImages(vehicleCreated.vehicleId);
                        console.log("Carro update")
                        setCloseModal();
                    }else{
                        console.log("Carro no update")
                        setShowAlert(true);
                        setAlerMessage("No se actualizó el vehículo");
                    }
                    
                    
                    // Resto de tu código...
                } catch (error) {
                    console.error(error); // Captura cualquier error que pueda ocurrir durante la ejecución de la promesa
                    setShowAlert(true);
                    setAlerMessage("Error al intentar agregar vehículo. Intentar más tarde");
                }
            }
        }else{
            setShowAlert(true);
            setAlerMessage("No se llenaron todos los campos");
        }

        setLoading(false);
        

        
    };

    const handleChangeIndex = (index: number) => {
        setCurrentIndex(index);
        console.log(index);
    };

    
    useEffect(() => {
        if(loggedUser === undefined || loggedUser === null){
            return;
        }
        if(toUpdate){
            if(selectecDealershipVehicleId !== undefined){
                getVehicleSelected(selectecDealershipVehicleId,loggedUser.id);
            }  
        } 

        setFirstLoading(true);

    }, []);

    useEffect(() => {    
        toCreateBasicForm();
    }, [selectedVehicle]);
    
    

    return(
        <MainWrapper >
            {((selectedVehicle === undefined && toUpdate===false)||(selectedVehicle !== undefined && toUpdate===true)) ? (
                <ContentWrapper>
                     {firstLoading && !(selectedVehicle === undefined && toUpdate===false) ? (
                <div>
                    Loading...
                </div>
            ): (
                <>
                   <UpperWrapper>
                    <ListMenu>
                        <ListMenuOption>
                            <ListOptionA 
                                onClick={() => {
                                    handleChangeIndex(1);
                                }}
                                active={currentIndex === 1}
                            >
                               Información General 
                            </ListOptionA>
                        </ListMenuOption>
                        <ListMenuOption>
                            <ListOptionA 
                                onClick={() => {
                                    handleChangeIndex(2);
                                }}
                                active={currentIndex === 2}
                            >
                               Caraterísticas 
                            </ListOptionA>
                        </ListMenuOption>
                        <ListMenuOption>
                            <ListOptionA 
                                onClick={() => {
                                    handleChangeIndex(3);
                                }}
                                active={currentIndex === 3}
                                missing={(states !==undefined ?(false):(false))}
                            >
                               Planes de Financiamiento 
                            </ListOptionA>
                        </ListMenuOption>
                    </ListMenu>
                    <IconButton
                            onClick={setCloseModal}>
                            <CloseSharp></CloseSharp>
                        </IconButton>
                </UpperWrapper>
                
                

                <MiddleWrapper>
                    {currentIndex === 1 && <StepOne states={states} salesList={salesmanDealership} user={loggedUser} userType={userType} formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} dealership={dealership} imageFormData={imageFormData} imageList={imageList} setImageList={setImageList} />}
                    {currentIndex === 2 && <StepTwo states={states} user={loggedUser} userType={userType} formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} fuel={fuel} transmision={transmision} traction={traction} listColors={listColors} setListColors={setListColors}/>}
                    {currentIndex === 3 && <StepThree downPayment0={downPayment0} downPayment1={downPayment1} downPayment2={downPayment2} downPayment3={downPayment3} downPayment4={downPayment4} interest0={interest0} interest1={interest1} interest2={interest2} interest3={interest3} interest4={interest4} states={states} user={loggedUser} userType={userType} formData={formData} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange}/>}
                </MiddleWrapper>
                <LowerWrapper>
                    <Button onClick={(event: any) => {handleSubmit(event)}}
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: "white",
                            '&:hover':{
                                color: "black"
                            } 
                        }}
                    >{loading ? (<CircularProgress color={"inherit"} size={24}/>) : "Guardar"}</Button>
                </LowerWrapper>
                </>
            )}
                </ContentWrapper>
                ):(
                <ContentWrapper>
                    <div>
                        Loading...
                    </div>
                </ContentWrapper>
                )}
        
        {
            showAlert && (
                <AlertWindow
                    message={alertMessage}
                    severity="error"
                ></AlertWindow>
            )
        } 
                
                
            
        </MainWrapper>
    );
};
export default VehicleUploadModal;