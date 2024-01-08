import { useState, useEffect } from "react";
import { Compositor, 
         Client, 
         ActionsContainer,
         ActionsContainer2,
         ActionsContainer3, 
         CentralContainer, 
         CardsContainer, 
         OptionsDescription, 
         Arrow,
         Title,
         FailContainer,
         OptionsContainer,
         OptionsContainer2, 
         BecauseICanContainer } from "./styles";
import { Button } from "components/Button";
import { CarFavoriteCard } from "components/CarFavoriteCard";
import FilterListIcon from '@mui/icons-material/FilterList';
import { getFavorite } from "services";
import { setFavorite } from "services";
import { VehicleDto } from "./types";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const FavoriteRoot = () => {
  const [favoriteData, setFavoriteData] = useState<VehicleDto[]>([]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGetFavorites = async () => {
    try {
      const res = await getFavorite();
      if (res && res.data) {
        setFavoriteData(res.data);
      }
    } catch (err) {
      console.log(err);
      setFavoriteData([]);
    }
  };

  const handleSetFavorite = async (vehicleId: number) => {
    try {
      await setFavorite(vehicleId);
      setFavoriteData(prevData =>
        prevData.filter(car => car.dealershipVehicle.vehicle.vehicleId !== vehicleId)
      );
    } catch (err) {
      console.log(err);
      console.log("Failed to set favorite");
    }
  };
  
  useEffect(() => {
    handleGetFavorites();
  }, []);

  const handleSortByPrice = () => {
    const sortedData = [...favoriteData];
    sortedData.sort((a, b) => {
      if (sortAscending) {
        return a.dealershipVehicle.price - b.dealershipVehicle.price;
      } else {
        return b.dealershipVehicle.price - a.dealershipVehicle.price;
      }
    });
    setFavoriteData(sortedData);
    setSortAscending(!sortAscending);
    setSortByPrice(true);
  };

  const handleCatalog = () => {
    navigate("/vehicle-catalog"); 
  };

  const handleSeeCar = (id: number) => {
    navigate(`/vehicle-selection/${id}`);
  };

  const handleClick = () => {
    navigate(-1); 
  };

  const buttonText = sortByPrice ? (sortAscending ? "Mayor a Menor" : "Menor a Mayor") : "Precio";
  const textDescription = sortByPrice ? "Ordenar por precio:" : "Ordenar por:";


  return (
    <>
      <Compositor>
        <Client>
          <CentralContainer>
            <ActionsContainer3>
                <Arrow>
                <ArrowBackIosNewIcon
                  fontSize="large"
                  color="primary"
                  onClick={handleClick}
                />
                </Arrow>
                <Title>Favoritos</Title>
              </ActionsContainer3>
                {favoriteData.length === 0 ? (
                  <ActionsContainer2>
                    <OptionsContainer2>
                        <FailContainer>
                          <Button
                            color="#4251F5"
                            endIcon={<MenuBookIcon />}
                            fontSize="0.7rem"
                            onClick={handleCatalog}
                            variant="outlined"
                          >
                            Ver catálogo
                          </Button>
                        </FailContainer>
                    </OptionsContainer2>
                  </ActionsContainer2>
                ) : (
                  <ActionsContainer>
                    <OptionsContainer>
                      <BecauseICanContainer>
                        <OptionsDescription>{textDescription}</OptionsDescription>
                        <Button
                          color="#4251F5"
                          endIcon={<FilterListIcon />}
                          fontSize="0.7rem"
                          onClick={handleSortByPrice}
                          variant="outlined"
                        >
                          {buttonText}
                        </Button>
                      </BecauseICanContainer>
                    </OptionsContainer>
                  </ActionsContainer>
                )}
            <CardsContainer>
                {favoriteData.length === 0 ? (
                  <FailContainer>
                    <p>Oops, parece que no tienes favoritos.</p>
                  </FailContainer>
                ) : (
                  favoriteData.map((car: VehicleDto, index: number) => {
                    const elements = [
                      car.dealershipVehicle.vehicle.fuel,
                      car.dealershipVehicle.vehicle.transmission,
                      car.dealershipVehicle.vehicle.traction
                    ];
                    return (
                      <CarFavoriteCard
                        key={index}
                        brand={car.dealershipVehicle.vehicle.subBrand.brand}
                        elements={elements}
                        payment={car.dealershipVehicle.price / 72}
                        image={
                          car.dealershipVehicle.img_url !== null
                            ? car.dealershipVehicle.img_url
                            : 'https://www.grupomisol.com/wp-content/uploads/2014/11/imagen-no-disponible.gif'
                        }
                        model={car.dealershipVehicle.vehicle.model}
                        onClickFavorite={() => handleSetFavorite(car.dealershipVehicle.vehicle.vehicleId)}
                        onClickSelected={() => handleSeeCar(car.dealershipVehicle.vehicle.vehicleId)}
                        price={car.dealershipVehicle.price}
                        subbrand={car.dealershipVehicle.vehicle.subBrand.subBrand}
                        addedToFavorites={true}
                      />
                    );
                  })
                )}
            </CardsContainer>
          </CentralContainer>
        </Client>
      </Compositor>
    </>
  );
};

export default FavoriteRoot;

