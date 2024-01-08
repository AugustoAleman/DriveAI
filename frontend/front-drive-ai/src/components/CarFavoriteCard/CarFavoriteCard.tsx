import React from 'react';
import { CarImage, 
         ImageContainer, 
         MainCardDiv, 
         CarInfoWrapper, 
         LeftInfoWrapper, 
         RightInfoWrapper, 
         PriceText, 
         BrandNModelText, 
         MonthlyFee, 
         Features } from './styles';
import { IconButton } from 'components/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CarFavoriteCardInformationProp } from './types';

const CarFavoriteCard: React.FC<CarFavoriteCardInformationProp> = ({
  image = 'https://images.kavak.services/images/25558/EXTERIOR-frontSidePilotNear-1679075234446.jpeg?d=540x310',
  price = 414000,
  brand = 'Jeep',
  subbrand = 'Grand Cherokee',
  model = 2018,
  payment = 15000,
  elements = ['Fuel', 'Traction', 'Engine'],
  addedToFavorites = false,
  onClickFavorite = (value) => {
    console.log(value);
  },
  onClickSelected = (value) => {
    console.log(value);
  },
}) => {
  const handleAddedToFavorites = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClickFavorite(23);
  };

  const handleSelectedCard = () => {
    onClickSelected(25);
  };
  return (
    <MainCardDiv
        onClick={() => { handleSelectedCard() }}
    >
        <CarImage>
        <ImageContainer src={image} />
        </CarImage>
        <CarInfoWrapper>
            <LeftInfoWrapper>
                <PriceText>{ price.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2,}) }</PriceText>
                <MonthlyFee>{ "Mensualidades desde " + payment.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2,}) + "*"}</MonthlyFee>
                <BrandNModelText> {brand + " " + subbrand + ", " + model}</BrandNModelText>
                <Features>
                    {elements.map((element, index) => (
                        <React.Fragment key={element}>
                            {index !== 0 && ' | '}
                            {element}
                            {index !== elements.length - 1 && ' '}
                        </React.Fragment>
                    ))}
                </Features>
                
            </LeftInfoWrapper>
                <RightInfoWrapper>
                    <div onClick={(event) => handleAddedToFavorites(event)}>
                    {addedToFavorites === true ? (
                        <IconButton color="#DE4D5A">
                        <FavoriteIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="#DE4D5A">
                        <FavoriteBorderIcon />
                        </IconButton>
                    )}
            </div>
        </RightInfoWrapper>

        </CarInfoWrapper>
    </MainCardDiv>
  )
}

export default CarFavoriteCard;