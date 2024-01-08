import React, {useEffect, useState} from 'react'
import { CarImage, MainCardDiv, CarInfoWrapper,
         LeftInfoWrapper,
         RightInfoWrapper,
         ColorCircle,
         ColorsWrapper,
         PriceText,
         BrandNModelText,
         DealershipText} from './styles';
import { IconButton } from 'components/IconButton';
import { CompareArrowsRounded, DeleteOutlined, Favorite, FavoriteBorder, FavoriteBorderOutlined } from '@mui/icons-material';
import { CarCatalogCardInformationProp } from './types';
import { useNavigate } from 'react-router-dom';
import { setToFavorites } from 'services';
import { addToCompareListAction, deleteFromCompareListAction, isElementInCompareList } from 'pages/VehicleSelectionCard/toCompareStore';

/**
 * This Card component will be displayed in the catalog presentation for client and administrator.
 * It has both views included.
 */

const CarCatalogCard : React.FC<CarCatalogCardInformationProp> =  ({
    vehicleId,
    isAdmin,
    image = "https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png",
    price ,
    brand ,
    subBrand ,
    model,
    dealershipName,
    isFavorite,
    colors = [],
    onClickFavorite = (value) => {
        console.log(value);
    },
    onClickCompare = (value) => {
        console.log(value);
    },
    onClickSelected = (value => {
        console.log(value);
    }),
    onClickDelete = (value => {
        console.log(value);
    })
}) => {

    const navigate = useNavigate();

    if(image === null || image === undefined) {
        image = "https://public-drive-ai.s3.amazonaws.com/cars/95143e9b-55a4-4d09-8a13-e312aa97fd02_noImage.png";
    }

    const [addedToFavorites, setAddedToFavorites] = useState(isFavorite);
    const [addedToCompare, setAddedToCompare] = useState(false);
    const [addedToDelete, setAddedToDelete] = useState(false);
    const [addedToSelect, setAddedToSelect] = useState(false);

    const handleAddedToFavorites = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setAddedToFavorites(!addedToFavorites);
        addFavorite();
    };
    const addFavorite = async () => {
        await setToFavorites(vehicleId).then((res) => {
            if (res){
                console.log(res.data);
                setAddedToFavorites(res.data);
            }else{
                setAddedToFavorites(!addedToFavorites);
            }
        })
    }

    const handleAddedToCompare = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        addCompare();
    };
    const addCompare = () => {
        if (isElementInCompareList(vehicleId)){
            deleteFromCompareListAction(vehicleId);
            setAddedToCompare(false);
        }else{
            addToCompareListAction(vehicleId);
            setAddedToCompare(true);
        }
    }

    const handleSelectedCard = () => {
        onClickSelected(25);
        onClickCompare(vehicleId);
    };
    const handleToDelete = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClickDelete(vehicleId);
    };

    useEffect(() => {
        setAddedToCompare(isElementInCompareList(vehicleId));
    }, [vehicleId]);

  return (
    <MainCardDiv
        onClick={() => { handleSelectedCard() }}
    >
        <CarImage
            src={image}
        />
        <CarInfoWrapper>
            <LeftInfoWrapper>
                <PriceText>{ price.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2,}) }</PriceText>
                <BrandNModelText> {brand + " " + subBrand + ", " + model}</BrandNModelText>
                <DealershipText>{dealershipName}</DealershipText>
                <ColorsWrapper>
                    {
                    colors.map((color) => (
                        <ColorCircle
                            style={{backgroundColor: color}}
                        />
                    ))
                    }
                </ColorsWrapper>
            </LeftInfoWrapper>
            {
                isAdmin === false ? (
                    <RightInfoWrapper>
                        <div onClick={(event) => handleAddedToFavorites(event)}>
                        {
                            addedToFavorites === true ? (
                                <IconButton
                                    color='#DE4D5A'
                                >
                                    <Favorite/>
                                </IconButton>
                            ) : (
                                <IconButton
                                    color='black'
                                >
                                    <FavoriteBorderOutlined/>
                                </IconButton>
                            )
                        }
                        </div>
                        <div onClick={(event) => handleAddedToCompare(event)}>
                        {
                            addedToCompare ? (
                                <IconButton
                                    color="#4251F5"
                                >
                                    <CompareArrowsRounded/>
                                </IconButton>
                            ) : (

                                <IconButton
                                    color="black"
                                >
                                    <CompareArrowsRounded/>
                                </IconButton>
                            )
                        }
                        </div>
                    </RightInfoWrapper>
                ) :isAdmin === true ? (
                    <RightInfoWrapper>
                        <div onClick={(event) => handleToDelete(event)}>
                            {
                                addedToDelete === true ? (
                                    <IconButton
                                        color="#4251F5"
                                    >
                                        <DeleteOutlined/>
                                    </IconButton>
                                ) : (

                                    <IconButton
                                        color="black"
                                    >
                                        <DeleteOutlined/>
                                    </IconButton>
                                )
                            }
                        </div>
                    </RightInfoWrapper>
                ) : (
                    <RightInfoWrapper>

                    </RightInfoWrapper>
                )
            }

        </CarInfoWrapper>
    </MainCardDiv>
  )
}

export default CarCatalogCard;