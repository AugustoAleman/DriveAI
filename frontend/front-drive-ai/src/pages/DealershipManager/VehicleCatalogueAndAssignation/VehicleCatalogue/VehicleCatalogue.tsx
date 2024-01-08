import { IconButton } from "components/IconButton";
import VehicleCatalog from "components/VehiclesCatalog/VehiclesCatalog";
import { IconButtonDiv, PageBackground } from "./styles";
import useStyles from "./styles";
import { useEffect, useState } from "react";
import { ValidateRemoveModal } from "./partial/ValidateRemoveModal";
import { deletevehicleWithId } from "services/example/vehicleService";
import { getAssignedByManager } from "services";
import { Card } from "components/Card";
import AddIcon from "@mui/icons-material/Add";
import VehicleUploadModal from "components/VehicleUploadModal/VehicleUploadModal";

const VehicleCatalogueAndAssignationCatalogue = () => {
  const classes = { useStyles };
  const [isRegistryModalActivated, setIsRegistryModalActivated] =
    useState(false);
  const [
    isDeleteConfirmationModalActivated,
    setIsDeleteConfirmationModalActivated,
  ] = useState(false);
  const [vehicleIndexToRemove, setVehicleIndexToRemove] = useState(-1);
  const [isVehicleUpdateActivated, setVehicleUpdateActivated] = useState(false);
  const [vehicleId, setVehicleId] = useState<number>();

  const [carCatalogCopy, setCarCatalogCopy] = useState<any[]>([]);
  const [dealershipCarCatalog, setDealershipCarCatalog] = useState<any[]>([]);

  const [indext, setIndext] = useState(0);

  const setWasClickeed = (num: number) => {
    setIndext(num);
    console.log(num + "Hoola");
    setVehicleUpdateActivated(true);
  };

  const getVehicleCatalogByDealershipId = async () => {
    await getAssignedByManager()
      .then((res) => {
        if (res && res.data) {
          console.log("FOUND DATA: " + res.data);
          setDealershipCarCatalog(res.data);
        }
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  };
  const handleSaveNewVehicle = () => {
    setIsRegistryModalActivated(false);
    setVehicleUpdateActivated(false);
  };
  const handleCloseModalRegistry = () => {
    setIsRegistryModalActivated(false);
    setVehicleUpdateActivated(false);
  };
  const handleOpenRegistry = () => {
    setVehicleUpdateActivated(true);
  };
  const handleOnClickCloseModal = () => {
    setIsDeleteConfirmationModalActivated(false);
  };
  const handleOnClickDeleteVehicle = () => {
    setIsDeleteConfirmationModalActivated(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteConfirmationModalActivated(false);
    if (vehicleId != undefined) {
      setCarCatalogCopy(dealershipCarCatalog);
      removeVehicleFromCatalog(vehicleId);
      deleteVehicle(vehicleId);
    }
  };

  const deleteVehicle = async (vehicleId: number) => {
    await deletevehicleWithId(vehicleId)
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("ERROR: " + err);
        setDealershipCarCatalog(carCatalogCopy);
      });
  };

  const removeVehicleFromCatalog = (vehicleId: number) => {
    setDealershipCarCatalog((prevCatalog) =>
      prevCatalog.filter((vehicle) => vehicle.dealershipVehicleId !== vehicleId)
    );
  };

  useEffect(() => {
    getVehicleCatalogByDealershipId();
    console.log(dealershipCarCatalog);
    console.log("Num");
  }, [isVehicleUpdateActivated, isRegistryModalActivated]);

  useEffect(() => {}, [dealershipCarCatalog]);

  const test = () => {
    if (dealershipCarCatalog?.length > 0) {
      return (
        <VehicleCatalog
          isAdmin={true}
          carlist={dealershipCarCatalog}
          OnButtonClickSelected={handleOpenRegistry}
          OnButtonClickCompare={setWasClickeed}
          OnButtonClickDelete={handleOnClickDeleteVehicle}
          indexToRemoveReference={setVehicleIndexToRemove}
          vehicleIdSetter={setVehicleId}
        />
      );
    } else {
      return <div>Resultados no encontrados</div>;
    }
  };
  return (
    <>
      {/* Container for (left-bar, card, backgroud) */}
      <PageBackground>
        <Card
          width="90%"
          height="auto"
          margin="1.2rem 0px 1.2rem 70px"
          padding="1.2rem"
          borderRadius="None"
          cursor="default"
        >
          <IconButtonDiv>
            <div></div>
            <IconButton
              borderRadius="1rem"
              color="red"
              onClick={() => {
                setIsRegistryModalActivated(true);
              }}
            >
              Agregar <AddIcon />
            </IconButton>
          </IconButtonDiv>
          {test()}
        </Card>
      </PageBackground>
      {isRegistryModalActivated ? (
        <VehicleUploadModal
          userType={"manager"}
          toUpdate={false}
          setCloseModal={handleCloseModalRegistry}
        />
      ) : null}
      {isVehicleUpdateActivated ? (
        <VehicleUploadModal
          userType={"manager"}
          toUpdate={true}
          selectecDealershipVehicleId={indext}
          setCloseModal={handleCloseModalRegistry}
        />
      ) : null}
      {isDeleteConfirmationModalActivated ? (
        <ValidateRemoveModal
          onClickDelete={handleCloseDelete}
          onClickClose={handleOnClickCloseModal}
        ></ValidateRemoveModal>
      ) : null}
    </>
  );
};

export default VehicleCatalogueAndAssignationCatalogue;
