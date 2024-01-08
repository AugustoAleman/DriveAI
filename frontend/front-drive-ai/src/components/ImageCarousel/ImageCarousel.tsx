import React, { useState } from 'react'
import { ImageCarouselProp } from './types'
import { Button, ButtonWrapper, CarouselContainer, Image, ImageWrapper } from './styles'

const ImageCarousel: React.FC<ImageCarouselProp> = ({
    images = []
}) => {

    const imagesStatic = [
        'https://placekitten.com/200/300',
        'https://placekitten.com/300/300',
        'https://placekitten.com/400/300',
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrev = () => {
        setCurrentImageIndex(
            currentImageIndex === 0 ? imagesStatic.length - 1 : currentImageIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentImageIndex(
            currentImageIndex === imagesStatic.length - 1 ? 0 : currentImageIndex + 1
        );
    };

    return (
        <>
            <CarouselContainer>
                {imagesStatic.map((image, index) => (
                    <ImageWrapper key={index}>
                        <Image src={image} />
                    </ImageWrapper>
                ))}
            </CarouselContainer>
            <ButtonWrapper>
                <Button onClick={handlePrev}>Prev</Button>
                <Button onClick={handleNext}>Next</Button>
            </ButtonWrapper>
        </>
    );
}

export default ImageCarousel
