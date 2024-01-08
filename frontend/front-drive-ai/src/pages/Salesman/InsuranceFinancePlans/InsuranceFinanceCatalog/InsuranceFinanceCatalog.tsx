import { PageBackground } from "./styles";
import { useEffect, useState } from "react";
import { VehicleRegistryCard } from "./partial/VehicleRegistryCard";
import { ValidateRemoveModal } from "./partial/ValidateRemoveModal";
import { dummyVehicleList } from "./consts";
import { deletevehicleWithId, getCatalogByUserId } from "services/example/vehicleService";
import { VehiclesCatalog } from "components/VehiclesCatalog";
import { Card } from "components/Card";
import { getAssignedBySalesman } from "services";
import VehicleUploadModal from "components/VehicleUploadModal/VehicleUploadModal";


const InsuranceFinanceCatalog = () => {
    const [isRegistryModalActivated, setIsRegistryModalActivated] = useState(false);
    const [isDeleteConfirmationModalActivated,setIsDeleteConfirmationModalActivated ] = useState(false);
    const [vehicleIndexToRemove, setVehicleIndexToRemove] = useState(-1);
    const [isVehicleUpdateActivated, setVehicleUpdateActivated] = useState(false);
    const [vehicleId, setVehicleId] = useState<number>();
    
    const [salesmanCarCatalogCopy, setSalesmanCarCatalogCopy] = useState<any[]>([])
    const [salesmanCarCatalog, setSalesmanCarCatalog] = useState<any[]>([]);

    const getVehicleCatalogBySalesman = async () => {
        await getAssignedBySalesman().then((res) => {
            if(res && res.data) {
                setSalesmanCarCatalog(res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleSaveNewVehicle = () => {
        setIsRegistryModalActivated(false);
        setVehicleUpdateActivated(false);
    }
    const handleCloseModalRegistry = () => {
        setIsRegistryModalActivated(false);
        setVehicleUpdateActivated(false);
    }
    const handleOpenRegistry = () => {
        setIsRegistryModalActivated(true);
        setVehicleUpdateActivated(true);
    }
    const handleOnClickDeleteVehicle = () => {
        setIsDeleteConfirmationModalActivated(false);
    }
    const handleOnClickClose = () => {
        setIsDeleteConfirmationModalActivated(false);
    }
    const handleCloseDelete = () => {
        setIsDeleteConfirmationModalActivated(false);
        if (vehicleId != undefined){
            setSalesmanCarCatalogCopy(salesmanCarCatalog);
            removeVehicleFromCatalog(vehicleId);
            deleteVehicle(vehicleId);
        }
    }

    const deleteVehicle = async (vehicleId: number) => {
        await deletevehicleWithId(vehicleId).then((res) => {
            if(res && res.data) {
                console.log(res.data);
            }
        }).catch((err) => {
            console.log("ERROR: "+err);
            setSalesmanCarCatalog(salesmanCarCatalogCopy)
        })
    }

    const removeVehicleFromCatalog = (vehicleId: number) => {
        setSalesmanCarCatalog((prevCatalog) =>
            prevCatalog.filter((vehicle) => vehicle.dealershipVehicleId !== vehicleId)
        );
        };

    const test = () => {
        if(salesmanCarCatalog?.length > 0){
            return (<VehiclesCatalog  
                    carlist={salesmanCarCatalog} 
                    OnButtonClickSelected={handleOpenRegistry} 
                    OnButtonClickCompare={handleOpenRegistry}
                    OnButtonClickDelete={handleOnClickDeleteVehicle} 
                    indexToRemoveReference={setVehicleIndexToRemove}
                    vehicleIdSetter={setVehicleId}/>)
        }
        else{
            return (<div>
                Resultados no encontrados    
            </div>)
        }
    }

    useEffect(() => {
        getVehicleCatalogBySalesman();
    }, [isVehicleUpdateActivated])

    return (
        <>
        {/* Container for (left-bar, card, backgroud) */}
        <PageBackground>
            <Card
                width="90%"
                height="auto"
                margin="1.2rem 1.2rem 1.2rem 4rem"
                padding="1.2rem"
                borderRadius="None"
                cursor="default"
            >
                {test()}
            </Card>
        </PageBackground>
        {
            (isRegistryModalActivated &&(vehicleId !== undefined) ) ? (
                //<VehicleRegistryCard type={vehicleId.toString()} onClickSave={handleSaveNewVehicle} onClickClose={handleCloseModalRegistry}></VehicleRegistryCard>
                <VehicleUploadModal userType={"salesman"} toUpdate={true} selectecDealershipVehicleId={vehicleId} setCloseModal={handleCloseModalRegistry}/>
            ) : null
        }
        {
            isDeleteConfirmationModalActivated ? (
                <ValidateRemoveModal onClickDelete={handleCloseDelete} onClickClose={handleOnClickClose}></ValidateRemoveModal>
            ) : null
        }
        </>
    )
}

export default InsuranceFinanceCatalog;