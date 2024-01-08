import { useState, useEffect } from "react";
import { Compositor, 
         Client, 
         ActionsContainer, 
         CentralContainer, 
         CardsContainer, 
         CentralSubContainer, 
         AddButtonContainer,
         Title, 
         Arrow, 
         OptionsContainer,
         StyledAddButton, 
         ActionsContainer2 } from "./styles";
import { ComparisonColumn } from "components/ComparisonColumn";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { VehicleDto } from "./types";
import { getCompareList, deleteFromCompareListAction } from "pages/VehicleSelectionCard/toCompareStore";
import { getCompareCarsList } from "services";
import { useNavigate } from 'react-router-dom';
import { Button } from "components/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VehiclesCatalogModal from "components/AddCarToCompareModal/AddCarToCompareModal";

const CompareRoot = () => {
  const [carsData, setCarsData] = useState<VehicleDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const carsList = getCompareList();

  const handleGetCars = async () => {
    try {
      const filteredCarsList = Array.from(new Set(carsList));
      const res = await getCompareCarsList(filteredCarsList);
      if (res && res.data) {
        setCarsData(res.data);
      }
    } catch (err) {
      setCarsData([]);
    }
  };

  const handleDeleteAllFromCompareList = () => {
    carsList.forEach((carId) => {
      deleteFromCompareListAction(carId);
    });
    setCarsData([]); 
  };

  const handleClick = () => {
    navigate(-1); 
  };

  const handleCatalog = () => {
    navigate("/vehicle-catalog"); 
  };

  const handleSeeCar = (id: number) => {
    navigate(`/vehicle-selection/${id}`);
  };

  const handleAddCarClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  return (
    <>
      <Compositor>
        <Client>
          <CentralContainer>
            <ActionsContainer>
              <Arrow>
                <ArrowBackIosNewIcon
                  fontSize="large"
                  color="primary"
                  onClick={handleClick}
                />
              </Arrow>
              <Title>Comparemos tus opciones</Title>
            </ActionsContainer>
            {carsData.length === 0 ? (
              <ActionsContainer2>
                <Button
                  color="#4251F5"
                  endIcon={<MenuBookIcon />}
                  fontSize="0.7rem"
                  onClick={handleCatalog}
                  variant="outlined"
                >
                  Ver catálogo
                </Button>
              </ActionsContainer2>
            ) : (
              <OptionsContainer>
                <Button
                  color="#4251F5"
                  endIcon={<DeleteIcon />}
                  fontSize="0.7rem"
                  onClick={handleDeleteAllFromCompareList}
                  variant="outlined"
                >
                   Borrar
                </Button>
              </OptionsContainer>
            )}
            <CentralSubContainer>
              <CardsContainer>
                {carsData.length === 0 ? (
                  <p>Oops, parece que no tienes vehiculos seleccionados para comparar.</p>
                ) : (
                  carsData.map((car: VehicleDto, index: number) => (
                    <ComparisonColumn
                      key={index}
                      dealership={car.dealershipName}
                      deliveryTime={`Tracción: ${car.traction}`}
                      fuelType={`Combustible: ${car.fuel}`}
                      model={`Modelo: ${car.model}`}
                      name={car.subBrand}
                      onButtonClick={() => handleSeeCar(car.dealershipVehicleId)}
                      path={
                        car.image_url !== null
                          ? car.image_url
                          : 'https://www.grupomisol.com/wp-content/uploads/2014/11/imagen-no-disponible.gif'
                      }
                      paymentPlan={`Versión: ${car.version}`}
                      price={car.price.toLocaleString().replace('.', ',')}
                      testDriveAvailable={`Kilometraje: ${car.mileage < 199 ? 'Nuevo' : car.mileage.toLocaleString().replace('.', ',')+' km'}`}
                      transmissionType={`Transmisión: ${car.transmission}`}
                    />
                  ))
                )}
              </CardsContainer>
              {carsData.length === 0 ? (
                <p></p>
              ) : (
                <AddButtonContainer>
                  <StyledAddButton>
                    <AddCircleOutlineIcon
                      fontSize="large"
                      color="secondary"
                      onClick={handleAddCarClick}
                    />
                  </StyledAddButton>
                </AddButtonContainer>
              )}
            </CentralSubContainer>
          </CentralContainer>
        </Client>
      </Compositor>
      {isModalOpen && <VehiclesCatalogModal onClose={handleCloseModal} />}
    </>
  );
};

export default CompareRoot;
