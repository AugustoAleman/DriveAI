import React, { useState } from "react";
import { CarCatalogCard } from "components/CarCatalogCard";
import { VehicleCatalogProp } from "./types";
import { GeneralContent, VehiclesCatalogList, CarCatalogCardContainer, PropmtText } from "./styles";
import { deletevehicleWithId } from "services/example/vehicleService";
import { useNavigate } from "react-router-dom";
import { LoadingText } from "components/LoadingText";

interface Car {
    dealershipVehicleId: number;
    image: string;
    price: number;
    brand: string;
    subBrand: string;
    model: number;
    dealershipName: string;
    favorite: boolean;
    colors: string[];
};

const VehicleCatalog : React.FC<VehicleCatalogProp> = ({
    vehicleIdSetter,
    carlist = [],
    isAdmin,
    loading = false,
    favorite = false,
    OnButtonClickFavorite = (value = "addFavorite") => {
        console.log(value);
    },
    OnButtonClickCompare = (value= "addToCompare") => {
        console.log(value);
    },
    OnButtonClickSelected = (value="addSelected") => {
        console.log(value);
    },
    OnButtonClickDelete = (value="onClickDelte") => {
        console.log(value);
    },
    indexToRemoveReference = (value=1) => {
        console.log(value);
    },

}) => {
    /*
        const deleteVehicle = async (vehicleId: number) => {
        await deletevehicleWithId(vehicleId).then((res) => {
            if(res && res.data) {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log("ERRor: "+err);
        })
    }
    **/ 
       /**
     * Method for handling the image selection  
     */


    const navigate = useNavigate();

    const CreateCarCards = ({ carlist } : { carlist: Car[]}) => {
        if(loading) {
            return (
                <>
                    {Array.from({ length: 16 }).map((_, index) => (
                    <CarCatalogCardContainer key={index}>
                        <LoadingText height="15rem" width="15rem" />
                    </CarCatalogCardContainer>
                    ))}
                </>
            )
        }        
        return carlist.map((car: Car) => (
            <CarCatalogCardContainer>
                <CarCatalogCard 
                    vehicleId={car.dealershipVehicleId}
                    isAdmin={isAdmin}
                    image={car.image}
                    price={car.price}
                    brand={car.brand}
                    subBrand={car.subBrand}
                    model={car.model}
                    dealershipName={car.dealershipName}
                    isFavorite={car.favorite}
                    colors={car.colors}
                    onClickFavorite={() => {
                        vehicleIdSetter(car.dealershipVehicleId)
                        OnButtonClickFavorite();
                    }}
                    onClickCompare={OnButtonClickCompare}
                    onClickSelected={() => {
                        console.log(car.dealershipVehicleId)
                        vehicleIdSetter(car.dealershipVehicleId);
                        OnButtonClickSelected(car.dealershipVehicleId);
                    }}
                    onClickDelete={() => {
                        OnButtonClickDelete();
                        vehicleIdSetter(car.dealershipVehicleId)
                    }}
                />
            </CarCatalogCardContainer>
        ))

        // {CreatCarCards({ carlist })}
    }

    return (
        <div>
            {loading ? <PropmtText>Estamos buscando tu auto ideal...</PropmtText> : ""}
            <GeneralContent>
                <VehiclesCatalogList>
                    {CreateCarCards({ carlist })}
                </VehiclesCatalogList>
            </GeneralContent>
        </div>
        

    )
}

export default VehicleCatalog