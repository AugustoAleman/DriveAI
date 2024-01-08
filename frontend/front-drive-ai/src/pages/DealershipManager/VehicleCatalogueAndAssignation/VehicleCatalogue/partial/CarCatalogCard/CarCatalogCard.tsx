import React, {useState} from 'react'
import { CarImage, MainCardDiv, CarInfoWrapper,
         LeftInfoWrapper,
         RightInfoWrapper,
         ColorCircle,
         ColorsWrapper,
         PriceText,
         BrandNModelText,
         DealershipText} from './styles';
import { IconButton } from 'components/IconButton';
import { CompareArrowsRounded, DeleteOutlined, FavoriteBorderOutlined } from '@mui/icons-material';
import { CarCatalogCardInformationProp } from './types';
import theme from 'theme/theme';

/**
 * This Card component will be displayed in the catalog presentation for client and administrator.
 * It has both views included.
 */

const CarCatalogCard : React.FC<CarCatalogCardInformationProp> =  ({
    index = 1,
    isAdmin = false,
    image =  "https://images.kavak.services/images/25558/EXTERIOR-frontSidePilotNear-1679075234446.jpeg?d=540x310",
    price = 414000,
    brand = "Jeep",
    subbrand = "Grand Cherokee",
    model= 2018,
    dealership= "Nissan Santa Fe",
    colors = [
        {
            color: "#D39B88",
            index: 1
        },
        {
            color: "#784F4F",
            index: 2
        },
        {
            color: "#2B4368",
            index: 3
        },
        {
            color: "#000000",
            index: 4
        },
    ],
    onClickFavorite = (value) => {
        console.log(value);
    },
    onClickCompare = (value) => {
        console.log(value);
    },
    onClickSelected = (value => {
        console.log(value);
    }),
    onClickDelete = (value: any) => {
        console.log(value);
    }
}) => {

    const [addedToFavorites, setAddedToFavorites] = useState(false);
    const [addedToCompare, setAddedToCompare] = useState(false);
    const [addedToDelete, setAddedToDelete] = useState(false);

    const handleAddedToFavorites = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setAddedToFavorites(!addedToFavorites);
        onClickFavorite(23);
    };
    const handleAddedToCompare = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setAddedToCompare(!addedToCompare);
        onClickCompare(24);
    };
    const handleSelectedCard = () => {
        onClickSelected(25);
    };
    const handleToDelete = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setAddedToDelete(!addedToDelete);
        onClickDelete(26);
    };

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
                <BrandNModelText> {brand + " " + subbrand + ", " + model}</BrandNModelText>
                <DealershipText>{dealership}</DealershipText>
                <ColorsWrapper>
                    {
                    colors.map((color) => (
                        <ColorCircle
                            style={{backgroundColor: color.color}}
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
                                    color = {theme.palette.accent.main}
                                >
                                    <FavoriteBorderOutlined/>
                                </IconButton>
                            ) : (
                                <IconButton
                                    color={theme.palette.primary.main}
                                >
                                    <FavoriteBorderOutlined/>
                                </IconButton>
                            )
                        }
                        </div>
                        <div onClick={(event) => handleAddedToCompare(event)}>
                        {
                            addedToCompare === true ? (
                                <IconButton
                                    color={theme.palette.secondary.main}
                                >
                                    <CompareArrowsRounded/>
                                </IconButton>
                            ) : (

                                <IconButton
                                    color={theme.palette.primary.main}
                                >
                                    <CompareArrowsRounded/>
                                </IconButton>
                            )
                        }
                        </div>
                    </RightInfoWrapper>
                ) : (
                    <RightInfoWrapper>
                        <div onClick={(event) => handleToDelete(event)}>
                            {
                                addedToDelete === true ? (
                                    <IconButton
                                        color={theme.palette.secondary.main}
                                    >
                                        <DeleteOutlined/>
                                    </IconButton>
                                ) : (

                                    <IconButton
                                        color={theme.palette.primary.main}
                                    >
                                        <DeleteOutlined/>
                                    </IconButton>
                                )
                            }
                        </div>
                    </RightInfoWrapper>
                )
            }

        </CarInfoWrapper>
    </MainCardDiv>
  )
}

export default CarCatalogCard;